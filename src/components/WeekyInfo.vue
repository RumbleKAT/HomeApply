<template>
  <div>
    <!-- <div class="div-scroll"> -->
      <ul class="list">
          <li class="row1-container" v-for="item in itemList" :key="item.MODEL_NO">
            <div class="box box-down cyan">
              <h2 @click="goHomePage(item.HMPG_ADRES)">{{ item.HOUSE_NM }}</h2>
              <p>{{item.HSSPLY_ADRES}}</p>
              <p style="font-size: small;">청약신청기간 : {{ item.RCEPT_BGNDE }} ~ {{item.RCEPT_ENDDE}}</p>
              <p style="font-weight: bold;">발표일 : {{ item.PRZWNER_PRESNATN_DE }}</p>
            </div>
          </li>
      </ul>
    <!-- </div>  -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "weeklyInfo",
  data() {
    return {
      itemList: [],
      msg : "홈페이지로 이동합니다."
    };
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
    }
  },
  computed: mapGetters({
    aptList: "getResponse",
  }),
  watch: {
    aptList() {
      const data = this.$store.state.response;
      const weekInfo = this.getFirstAndLastDayOfTheWeek();
      console.log(weekInfo);
      this.itemList = data.filter(
        (param) =>
          new Date(weekInfo.firstWeekDate) <=
            new Date(param.PRZWNER_PRESNATN_DE) &&
          new Date(param.PRZWNER_PRESNATN_DE) <= new Date(weekInfo.lastWeekDate)
      ).sort((a,b)=> new Date(b.PRZWNER_PRESNATN_DE) - new Date(a.PRZWNER_PRESNATN_DE));

      console.log(this.itemList);
    },
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

.list li{
  box-shadow : none;
}

.attribution { 
    font-size: 11px; text-align: center; 
}
.attribution a { 
    color: hsl(228, 45%, 44%); 
}

.box {
    border-radius: 5px;
    box-shadow: 0px 30px 40px -20px var(--grayishBlue);
    padding: 30px;
    margin: 20px;  
}

@media (max-width: 450px) {
    .box {
        height: 200px;
    }
}

@media (max-width: 950px) and (min-width: 450px) {
    .box {
        text-align: center;
        height: 180px;
    }
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


@media (min-width: 950px) {
    .row1-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .box-down {
        position: relative;
        /* top: 150px; */
    }
    .box {
        width: 30%;
     
    }
    .header p {
        width: 30%;
    }
    
}
</style>