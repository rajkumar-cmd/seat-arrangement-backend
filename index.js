const express= require("express")
const { connection } = require("./config/db")
const { SeatRouter } = require("./Routes/Seat.routes")

require("dotenv").config()
const app= express()
const cors= require("cors")

app.use(cors())
app.use(express.json())


app.use("/", SeatRouter)


app.listen(8080, async()=>{
    try{
        await connection
        console.log(`connected to 8080`);
    }catch(err){
        console.log(err);
    }
})