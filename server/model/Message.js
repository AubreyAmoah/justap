const mongoose = require('mongoose');

let today = new Date()
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const msgSchema = new mongoose.Schema({
    messages:{type: String},
    reciepient:{type: String},
    created:{type: String, default:time},
    owner:{type: mongoose.Schema.Types.ObjectId, ref: 'users'}
});

module.exports = mongoose.model('msg', msgSchema);