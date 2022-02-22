import Vuex from 'vuex';
import axios from 'axios';

const store = new Vuex.Store({
    state : {
        count : 0,
        response : false
    },
    getters: {
        increaseCount(state) {
            return ++state.count;
        }
    },
    mutations : {
        addcounter : function(state, payload){
            console.log(state);
            return state.count += payload.amount;
        },
        updateState : function(state, payload){
            console.log(payload);
            return state.response = payload.status;
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
            return axios.get('http://localhost:8081/').then(res =>{
                const { data } = res;
                commit({
                    type : 'updateState',
                    status : data.response
                });
            })
        }
    }
});

export default store;