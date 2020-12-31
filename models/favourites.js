const mongoose = require('mongoose');

const Dishes = require('./dishes');
const Users = require('./users');

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dishes=[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Dishes'
    }]
},{
    timestamps:true
});

module.exports = mongoose.model('fav',favouriteSchema);