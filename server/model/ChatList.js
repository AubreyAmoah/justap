const mongoose = require('mongoose');

const chatListSchema = new mongoose.Schema({
    friend_list: [{type : String, default: ""}],
    owner:{type: mongoose.Schema.Types.ObjectId, ref: 'users'}
});

module.exports = mongoose.model('chatList', chatListSchema);