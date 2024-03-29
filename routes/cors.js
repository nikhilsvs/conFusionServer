var cors = require('cors');
const express = require('express');

const app = express();

const whitelist = ['http://localhost:3000','https://locahost:3443'];

var corsOptionsDelegate = (req,callback)=>{
    var corsOptions;

    if(whitelist.indexOf(req.header('Origin')) != -1){
        corsOptions = { origin:true };
    }
    else{
        corsOptions = {origin:false};
    }
    callback(null,corsOptions);

};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
