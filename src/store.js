import Vuex from 'vuex';
import axios from 'axios';

const localStorage = window.localStorage;
let storedData = [];
let subscribe = '';

(function (){
    if(localStorage.getItem("Events")){
        storedData = JSON.parse(localStorage.getItem("Events"));    
    }
    if(localStorage.getItem("Email")){
        subscribe = JSON.parse(localStorage.getItem("Email"));    
    }
})();

let updateStorage = function(type,param){
    localStorage.setItem(type,JSON.stringify(param));
}

const getUser = async function(param){
    let user = await axios.post(`${process.env.VUE_APP_URL}/user/getUserByMail`,{
        mail : param.data
    });
    console.log(user);
    if(user.data.res.length > 0){
        const res = user.data.res[0];
        return res;        
    }else{
        user = await createUser(param);
        console.log("create user!");
        if(user.data.rowCount === 1){
            user = await axios.post(`${process.env.VUE_APP_URL}/user/getUserByMail`,{
                mail : param.data
            });
            console.log("load user again");
        }
    }
    return user;
}

const rowMapper = (param,userId) =>{
    let applyList = [];
    param.map((p)=>{
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
            // home_info_id
        } = p[0];
        applyList.push({
            houseManageNo : houseManageNo,
            pblancNo : pblancNo,
            houseDetailSecdNm : houseDetailSecdNm,
            houseNm : houseNm,
            bsnsMbyNm : bsnsMbyNm,
            rcritPblancDe : rcritPblancDe,
            rceptBgnde : rceptBgnde,
            rceptEndde : rceptEndde,
            przwnerPresnatnDe : przwnerPresnatnDe,
            home_info_id : userId
        });
    });
    return applyList;
}

const setHomeData = async function(userId,param){
    // console.log(userId);
    //1. getUserById로 찾아서 있는 건들 로딩
    const homeList = await axios.post(`${process.env.VUE_APP_URL}/schedule/getUserById`,{
        id : userId
    });
    const { res } = homeList.data;

    // console.log(res);
    console.log(param);
    
    let applyList = [];

    if(res.length === 0){
        //새로 추가한다.
        applyList = rowMapper(param,userId);
        // console.log(applyList);
        const response = await axios.post(`${process.env.VUE_APP_URL}/schedule/applyArr`,{
            arr : applyList
        });
        // console.log(response);
        const { data } = response;
        alert(data.message);
    }else{
        //기존의 건을 모두 삭제한 후 추가한다.
        console.log("already saved one...");
        console.log(userId);
        const res = await axios.delete(`${process.env.VUE_APP_URL}/schedule/applyById`,
        { 
            data: { 
                id : userId 
            } 
        });

        console.log(res);

        applyList = rowMapper(param,userId);

        const response = await axios.post(`${process.env.VUE_APP_URL}/schedule/applyArr`,{
            arr : applyList
        });
        const { data } = response;
        alert(data.message);
    }
    // axios.post(`${process.env.VUE_APP_URL}/schedule/`)

}

const createUser = async function(param){
    const user = await axios.post(`${process.env.VUE_APP_URL}/user/createUser`,{
        mail : param.data
    });
    return user;
}

const store = new Vuex.Store({
    state : {
        count : 0,
        response : [],
        category : 'APT',
        favorite: storedData,
        subscribe: subscribe
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
        }
    },
    mutations : {
        addcounter : function(state, payload){
            // console.log(state);
            return state.count += payload.amount;
        },
        updateState : function(state, payload){
            // console.log(payload);
            return state.response = payload.response;
        },
        updateCategory : function(state,payload){
            return state.category = payload.category;
        },
        updateFavorite : function(state, payload){
            const duplicated = state.favorite.some(param => param.houseManageNo === payload.data.houseManageNo);
            if(!duplicated){
                state.favorite.push(payload.data);
                updateStorage('Events',state.favorite);
                return state.favorite;
            }
        },
        removeFavorite : function(state, payload){
            state.favorite = state.favorite.filter((param) =>  param.houseManageNo !== payload.data.houseManageNo);
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
        }
    },
    actions : {
        getData({commit}){
            console.log(this.state.category);
            return axios.get(`${process.env.VUE_APP_URL}/getInfo?category=${this.state.category}`).then(res =>{
                const { data } = res;
                commit({
                    type : 'updateState',
                    response : data
                });
            }).catch((err)=>{
                console.error('Front End Part' ,err);
            })
        },
        updateFavorite({commit},data){
            commit('updateFavorite',data);
        },
        removeFavorite({commit},data){
            commit('removeFavorite',data);
        },
        async setSubscribe({commit},data){
            console.log(data);
            const ans = await getUser(data);
            console.log(ans);    
            if(ans!== undefined){
                const arr = [];
                if(this.state.favorite.length === 1){
                    arr.push(this.state.favorite);
                }else if(this.state.favorite.length >= 1){
                    this.state.favorite.forEach(element => {
                        arr.push(element);
                    });
                }
                setHomeData(ans.id, arr);
            }      
            commit('setSubscribe',data);            
        }
    }
});

export default store;