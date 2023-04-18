const express = require("express");
const cors = require("cors");
const axios = require("axios").default;

const proxy = express();
proxy.use(cors());
proxy.use(express.json());
proxy.use(express.urlencoded({extended : true}));


proxy.get("/" , (req , res)=>{
    res.send("The expressjs proxy with enabled cors is running!");
});

proxy.post("/hyperbeam" , async (req , res)=>{
    const headers = {
        "Authorization" : req.headers.authorization,
        "accept" : "application/json",
    }

    const body = req.body;

    const response = await axios.post("https://engine.hyperbeam.com/v0/vm" , JSON.stringify(body) , {headers});
    
    res.set(response.headers);
    res.send(response.data);
});


module.exports = proxy;