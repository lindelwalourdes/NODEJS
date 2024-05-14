const mongoose = require('mongoose'),
	Subscriber = require('./models/subscriber');
mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
Subscriber.create({
 name: "Don",
 email: "don@donwexler.com",
 zipCode: "12345"
})
 .then(subscriber => console.log(subscriber))
 .catch(error => console.log(error.message));
var subscriber;
Subscriber.findOne({
 name: "Don"
}).then(result => {
 subscriber = result;
 console.log(subscriber.getInfo());
});
Subscriber.create({
 name: "Don2",
 email: "don2@donwexler.com",
 zipCode: "123"
})
 .then(subscriber => console.log(subscriber))
 .catch(error => console.log(error.message));
var subscriber;
Subscriber.findOne({
 name: "Don2"
}).then(result => {
 subscriber = result;
 console.log(subscriber.getInfo());
});
