import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const customerSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    email: {
        type: String, 
        required: true, 
        unique: true
    },

    password: {
        type: String, 
        required:true
    },
    
    date: {
        type: Date
    },

    location: String,

    path: String,

    userbio: String

});

export const Customer = mongoose.model('Customer', customerSchema);