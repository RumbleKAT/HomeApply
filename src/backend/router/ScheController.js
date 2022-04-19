var express = require('express');
var router = express.Router();
const scheService = require('../../service/schedulerService');
const { body,validationResult } = require('express-validator');

router.use((req, res, next)=>{
  next();
});

const validParam = (param,next) =>{
    const errors = validationResult(param);
    if (!errors.isEmpty()) {
        next(errors.array());
    }
}


router.post('/getUserById',
    body('id').not().isEmpty().trim().escape(),
async function(req, res,next) {
    validParam(req,next);
    const { id } = req.body;
    try{
        const { rowCount, rows } =  await scheService.selectByUserId({"id" : id}); 
        res.json({"res" : rows, "rowCount" : rowCount });
    }catch(err){
        next(err);
    }
});

router.post('/apply', async function(req, res) {
    const { 
        houseManageNo,
        pblancNo,
        houseDetailSecdNm,
        houseNm,
        bsnsMbyNm,
        rcritPblancDe,
        rceptBgnde,
        rceptEndde,
        przwnerPresnatnDe,
        home_info_id
    } = req.body;
    try{
        const { rowCount, rows } =  await scheService.createApply(
            {
                houseManageNo : houseManageNo,
                pblancNo : pblancNo,
                houseDetailSecdNm : houseDetailSecdNm,
                houseNm : houseNm,
                bsnsMbyNm : bsnsMbyNm,
                rcritPblancDe : rcritPblancDe,
                rceptBgnde : rceptBgnde,
                rceptEndde : rceptEndde,
                przwnerPresnatnDe : przwnerPresnatnDe,
                home_info_id : home_info_id
            }
        ); 
        res.json({"res" : rows, "rowCount" : rowCount });
    }catch(err){
        next(err);
    }
});


router.post('/applyArr', async function(req, res,next) {
    const { arr } = req.body;

    try{
        for (const element of arr){
            const { 
                houseManageNo,
                pblancNo,
                houseDetailSecdNm,
                houseNm,
                bsnsMbyNm,
                rcritPblancDe,
                rceptBgnde,
                rceptEndde,
                przwnerPresnatnDe,
                home_info_id
            } = element;
            // console.log(element);
            const { rowCount } =  await scheService.createApply(
                {
                    houseManageNo : houseManageNo,
                    pblancNo : pblancNo,
                    houseDetailSecdNm : houseDetailSecdNm,
                    houseNm : houseNm,
                    bsnsMbyNm : bsnsMbyNm,
                    rcritPblancDe : rcritPblancDe,
                    rceptBgnde : rceptBgnde,
                    rceptEndde : rceptEndde,
                    przwnerPresnatnDe : przwnerPresnatnDe,
                    home_info_id : home_info_id
                }
            );
    
            if(rowCount === 0){
                throw new Error({"message" : "save failed!..."});
            }
        }
        res.json({"type" : "success", "message" : "save success..."});
    }catch(err){
        next(err);
    }
});


router.put('/apply', async function(req, res, next) {
    const { 
        id,
        houseManageNo,
        pblancNo,
        houseDetailSecdNm,
        houseNm,
        bsnsMbyNm,
        rcritPblancDe,
        rceptBgnde,
        rceptEndde,
        przwnerPresnatnDe,
        home_info_id
    } = req.body;
    try{
        const { rowCount, rows } =  await scheService.createApply(
            {
                id : id,
                houseManageNo : houseManageNo,
                pblancNo : pblancNo,
                houseDetailSecdNm : houseDetailSecdNm,
                houseNm : houseNm,
                bsnsMbyNm : bsnsMbyNm,
                rcritPblancDe : rcritPblancDe,
                rceptBgnde : rceptBgnde,
                rceptEndde : rceptEndde,
                przwnerPresnatnDe : przwnerPresnatnDe,
                home_info_id : home_info_id
            }
        ); 
        res.json({"res" : rows, "rowCount" : rowCount });
    }catch(err){
        next(err);
    }
    
});

router.delete('/apply', async function(req, res, next) {
    const { id } = req.body;
    try{
        const { rowCount, rows } =  await scheService.deleteApply({id:id});
        res.json({"res" : rows, "rowCount" : rowCount });
    }catch(err){
        next(err);
    }
});

router.delete('/applyById', async function(req, res, next) {
    const { id } = req.body;
    // console.log(req.body);
    // console.log(id);
    try{
        const { rowCount, rows } =  await scheService.deleteApplyByUserId({id:id});
        res.json({"res" : rows, "rowCount" : rowCount });
    }catch(err){
        next(err);
    }
});

router.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(400).json({err : err});
});

module.exports = router;