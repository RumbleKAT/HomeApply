import Vuex from 'vuex';

const store = new Vuex.Store({
    state : {
        count : 0
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
        }
    }
});

export default store;