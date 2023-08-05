const express = require('express');
const mongoose =require('mongoose');
const taskrouter = require("./router/routes");
const app=express();
const cors =require('cors')

app.use(cors())
app.use(express.json());

app.get("/",(req,res) => {
    res.json({message: "linked"});
});

mongoose.connect('mongodb+srv://admin:admin@cluster0.upq8nyc.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            app.listen(4000 , () => {
                console.log("dbconnected");
            })
        }).catch(error => console.log("error connecting"));


app.use("/api",taskrouter);
