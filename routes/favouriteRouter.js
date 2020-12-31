const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
var Favourites = require('../models/favourites');

const favouriteRouter = express.Router();
favouriteRouter.use(bodyParser.json());

favouriteRouter.route('/')
.get(authenticate.verifyUser,(req,res,next)=>{
    Favourites.findById(req.user._id)
    .populate('user')
    .populate('dishes')
    .then((result)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(result);
    },(err)=>next(err))
    .catch((err)=>next(err))
})

.post(authenticate.verifyUser,(req,res,next)=>{
    Favourites.find({user:req.user._id})
    .then((doc)=>{
        if(doc==null){
            Favourites.create({user:req.user._id,dishes:req.body});
        }else{
            req.body.forEach(element=>{
                if(doc.dishes.id(element)==null){
                    doc.dishes.push(element);
                }
            });
        }

        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(doc);
    },(err)=>next(err))
    .catch(err=>next(err));
})

.delete(authenticate.verifyUser,(req,res,next)=>{
    Favourites.findOne({user:req.user._id})
    .then((doc)=>{
       doc.dishes.clear();
       res.statusCode=200;
       res.setHeader('Content-Type','application/json');
       res.json(doc);
    })
})
favouriteRouter.route('/:dishId')
.post(authenticate.verifyUser,(req,res,next)=>{
    Favourites.findOne({user:req.user._id})
    .then((doc)=>{
        var idx = doc.dishes.indexOf(req.params.dishId);
        if(idx == -1){
            doc.dishes.push(req.params.dishId);
            res.statusCode=200;
            res.setHeader('Content-Type','text/plain');
            res.end("SuccessFully Added");
        }else{
            res.statusCode=403;
            res.setHeader('Content-Type','text/plain');
            res.end("ALready Exits");
        }
    })
})

.delete(authenticate.verifyUser,(req,res,next)=>{
    Favourites.findOne({user:req.user._id})
    .then((doc)=>{
        var idx = doc.dishes.indexOf(req.params.dishId);
        if(idx != -1){
            doc.dishes.splice(idx,1);
            res.statusCode=200;
            res.setHeader('Content-Type','text/plain');
            res.end("SuccessFully Removed");
        }else{
            res.statusCode=403;
            res.setHeader('Content-Type','text/plain');
            res.end("No Dish found");
        }
    })
})


