import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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
        type: Date,
        default: Date.now(),
    },

    location: String,

    path: String,

    userbio: String

});

customerSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    } catch (err) {
      return next(err);
    }
  });

export const Customer = mongoose.model('Customer', customerSchema);