const scheduleModel = require("../../models/schedule")
const express = require("express");
const router = express.Router();


router.post('/schedule/insert', async(req, res, next)=>{

    const eventName = req.body.eventName
    const description = req.body.description
    const organizer = req.body.organizer
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const time = req.body.time
    const meetURL = req.body.meetURL
    const shareURL = req.body.shareURL

    const schedule = new scheduleModel ({
        eventName : eventName,
        description : description,
        organizer : organizer,
        startDate : startDate,
        endDate : endDate,
        time : time,
        meetURL : meetURL,
        shareURL : shareURL
    })
    try {
        await schedule.save();
        res.send("data inserted")
    } catch (error) {
        console.log(error)
    }
})
router.get('/schedule/read', async(req, res, next)=>{
   scheduleModel.find({},(err,result) =>{
       if(err){
           res.send(err)
       }

       res.send(result)
   })
})
router.put('/schedule/update', async(req, res, next)=>{
    const id = req.body.id;
    const neweventName = req.body.neweventName
    const newdescription = req.body.newdescription
    const neworganizer = req.body.neworganizer
    const newstartDate = req.body.newstartDate
    const newendDate = req.body.newendDate
    const newtime = req.body.newtime
    const newmeetURL = req.body.newmeetURL
    const newshareURL = req.body.newshareURL

   
    try {
        scheduleModel.findById(id, (error, updated_schedule) =>{
            updated_schedule.eventName = neweventName
            updated_schedule.description = newdescription
            updated_schedule.organizer = neworganizer
            updated_schedule.startDate = newstartDate
            updated_schedule.endDate = newendDate
            updated_schedule.time = newtime
            updated_schedule.meetURL = newmeetURL
            updated_schedule.shareURL = newshareURL
            
        })
    } catch (error) {
        console.log(error)
    }
})

router.delete("/schedule/delete/:id", async (req, res) => {
    const id = req.params.id;
    res.send(id)

    await scheduleModel.findByIdAndRemove(id).exec()
    res.send("delete")
})


module.exports = router