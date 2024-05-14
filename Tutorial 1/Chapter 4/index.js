const express = require('express');
const path = require('path');
//create new express app
const app = new express();
//require ejs
const ejs = require('ejs');
//we tell Express to use EJS as our templating engine, that any file endingin .ejs should be rendered with the EJS package
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.listen(4000, () => {
    console.log('App listening on port 4000');
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/post', (req, res) => {
    res.render('post');
});