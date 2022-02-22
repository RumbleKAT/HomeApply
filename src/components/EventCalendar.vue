<script>
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
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
                color: '#ff9f89'
             }
        ],
        eventClick : this.handleEventClick,
        eventDidMount: function(info) {
            console.log(info.event.extendedProps);
            console.log(info);
        }
      }
    }
  },
  
  methods : {
      handleDateClick : function(arg){
        console.log(arg.dateStr);
      },
      handleEventClick : function(){
        alert("clicked events")
      },
      addNewEvent : function(param){
        console.log("!!" + param);
      this.calendarOptions.events = [
        ...this.calendarOptions.events,
        { title: 'Another Event', date: '2022-02-13' }
      ];
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
    <FullCalendar :options="calendarOptions"/>
</template>

<style >
.fc-toolbar-chunk {
  display: flex; 
  align-items: center;
}
</style>