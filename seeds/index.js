const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '60acdc9f57f6c36454b175f6',
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, assumenda. Vitae, veniam! Eligendi, labore. Itaque quibusdam repudiandae, sequi minima necessitatibus qui ipsam vitae, enim earum corrupti esse, doloribus eum odit.',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dola6eqxg/image/upload/v1622292578/YelpCamp/sgivxlusvs3laab4rs9j.jpg',
          filename: 'YelpCamp/sgivxlusvs3laab4rs9j'
        },
        {
          url: 'https://res.cloudinary.com/dola6eqxg/image/upload/v1622292577/YelpCamp/h3qtfkdd3ad0frfpelsq.jpg',
          filename: 'YelpCamp/h3qtfkdd3ad0frfpelsq'
        }

      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})