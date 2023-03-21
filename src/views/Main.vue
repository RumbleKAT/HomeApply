<template>
<div class="wrapper">
  <LoadingBar :toggled="{ active: loadingbar}" />
  <Calendar/>
</div>
</template>

<script>
import LoadingBar from '@/components/Loadingbar.vue';
import Calendar from '../components/EventCalendar.vue';
const groupByKey = (list, key) => list.reduce((hash, obj) => ({...hash, [obj[key]]:( hash[obj[key]] || [] ).concat(obj)}), {})

export default {
    name : 'Main',
    components : {
        Calendar,
        LoadingBar
    },
    computed: {
      loadingbar() { return this.$store.state.loadingbar },
      response() { return this.$store.state.response }
    },
    mounted(){
      this.$store.dispatch('getData');
    },
    watch: {
      response(prev){
        const area = Object.entries(groupByKey(prev,'SUBSCRPT_AREA_CODE_NM')).map((param)=>{
          return `${param[0]}:${param[1].length}건`
        }).join(" ")

        this.meta = {
          title: `이번달 청약 정보`,
          meta: [
            {
              name: 'description',
              content: `이번달 청약 공고 건수: ${prev.length}`,
            },
            {
              property: 'og:title',
              content: `지역별 청약 건수`
            },
            {
              property: 'og:description',
              content: `${area}`
            }
          ]
        };
        console.log(this.meta);
      }
    },
  meta() {
    return {
      title: '청약 알리미',
      meta: [
        {
          name: 'description',
          content: '이번달의 청약 정보를 알려드립니다.',
        },
        {
          property: 'og:title',
          content: '청약 달력을 눌러 상세정보를 확인하세요',
        },
        {
          property: 'og:description',
          content: '청약 정보를 불러오는데 시간이 걸릴 수 있습니다.',
        },
      ],
    };
  }
}
</script>

<style>
</style>