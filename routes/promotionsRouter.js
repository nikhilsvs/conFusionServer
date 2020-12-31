const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
var Promotions = require('../models/promotions');
const cors = require('./cors');
const promotionsRouter = express.Router();
promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next)=>{
    Promotions.find({})
    .then((promos)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.post(cors.corsWithOptions,authentucate.verifyUser,authenticate.verifyAdmin(req.user.admin),(req,res,next)=>{
    Promotions.create(req.body)
    .then((promo)=>{
        console.log("Created Promotion : " + promo);
        res.statusCode = 200;
        res.setHeader('Content-Type','application.json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.put(cors.corsWithOptions,authentucate.verifyUser,authenticate.verifyAdmin(req.user.admin),(req,res,next)=>{
    res.statusCode = 403;
    res.end("Put Operation Not Supported On Promotions");
})

.delete(cors.corsWithOptions,authentucate.verifyUser,authenticate.verifyAdmin(req.user.admin),(req,res,next)=>{
    Promotions.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

promotionsRouter.route('/:promoId')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus(200);})
.get(cors.cors,(req,res,next)=>{
    Promotions.findById(req.params.promoId)
    .then((promo)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.post(cors.corsWithOptions,authentucate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode = 403;
    res.end("Post Operation Not Supported On /promotions/" + req.params.promoId);
})

.put(cors.corsWithOptions,authentucate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
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

.delete(cors.corsWithOptions,authentucate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((promo)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = promotionsRouter;
