const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var Promotions = require('../models/promotions');

const promotionsRouter = express.Router();
promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')
.get((req,res,next)=>{
    Promotions.find({})
    .then((promos)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.post((req,res,next)=>{
    Promotions.create(req.body)
    .then((promo)=>{
        console.log("Created Promotion : " + promo);
        res.statusCode = 200;
        res.setHeader('Content-Type','application.json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.put((req,res,next)=>{
    res.statusCode = 403;
    res.end("Put Operation Not Supported On Promotions");
})

.delete((req,res,next)=>{
    Promotions.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

promotionsRouter.route('/:promoId')

.get((req,res,next)=>{
    Promotions.findById(req.params.promoId)
    .then((promo)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.post((req,res,next)=>{
    res.statusCode = 403;
    res.end("Post Operation Not Supported On /promotions/" + req.params.promoId);
})

.put((req,res,next)=>{
    Promotions.findByIdAndUpdate(req.params.promoId,{
        $set:req.body
    },{new:true})
    .then((promo)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json((promo));
    },(err)=>next(err))
    .catch((err)=>next(err));
   
})

.delete((req,res,next)=>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = promotionsRouter;
