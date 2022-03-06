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

const serviceKey = "TTIBBEMWax1hMUgx0UkadwKxI2QosEOeeNVRSIjo4dFkM6I977BAgIOT7PylzVFjWtM%2F7pvRRTTgTh3OLdoZPg%3D%3D";

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
    
    let message = 'Not Found';
    let flag = false;

    while(cnt <= total){
        const url = `${host}/${serviceNM}?startmonth=${param.startmonth}&endmonth=${param.endmonth}&serviceKey=${serviceKey}&pageNo=${pageNum}`;
        console.log(pageNum);   
        if(flag){
            break;
        }

        await axios.get(url)
        .then(res=>{
            const data = res.data.response;
            // console.log(data);
            if(data.header.resultCode !== '00'){
                message = data.header.resultMsg;
                flag = true;
                throw new Error(data.header.resultMsg);
            }
            cnt += data.body.numOfRows;
            total = data.body.totalCount;
            
            if(total > 0){
                if(data.body.items.item.length > 0){
                    AptList.push(...data.body.items.item);
                }
            }
        })
        .catch((err)=>{
            console.error(err);
            flag = true;
            message = err;
        });    
        
        if(cnt >= total && total != 0) break;
        pageNum++; 
    }

    if(message !== 'Not Found'){ 
        return {"msg" : message.toString()};
    }else{
        if(AptList.length != 0){
            return AptList.sort((a,b)=> a.pblancNo - b.pblancNo);
        }
        return AptList;
    }
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

        if(data.header.resultCode !== '00'){
            message = data.header.resultMsg;
            flag = true;
            throw new Error(data.header.resultMsg);
        }        
        if(data.body.totalCount > 0){
            detailInfo = data.body.items.item;
            // console.log(detailInfo);
        }
        
    },(err)=>{
        console.error(err);
        return new Error("Connection error" + err);
    });

    return detailInfo;
}

// this.getAptInfo({startmonth : '202201', endmonth:'202203'}, 'Remain');
this.getDetailInfo({houseManageNo: '2022910052', pblancNo: '2022910052'}, 'Remain');
