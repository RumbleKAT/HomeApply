<template>
 <h1>청약 알람 리스트</h1>
 <ul>
    <li v-for="favorite in favorites" :key="favorite.houseManageNo">
        <mailElement :favorite="favorite" />
    </li>
 </ul>
  <div class="container" style="background-color:white">
    <h2>알람 신청하기</h2>
    <input type="text" placeholder="Email address" name="mail" v-model="email" required>
  </div>
    <div class="container">
    <button @click="setSubscribe"> subscribe</button>
  </div>


</template>

<script>
import mailElement from './MailElement.vue';

export default {
    data : function(){
        return{
            email : ''
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
        this.$store.dispatch('getData');
    },
    methods:{
        setSubscribe(){
            this.$store.dispatch('setSubscribe',{
                data: this.email
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