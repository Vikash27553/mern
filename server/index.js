import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
// import route from "./Routes/userRoutes.js";
// import userRouter from "./Routes/userRoutes.js";
import route from "./Routes/userRoutes.js";


const app = express();
app.use(bodyParser.json());


dotenv.config();

// const router = express.Router();

// router.get("/",(req,res)=>{
//   res.status(200).json({message:"server working fine and proper  ok"})
// });

app.use(cors());
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

// app.use("/",(req,res) =>{
//   res.status(201).json({message:"yes hello this is the home rooute"})
// });
app.use("/api", route);

 mongoose.connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log("MongoDB connected successfully");
  })  .catch((error) => {
    console.error("MongoDB connection error:", error);

  });






  // app.listen(PORT, () => {
  //   console.log(`Server is running on port ${PORT}`);
  // }   );



  