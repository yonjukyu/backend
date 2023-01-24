const mongoose = require('mongoose');

const agentSchema = mongoose.Schema({

    numAgent: { type: Number, required: true },
    password: {type : String, required: true},
    grade: {type : String, required: true},

});

module.exports = mongoose.model('Agent', agentSchema);