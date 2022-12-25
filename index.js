const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./DB/connection");

const bookaseat = require("./routes/bookseat")
const authCheck = require("./routes/auth");
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
// app.get('/', (req,res)=>{
//     res.send("connected");
// });

app.use("/",bookaseat)
app.use("/", authCheck)


// app.post("/reserve:id",(req,res))

app.listen(5000, () => {
    console.log("Server running on 5000");
});

