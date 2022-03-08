const express = require('express')
const cors = require('cors');
const { getAptInfo } = require('../utils/HomeInfo');

const app = express();
const port = 8081;

app.use(cors());

app.get('/',(req,res)=>{
    res.json({
        response: true
    })
})

app.get('/getInfo',async (req,res)=>{
    const currentDate = new Date();
    const start_month = `${currentDate.getFullYear()}${('01').slice(-2)}`;

    const month = `${currentDate.getFullYear()}${('0' + (currentDate.getMonth() + 1)).slice(-2)}`;
    const category = req.query.category;
    console.log(month);

    const aptList = await getAptInfo({
        startmonth : start_month,
        endmonth : month
    },category);

    console.log("returned data",aptList);

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