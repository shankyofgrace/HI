import { Customer } from "../models/customerSchema.js";
import { Establishment } from "../models/establishmentSchema.js";
import { Owner } from "../models/ownerSchema.js";
import { Post } from "../models/postSchema.js";
import { Comment } from "../models/commentSchema.js";

const controller = {
    getIndex: async function(req, res) {

       res.render('index', {
            layout: 'indexlayout',

       });
       res.status(200);
       return;
    },

    getLogin: async function(req, res) {

        res.render('login', {
             layout: 'loginlayout',
 
        });
        res.status(200);
        return;
    },

    getRegister: async function(req, res) {

        res.render('register', {
             layout: 'registerlayout',
 
        });
        res.status(200);
        return;
    },
}

export default controller;