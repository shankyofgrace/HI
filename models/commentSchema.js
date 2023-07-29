import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({

    comment: {
        type: String,
        required: true
    },

    post:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Post',
        immutable: true
    },

});

export const Comment = mongoose.model('Comment', commentsSchema);