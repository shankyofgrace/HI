import { Customer } from "../models/customerSchema.js";
import { Establishment } from "../models/establishmentSchema.js";
import { Owner } from "../models/ownerSchema.js";
import { Post } from "../models/postSchema.js";
import { Comment } from "../models/commentSchema.js";

let registerValues = null;
let activeUser = null;
let estData;


const controller = {
    getIndex: async function(req, res) {

       res.render('index', {
            layout: 'indexlayout',

       });
       res.status(200);
       return;
    },

    getHome: async function(req, res) {
        res.render('homepage', {
            layout: 'homepagelayout',
            isLoggedIn: activeUser !== null
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
                        res.redirect('/home');
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
                        res.redirect('/home');
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
                return res.redirect(`/home`);
            }
            else if(existingOwner) {
                activeUser = existingOwner;
                return res.redirect(`/home`);
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

    logoutUser: async function(req, res) {
        activeUser = null;
        res.redirect(`/`);
    },

    getEstAteRicas: async function(req, res) {
        const estData = await Establishment.findOne({name: "Ate Rica's Bacsilog"});
        //console.log(estData);
        let temp_estData = {
            name: "hi",
            description: null,
            owner: null,
            path: null,
            icon: null,
        };
        temp_estData.name = estData.name;
        temp_estData.description = estData.description;
        temp_estData.owner = estData.owner;
        temp_estData.path = estData.path;
        temp_estData.icon = estData.icon;

        const posts = await Post.find({ estname: "Ate Rica's Bacsilog" });
        let temp_cust;
        let temp_post = [];
        for (let i = 0; i < posts.length; i++) {
            temp_cust = await Customer.findOne({ _id: posts[i].cust});
            temp_post.push({
                _id: posts[i]._id.toString(),
                review: posts[i].review,
                estname: posts[i].estname,
                cust: posts[i].cust,
                cust_name: temp_cust.name,
                rating: posts[i].rating,
                attached: posts[i].attached,
                helpful_num: posts[i].helpful_num,
                nothelpful_num: posts[i].nothelpful_num,
            });
        }
        //console.log(temp_post);
        // estIndex = "Ate Rica's Bacsilog";
        // const estData = await dbconn.getDb().collection('Establishments').findOne({ _id: new ObjectId('64bc319514a9df3a7505c2c0') });
        // console.log(estData);
        // const averageRating = calculateAverageRating(loopPosts);
        res.render('establishment', { 
            layout: 'estlayout',
            estData: temp_estData,
            postData: temp_post,
            //loopPosts, averageRating 
        });
    },

    updateHelpful: async function(req, res){
        const postId = req.query.postId;
        const post = await Post.findOne({_id: postId});
        const updatePost = await Post.updateOne({_id: postId}, {$set: {helpful_num: post.helpful_num + 1 }});
        if(updatePost){
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    },

    updateNotHelpful: async function(req, res){
        const postId = req.query.postId;
        const post = await Post.findOne({_id: postId});
        const updatePost = await Post.updateOne({_id: postId}, {$set: {nothelpful_num: post.nothelpful_num + 1 }});
        if(updatePost){
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    },


}



export default controller;