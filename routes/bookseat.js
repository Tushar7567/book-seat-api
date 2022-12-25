const router = require("express").Router();
const {authenticate} = require("../middleware/verifyToken");
const bookSeat =  require("../model/bookseat");
const User = require("../model/userSchema");


router.get("/reserve",authenticate,async(req,res) => {
    try{
        const allseat = await bookSeat.find().sort({seat_id: 1});
        res.status(200).send(allseat);
    }catch(err){
        res.status(500).json("cannot get data");
    }
})


router.post("/reserve/:id",authenticate,async (req, res) => {
    try{
        console.log("auth--reserve/:id");
        
        // console.log(req.headers.cookie);
        // const token = req.headers.cookie;


        const checkStatus = await bookSeat.findOne({seat_id: req.body.data});
        console.log(checkStatus);

        
        const user_id = req.user_id;
        console.log(user_id);

        const user = await User.findById(user_id)
        console.log(user);

        let updateStatus;
        console.log("ok got her");
        console.log(req.body.data);

        if(user.isAdmin){
            if(checkStatus.status === 'booked'){
                console.log("inside .isAdmin");
                // const verifyStatus = await bookSeat.findOne({seat_id: req.body.data})
                updateStatus = await bookSeat.updateOne(
                    {
                    seat_id: req.body.data
                    },{
                        $set: {
                            status: "available",
                            username: ""
                        }
                    }
                )
                res.status(200).json("Seat released")

            }else{
                throw new Error("Seat is already available")
            }

            // throw new Error('unavailable')
        }else{
            console.log("inside customer");
                updateStatus = await bookSeat.updateOne(
                {
                seat_id: req.body.data
                },{
                    $set: {
                        status: "booked",
                        username: `${user.name}`
                    }
                }
            )
            res.status(200).json("Booking Confirmed")

        }
    
        console.log(updateStatus);
    }catch(err){
        res.status(500).json( `${err}`);
        // console.log(err,"cannot update");
    }
})

module.exports = router;