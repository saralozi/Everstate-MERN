const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
})

const Team = mongoose.model("Team", teamSchema)
module.exports = Team