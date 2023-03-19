<template>
    <LoadingBar :toggled="{ active: loadingbar}" />
    <template v-if="isShowable">
      <p>
        금주의 청약 발표 일정은 현재 아파트 청약만 조회 가능합니다 . <br/>
        (청약 달력에서 아파트로 변경 후 다시 조회해주세요)
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
        return this.getCategory !== 'APT'
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