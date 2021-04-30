const scheduleModel = require("../../models/schedule")
const express = require("express");
const router = express.Router();

router.post('/schedule', (req, res, next)=>{

})
router.get('/schedule', async(req, res, next)=>{
    const schedule = new scheduleModel ({
        eventName:"inaugural day",
        description:"function",
        organizer:"bruce",
        startDate:"21/12/2021",
        endDate:"21/12/2021",
        time:"10:00 am",
        meetURL:"http://",
        shareURL:"http://"
    })
    try {
        await schedule.save();
        res.send("data inserted")
    } catch (error) {
        console.log(error)
    }
})
router.delete('/schedule', (req, res, next)=>{
    
})
router.get('/schedule', (req, res, next)=>{
    
})

module.exports = router