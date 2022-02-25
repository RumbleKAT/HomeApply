import Vuex from 'vuex';
import axios from 'axios';

const store = new Vuex.Store({
    state : {
        count : 0,
        response : []
    },
    getters: {
        increaseCount(state) {
            return ++state.count;
        },
        getResponse(state){
            return state.response;
        }
    },
    mutations : {
        addcounter : function(state, payload){
            console.log(state);
            return state.count += payload.amount;
        },
        updateState : function(state, payload){
            console.log(payload);
            return state.response = payload.response;
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
            return axios.get('http://localhost:8081/getInfo').then(res =>{
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