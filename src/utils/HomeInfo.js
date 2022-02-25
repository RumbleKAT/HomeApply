const axios = require("axios");

const host="http://openapi.reb.or.kr/OpenAPI_ToolInstallPackage/service/rest/ApplyhomeInfoSvc";
const service = {
    "APT" : "getLttotPblancList",
    "NonAPT" : "getNotAPTLttotPblancList",
    "Remain" : "getRemndrLttotPblancList"
};
const serviceKey = "mwqmHdyqQo5ani9pF4%2FD%2FCGPVS%2BmVuf0xxR6rEeDJhDH39HGTKCTRe%2FWANeu4WQMPNEDyPSlYEYWPaCtvC9trA%3D%3D";

//그달에 존재하는 청약정보를 모두 가져온다.

exports.getAptInfo = async function(param){
    //getLttotPblancList APT분양조회
    let cnt = 0;
    let total = 0;
    let pageNum = 1;
    const AptList = [];    
    while(cnt <= total){
        const url = `${host}/${service.APT}?startmonth=${param.startmonth}&endmonth=${param.endmonth}&serviceKey=${serviceKey}&pageNo=${pageNum}`;
        await axios.get(url).then(res=>{
            const data = res.data.response;
            cnt += data.body.numOfRows;
            total = data.body.totalCount;
            AptList.push(...data.body.items.item);
        });

        if(cnt == total && total != 0) break;
        pageNum++;
    }
    const rList = AptList.sort((a,b)=> a.pblancNo - b.pblancNo);
    // console.log(rList);
    return rList;
};

// this.getAptInfo({startmonth : '202202', endmonth:'202202'});

// exports.getNonAptInfo = function(){
//     //getLttotPblancList
    
// }

// exports.getRemAptInfo = function(){
//     //getLttotPblancList
    
// }
