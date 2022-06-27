exports.rowMapper = function(param,userId){
    let applyList = [];
    param.map((p)=>{
        const { 
            HOUSE_MANAGE_NO,
            PBLANC_NO,
            HOUSE_DTL_SECD_NM,
            HOUSE_NM,
            CNSTRCT_ENTRPS_NM,
            RCEPT_BGNDE,
            RCEPT_ENDDE,
            PRZWNER_PRESNATN_DE,
            // home_info_id
        } = p;
        applyList.push({
            houseManageNo : HOUSE_MANAGE_NO,
            pblancNo : PBLANC_NO,
            houseDetailSecdNm : HOUSE_DTL_SECD_NM,
            houseNm : HOUSE_NM,
            bsnsMbyNm : CNSTRCT_ENTRPS_NM,
            rceptBgnde : RCEPT_BGNDE,
            rceptEndde : RCEPT_ENDDE,
            przwnerPresnatnDe : PRZWNER_PRESNATN_DE,
            home_info_id : userId
        });
    });
    return applyList;
}
exports.getCurrentDate = function(){
    const current = new Date();
    const year = current.getFullYear(); 
    const month = current.getMonth() + 1; 
    const date = current.getDate();
    return `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
}
