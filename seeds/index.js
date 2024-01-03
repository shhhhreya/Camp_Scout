const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '657978f8a54efb70687de9e2',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
            price,
            geometry:{
                type:"Point",
                coordinates:[
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dmbr66tqw/image/upload/v1703408631/YelpCamp/ibg0cvhrw8lqzooszlm1.jpg',
                    filename: 'YelpCamp/ibg0cvhrw8lqzooszlm1',
                  },
                  {
                    url: 'https://res.cloudinary.com/dmbr66tqw/image/upload/v1703408631/YelpCamp/bcfboz251jdu0ctcdzn6.jpg',
                    filename: 'YelpCamp/bcfboz251jdu0ctcdzn6',
                  },
                  {
                    url: 'https://res.cloudinary.com/dmbr66tqw/image/upload/v1703408631/YelpCamp/iuuppvvacfr0heeufv9o.jpg',
                    filename: 'YelpCamp/iuuppvvacfr0heeufv9o',
                  }
              
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})