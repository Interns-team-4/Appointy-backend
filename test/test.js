const moment = require("moment")

let data = "Thu Jun 28 2018 21:30:00 GMT+0530 (India Standard Time)"

console.log(moment(new Date(data), "YYYY-MM-DD HH:mm").format("MMMM Do YYYY_h:mm A"))

console.log(new Date(data))