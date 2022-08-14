<template>
  <div>
    <h1>금주의 청약발표</h1>
    <!-- <p>{{ this.itemList }}</p> -->
    <div class="div-scroll">
      <ul role="list" v-for="item in itemList" :key="item.MODEL_NO">
        <li>
          <h3>{{ item.HOUSE_NM }}</h3>
          <p>발표일 : {{ item.PRZWNER_PRESNATN_DE }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "weeklyInfo",
  data() {
    return {
      itemList: [],
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
      );
      console.log(this.itemList);
    },
  },
};
</script>

<style>
.div-scroll {
  width: 100%;
  height: 12em;
  margin-top: 1em;
  overflow: auto;
  border-bottom: 1px solid #444444;
}
</style>