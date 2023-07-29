import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({

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
        type: Date, 
        default: Date.now()
    },

    location: String,

});

export const Owner = mongoose.model('Owner', ownerSchema);