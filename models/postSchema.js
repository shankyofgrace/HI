import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({

    review: {
        type: String,
        required: true
    },

    est:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Establishment',
        immutable: true
    },

    cust:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Customer',
        immutable: true
    },

    rating:{
        type: Schema.Types.Integer,
        required: true,
    },

    attached: [String], 

    helpful_num: Schema.Types.Integer

});

export const Post = mongoose.model('Post', postSchema);