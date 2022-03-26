const axios = require("axios");

const host="https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1";
const service = {
    "APT" : "getAPTLttotPblancDetail",
    "NonAPT" : "getUrbtyOfctlLttotPblancDetail",
    "Remain" : "getRemndrLttotPblancDetail"
};

const service_detail = {
    "APT" : "getAPTLttotPblancMdl",
    "NonAPT" : "getUrbtyOfctlLttotPblancMdl",
    "Remain" : "getRemndrLttotPblancMdl"
}

let flag = {
    APT : false,
    NonAPT : false,
    Remain : false,
    lastDate : new Date().toLocaleDateString()
};

let cacheDetailMap = new Map();

function flagInitalize(){
    this.flag.APT = false;
    this.flag.NonAPT = false;
    this.flag.Remain = false;
    this.lastDate = new Date().toLocaleDateString();
}

let cacheList = {
    APT : [],
    NonAPT : [],
    Remain : []
};

const serviceKey = "TTIBBEMWax1hMUgx0UkadwKxI2QosEOeeNVRSIjo4dFkM6I977BAgIOT7PylzVFjWtM/7pvRRTTgTh3OLdoZPg==";

//그달에 존재하는 청약정보를 모두 가져온다.

exports.getAptInfo = async function(param,serviceType){
    //getLttotPblancList APT분양조회
    if(!param || !serviceType) return new Error("Validation Error...");
    if(flag.lastDate === new Date().toLocaleDateString()){
        if(serviceType === 'APT' && flag.APT){
            return cacheList.APT
        }else if(serviceType === 'NonAPT' && flag.NonAPT){
            return cacheList.NonAPT;
        }else if(serviceType === 'Remain' && flag.Remain){
            return cacheList.Remain;
        }
    }else{
        flagInitalize();
    }

    let pageNum = 1;
    let pageSize = 1;
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
    //해당월 시작일부터 다음월 시작일 이전까지 공고를 조회한다.  
    param.startmonth = `${param.startmonth}-01`;
    param.endmonth = `${param.endmonth}-01`;

    let url = `${host}/${serviceNM}?page=${pageNum}&perPage=${pageSize}&cond[RCRIT_PBLANC_DE::LT]=${param.endmonth}&cond[RCRIT_PBLANC_DE::GTE]=${param.startmonth}&&serviceKey=${serviceKey}`;
    // console.log(url);

    const matchCount = await axios.get(url)
        .then(res=>{
            const {matchCount } = res.data;
            // console.log(matchCount);
            return matchCount;
        }).catch(err=>{
            console.error(err);
            return {"msg" : err.toString()};
        });
    
    pageSize = matchCount;
    url = `${host}/${serviceNM}?page=${pageNum}&perPage=${pageSize}&cond[RCRIT_PBLANC_DE::LT]=${param.endmonth}&cond[RCRIT_PBLANC_DE::GTE]=${param.startmonth}&&serviceKey=${serviceKey}`;
    
    const resultArr = await axios.get(url)
    .then(res=>{
        const { data } = res.data;
        // console.log(currentCount);
        return data;
    }).catch(err=>{
        console.error(err);
        return {"msg" : err.toString()};
    });

    if(serviceType === 'APT'){
        flag.APT = true;
        cacheList.APT = resultArr;
    }else if(serviceType === 'NonAPT'){
        flag.NonAPT = true;
        cacheList.NonAPT = resultArr;
    }else if(serviceType === 'Remain'){
        flag.Remain = true;
        cacheList.Remain = resultArr;
    }

    if(resultArr.hasOwnProperty("msg")){
        return resultArr.msg;
    }
    return resultArr;
};

exports.getDetailInfo = async function(param, serviceType){
    if(!param.houseManageNo || !param.pblancNo || !serviceType) throw new Error("Validation Error...");

    if(cacheDetailMap.has(param.houseManageNo)){
        return cacheDetailMap.get(param.houseManageNo);
    }

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

    const url = `${host}/${serviceNM}?cond[HOUSE_MANAGE_NO::EQ]=${param.houseManageNo}&cond[PBLANC_NO::EQ]=${param.pblancNo}&serviceKey=${serviceKey}`;
    const detailInfo = await axios.get(url).then(res=>{
        const {data} = res.data;
        cacheDetailMap.set(param.houseManageNo,data);
        return data;
    },(err)=>{
        console.error(err);
        return {msg : err.toString()}
    });

    return detailInfo;
}

// this.getAptInfo({startmonth : '2022-03', endmonth:'2022-04'}, 'APT')
// .then((res)=>{
//     console.log(res);
// })
// this.getDetailInfo({houseManageNo: '2022910052', pblancNo: '2022910052'}, 'Remain')
// .then((res)=>console.log(res));

/*
https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancDetail?page=1&perPage=10&cond%5BRCRIT_PBLANC_DE%3A%3ALTE%5D=2022-03-31&cond%5BRCRIT_PBLANC_DE%3A%3AGT%5D=2022-03-01&serviceKey=TTIBBEMWax1hMUgx0UkadwKxI2QosEOeeNVRSIjo4dFkM6I977BAgIOT7PylzVFjWtM%2F7pvRRTTgTh3OLdoZPg%3D%3D
https://api.odcloud.kr/api/ApplyhomeInfoDetailSvc/v1/getAPTLttotPblancDetail?page=1&perPage=10&cond[RCRIT_PBLANC_DE::LTE]=2022-03-31&cond[RCRIT_PBLANC_DE::GT]=2022-03-01&serviceKey=TTIBBEMWax1hMUgx0UkadwKxI2QosEOeeNVRSIjo4dFkM6I977BAgIOT7PylzVFjWtM/7pvRRTTgTh3OLdoZPg==
공고일 기준으로 한달 잡아서 조회 -> 청약시작일에 따라 화면에 표시한다. (URL Decoding 방식으로 적용)

*/