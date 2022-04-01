<template>
  <div class="filterBox">
    <select name="category" id="category" @change="onCategoryChange($event)">
        <option value="APT">아파트</option>
        <option value="NonApt">오피스텔/도시형/민간임대</option>
        <option value="Remain">APT 무순위/잔여세대</option>
    </select>
    <select name="area" id="area" @change="onAreaChange($event)">
        <option value="전체">전체</option>
        <option value="서울">서울</option>
        <option value="경기">경기</option>
        <option value="인천">인천</option>
        <option value="강원">강원</option>
        <option value="광주">광주</option>
        <option value="전남">전남</option>
        <option value="전북">전북</option>
        <option value="대전">대전</option>
        <option value="충남">충남</option>
        <option value="충북">충북</option>
        <option value="세종">세종</option>
        <option value="경남">경남</option>
        <option value="부산">부산</option>
        <option value="대구">대구</option>
        <option value="경북">경북</option>
        <option value="울산">울산</option>
        <option value="기타">기타</option>
        <option value="제주">제주</option>
    </select>  
  </div>
</template>

<script>
export default {
    name : 'filterBar',
    data: function () {

    },
    methods : {
      onCategoryChange(event){
        this.$store.dispatch('updateCategory', {
            category: event.target.value
        });
      },
      onAreaChange(event){
        // console.log(event.target.value);
        this.$store.dispatch('updateArea',{
          area : event.target.value
        });
        // console.log(this.$store.state.area);
      }
    }
}
</script>

<style>
select {
  width: 10em;
  height: 35px;
  background-size: 20px;
  padding: 5px 30px 5px 10px;
  border-radius: 4px;
  outline: 0 none;
  margin-left: 1em;
}
select option {
  background: black;
  color: #fff;
  padding: 3px 0;
}
.filterBox{
    padding: 0.5em;
}
</style>