const moment = require("moment")

// let data = "Thu Jun 28 2018 21:30:00 GMT+0530 (India Standard Time)"

// console.log(moment(new Date(data), "YYYY-MM-DD HH:mm").format("MMMM Do YYYY_h:mm A"))

// console.log(new Date(data))

console.log(moment(new Date("2021-05-05 20:01"), 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'))
console.log(moment(new Date("2021-05-05 20:02"), 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'));

console.log(new Date(2021, 04, 05, 09, 25).toISOString());
console.log(new Date(2021, 04, 05, 10, 25).toISOString());


console.log(new Date("2021-05-05 20:01").toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
console.log(new Date("2021-05-05 20:02").toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

