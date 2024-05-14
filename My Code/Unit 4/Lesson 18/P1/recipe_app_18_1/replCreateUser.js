const mongoose = require("mongoose"),
    Subscriber = require("./models/subscriber"),
    User = require("./models/user");
mongoose.connect(
    "mongodb://localhost:27017/recipe_db",
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

Subscriber.create({
    name: "Jon",
    email: "jon@jonwexler.com",
    zipCode: "12345"
})
    .then(subscriber => console.log(subscriber))
    .catch(error => console.log(error.message));
var subscriber;
Subscriber.findOne({
    name: "Jon"
}).then(result => {
    subscriber = result;
    console.log(subscriber.getInfo());
});

var testUser;
User.create({
    name: {
          first: "Jon",
          last: "Wexler "
      },
    email: "jon@jonwexler.com",
    password: "pass123"
})
    .then(user => {
        testUser = user;
        return Subscriber.findOne({
              email: user.email
          });
    })
    .then(subscriber => {
        testUser.subscribedAccount = subscriber;
        testUser.save().then(user => console.log("user updated"));
    })
    .catch(error => console.log(error.message));

