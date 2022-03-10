<template>
 <h1>청약 알람 리스트</h1>
 <ul>
    <li v-for="favorite in favorites" :key="favorite.houseManageNo">
        <mailElement :favorite="favorite" />
    </li>
 </ul>
  <div class="container" style="background-color:white">
    <h2>알람 신청하기</h2>
    <input type="text" placeholder="Email address" name="mail" v-model="subscribe" required>
  </div>
    <div class="container">
    <button @click="setSubscribe"> subscribe</button>
  </div>


</template>

<script>
import mailElement from './MailElement.vue';

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export default {
    data : function(){
        return{
            email : '',
            subscribe : ''
        }
    },
    components: {
        mailElement
    },
    computed : {
        count(){
            return this.$store.state.count;
        },
        response(){
            return this.$store.state.response;
        },
        favorites(){
            return this.$store.state.favorite;
        }
    },
    mounted(){
      this.subscribe = this.$store.state.subscribe;
    },
    methods:{
        setSubscribe(){
            console.log();
            if(!validateEmail(this.subscribe)){
                alert(`유효하지 않은 메일 주소입니다.`);                
                return;
            }
            alert(`${this.subscribe}로 청약 알람 메일을 보내드립니다.`);
            this.$store.dispatch('setSubscribe',{
                data: this.subscribe
            });
        }
    }
}
</script>

<style>
ul{
    list-style: none;
    text-align: center;
    padding-inline-start : 0px;
}
.container {
  padding: 20px;
  background-color: #f1f1f1;
}

/* Style the input elements and the submit button */
input[type=text]{
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Style the submit button */
.container button {
  background-color: #04AA6D;
  color: white;
  border: none;
  padding: 1em 1.5em;
  font-size: 16px; 
  border-radius: 8px;
}

.container button:hover {
  opacity: 0.8;
}

</style>