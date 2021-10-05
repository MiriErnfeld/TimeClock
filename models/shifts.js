
const mongoose = require('mongoose')
const ShiftSchema = new mongoose.Schema({
    enterTime: { type: String },
    leavingTime: { type: String },
    userId: { //every shift has  ref to a of user
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
})
module.exports = mongoose.model('Shifts', ShiftSchema)
