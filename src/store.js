import Vuex from 'vuex';
import axios from 'axios';

const store = new Vuex.Store({
    state : {
        count : 0,
        response : [],
        category : 'APT'
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
            })
        }
    }
});

export default store;