const scheduleModel = require("../../models/schedule")
const express = require("express");
const router = express.Router();
const ScheduleService = require("../../service/schedule/Schedule");
const { ObjectID } = require("bson");

router.post('/schedule/insert', async (req, res, next) => {

    const eventName = req.body.eventName
    const description = req.body.description
    const organizer = req.body.organizer
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const time = req.body.time
    const meetURL = req.body.meetURL
    const shareURL = req.body.shareURL
    const participants = req.body.participants;

    const schedule = new scheduleModel({
        eventName: eventName,
        description: description,
        organizer: organizer,
        startDate: startDate,
        endDate: endDate,
        time: time,
        meetURL: meetURL,
        shareURL: shareURL,
        participants
    })

    console.log(schedule)
    try {
        const scheduleData = await schedule.save();

        ScheduleService.addEvents_to_user_collection(scheduleData._id, scheduleData.participants)


        res.send({
            status: true,
            message: "Event Scheduled Successfully!!"
        })


    } catch (error) {
        console.log(error)
    }
})



router.get('/schedule/read', async (req, res, next) => {
    scheduleModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }

        res.send(result)
    })
})


router.put('/schedule/update', async (req, res, next) => {
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
        scheduleModel.findById(id, (error, updated_schedule) => {
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
    const { participants } = await scheduleModel.findOne({ _id: ObjectID(id) });

    ScheduleService.deleteEvent_from_user_collection(id, participants)
    await scheduleModel.findByIdAndRemove(id).exec()


    res.send({
        status: true,
        message: "Event deleted Successfully!!"
    })



})


module.exports = router