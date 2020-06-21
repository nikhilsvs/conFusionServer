const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

var Leaders = require('../models/leaders');


const leadersRouter = express.Router();
leadersRouter.use(bodyParser.json());

leadersRouter.route('/')
.get((req,res,next)=>{
    Leaders.find({})
        .then((leaders)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(leaders);
        },(err)=>next(err))
        .catch((err)=>next(err));
})

.post((req,res,next)=>{
    Leaders.create(req.body)
    .then((leader)=>{
        console.log("Created Leader : " + leader);
        res.statusCode = 200;
        res.setHeader('Content-Type','application.json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.put((req,res,next)=>{
    res.statusCode = 403;
    res.end("Put Operation Not Supported On Leaders");
})

.delete((req,res,next)=>{
    Leaders.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

leadersRouter.route('/:leaderId')

.get((req,res,next)=>{
    Leaders.findById(req.params.leaderId)
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.post((req,res,next)=>{
    res.statusCode = 403;
    res.end("Post Operation Not Supported On /leaders/" + req.params.leaderId);
})

.put((req,res,next)=>{
    Leaders.findByIdAndUpdate(req.params.leaderId,{
        $set:req.body
    },{new:true})
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json((leader));
    },(err)=>next(err))
    .catch((err)=>next(err));
})

.delete((req,res,next)=>{
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

module.exports = leadersRouter;