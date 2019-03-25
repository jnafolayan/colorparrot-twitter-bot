const Twit = require('twit');

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

const sendRandomImage = require('./sendRandomImage');


setInterval(() => {
  sendRandomImage(T).catch((e) => console.log(e));
}, 30000);

