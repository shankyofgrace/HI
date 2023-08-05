import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const establishmentSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    owner:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Owner',
        immutable: true
    },

    path: String,

    icon: String,
    
    link: String,

});

export const Establishment = mongoose.model('Establishment', establishmentSchema);