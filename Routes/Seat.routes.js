const express = require("express");
const { SeatModel } = require("../Models/Seat.model");
const SeatRouter = express.Router()

let SeatsByDefault=[],row=0;
for(let i=0;i<80;i++){
    let obj={
        row: Math.floor(i/7),
        seatPos: i,
        empty: false
    }
    SeatsByDefault.push(obj);
}

SeatRouter.get("/", async(req,res)=>{
    try {
        const seats = await SeatModel.find()
        res.status(200).send(seats)
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message)
    }
})

SeatRouter.post("/", async(req,res)=>{
    let num = +req.body.number
    try {
        let val,pos;
        const seats = await SeatModel.find()
        for(let i = 0; i < seats.length / num; i++){
            let value;
            for (let j = i; j < i + 1; i++) {
                for (let p = (j) * num; p < (j + 1) * num; p++) {
                    if (seats[p].availability === true) {
                        value=false
                    }
                }
                value=true
            }
            if (value) {
                val = i;
                break;
            }
            pos = val * num;
        }
        res.send({ "msg": "success", position: pos + 1 });

    } catch (err) {
        res.send(err.message)
    }
})

SeatRouter.post("/add", async(req,res)=>{
    console.log("add")
    try {
        const allSeat = await SeatModel.insertMany(SeatsByDefault)
        res.send(allSeat)
    } catch (err) {
        console.log(err)
        res.send(err.message)
    }
})


module.exports = { SeatRouter }