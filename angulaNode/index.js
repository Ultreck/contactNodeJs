const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const PORT =  process.env.PORT || 5000;
dotenv.config();
app.use(cors());
app.use(express.json());

const contactSchema = mongoose.Schema({
      firstname:{
            type: String,
            require: true
      },
      lastname:{
            type: String
      },
      contact:{
            type: String,
            require: true
      },
      osType:{
            type: String,
            require: true
      },
})

const ContactPost = mongoose.model("contact-list", contactSchema);

app.post("/register", (req, res) => {
      const {firstname, lastname, contact, osType} = req.body;
       console.log(firstname, lastname, contact, osType);
      ContactPost.create({firstname, lastname, contact, osType}).then((resp) =>{
            res.json({
                  status: 200,
                  success: true,
                  message: resp
            })
      }).catch((err) => {
            res.json({
                  status: 400,
                  success: false,
                  message: err
            })
      })
})
app.get("/data", (req, res) =>{
      ContactPost.find().then((resp) =>{
            console.log(resp);
            res.json(resp)
      }).catch((error) => {
            res.json({
                  status: 404,
                  success: false,
                  message: error
            })
      })
})


mongoose.connect(process.env.URI).then((res) => {
      if(res){
            console.log("Mongoose is successfully connected");
      } else{
            console.log("Mongoose connection failed");
      }
})
app.listen(PORT, () => {
      console.log(`app is listening at port https://localhost:${PORT}`);
})

