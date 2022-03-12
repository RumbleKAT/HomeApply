var cron = require('node-cron');
const { getSchedules } = require('../service/schedulerService');
const { sendMail } = require('./Email');

// cron.schedule('*/2 * * * *', () => {
//     console.log('running a task every two minutes');
// });



getSchedules({date : '2022-02-28'}).then((res)=>{
    const { rows } = res;
    console.log(rows);

    for(const element of rows){
        sendMail(`<h1>${element.housenm}</h1>`,element.mail);
    }
})