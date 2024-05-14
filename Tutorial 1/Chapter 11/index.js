const express = require('express');
const path = require('path');
const newPostController = require('./Controllers/newPost');
const newUserController = require('./Controllers/newUser');
const storeUserController = require('./Controllers/storeUser');
const homeController = require('./Controllers/home');
const storePostController = require('./Controllers/storePost'); 
const getPostController = require('./Controllers/getPost');
const loginController = require('./Controllers/login');
const loginUserController = require('./Controllers/loginUser');
const authMiddleware = require('./middleware/authMiddleware'); 
const expressSession = require('express-session');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const logoutController = require('./Controllers/logout');
const app = new express();
const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
mongoose.connect('mongodb://localhost/my_database', { useUnifiedTopology: true, useNewUrlParser: true });


app.use(expressSession({

    secret: 'keyboard cat'

}));

global.loggedIn = null;
app.use("*", (req, res, next)=>{

    loggedIn = req.session.userId;
    next()

});

const { error } = require('console');

const validateMiddleWare = (req, res, next) => {

    if (req.files == null || req.body.title == null) {

        return res.redirect('/posts/new')

    } else {

        next()

    }

};
app.use('/posts/store', validateMiddleWare)

const fileUpload = require('express-fileupload');
app.use(fileUpload());

const customMiddleware = (req, res, next) => {

    console.log('Custom middle ware called')
    next()

};
app.use(customMiddleware)


app.listen(4000, () => {
    console.log('App listening on https://localhost:4000');
});

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render('index', {
        blogposts: blogposts
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/samplepost', (req, res) => {
    res.render('samplepost');
});

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost: blogpost
    });
});

app.get('/posts/new',authMiddleware, newPostController)

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/posts/store', async (req, res) => {
    try {
        let image = req.files.image;
        await image.mv(path.resolve(__dirname, 'public/img', image.name));
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



app.get('/',homeController) 
app.get('/post/:id',getPostController)         
app.post('/posts/store',authMiddleware, storePostController); 

app.get('/auth/register',redirectIfAuthenticatedMiddleware, newUserController);
app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController);

app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController); 
app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController);

app.get('/auth/logout', logoutController);
app.use((req, res) => res.render('notfound'));