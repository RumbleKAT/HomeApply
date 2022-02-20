<script>
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth',
        dateClick : this.handleDateClick,
        events : [
            {
                id: 'a',
                title: 'my event',
                start: '2022-02-20',
                extendedProps: {
                    department: 'BioChemistry'
                },
                description: 'Lecture'
            }
        ],
        eventClick : this.handleEventClick,
        eventColor: '#378006'
      }
    }
  },
  methods : {
      handleDateClick : function(arg){
        console.log(arg.dateStr);
      },
      handleEventClick : function(){
        alert("clicked events")
      }
  }
}
</script>

<template>
    <FullCalendar :options="calendarOptions"/>
</template>