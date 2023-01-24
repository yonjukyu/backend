const mongoose = require('mongoose');

const interventionSchema = mongoose.Schema({

    motif: { type: String, required: true },
    lieu: {type : String, required: false},
    date: {type : Date, required: true},
    numAgent: {type: Number, required: true}

});

module.exports = mongoose.model('Intervention', interventionSchema);