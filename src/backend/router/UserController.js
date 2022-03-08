var express = require('express');
var router = express.Router();
const userService = require('../../service/userService');
const { body,validationResult } = require('express-validator');

router.use(function(req, res, next) {
  next();
});

const validParam = (param,next) =>{
    const errors = validationResult(param);
    if (!errors.isEmpty()) {
        next(errors.array());
    }
}

router.post('/getUserById', 
    body('id').not().isEmpty().trim().escape()
,async function(req, res, next) {
    validParam(req,next);
    const { id } = req.body;
    const { rowCount, rows } =  await userService.selectById({"id" : id}); 
    res.json({"res" : rows, "rowCount" : rowCount });
});

// const testApp = {
//     mail : 'ssj318@naver.com'
// }
router.post('/getUserByMail', 
    body('mail').isEmail().normalizeEmail(),
async function(req, res, next) {
    validParam(req, next);
    const { mail } = req.body;
    const { rowCount, rows } =  await userService.selectByMail({"mail" : mail}); 
    res.json({"res" : rows, "rowCount" : rowCount });
});

// const testApp2 = {
//     id : 2,
//     mail : 'ssj318@naver.com'
// }

router.put('/user', 
    body('id').not().isEmpty().trim().escape(),
    body('mail').isEmail().normalizeEmail(),
async function(req, res) {
    validParam(req,next);
    const { id, mail } = req.body;
    const { rowCount, rows } =  await userService.updateEmail({
        "id" : id,
        "mail" : mail
    }); 
    res.json({"res" : rows, "rowCount" : rowCount });
});

router.delete('/user',
    body('id').not().isEmpty().trim().escape(),
async function(req,res){
    validParam(req,next);
    const { id } = req.body;
    const { rowCount, rows } =  await userService.deleteEmail({
        "id" : id
    }); 
    res.json({"res" : rows, "rowCount" : rowCount });
});

router.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(400).json({err : err});
});




module.exports = router;