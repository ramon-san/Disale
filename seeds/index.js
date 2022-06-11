/**
 * This file should be run with node, the command is 'node ./seeds/index.js' if accessed from main folder.
 */
import mongoose from 'mongoose';
// We add our DB schema objects.
import { Customer } from '../models/customer.js'; // File extension is needed.
// Add seed data.
import { cities } from './cities.js';
import { name, action, industry } from './seedHelpers.js';

// We connect our mongoose library to the running Mongo DB.
mongoose.connect('mongodb://localhost:27017/disale') // Mongo default port is 27017 and we're currently hard coding.
    .then(() => {
        console.log("Seeds DB connection Open!");
    }).catch(err => {
        console.log("Seeds DB connection error: " + err);
    });

// Function to get random number between a given array's size.
const sample = (array) => array[Math.floor(Math.random() * array.length)];

// Function to delete previous content and create new one.
const seedDB = async () => {
    await Customer.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const randomCity = Math.floor(Math.random() * cities.length);
        const newCustomer = new Customer({
            name: `${sample(name)} ${sample(action)}`,
            industry: `${sample(industry)}`,
            location: `${cities[randomCity].city}, ${cities[randomCity].state}`
        });
        await newCustomer.save();
    }
}

// We run the function and close the DB connection.
seedDB().then(() => {
    console.log("Data saved successfully...\nConnection closed!");
    mongoose.connection.close();
}).catch(err => {
    console.log("Error: " + err);
})