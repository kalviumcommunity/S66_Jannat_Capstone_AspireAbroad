const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config({ path: './config/.env'})
const cors=require('cors')
const MongoURL=process.env.URL
const PORT=process.env.PORT
const Australia=require('./routes/AustraliaRoutes')
const Canada=require('./routes/CanadaRoutes')
const UK=require('./routes/UKRoutes')
const USA=require('./routes/USARoutes')
const auth=require('./routes/UserRoutes')
const app=express()
app.use(express.json())
app.use('/Australia', Australia)
app.use('/Canada',Canada)
app.use('/USA',USA)
app.use('/UK',UK)
app.use('/',auth)

app.listen(PORT,async()=>{
    try{
        await mongoose.connect(MongoURL)
        console.log("Connected to Database")
    }catch(error){
        console.log("Error is", error)
    }
    console.log(`listening on http://localhost:${PORT}`)
})