<template>
<div>
    <h3>{{element.houseNm}}</h3>
    {{element}}
    <button @click="removeFavorite">제거</button>
</div>
</template>

<script>
export default {
    name : 'mailElement',
    props:["favorite"],
    data : function(){
        return{
            element : this.favorite
        }
    },
    methods:{
        removeFavorite(){
            this.$store.dispatch('removeFavorite', {
                data: this.element
            });
        }
    }
}
</script>

<style>

</style>