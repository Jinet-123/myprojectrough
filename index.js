
//7.import dotenv
require("dotenv").config()

//1.import express
const express = require("express")

//5.import cors
const cors = require("cors")

//8.import routes
const router = require("./router")

//11. import connection file
require("./db/connection")

//2.create server
const realestateserver = express()

//6.tell server to use cors
realestateserver.use(cors())

//10.parse request
realestateserver.use(express.json())

//9.use server to use router
realestateserver.use(router)

//to view/use images that are stored in the server
realestateserver.use("/Imguploads",express.static("./Imguploads"))

//3.create port
const PORT = 3000

//4.tell server to listen
realestateserver.listen(PORT,()=>{
    console.log(`bookstore server is started at port number : ${PORT},waiting forclient req`);
})

realestateserver.get("/",(req,res)=>{
    res.status(200).send(`book store server started and waiting for client requests`)
})