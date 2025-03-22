const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config({ path: './config/.env'})
const cors=require('cors')
const MongoURL=process.env.URL
const PORT=process.env.PORT
const app=express()
app.listen(PORT,async()=>{
    try{
        await mongoose.connect(MongoURL)
        console.log("Connected to Database")
    }catch(error){
        console.log("Error is", error)
    }
    console.log(`listening on http://localhost:${PORT}`)
})