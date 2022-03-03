<template>
    <div class="modal">
    <div class="modal__background"></div>
    <div class="modal__content">
        
        <h1>{{selected.houseNm}}</h1>
        <table>
        <th colspan = "7" style="background-color: #42b983; color:#fff">기본정보</th>

        <tr class="item">
            <td>주택구분</td>
            <td>분양/임대</td>
            <td>건설업체</td>
            <td>청약접수시작일</td>
            <td>청약접수종료일</td>
            <td>당첨자발표일</td>
            <td>공급지역</td>
        </tr>
        <tr>
            <td>{{selected.houseDtlSecdNm}}</td>
            <td>{{selected.rentSecdNm}}</td>
            <td>{{selected.bsnsMbyNm}}</td>
            <td>{{selected.rceptBgnde}}</td>
            <td>{{selected.rceptEndde}}</td>
            <td>{{selected.przwnerPresnatnDe}}</td>
            <td>{{selected.sido}}</td>  
        </tr>
          </table>
        <div class="modal-footer">
          <button @click="addFavorite" style="background-color: #42b983; color:#fff">알람추가</button>
          <button @click.self="$emit('close-modal')">닫기</button>
        </div>
    </div>
    </div>
</template>

<script>
// import { dispatch } from 'vuex'

export default {
    name : 'eventModal',
    props:["selected"],
    data: function () {
      return {
        selectedItem: this.selected
      }
    },
    mounted(){
      // console.log(this.selectedItem);
    },
    computed: {
      favorites() { return this.$store.state.getFavorite }
    },
    methods:{
      addFavorite(){
          this.$store.dispatch('updateFavorite', {
            data: this.selectedItem
          });
          alert(this.selectedItem.houseNm + "가 알람 리스트에 저장되었습니다.");
          this.$emit('close-modal');
      }
    }
}
</script>

<style scoped>

.modal__background {
  width: 100%;
  height: 100%;
  position: absolute;
}

.modal__content {
  position: absolute;
  padding: 1em 2em;
  /* background: #42b983; */
  max-width: 600px;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 1px 1px 2rem rgba(0, 0, 0, 0.3);
}

button{
  padding: 0.5rem 1rem;
  margin-top : 2em;
  margin-right : 2em;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  text-decoration: none;
  
  border: none;
  border-radius: 4px;
  
  display: inline-block;
  width: auto;
  
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
  cursor: pointer;
  
  transition: 0.5s;
}

table{
    width: 100%;
    border: 2px solid #444444;
    /* border-collapse: collapse; */
}
 th {
    border-bottom: 1px solid #444444;
    font-weight : bold;
  }

  .item{
        border-bottom: 1px solid #444444;
    font-weight : bold;
  }
.modal-footer{
	text-align: center;
}
</style>