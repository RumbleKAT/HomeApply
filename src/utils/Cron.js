var cron = require('node-cron');
const { getSchedules } = require('../service/schedulerService');
// const { sendMail } = require('./Email');
const { sendMQ } = require('./MessageQueue');

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
        // sendMessageQueue -> queue에서 메시지를 보낸다.
        sendMQ(element);
    }
});

// const currentDate = '2022-02-28';
// const param = {
//     date : currentDate
// };

//  getSchedules(param)
// .then(res=>{
//     const { rows } = res;
//     rows.forEach(element => {
//         sendMQ(element);
//     });
// });

