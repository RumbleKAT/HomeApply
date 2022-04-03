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
        } = p[0];
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
