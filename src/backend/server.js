const express = require('express')
const cors = require('cors');
const { getAptInfo } = require('../utils/HomeInfo');
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
    const start_month = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}`; //1월 부터 조회
    const end_month = `${currentDate.getFullYear()}-${nextMonth}}`;

    // const nextMonth = 
    const category = req.query.category;
    // console.log(month);

    const aptList = await getAptInfo({
        startmonth : start_month,
        endmonth : end_month
    },category);

    // console.log("returned data",aptList);

    res.json({
        data : aptList
    });
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


app.listen(port,()=>{
    console.log(`server is listening at localhost:8081`);
})