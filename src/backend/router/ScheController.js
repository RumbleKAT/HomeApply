var express = require('express');
var router = express.Router();
const scheService = require('../../service/schedulerService');
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
    body('id').not().isEmpty().trim().escape(),
async function(req, res,next) {
    validParam(req,next);
    const { id } = req.body;
    const { rowCount, rows } =  await scheService.selectByUserId({"id" : id}); 
    res.json({"res" : rows, "rowCount" : rowCount });
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
});


router.post('/applyArr', async function(req, res) {
    const { arr } = req.body;

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
        console.log(element);
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
            res.json({"type" : "error", "message" : "save failed!..."});
        }
    }

    res.json({"type" : "success", "message" : "save success..."});
});


router.put('/apply', async function(req, res) {
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
});

router.delete('/apply', async function(req, res) {
    const { id } = req.body;
    const { rowCount, rows } =  await scheService.deleteApply({id:id});
    res.json({"res" : rows, "rowCount" : rowCount });
});

router.delete('/applyById', async function(req, res) {
    const { id } = req.body;
    console.log(id);
    const { rowCount, rows } =  await scheService.deleteApplyByUserId({id:id});
    res.json({"res" : rows, "rowCount" : rowCount });
});

module.exports = router;