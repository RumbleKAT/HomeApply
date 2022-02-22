const express = require('express')
const cors = require('cors');
const app = express();
const port = 8081;

app.use(cors());

app.get('/',(req,res)=>{
    res.json({
        response: true
    })
})

app.listen(port,()=>{
    console.log(`server is listening at localhost:8081`);
})