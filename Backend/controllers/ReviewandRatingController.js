//Author: jainesh Ketan Desai 
//This controller contains api call to mongo for example get and post request to mongo.
const express = require("express");
const http = require("http");
require("../db/connect");
require("../models/Ratingandrev");
const bodyParser = require("body-parser");
const ratingandreview = require("../models/Ratingandrev");

const rating = new express.Router();

rating.use(bodyParser.json());

rating.post("/postratingandreview",(req,res)=>{
    console.log("SERVER!!!!!");
    const user =new ratingandreview(req.body)
    console.log("Inside request")
    user.save().then(()=>{
        console.log("this is cRud operation");
    }).catch((err)=>{
        console.log(err);
    })

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.setHeader("Access-Control-Max-Age", "3600");
    res.setHeader("Access-Control-Allow-Headers","Content-Type, Accept, X-Requested-With, Authorization");

    res.send("this is from student");
});

rating.get("/reviewandrating/:id",async (req,res)=>{
    console.log("hi");
    console.log("this is new now");
    try{
       const datafrommongo= await ratingandreview.find();
       //console.log(datafrommongo)
       let productid=req.params.id;
       console.log(productid);
       let reviewandprodct=[];
       for(let i=0;i<datafrommongo.length;i++)
       {
         if(productid === datafrommongo[i].productID){

            reviewandprodct.push(datafrommongo[i]);

         }
       }

       res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        res.setHeader("Access-Control-Max-Age", "3600");
        res.setHeader("Access-Control-Allow-Headers","Content-Type, Accept, X-Requested-With, Authorization");
        //console.log(reviewandprodct);
       res.send(reviewandprodct);

    }catch(e)
    {

        res.send(e);

    }
})


module.exports = rating;