import Vuex from 'vuex';
import axios from 'axios';
import {getDateString} from "@/components/EventCalendar";
const { rowMapper, getCurrentDate } = require('./utils/model/rowMapper');

const localStorage = window.localStorage;
let storedData = [];
let subscribe = '';

(function (){
    if(localStorage.getItem("Events")){
        storedData = JSON.parse(localStorage.getItem("Events"));    
        // console.log(storedData);
        
        storedData = storedData.filter((param)=>{
            // console.log(param);
            if(param.HOUSE_SECD === '01'){
                if(new Date(param.RCEPT_ENDDE) >= new Date(getCurrentDate())){
                    return param;
                }    
            }
            else{
                // console.log(param);
                if(new Date(param.SUBSCRPT_RCEPT_ENDDE) >= new Date(getCurrentDate())){
                    return param;
                }    
            }
            
        });
        // console.log(storedData);
        //데이터 로드시 이미 지난 이벤트는 제거한다.
    }
})();

let updateStorage = function(type,param){
    localStorage.setItem(type,JSON.stringify(param));
}

const getUser = async function(param){
    //loading bar
    let user = await axios.post(`${process.env.VUE_APP_URL}/api/user/getUserByMail`,{
        email : param.data
    });
    // debugger;
    console.log(user);
    // console.log(user.data);
    user = user.data.data;
    // console.log(user);
    
    if(user != undefined && Object.prototype.hasOwnProperty.call(user, 'email')){
        const res = user.id;
        // console.log(res);
        return res;        
    }else{
        user = await createUser(param);
        console.log("create user!");
        // console.log(user);
        if(user.data){
            user = await axios.post(`${process.env.VUE_APP_URL}/api/user/getUserByMail`,{
                email : param.data
            });
            console.log("load user again");
        }
    }
    return user;
}

const setHomeData = async function(userId,param){
    // console.log(userId);
    //1. getUserById로 찾아서 있는 건들 로딩
    const homeList = await axios.post(`${process.env.VUE_APP_URL}/api/schedule/getUserById`,{
        id : userId
    });
    const { res } = homeList.data.data;
    let applyList = [];
    applyList = rowMapper(param,userId);
    // console.log(applyList);   

    if(res.length === 0){
        //새로 추가한다.
        applyList = rowMapper(param,userId);
        // console.log(applyList);
        const response = await axios.post(`${process.env.VUE_APP_URL}/api/schedule/applyArr`,{
            arr : applyList
        });
        // console.log(response);
        const { data } = response;
        alert(data.message);
    }else{
        //기존의 건을 모두 삭제한 후 추가한다.
        // console.log("already saved one...");
        // console.log(userId);
        await axios.delete(`${process.env.VUE_APP_URL}/api/schedule/applyById`,
        { 
            data: { 
                id : userId 
            } 
        });

        applyList = rowMapper(param,userId);

        const response = await axios.post(`${process.env.VUE_APP_URL}/api/schedule/applyArr`,{
            arr : applyList
        });
        const { data } = response;
        alert(data.message);
    }
}

const createUser = async function(param){
    const user = await axios.post(`${process.env.VUE_APP_URL}/api/user/createUser`,{
        email : param.data
    });
    return user;
}

const store = new Vuex.Store({
    state : {
        count : 0,
        response : [],
        category : 'APT',
        favorite: storedData,
        subscribe: subscribe,
        loadingbar : false,
        isError : false,
        area : '전체',
        isAlarm : false
    },
    getters: {
        increaseCount(state) {
            return ++state.count;
        },
        getResponse(state){
            return state.response;
        },
        getCategory(state){
            return state.category;
        },
        getFavorite(state){
            return state.favorite;
        },
        getSubscribe(state){
            return state.subscribe;
        },
        getEmail(state){
            return state.email;
        },
        getLoadingbar(state){
            return state.loadingbar;
        },
        getError(state){
            return state.isError;
        },
        getArea(state){
            return state.area;
        },
        getAlarm(state){
            return state.isAlarm;
        }
    },
    mutations : {
        addcounter : function(state, payload){
            // console.log(state);
            return state.count += payload.amount;
        },
        updateState : function(state, payload){
            return state.response = payload.response;
        },
        initialState : function(state){
            return state.response = [];
        },
        updateArea : function(state, payload){
            return state.area = payload.area;
        },
        updateCategory : function(state,payload){
            // console.log(payload.category);
            // state.response = [];
            return state.category = payload.category;
        },
        updateFavorite : function(state, payload){
            // console.log(payload);
            const duplicated = state.favorite.some(param => param.HOUSE_MANAGE_NO === payload.data.HOUSE_MANAGE_NO);
            if(!duplicated){
                state.favorite.push(payload.data);
                updateStorage('Events',state.favorite);
                return state.favorite;
            }
        },
        removeFavorite : function(state, payload){
            // console.log(payload.data.HOUSE_MANAGE_NO);
            state.favorite = state.favorite.filter((param) =>  param.HOUSE_MANAGE_NO !== payload.data.HOUSE_MANAGE_NO);
            // console.log("favorite",state.favorite);
            updateStorage('Events',state.favorite);

            return state.favorite;
        },
        setSubscribe : function(state,payload){
            state.subscribe = payload.data;
            updateStorage('Email',state.subscribe);
            return state.subscribe;
        },
        checkUser: function(data){
            console.log(data);
        },
        setLoadingbar : function(state){
            if(state.loadingbar){
                state.loadingbar = false;
            }else{
                state.loadingbar = true;
            }
        },
        setIsError : function(state,payload){
            state.isError = payload.isError;
        }
    },
    actions : {
        async getData({commit}){
            // console.log(this.state.category);
            commit('setLoadingbar');            
            return axios.get(`${process.env.VUE_APP_URL}/api/home/getInfo?category=${this.state.category}`).then(res =>{
                const { data } = res.data;
                commit('setLoadingbar');
                // console.log(data);
                if(!Array.isArray(data)){
                    if(Object.prototype.hasOwnProperty.call(data.data, 'msg')){
                        console.error('error happend!');
                        alert(data.data.msg);
                        return;
                    }
                }
                data.map((param)=>{
                    param.RCEPT_BGNDE = getDateString(param.RCEPT_BGNDE)
                    param.RCEPT_ENDDE = getDateString(param.RCEPT_ENDDE)
                    param.SUBSCRPT_RCEPT_BGNDE = getDateString(param.SUBSCRPT_RCEPT_BGNDE)
                    param.SUBSCRPT_RCEPT_ENDDE = getDateString(param.SUBSCRPT_RCEPT_ENDDE)
                })
                commit({
                    type : 'updateState',
                    response : data
                });
            }).catch((err)=>{
                console.error('Front End Part' ,err);
            })
        },
        updateCategory({commit,dispatch},data){
            commit('initialState');
            commit('updateCategory',data);
            dispatch('getData');
        },
        updateFavorite({commit},data){
            commit('updateFavorite',data);
        },
        removeFavorite({commit},data){
            commit('removeFavorite',data);
        },
        toggleLoadingbar({commit}){
            commit('setLoadingbar')
        },
        updateArea({commit},data){
            commit('updateArea',data);
        },
        async setSubscribe({commit},data){
            // console.log(data);
            commit('setLoadingbar');            
            let userid = await getUser(data);
            // console.log(userid);

            if(typeof(userid) !== 'number'){
                userid = userid.data.data.id;    
            }
            if(userid!== undefined){
                const arr = [];
                this.state.favorite.forEach(element=>{
                    arr.push(element);
                });
                // console.log(arr);
    
                setHomeData(userid, arr);
            }      
            commit('setLoadingbar');            
            commit('setSubscribe',data);            
        },
        setIsError({commit},data){
            console.log(data);//error 건은 MQ로 보낸다.
            commit('setIsError',data);
        }
    }
});

export default store;