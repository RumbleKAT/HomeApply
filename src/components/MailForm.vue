<template>
 <h1>청약 알람 리스트</h1>
 <!-- {{favorites}} -->
 <ul>
    <li v-for="favorite in favorites" :key="favorite.houseManageNo">
        <mailElement :favorite="favorite" />
    </li>
 </ul>



</template>

<script>
import mailElement from './MailElement.vue';

export default {
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
        // this.$store.dispatch('increamentAsync');
        this.$store.dispatch('getData');
    }
}
</script>

<style>
ul{
    list-style: none;
    text-align: center;
    padding-inline-start : 0px;
}
</style>