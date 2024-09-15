import express, { urlencoded } from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import postRoute from"./routes/post.route.js";
import messageRoute from "./routes/message.route.js";

dotenv.config({})
const PORT=process.env.PORT || 3000;
//dakshdeepak90
/// juGlJr7fMzxrQk0G

const app= express();

app.get("/",(req,res)=>{
    return res.status(200).json({
        message: "i am coming from backend",
        success: true
    })
})

// middlewares 
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));

const corsOption={
    origin: process.env.URL,
    credentials : true
}

app.use(cors(corsOption));

// yaha par apni api ayengi
app.use("/api/v1/user",userRoute)
app.use("/api/v1/message",messageRoute)
app.use("/api/v1/post",postRoute)
app.listen(PORT,()=>{
    connectDB();
    console.log(`server is running on port ${PORT}`)
})