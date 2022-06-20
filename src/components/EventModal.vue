<template>
    <div class="modal">
    <div class="modal__background"></div>
    <div class="modal__content">
        <h1>{{selected.HOUSE_NM}}</h1>
        <table style="margin-bottom: 1em">
        <th colspan = "7" style="background-color: #42b983; color:#fff">기본정보</th>
        <template v-if="selected.HOUSE_SECD === '01'">
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
            <td>{{selected.HOUSE_DTL_SECD_NM}}</td>
            <td>{{selected.RENT_SECD_NM}}</td>
            <td>{{selected.CNSTRCT_ENTRPS_NM}}</td>
            <td>{{selected.RCEPT_BGNDE}}</td>
            <td>{{selected.RCEPT_ENDDE}}</td>
            <td>{{selected.PRZWNER_PRESNATN_DE}}</td>
            <td>{{selected.SUBSCRPT_AREA_CODE_NM}}</td>  
        </tr>
        </template>
        <template v-if="selected.HOUSE_SECD === '02' || selected.HOUSE_SECD === '03'">
        <tr class="item">
            <td>주택구분</td>
            <td>우편번호</td>
            <td>공급규모</td>
            <td>청약접수시작일</td>
            <td>청약접수종료일</td>
            <td>당첨자발표일</td>
            <td>홈페이지 주소</td>
        </tr>
        <tr>
            <td>{{selected.HOUSE_DTL_SECD_NM}}</td>
            <td>{{selected.HSSPLY_ZIP}}</td>
            <td>{{selected.HSSPLY_ADRES}}</td>
            <td>{{selected.SUBSCRPT_RCEPT_BGNDE}}</td>
            <td>{{selected.SUBSCRPT_RCEPT_ENDDE}}</td>
            <td>{{selected.PRZWNER_PRESNATN_DE}}</td>
            <td>{{selected.HMPG_ADRES}}</td>  
        </tr>
        </template>
        <template v-if="selected.HOUSE_SECD === '04' || selected.HOUSE_SECD === '05' || selected.HOUSE_SECD === '06'">
        <tr class="item">
            <td>주택구분</td>
            <td>홈페이지</td>
            <td>건설업체</td>
            <td>청약접수시작일</td>
            <td>청약접수종료일</td>
            <td>당첨자발표일</td>
            <td>공급지역</td>
        </tr>
        <tr>
            <td>{{selected.HOUSE_SECD_NM}}</td>
            <td>{{selected.HMPG_ADRES}}</td>
            <td>{{selected.BSNS_MBY_NM}}</td>
            <td>{{selected.SUBSCRPT_RCEPT_BGNDE}}</td>
            <td>{{selected.SUBSCRPT_RCEPT_BGNDE}}</td>
            <td>{{selected.PRZWNER_PRESNATN_DE}}</td>
            <td>{{selected.HSSPLY_ADRES}}</td>  
        </tr>
        </template>
          </table>
        <div class="modal-scroll">
        <table>
          <th colspan = "13" style="background-color: #42b983; color:#fff">세부정보</th>
          <template v-if="selected.HOUSE_SECD === '01'">
          <tr class="item" style="background-color: #efefef;">
            <td colspan="4">분양정보</td>
            <td>일반공급</td>
            <td colspan="8">특별공급</td>
          </tr>
          <tr class="item">
            <td>모델번호</td>
            <td>주택형</td>
            <td>주택공급면적</td>
            <td>공급금액(분양최고금액) (단위:만원)	</td>
            <td>공급세대수</td>
            <td>공급세대수</td>
            <td>다자녀가구</td>
            <td>신혼부부</td>
            <td>생애최초</td>
            <td>노부모부양</td>
            <td>기관추천</td>
            <td>기타</td>
            <td>이전기관</td>          </tr>
          <tr v-for="item in selectedItemDetail" :key="item.MODEL_NO">
            <td> {{ item.MODEL_NO }} </td>
            <td> {{ item.HOUSE_TY }} </td>
            <td> {{ item.SUPLY_AR }} </td>
            <td> {{ item.LTTOT_TOP_AMOUNT }} </td>
            <td> {{ item.SUPLY_HSHLDCO }} </td>
            <td> {{ item.SPSPLY_HSHLDCO }} </td>
            <td> {{ item.MNYCH_HSHLDCO }} </td>
            <td> {{ item.NWWDS_HSHLDCO }} </td>
            <td> {{ item.LFE_FRST_HSHLDCO }} </td>
            <td> {{ item.OLD_PARNTS_SUPORT_HSHLDCO }} </td>
            <td> {{ item.INSTT_RECOMEND_HSHLDCO }} </td>
            <td> {{ item.ETC_HSHLDCO }} </td>
            <td> {{ item.TRANSR_INSTT_ENFSN_HSHLDCO }} </td>
          </tr>
          </template>

          <template v-if="selected.HOUSE_SECD === '02' || selected.HOUSE_SECD === '03'">
          <tr class="item">
            <td>주택관리번호</td>
            <td>공고번호</td>
            <td>모델번호</td>
            <td>모델타입</td>
            <td>전용면적</td>
            <td>일반공급세대수</td>
            <td>청약신청금</td>
            <td>공급금액(분양최고금액) (단위:만원)</td>
          </tr>
          <tr v-for="item in selectedItemDetail" :key="item.MODEL_NO">
            <td> {{ item.HOUSE_MANAGE_NO }} </td>
            <td> {{ item.PBLANC_NO }} </td>
            <td> {{ item.MODEL_NO }} </td>
            <td> {{ item.TP }} </td>
            <td> {{ item.SUPLY_AR }} </td>
            <td> {{ item.SUPLY_HSHLDCO }} </td>
            <td> {{ item.SUBSCRPT_REQST_AMOUNT }} </td>
            <td> {{ item.SUPLY_AMOUNT }} </td>
          </tr>
          </template>
          <template v-if="selected.HOUSE_SECD === '04' || selected.HOUSE_SECD === '05' || selected.HOUSE_SECD === '06'">
          <tr class="item">
            <td>주택관리번호</td>
            <td>공고번호</td>
            <td>모델번호</td>
            <td>모델타입</td>
            <td>일반공급세대수</td>
            <td>공급금액(분양최고금액) (단위:만원)</td>
          </tr>
          <tr v-for="item in selectedItemDetail" :key="item.MODEL_NO">
            <td> {{ item.HOUSE_MANAGE_NO }} </td>
            <td> {{ item.PBLANC_NO }} </td>
            <td> {{ item.MODEL_NO }} </td>
            <td> {{ item.HOUSE_TY }} </td>
            <td> {{ item.SUPLY_HSHLDCO }} </td>
            <td> {{ item.LTTOT_TOP_AMOUNT }} </td>
          </tr>
          </template>
        </table>
        </div>
      
        <template v-if="isPassed">
          <div class="modal-scroll">
          <table>
            <th colspan = "5" style="background-color: #42b983; color:#fff">경쟁률 정보</th>
              <tr class="item">
                <!-- <td>모델번호</td> -->
                <td>주택형</td>
                <td>공급세대수</td>
                <template v-if="selected.HOUSE_SECD === '01'">
                  <td>거주지역</td>
                </template>
                <td>접수건수</td>
                <td>경쟁률</td>
                <!-- <td>최저당첨가점</td>
                <td>최고당첨가점</td>
                <td>평균당첨가점</td> -->
              </tr>
             <tr v-for="item in selectedRate" :key="item.HOUSE_MANAGE_NO">
             <template v-if="item.REQ_CNT != 0">
              <!-- <td> {{ item.MODEL_NO }} </td> -->
              <td> {{ item.HOUSE_TY }} </td>
              <td> {{ item.SUPLY_HSHLDCO }} </td>
              <template v-if="selected.HOUSE_SECD === '01'">
                <td> {{ item.RESIDE_SENM }} </td>
              </template>
              <td> {{ item.REQ_CNT }} </td>
              <td> {{ item.CMPET_RATE === '-' ? (item.REQ_CNT / item.SUPLY_HSHLDCO).toFixed(2) : item.CMPET_RATE }} </td>
              <!-- <td> {{ item.LWET_SCORE }} </td>
              <td> {{ item.TOP_SCORE }} </td>
              <td> {{ item.AVRG_SCORE }} </td>   -->
             </template>
             </tr>
          </table>  
          </div>
        </template>

        <div class="modal-footer">
          <template v-if="isPassed === false">
            <button @click="addFavorite" style="background-color: #42b983; color:#fff">알람추가</button>
          </template>
          <button @click.self="$emit('close-modal')">닫기</button>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name : 'eventModal',
    props:["selected","passed"],
    data: function () {
      return {
        selectedItem: this.selected,
        isPassed : this.passed,
        selectedDetail : '',
        selectedRate : ''
      }
    },
    mounted(){
      // console.log(this.selectedItem);
      this.addDetail()
      this.getRate();
    },
    computed: {
      favorites() { return this.$store.state.getFavorite },
      category() { return this.$store.state.getCategory },
      selectedItemDetail(){
        return this.selectedDetail;
      }
    },
    methods:{
      addFavorite(){
          this.$store.dispatch('updateFavorite', {
            data: this.selectedItem
          });
          // console.log(this.selectedItem);
          alert(this.selectedItem.HOUSE_NM + "가 알람 리스트에 저장되었습니다.");
          this.$emit('close-modal');
      },
      addDetail(){
        const url = `${process.env.VUE_APP_URL}/api/home/getInfoDetail?category=${this.$store.state.category}&houseManageNo=${this.selected.HOUSE_MANAGE_NO}&pblancNo=${this.selected.PBLANC_NO}`;     
        this.fetchData(url).then(data => this.selectedDetail = data);
      },
      getRate(){
        const url = `${process.env.VUE_APP_URL}/api/home/getRateInfo?houseManageNo=${this.selected.HOUSE_MANAGE_NO}&houseSeCd=${this.selected.HOUSE_SECD}`; 
        this.fetchData(url).then(data => {
          return this.selectedRate = data
        });
        // console.log(this.selectedRate);
      },
      async fetchData(url){
          const res = await axios.get(url)
          .then((response)=>{
            const { data } = response; 
            return data;
          }).catch((err)=>{
            console.error(err);
            alert(err);
          });
          console.log(res);
          return res.data;
      }
    },
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
  background: #fff;
  max-width: 600px;
  max-height: 40em;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  overflow:auto;
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
  .item td{
        border-bottom: 2px solid #d3d3d3;
  }
.modal-footer{
	text-align: center;
}

.modal-scroll{
  width:100%; 
  height:12em; 
  margin-top: 1em; 
  overflow:auto;
  border-bottom: 1px solid #444444;
}

.modal-scroll table{
  min-height : 20em;
}

</style>