<template>
    <LoadingBar :toggled="{ active: loadingbar}" />
    <template v-if="isShowable">
      <p>
        금주의 청약 발표 조회 가능한 데이터가 없습니다. <br/>
        (청약 달력에서 카테고리 변경 후 다시 조회해주세요)
      </p>
    </template>
    <WeeklyInfo/>
</template>
<script>
import LoadingBar from '@/components/Loadingbar.vue';
import WeeklyInfo from '../components/WeekyInfo.vue';
import {mapGetters} from "vuex";

export default {
    name: 'Today',
    components : {
        WeeklyInfo,
        LoadingBar
    },
    data() {
        return {}
    },
    computed: {
      loadingbar() { return this.$store.state.loadingbar },
      ...mapGetters(['getResponse','getCategory']),
      isShowable(){
        return this.getResponse.length === 0
      }
    },
    mounted(){
      //get the nonApt remain Apt infos
      if(this.$store.getters.getResponse.length === 0) this.$store.dispatch('getData');
    }
}
</script>
<style lang="">
    
</style>