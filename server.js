require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute= require('./Routes/authRoute');
const categoryRoute= require('./Routes/categoryRoutes');
app.use(express.json());
app.use(cors());

app.use('/api',userRoute);
app.use('/api',categoryRoute);

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MONGO DB connected")
})
.catch(()=>{
    console.log("DB connection Failed")
});

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
});
