<script>
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import eventModal from './EventModal.vue';

export default {
  components: {
    eventModal,
    FullCalendar
  },
  mounted(){
    console.log("mounted!");
    this.addNewEvent("SSS"); 
    this.increaseCnt();
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        headerToolbar : {
            start: "",
            center: "prev title next",
            end: "today"
        },
        locale: 'ko', // 한국어 설정
        dateClick : this.handleDateClick,
        events : [
            {
                title: 'my event',
                start: '2022-02-20',
                extendedProps: {
                    department: 'BioChemistry'
                },
                description: 'Lecture',
                color: '#ff9f89',
                custom : "!!"
             }
        ],
        eventClick : this.handleEventClick,
        eventDidMount: function(info) {
            console.log(info.event.extendedProps);
            console.log(info);
        }
      },
      selectedDate : null,
      isModalViewed: false,
      isCalendarViewed : true,
    }
  },
  methods : {
      handleDateClick : function(arg){
        console.log(arg.dateStr);
      },
      handleEventClick : function(arg){
        alert("clicked events");
        console.log(arg.event._def);
        this.selectedDate = arg.event._def.extendedProps;
        this.openModal();
      },
      addNewEvent : function(param){
        console.log("!!" + param);
      this.calendarOptions.events = [
        ...this.calendarOptions.events,
        { title: 'Another Event', 
          date: '2022-02-13',
          custom : "!!"
        }
      ];
    },
    openModal() {
      this.isModalViewed = true
      this.isCalendarViewed = false;
    },
    closeModal() {
      this.isModalViewed = false
      this.isCalendarViewed = true;
    },
      increaseCnt(){
        this.$store.commit({
          type : 'addcounter',
          amount : 10
        });
      }
  }
}
</script>

<template>
    <FullCalendar v-if="isCalendarViewed" :options="calendarOptions"/>
    <eventModal v-if="isModalViewed" @close-modal="closeModal" :selected="selectedDate"/>
</template>

<style >
.fc-toolbar-chunk {
  display: flex; 
  align-items: center;
}
</style>