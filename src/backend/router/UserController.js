var express = require('express');
var router = express.Router();
const userService = require('../../service/userService');

router.use(function(req, res, next) {
  next();
});

router.post('/getUserById', async function(req, res) {
    const { id } = req.body;
    const { rowCount, rows } =  await userService.selectById({"id" : id}); 
    res.json({"res" : rows, "rowCount" : rowCount });
});

// const testApp = {
//     mail : 'ssj318@naver.com'
// }
router.post('/getUserByMail', async function(req, res) {
    const { mail } = req.body;
    const { rowCount, rows } =  await userService.selectByMail({"mail" : mail}); 
    res.json({"res" : rows, "rowCount" : rowCount });
});

// const testApp2 = {
//     id : 2,
//     mail : 'ssj318@naver.com'
// }

router.put('/user', async function(req, res) {
    const { id, mail } = req.body;
    const { rowCount, rows } =  await userService.updateEmail({
        "id" : id,
        "mail" : mail
    }); 
    res.json({"res" : rows, "rowCount" : rowCount });
});

router.delete('/user', async function(req,res){
    const { id } = req.body;
    const { rowCount, rows } =  await userService.deleteEmail({
        "id" : id
    }); 
    res.json({"res" : rows, "rowCount" : rowCount });
});





module.exports = router;