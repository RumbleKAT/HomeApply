const express = require('express')
const cors = require('cors');
const axios = require('axios');
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
    const month = `${currentDate.getFullYear()}${('0' + (currentDate.getMonth() + 1)).slice(-2)}`;
    const category = req.query.category;
    console.log(month);

    const aptList = await getAptInfo({
        startmonth : month,
        endmonth : month
    },category);
    res.json({
        data : aptList
    });
})


app.listen(port,()=>{
    console.log(`server is listening at localhost:8081`);
})