<script>
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import eventModal from './EventModal.vue';
import { mapGetters } from 'vuex'
import {getColor,toStringByFormatting,toStringByFormattingTomorrow} from '../utils/Color';
import Filter from '@/components/Filter.vue';
import moment from 'moment'

export const getDateString = (param) =>{
  const datum = new Date(param);
  const year = datum.getFullYear();
  const month = datum.getMonth() + 1;
  const date = datum.getDate();
  return `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
}

export default {
  components: {
    Filter,
    eventModal,
    FullCalendar
  },
  mounted(){
    // console.log("mounted!");
    // this.$store.dispatch('getData')
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        headerToolbar : {
            start: "prev",
            center: "title",
            end: "next"
        },
        locale: 'ko', // 한국어 설정
        dateClick : this.handleDateClick,
        events : [],
        eventClick : this.handleEventClick,
        initialDate : this.today,
        customButtons: { 
        prev: { // this overrides the prev button
          text: "PREV", 
          click: () => {           
            let calendarApi = this.$refs.fullCalendar.getApi();
            calendarApi.prev();
            //전월 첫날 기준
            const s_date = moment(this.today).subtract(1,"M").format("YYYY-MM-DD");
            const e_date = this.today;
            // console.log(s_date + " " + e_date);
            // fetch api
            this.$store.dispatch('getPastData',{
              s_date, e_date
            });
            this.today = s_date;
          }
        },
        next: { // this overrides the next button
          text: "NEXT",
          click: () => {
             let calendarApi = this.$refs.fullCalendar.getApi();
             calendarApi.next();
             //차월 첫날 기준
            const e_date = moment(this.today).add(1,"M").format("YYYY-MM-DD");
            this.today = e_date;
          }
        }
      }
      },
      selectedDate : null,
      isModalViewed: false,
      isCalendarViewed : true,
      isPassedEvent : false,
      today: this.getInitalDate()                
    }
  },
  methods : {
      getInitalDate : function(){
        return toStringByFormatting(new Date())
      },
      handleDateClick : function(arg){
        console.log(arg.dateStr);
      },
      handleEventClick : function(arg){
        this.selectedDate = arg.event._def.extendedProps;
        this.isPassedEvent = arg.event._def.ui.backgroundColor === '#484848';
        // console.log(arg.event._def.ui.backgroundColor);
        this.openModal();
      },
      initializeEvent : function(){
        // console.log(this.calendarOptions.events);
        this.calendarOptions.events = [];
      },
      addNewEvent : function(param){
      this.calendarOptions.events = [
        ...this.calendarOptions.events,
        ...param
      ];
    },
    openModal() {
      this.isModalViewed = true
      this.isCalendarViewed = false;
    },
    closeModal() {
      // this.today = this.getInitalDate();                
      this.isModalViewed = false
      this.isCalendarViewed = true;
      console.log(this.today);
      this.calendarOptions.initialDate = this.today;
    },

    createEvents(data){
      this.initializeEvent();
      // console.log(data);
      const aList = [];
      if(data.length > 0){
        data.forEach(element => {
                const today = this.getInitalDate();                
                if(this.$store.state.category === 'APT'){
                  aList.push({
                    "title" : element.HOUSE_NM,
                    "start" : getDateString(element.RCEPT_BGNDE),
                    "end" : toStringByFormattingTomorrow(new Date(element.RCEPT_ENDDE)),
                    extendedProps: {
                      ...element
                    },
                    color: new Date(today) - new Date(element.RCEPT_ENDDE) <= 0 ? getColor(element.SUBSCRPT_AREA_CODE_NM) : '#484848'
                  })
                }else if(this.$store.state.category === 'NonApt'){
                  aList.push({
                    "title" : element.HOUSE_NM,
                    "start" : getDateString(element.SUBSCRPT_RCEPT_BGNDE),
                    "end" : getDateString(element.SUBSCRPT_RCEPT_ENDDE),
                    extendedProps: {
                      ...element
                    },
                    color: new Date(today) - new Date(element.SUBSCRPT_RCEPT_BGNDE) <= 0 ? getColor(element.SUBSCRPT_AREA_CODE_NM) : '#484848'
                  })
                }else{
                  aList.push({
                    "title" : element.HOUSE_NM,
                    "start" : getDateString(element.SUBSCRPT_RCEPT_BGNDE),
                    "end" : getDateString(element.SUBSCRPT_RCEPT_ENDDE),
                    extendedProps: {
                      ...element
                    },
                    color: new Date(today) - new Date(element.SUBSCRPT_RCEPT_BGNDE) <= 0 ? getColor(element.SUBSCRPT_AREA_CODE_NM) : '#484848'
                  })
                }
                
              });
        this.addNewEvent(aList);  
      }
    }
  },
  computed: mapGetters(
    {
      aptList : 'getResponse', // getCounter 는 Vuex 의 getters 에 선언된 속성 이름,
      areaList : 'getArea'
    }
  ),
  watch : {
    aptList(){
      this.createEvents(this.$store.state.response);
    },
    areaList(){
      const aptLists = this.$store.state.response.filter((param)=>param.SUBSCRPT_AREA_CODE_NM === this.$store.state.area);
      this.createEvents(aptLists);
    }
  }
}
</script>

<template>
  <div>
    <template v-if="!isModalViewed">
      <Filter/>
    </template>
    <div class="calendarWrapper">
      <FullCalendar ref="fullCalendar" v-if="isCalendarViewed" :options="calendarOptions"/>
    </div>
    <eventModal v-if="isModalViewed" @close-modal="closeModal" :selected="selectedDate" :passed="isPassedEvent" />
  </div>
</template>

<style >
.fc-toolbar-chunk {
  display: flex; 
  align-items: center;
}
.calendarWrapper{
  padding : 1em;
}
/*
  ##Device = 태블릿, 아이패드(세로),
*/
@media (min-width: 768px) and (max-width: 1024px) {
  .calendarWrapper > div{
    height : 60em;   
  }

}

@media (min-width: 320px) and (max-width: 480px) {
  .calendarWrapper > div{
    height : 45em;   
  }
}

</style>