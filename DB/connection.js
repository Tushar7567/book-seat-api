const mongoose = require("mongoose");

require("dotenv").config({path:"./.env"});

const Db = process.env.MONGO_DB_URI

mongoose.set('strictQuery', true);

mongoose.connect(Db).then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log("DB noooooooooo");
})