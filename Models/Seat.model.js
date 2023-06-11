const mongoose = require("mongoose")

const seatSchema = mongoose.Schema({
    row: Number,
    seatPos: Number,
    empty: Boolean
})

const SeatModel = mongoose.model("seat", seatSchema)

module.exports = { SeatModel }