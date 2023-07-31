import mongoose from "mongoose";

import { Customer } from "../models/customerSchema.js";
import { Establishment } from "../models/establishmentSchema.js";
import { Owner } from "../models/ownerSchema.js";
import { Post } from "../models/postSchema.js";
import { Comment } from "../models/commentSchema.js";


mongoose.connect('mongodb://127.0.0.1:27017/apdev_test_hi', { useNewUrlParser: true, useUnifiedTopology: true });

createEstablishments();
createPosts();

console.log("Process can be terminated safely now");

async function getCustomer(cusname) {
    const customer =  await Customer.findOne({name: cusname});
    return customer;
}

export default async function createEstablishments(){

    const estDetails = [

        {name: "Ate Rica's Bacsilog",
        description: "The standard Silog meal is composed of 1 major ingredient (ex. Bacon, Tapa, Tocino, etc.) 1 piece egg, Ate Rica’s Special Cheese Sauce and liquid savor topped on 1 cup of rice. More than 15 years of operations later, Ate Rica's Bacsilog remains strong and determined to provide to more people the famous Bacsilog with its memorable recipe and taste; a taste that, in the words of a blogger, \"the Lasallian community holds close to their hearts.\"",
        path: "../sprites/header-aterica.png",
        icon: "../sprites/png-bacsilog.png"},

        {name: "Good Munch",
        description: "Good Munch serves SO MUNCH BETTER Asian Fusion Recipes curated with lots of love from Chef Munch! After a walk around De La Salle University, many visitors stop by this restaurant. If you never turned out to taste Filipino cuisine, take your chance at Good Munch. Clients can have tasty chicken at this place.",
        path: "../sprites/header-goodmunch.png",
        icon: "../sprites/png-goodmunch.png"},
    
        {name: "Happy N' Healthy",
        description: "Sustainable diets allow for occasional indulgences in comfort foods, so don't hesitate to treat yourself now and then to our Happpy combo of Pasta, Pizza, and Potato Wedges!",
        path: "../sprites/header-hnh.png",
        icon: "../sprites/png-hnh.png"},
    
        {name: "Kuya Mels",
        description: "Kuya Mel's is a popular food stall located in the bustling market area of Agno. It is a vibrant and lively establishment known for its mouthwatering street food and delectable local delicacies. The stall is named after its owner, Kuya Mel, who is renowned for his culinary skills and dedication to providing top-notch food to his customers. It is mostly popular for its student-friendly price and still very worth every penny. Their menu contains mostly classic Filipino foods. As what Lasallians say, a \"must-try\"!",
        path: "../sprites/header-kuyamel.jpg",
        icon: "../sprites/png-kuyamel.png"},
    
        {name: "Potato Giant",
        description: "If you’re always in the mood for fries or other deep-fried potato treats, why not head on to Potato Giant! Discover this food court favorite and get your fix of seriously satisfying potatoes– from classic fries to thick cut creations, all topped off with loads and fun and flavors.",
        owner_id: "64bceedb14a9df3a7505c2c9",
        path: "../sprites/header-potato.png",
        icon: "../sprites/png-potato.png"},
        
    ]    
    const ownerList = await Owner.find({});
    
    const establishments = [];
    let index;
    for(let i = 0; i < ownerList.length; i++) {
        switch(ownerList[i].email) {
            case "calvin@gmail.com":
                index = 2;
                break;
            case "mel@gmail.com":
                index = 3;
                break;
            case "potato@gmail.com":
                index = 4;
                break;
            case "munch@gmail.com":
                index = 1;
                break;
            case "rica@gmail.com":
                index = 0;
                break;
        }
        
        establishments.push(new Establishment({
            name: estDetails[index].name,
            description: estDetails[index].description,
            owner: ownerList[i],
            path: estDetails[index].path,
            icon: estDetails[index].icon
        }));
    }

    for (let i = 0; i < establishments.length; i++) {
        establishments[i].save();
    }
}

export async function createPosts(){
    const posts = [];

    posts.push(new Post({
        estname: "Ate Rica's Bacsilog",
        review: "aaaaa",
        rating: "4",
        cust: await getCustomer("Gabrielle Tongol"),
        helpful_num: 11,
        nothelpful_num: 0,
    }));

    posts.push(new Post({
        estname: "Ate Rica's Bacsilog",
        review: "hello",
        rating: "4",
        cust: await getCustomer("Luke Chiang"),
        helpful_num: 2,
        nothelpful_num: 0,
    }));

    posts.push(new Post({
        estname: "Ate Rica's Bacsilog",
        review: "heheheeh",
        rating: "3",
        cust: await getCustomer("Harry Styles"),
        helpful_num: 2,
        nothelpful_num: 0,
    }));

    posts.push(new Post({
        estname: "Happy N' Healthy",
        review: "wadqa/jldfhqba/wDLJQjnbdW?DWJFKNAQKJNKBKHCF KHA AKCJKA",
        rating: "1",
        attached: [],
        cust: await getCustomer("Taylor Swift"),
        helpful_num: 0,
        nothelpful_num: 0,
    }));

    posts.push(new Post({
        estname: "Kuya Mels",
        review: "widhnaoa ehhehhee",
        rating: "5",
        attached: [],
        cust: await getCustomer("Gabrielle Tongol"),
        helpful_num: 0,
        nothelpful_num: 0,
    }));

    posts.push(new Post({
        estname: "Kuya Mels",
        review: "Vivamus id elit vel tellus tempor luctus. In hac habitasse platea dictumst. Aliquam tristique ligula odio, eu ullamcorper dolor tincidunt sed. Fusce facilisis massa eget ante suscipit iaculis. Fusce a egestas erat. Donec ac enim quis lorem feugiat interdum sed eu turpis. Donec imperdiet egestas elementum. Integer elit ipsum, porta ac imperdiet non, fermentum pellentesque neque. Aenean sed augue nunc. Ut dignissim euismod ipsum, vel tempus augue viverra sit amet. Fusce pretium, mauris sed lacinia tincidunt, eros lorem mollis libero, sit amet tempus mauris neque ac quam. Maecenas sed mauris mi. Mauris tincidunt augue enim, in posuere felis pharetra sit amet.",
        rating: "5",
        attached: ["uploads/Screenshot 2023-06-21 at 7.02.00 PM.png"],
        cust: await getCustomer("Taylor Swift"),
        helpful_num: 0,
        nothelpful_num: 0,
    }));

    posts.push(new Post({
        estname: "Happy N' Healthy",
        review: "Vivamus id elit vel tellus tempor luctus. In hac habitasse platea dictumst. Aliquam tristique ligula odio, eu ullamcorper dolor tincidunt sed. Fusce facilisis massa eget ante suscipit iaculis. Fusce a egestas erat. Donec ac enim quis lorem feugiat interdum sed eu turpis. Donec imperdiet egestas elementum. Integer elit ipsum, porta ac imperdiet non, f",
        rating: "3",
        attached: ["uploads/Screenshot 2023-06-05 at 11.58.39 AM.png"],
        cust: await getCustomer("Sam Kim"),
        helpful_num: 0,
        nothelpful_num: 0,
    }));
    

    for (let i = 0; i < posts.length; i++) {
        posts[i].save();
    }
}


