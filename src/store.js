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
    let user = await axios.post('http://localhost:8081/user/getUserByMail',{
        mail : param.data
    });
    if(user.data.res.length > 0){
        const res = user.data.res[0];
        return res;        
    }else{
        user = await createUser(param);
        console.log("create user!");
        if(user.data.rowCount === 1){
            user = await axios.post('http://localhost:8081/user/getUserByMail',{
                mail : param.data
            });
            console.log("load user again");
        }
    }
    return user;
}

const createUser = async function(param){
    const user = await axios.post('http://localhost:8081/user/createUser',{
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
        //비동기적 변이
        increamentAsync({commit}){
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    commit({type : 'addcounter', amount:10})
                    resolve()
                },1000)
            })
        },
        getData({commit}){
            console.log(this.state.category);
            return axios.get(`http://localhost:8081/getInfo?category=${this.state.category}`).then(res =>{
                const { data } = res;
                commit({
                    type : 'updateState',
                    response : data
                });
            }).catch((err)=>{
                console.err('Front End Part' ,err);
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
            commit('setSubscribe',data);            
        }
    }
});

//localStorage부분 추가...

export default store;