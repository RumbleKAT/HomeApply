import Vuex from 'vuex';
import axios from 'axios';

const store = new Vuex.Store({
    state : {
        count : 0,
        response : [],
        category : 'APT',
        favorite: []
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
                return state.favorite.push(payload.data);
            }
        },
        removeFavorite : function(state, payload){
            state.favorite = state.favorite.filter((param) =>  param.houseManageNo !== payload.data.houseManageNo);
            return state.favorite;
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
        }
    }
});

//localStorage부분 추가...

export default store;