const express = require('express')
const cors = require('cors');
const { getAptInfo, getDetailInfo, getRateInfo } = require('../utils/HomeInfo');
const scheController = require('./router/ScheController');
const userController = require('./router/UserController');

const app = express();
const port = 8081;

app.use(express.json());
app.use(cors());
app.use('/user', userController);
app.use('/schedule', scheController);

app.get('/',(req,res)=>{
    res.json({
        response: true
    })
})

//router

app.get('/getInfo',async (req,res)=>{
    const currentDate = new Date();
    let nextMonth = (new Date().getMonth()+1)%12 + 1;
    if(nextMonth < 10){
        nextMonth = `0${nextMonth}`
    }
    let lastMonth = (new Date().getMonth()+1)%12 - 1;
    if(lastMonth < 10){
        lastMonth = `0${lastMonth}`
    }
    let currentYear = currentDate.getFullYear();
    if(lastMonth == '12'){
        currentYear -= 1;
    }
       
    const start_month = `${currentYear}-${lastMonth}`; //1월 부터 조회
    const end_month = `${currentYear}-${nextMonth}}`;
    // const nextMonth = 
    const category = req.query.category;
    // console.log(month);

    const aptList = await getAptInfo({
        startmonth : start_month,
        endmonth : end_month
    },category);

    res.json(aptList);
})

app.get('/getInfoDetail',async(req,res)=>{
    const category = req.query.category;
    const houseManageNo = req.query.houseManageNo;
    const pblancNo = req.query.pblancNo; 

    const aptList = await getDetailInfo({
        houseManageNo : houseManageNo,
        pblancNo : pblancNo
    },category);

    res.json({
        data : aptList
    });    
});

app.get('/getRateInfo',async(req, res)=>{
    const houseManageNo = req.query.houseManageNo;
    const houseSeCd = req.query.houseSeCd;
        
    const rateList = await getRateInfo({houseManageNo: houseManageNo, houseSeCd : houseSeCd});
    
    res.json({
        data : rateList
    });
});

module.exports = app;