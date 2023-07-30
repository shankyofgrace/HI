import { Customer } from "../models/customerSchema.js";
import { Establishment } from "../models/establishmentSchema.js";
import { Owner } from "../models/ownerSchema.js";
import { Post } from "../models/postSchema.js";
import { Comment } from "../models/commentSchema.js";

let registerValues = null;
let activeUser = null;

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
             values: registerValues,
 
        });
        res.status(200);
        return;
    },

    registerUser: async function(req, res) {
        try {
            const userdata = req.body;
            delete userdata.submit;
            registerValues = userdata;
            console.log(userdata);
            
            const existingCustomer = await Customer.findOne({email: userdata.email});
            const existingOwner = await Owner.findOne({email: userdata.email});
            

            if (existingCustomer || existingOwner) {
                const queryParams = new URLSearchParams();
                queryParams.append('message', 'Email already exists!');
                const queryString = queryParams.toString();
                return res.redirect(`/register?${queryParams.toString()}`);
            }
            else {
                if(userdata.role === 'customer'){
                    // create new user
                    const newCustomer = new Customer({
                        name: userdata.name,
                        username: userdata.username,
                        email: userdata.email,
                        location: userdata.location,
                        date: userdata.date,
                        password: userdata.password,
                        });
                    console.log(newCustomer);
                    //save to db
                    newCustomer.save().then(function (err) {
                        if (err) {
                            console.log(err);
                            const queryParams = new URLSearchParams();
                            queryParams.append('message', 'Error creating user!');
                            return res.redirect(`/`);
                        }
                        registerValues = null;
                        res.redirect('/');
                    });
                }   
                else if(userdata.role ==='owner'){
                    // create new est profile
                    const newOwner = new Owner({
                        name: userdata.name,
                        username: userdata.username,
                        email: userdata.email,
                        password: userdata.password,
                        location: userdata.location,
                    });

                    //save to db
                    newOwner.save().then(function (err) {
                        if (err) {
                            const queryParams = new URLSearchParams();
                            queryParams.append('message', 'Error creating establishment!');
                            return res.redirect(`/`);
                        }
                        registerValues = null;
                        res.redirect('/');
                    });
                }
            }
            return;
        } catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    
    },

    loginUser: async function(req, res) {
        try {
            const userdata = req.body;
            delete userdata.submit;
            console.log(userdata);
            
            const existingCustomer = await Customer.findOne({email: userdata.email, password: userdata.password});
            const existingOwner = await Owner.findOne({email: userdata.email, password: userdata.password});
            
            if(existingCustomer) {
                activeUser = existingCustomer;
                return res.redirect(`/homepage`);
            }
            else if(existingOwner) {
                activeUser = existingOwner;
                return res.redirect(`/homepage`);
            }
            else {
                const queryParams = new URLSearchParams();
                queryParams.append('message', 'Invalid email or password');
                const queryString = queryParams.toString();
                return res.redirect(`/login?${queryParams.toString()}`);
            }
            
        } catch (err) {
            console.error(err);
            return res.sendStatus(500);
        }
    }, 
}



export default controller;