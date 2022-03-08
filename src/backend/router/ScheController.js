var express = require('express');
var router = express.Router();
const scheService = require('../../service/schedulerService');

router.use(function(req, res, next) {
  next();
});

router.post('/getUserById', async function(req, res) {
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

module.exports = router;