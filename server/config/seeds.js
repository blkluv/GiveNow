const db = require("./connection");
const path = require('path');
const Organization = require('../models/Organization');
const organizationsData = [
  {
    name: "Green Cross",
    description: "Disaster relief program",
    category: "Disaster Relief",
    image: 'test3.jpg',
  },
  {
    name: "Cat Corp",
    description: "Corp to save the cats!",
    category: "Animal Welfare",
    image: 'test2.jpg',
  },
  {
    name: "Jungle Journey",
    description: "Save the animals of the jungles!",
    category: "Environmental",
    image: 'test4.jpg',
  },
  {
    name: "Enlighten Explosion",
    description: "Teaching the youth for a better tomorrow",
    category: "Education",
    image: 'education.jpg',
  },
  {
    name: "Happy Healthy Hooray!",
    description: "eat better feel better",
    category: "Healthcare",
    image: 'health.jpg',
  },
  // Add more organizations as needed
];


db.once("open", async () => {
  await Organization.deleteMany();
  await Organization.insertMany(organizationsData);
  console.log("Organizations Seeded");
  process.exit();
});
