import mongoose from "mongoose";

import { Customer } from "../models/customerSchema.js";
import { Establishment } from "../models/establishmentSchema.js";
import { Owner } from "../models/ownerSchema.js";
import { Post } from "../models/postSchema.js";
import { Comment } from "../models/commentSchema.js";


mongoose.connect('mongodb://127.0.0.1:27017/apdev_test_hi', { useNewUrlParser: true, useUnifiedTopology: true });

createComments();

console.log("Process can be terminated safely now");



export default  async function createComments(){
    const post = await Post.findOne({estname: "Ate Rica's Bacsilog"});
    const comments = [];

    comments.push(new Comment({
        comment: "ahhahahhyoko na",
        post_number: post.id.toString(),
    }));

    comments.push(new Comment({
        comment: "Hihello",
        post_number: post.id.toString(),
    }));
    
    

    for (let i = 0; i < comments.length; i++) {
        comments[i].save();
    }
}

