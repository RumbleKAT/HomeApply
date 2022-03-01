const axios = require("axios");

const host="http://openapi.reb.or.kr/OpenAPI_ToolInstallPackage/service/rest/ApplyhomeInfoSvc";
const service = {
    "APT" : "getLttotPblancList",
    "NonAPT" : "getNotAPTLttotPblancList",
    "Remain" : "getRemndrLttotPblancList"
};

const service_detail = {
    "APT" : "getAPTLttotPblancDetail",
    "NonAPT" : "getUrbtyOfctlLttotPblancDetail",
    "Remain" : "getRemndrLttotPblancDetail",
    "APT_type" : "getAPTLttotPblancMdl",
    "NonAPT_type" : "getUrbtyOfctlLttotPblancMdl",
    "Remain_type" : "getRemndrLttotPblancMdl"
}

const serviceKey = "mwqmHdyqQo5ani9pF4%2FD%2FCGPVS%2BmVuf0xxR6rEeDJhDH39HGTKCTRe%2FWANeu4WQMPNEDyPSlYEYWPaCtvC9trA%3D%3D";

//그달에 존재하는 청약정보를 모두 가져온다.

exports.getAptInfo = async function(param,serviceType){
    //getLttotPblancList APT분양조회
    if(!param || !serviceType) return new Error("Validation Error...");
    let cnt = 0;
    let total = 0;
    let pageNum = 1;
    const AptList = [];    
    let serviceNM = null;
    switch (serviceType){
        case 'APT':
            serviceNM = service.APT;
            break;
        case 'NonAPT':  
            serviceNM = service.NonAPT;
            break;
        case 'Remain':
            serviceNM = service.Remain;
            break;
    };
    
    while(cnt <= total){
        const url = `${host}/${serviceNM}?startmonth=${param.startmonth}&endmonth=${param.endmonth}&serviceKey=${serviceKey}&pageNo=${pageNum}`;
        
        await axios.get(url).then(res=>{
            const data = res.data.response;
            if(data.header.resultCode != 00){
                return new Error(data.header.resultMsg);
            }
            cnt += data.body.numOfRows;
            total = data.body.totalCount;

            if(data.body.items.item.length > 0){
                AptList.push(...data.body.items.item);
            }
        },(err)=>{
            console.error(err);
            return new Error("Connection error" + err);
        });
        
        if(cnt >= total && total != 0) break;
        pageNum++; 
    }

    const rList = AptList.sort((a,b)=> a.pblancNo - b.pblancNo);
    // console.log(rList);
    return rList;
};

exports.getDetailInfo = async function(param, serviceType){
    if(!param.houseManageNo || !param.pblancNo || !serviceType) throw new Error("Validation Error...");

    let serviceNM = null;
    switch (serviceType){
        case 'APT':
            serviceNM = service_detail.APT;
            break;
        case 'NonAPT':  
            serviceNM = service_detail.NonAPT;
            break;
        case 'Remain':
            serviceNM = service_detail.Remain;
            break;
        case 'APT_type':
            serviceNM = service_detail.APT_type;
            break;
        case 'NonAPT_type':  
            serviceNM = service_detail.NonAPT_type;
            break;
        case 'Remain_type':
            serviceNM = service_detail.Remain_type;
            break;
    };

    if(!serviceNM) throw new Error("Not Found Service...");

    let detailInfo = null;
    const url = `${host}/${serviceNM}?houseManageNo=${param.houseManageNo}&pblancNo=${param.pblancNo}&serviceKey=${serviceKey}`;
    await axios.get(url).then(res=>{
        const data = res.data.response;

        if(data.body.totalCount > 0){
            detailInfo = data.body.items.item;
        }
    },(err)=>{
        console.error(err);
        return new Error("Connection error" + err);
    });
    return detailInfo;
}


// this.getAptInfo({startmonth : '202202', endmonth:'202202'}, 'Remain');
// this.getDetailInfo({houseManageNo: '2022910052', pblancNo: '2022910052'}, 'Remain');