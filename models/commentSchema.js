import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({

    comment: {
        type: String,
        required: true
    },

    post_number:{
        type: String,
        required: true,
    }

});

export const Comment = mongoose.model('Comment', commentSchema);