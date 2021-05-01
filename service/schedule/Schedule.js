
const errorCodes = require('../ErrorCodes/errorcodes');
const AppError = require("../AppError/AppError");
const AppClass = require('../app-class/app-class');
const User = require('../../models/User');
const { ObjectID } = require('bson');

class Schedule extends AppClass {


    async addEvents_to_user_collection(eventId, participants = []) {

        for (let i = 0; i < participants.length; i++) {
            await User.updateOne({ _id: ObjectID(participants[i]) }, { $push: { events: { eventDetails: ObjectID(eventId) } } })
        }

    }



    async deleteEvent_from_user_collection(eventId, participants = []) {


        for (let i = 0; i < participants.length; i++) {
            const response = await User.updateOne({ _id: ObjectID(participants[i]) }, { $pull: { events: { eventDetails: eventId } } }, { new: true })
        }

    }

}

module.exports = new Schedule();