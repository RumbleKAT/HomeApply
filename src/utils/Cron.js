var cron = require('node-cron');
const { getSchedules } = require('../service/schedulerService');
const { sendMail } = require('./Email');

const getCurrentDate = () => {
    const current = new Date();
    const year = current.getFullYear(); 
    const month = current.getMonth() + 1; 
    const date = current.getDate();
    return `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
}

cron.schedule('0 0 0 * * *', async () => {
    const currentDate = getCurrentDate();
    const param = {
        date : currentDate
    };

    const res = await getSchedules(param);
    const { rows } = res;

    for(const element of rows){
        sendMail(`<h1>${element.housenm}</h1>`,element.mail);
    }
});

