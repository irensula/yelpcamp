const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
// mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() *1000);
        const price = Math.floor(Math.random() * 20) +10;
        const camp = new Campground({
            // YOUR USER ID
            author: '65d9dde9a1f317e5ad1de8ad',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est accusamus in voluptatem eos, inventore aliquam, suscipit eius modi quam quidem voluptatum, natus magnam possimus consectetur ipsum ipsa rem adipisci sed?',
            price,
            geometry:{
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvpnef4al/image/upload/v1708882641/YelpCamp/jkgpmlwbvgsi3xyz0r1n.jpg',
                    filename: 'YelpCamp/jkgpmlwbvgsi3xyz0r1n'
                },
                {
                    url: 'https://res.cloudinary.com/dvpnef4al/image/upload/v1708882641/YelpCamp/spqltsf2mjss7hjhiicg.jpg',
                    filename: 'YelpCamp/spqltsf2mjss7hjhiicg'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})  