import mongoose from "mongoose";

import { Customer } from "../models/customerSchema.js";
import { Establishment } from "../models/establishmentSchema.js";
import { Owner } from "../models/ownerSchema.js";
import { Post } from "../models/postSchema.js";
import { Comment } from "../models/commentSchema.js";


mongoose.connect('mongodb://127.0.0.1:27017/apdev_test_hi', { useNewUrlParser: true, useUnifiedTopology: true });

createCustomers();
createOwners();

console.log("Process can be terminated safely now");


export default function createCustomers(){
    const customers = [];

    customers.push(new Customer({
        name: "Gabrielle Tongol",
        username: "bebegurl",
        email: "gab@gmail.com",
        password: "123",
        location: "Taft",
        path: "uploads/charlie.png",
        userbio: "I love taylor swift"
    }));

    customers.push(new Customer({
        name: "Taylor Swift",
        username: "swiftie",
        email: "tay@gmail.com",
        password: "123",
        location: "Taft",
        path: "uploads/charlie.png",
        userbio: "screaming and fighting and kissing in the rain "
    }));

    customers.push(new Customer({
        name: "Sam Kim",
        username: "sam",
        email: "sam@gmail.com",
        password: "123",
        location: "Taft",
        path: "uploads/charlie.png",
        userbio: "can you love me like that"
    }));

    customers.push(new Customer({
        name: "Harry Styles",
        username: "harreeey",
        email: "harry@gmail.com",
        password: "123",
        location: "Taft",
        path: "uploads/charlie.png",
        userbio: "baby you are the love of my life"
    }));

    customers.push(new Customer({
        name: "Luke Chiang",
        username: "bebeboi",
        email: "luke@gmail.com",
        password: "123",
        location: "Taft",
        path: "uploads/charlie.png",
        userbio: "keeping you close shouldn't be hard"
    }));

    for (let i = 0; i < customers.length; i++) {
        customers[i].save();
    }
}

export function createOwners(){
    const owners = [];

    owners.push(new Owner({
        name: "Rica Blanco",
        username: "bebegurl",
        email: "rica@gmail.com",
        password: "123",
        location: "Taft"
    }));

    owners.push(new Owner({
        name: "Munch De Gracia",
        username: "bebegurl",
        email: "munch@gmail.com",
        password: "123",
        location: "Taft"
    }));

    owners.push(new Owner({
        name: "Calvin Harris",
        username: "becauseimhappy",
        email: "calvin@gmail.com",
        password: "123",
        location: "Taft"
    }));

    owners.push(new Owner({
        name: "Mel Tiangco",
        username: "kuyamels",
        email: "mel@gmail.com",
        password: "123",
        location: "Taft"
    }));

    owners.push(new Owner({
        name: "Mashed Potato",
        username: "giant",
        email: "potato@gmail.com",
        password: "123",
        location: "Taft"
    }));

    for (let i = 0; i < owners.length; i++) {
        owners[i].save();
    }
}


