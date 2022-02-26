<script>
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import eventModal from './EventModal.vue';
import { mapGetters } from 'vuex'
import {getColor,toStringByFormatting} from '../utils/Color';

export default {
  components: {
    eventModal,
    FullCalendar
  },
  created(){
    if(!this.$store.aptList)
    this.$store.dispatch('getData')
  },
  mounted(){
    // console.log("mounted!");
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
        customButtons: { 
        prev: { // this overrides the prev button
          text: "PREV", 
          click: () => {           
            let calendarApi = this.$refs.fullCalendar.getApi();
            calendarApi.prev();
            //전월 첫날 기준
          }
        },
        next: { // this overrides the next button
          text: "PREV",
          click: () => {
             let calendarApi = this.$refs.fullCalendar.getApi();
             calendarApi.next();
             //차월 첫날 기준
          }
        }
      }
      },
      selectedDate : null,
      isModalViewed: false,
      isCalendarViewed : true
    }
  },
  methods : {
    getInitalDate : function(){
      console.log(toStringByFormatting(new Date()));
       return toStringByFormatting(new Date())
    },
      handleDateClick : function(arg){
        console.log(arg.dateStr);
      },
      handleEventClick : function(arg){
        this.selectedDate = arg.event._def.extendedProps;
        this.openModal();
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
      this.isModalViewed = false
      this.isCalendarViewed = true;
    }
  },
  computed: mapGetters({
    aptList : 'getResponse' // getCounter 는 Vuex 의 getters 에 선언된 속성 이름
  }),
  watch : {
    aptList(){
      const { data } = this.aptList;
      const aList = [];
      data.forEach(element => {
        aList.push({
          "title" : element.houseNm,
          "start" : element.rceptBgnde,
          "end" : element.rceptEndde,
          extendedProps: {
            ...element
          },
          color: getColor(element.sido)
        })
      });
      this.addNewEvent(aList);
    }
  }
}
</script>

<template>
    <div class="calendarWrapper">
      <FullCalendar ref="fullCalendar" v-if="isCalendarViewed" :options="calendarOptions"/>
    </div>
    <eventModal v-if="isModalViewed" @close-modal="closeModal" :selected="selectedDate"/>
</template>

<style >
.fc-toolbar-chunk {
  display: flex; 
  align-items: center;
}
.calendarWrapper{
  padding : 1em;
}
</style>