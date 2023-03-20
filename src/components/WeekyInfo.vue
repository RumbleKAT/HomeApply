<template>
  <div>
    <!-- <div class="div-scroll"> -->
      <ul class="list">
          <li class="row1-container" v-for="item in itemList" :key="item.MODEL_NO">
            <div :class="item.itemStyle">
              <h3 @click="goHomePage(item.HMPG_ADRES)">{{ item.HOUSE_NM }}</h3>
              <p>{{item.HSSPLY_ADRES}}</p>
              <p style="font-size: small;">
                <template v-if="item.HOUSE_SECD === '01'">
                  청약신청기간 : {{ item.RCEPT_BGNDE }} ~ {{item.RCEPT_ENDDE}}
                </template>
                <template v-else>
                  청약신청기간 : {{ item.SUBSCRPT_RCEPT_BGNDE }} ~ {{item.SUBSCRPT_RCEPT_ENDDE}}
                </template>
              </p>
              <p style="font-weight: bold;">발표일 : {{ item.PRZWNER_PRESNATN_DE }}</p>
            </div>
          </li>
      </ul>
    <!-- </div>  -->
  </div>
</template>

<script>
export default {
  name: "weeklyInfo",
  data() {
    return {
      itemList: [],
      msg : "홈페이지로 이동합니다.",
    };
  },
  mounted(){
    this.renderList();
  },
  methods: {
    getFirstAndLastDayOfTheWeek() {
      // The starting time is the same current
      let a = new Date();
      let b = new Date();
      const weekDay = a.getDay();

      if (weekDay === 0) {
        a.setDate(a.getDate() - 6);
      } else if (weekDay === 1) {
        b.setDate(b.getDate() + 7 - b.getDay());
      } else if (weekDay >= 1) {
        a.setDate(a.getDate() - a.getDay() + 1);
        b.setDate(b.getDate() + 7 - b.getDay());
      }

      return { firstWeekDate: a, lastWeekDate: b };
    },
    goHomePage(param){
      console.log(param);
      window.open(param, '_blank').focus();
    },
    alertPage(param){
      console.log(`${param} 사이트로 이동합니다.`);
    },
    renderList(){
      const data = this.$store.getters.getResponse;
      const weekInfo = this.getFirstAndLastDayOfTheWeek();
      // console.log(weekInfo);
      this.itemList = data.filter(
          (param) =>
              new Date(weekInfo.firstWeekDate) <=
              new Date(param.PRZWNER_PRESNATN_DE) &&
              new Date(param.PRZWNER_PRESNATN_DE) <= new Date(weekInfo.lastWeekDate)
      ).sort((a,b)=> new Date(b.PRZWNER_PRESNATN_DE) - new Date(a.PRZWNER_PRESNATN_DE));
      this.itemList.map(item=>{
        item.itemStyle = this.getRandomColor();
      });
    },
    getRandomColor(){
      const colorIndex = Math.floor(Math.random()*4);
      return 'box box-down ' + ['cyan','red','blue','orange'].at(colorIndex);
    }
  }
};
</script>

<style>
:root {
    --red: hsl(0, 78%, 62%);
    --cyan: hsl(180, 62%, 55%);
    --orange: hsl(34, 97%, 64%);
    --blue: hsl(212, 86%, 64%);
    --varyDarkBlue: hsl(234, 12%, 34%);
    --grayishBlue: hsl(229, 6%, 66%);
    --veryLightGray: hsl(0, 0%, 98%);
    --weight1: 200;
    --weight2: 400;
    --weight3: 600;
}
.list{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin-left: -10px; /* Adjust this value to half of the desired gap between list items */
  margin-right: -10px; /* Adjust this value to half of the desired gap between list items */
}

.list li{
  flex: 0 0 calc(33.333% - 20px); /* Adjust this value to control the list item width and gap between list items */
  box-sizing: border-box;
  margin: 10px; /* Adjust this value to half of the desired gap between list items */
  overflow: hidden;
}

@media (max-width: 767px) {
  .list li {
    flex: 0 0 calc(50% - 20px); /* Adjust this value to control the list item width and gap between list items on smaller screens */
  }
}

@media (max-width: 420px) {
  .list li {
    flex: 0 0 calc(80% - 20px); /* Adjust this value to control the list item width and gap between list items on smaller screens */
  }
}


.attribution a { 
    color: hsl(228, 45%, 44%); 
}

.box {
    border-radius: 5px;
    box-shadow: 0px 30px 40px -20px var(--grayishBlue);
    padding: 3em;
    margin: 20px;  
}

.cyan {
    border-top: 3px solid var(--cyan);
}
.red {
    border-top: 3px solid var(--red);
}
.blue {
    border-top: 3px solid var(--blue);
}
.orange {
    border-top: 3px solid var(--orange);
}

h2 {
    color: var(--varyDarkBlue);
    font-weight: var(--weight3);
}


</style>