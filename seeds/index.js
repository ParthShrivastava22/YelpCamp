const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const axios = require("axios");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("MONGO CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO. MONGO ERROR!!!!");
    console.log(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

async function seedImage() {
  try {
    const res = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        client_id: "Melar-b2UJXIQjcyuEc1M1gjH1oB0Cf1rxJECwW7PmM",
        collections: 8862306,
      },
    });
    return res.data.urls.small;
  } catch (err) {
    console.error(err);
  }
}

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 150; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "681f04337a42da0b1c6ef188",
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dq4nhgoyv/image/upload/v1747294753/YelpCamp/ttc4s57lptdmipqt92e9.jpg",
          filename: "YelpCamp/ttc4s57lptdmipqt92e9",
        },
        {
          url: "https://res.cloudinary.com/dq4nhgoyv/image/upload/v1747294753/YelpCamp/vqhjkp8bkdjpj0zma9x4.jpg",
          filename: "YelpCamp/vqhjkp8bkdjpj0zma9x4",
        },
        {
          url: "https://res.cloudinary.com/dq4nhgoyv/image/upload/v1747293931/YelpCamp/uanrykfgopxjxfjk6pav.jpg",
          filename: "YelpCamp/uanrykfgopxjxfjk6pav",
        },
      ],
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo!",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
