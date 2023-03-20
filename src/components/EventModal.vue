<template>
    <div class="modal">
    <div class="modal__background"></div>
    <div class="modal_container">
        <div class="modal__content">
          <template v-if="selected.HMPG_ADRES !== null">
            <h1 @click="goHomePage(selected.HMPG_ADRES)">{{selected.HOUSE_NM}}</h1>
          </template>
          <template v-else>
            <h1>{{selected.HOUSE_NM}}</h1>
          </template>
          <table style="margin-bottom: 1em">
          <th colspan = "7" style="background-color: #42b983; color:#fff">기본정보</th>
          <template v-if="selected.HOUSE_SECD === '01'">
          <tr class="item">
              <td>구분</td>
              <td>분양/임대</td>
              <td>건설업체</td>
              <td>시작일</td>
              <td>종료일</td>
              <td>발표일</td>
              <td>지역</td>
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
              <td>구분</td>
              <td>우편번호</td>
              <td>주소</td>
              <td>시작일</td>
              <td>종료일</td>
              <td>발표일</td>
<!--              <td>홈페이지 주소</td>-->
          </tr>
          <tr>
              <td>{{selected.HOUSE_DTL_SECD_NM}}</td>
              <td>{{selected.HSSPLY_ZIP}}</td>
              <td>{{selected.HSSPLY_ADRES}}</td>
              <td>{{selected.SUBSCRPT_RCEPT_BGNDE}}</td>
              <td>{{selected.SUBSCRPT_RCEPT_ENDDE}}</td>
              <td>{{selected.PRZWNER_PRESNATN_DE}}</td>
<!--              <td>{{selected.HMPG_ADRES}}</td>  -->
          </tr>
          </template>
          <template v-if="selected.HOUSE_SECD === '04' || selected.HOUSE_SECD === '05' || selected.HOUSE_SECD === '06'">
          <tr class="item">
              <td>구분</td>
              <td>건설업체</td>
              <td>시작일</td>
              <td>종료일</td>
              <td>발표일</td>
              <td>지역</td>
          </tr>
          <tr>
              <td>{{selected.HOUSE_SECD_NM}}</td>
              <td>{{selected.BSNS_MBY_NM}}</td>
              <td>{{selected.SUBSCRPT_RCEPT_BGNDE}}</td>
              <td>{{selected.SUBSCRPT_RCEPT_BGNDE}}</td>
              <td>{{selected.PRZWNER_PRESNATN_DE}}</td>
              <td>{{selected.HSSPLY_ADRES}}</td>  
          </tr>
          </template>
          </table>
          <table class="detail_table">
            <th colspan = "10" style="background-color: #42b983; color:#fff">세부정보</th>
            <template v-if="selected.HOUSE_SECD === '01'">
            <tr class="item">
<!--              <td>모델번호</td>-->
              <td>주택형</td>
              <td>공급면적</td>
              <td>공급금액</td>
              <td>일반공급수</td>
              <td>특별공급수</td>
              <td>다자녀가구</td>
              <td>신혼부부</td>
              <td>생애최초</td>
              <td>노부모부양</td>
              <td>기관추천</td>
<!--              <td>기타</td>-->
<!--              <td>이전기관</td>-->
            </tr>
            <tr v-for="item in selectedItemDetail" :key="item.MODEL_NO">
<!--              <td> {{ item.MODEL_NO }} </td>-->
              <td> {{ item.HOUSE_TY }} </td>
              <td> {{ Math.ceil(item.SUPLY_AR) }} </td>
              <td> {{ item.LTTOT_TOP_AMOUNT }} </td>
              <td> {{ item.SUPLY_HSHLDCO }} </td>
              <td> {{ item.SPSPLY_HSHLDCO }} </td>
              <td> {{ item.MNYCH_HSHLDCO }} </td>
              <td> {{ item.NWWDS_HSHLDCO }} </td>
              <td> {{ item.LFE_FRST_HSHLDCO }} </td>
              <td> {{ item.OLD_PARNTS_SUPORT_HSHLDCO }} </td>
              <td> {{ item.INSTT_RECOMEND_HSHLDCO }} </td>
<!--              <td> {{ item.ETC_HSHLDCO }} </td>-->
<!--              <td> {{ item.TRANSR_INSTT_ENFSN_HSHLDCO }} </td>-->
            </tr>
            </template>

            <template v-if="selected.HOUSE_SECD === '02' || selected.HOUSE_SECD === '03'">
              <tr class="item">
<!--                <td>주택관리번호</td>-->
<!--                <td>공고번호</td>-->
                <td>모델번호</td>
                <td>모델타입</td>
<!--                <td>전용면적</td>-->
                <td>공급세대수</td>
                <td>청약신청금</td>
                <td>공급금액</td>
              </tr>
              <tr v-for="item in selectedItemDetail" :key="item.MODEL_NO">
<!--                <td> {{ item.HOUSE_MANAGE_NO }} </td>-->
<!--                <td> {{ item.PBLANC_NO }} </td>-->
                <td> {{ item.MODEL_NO }} </td>
                <td> {{ item.TP }} </td>
<!--                <td> {{ item.SUPLY_AR }} </td>-->
                <td> {{ item.SUPLY_HSHLDCO }} </td>
                <td> {{ item.SUBSCRPT_REQST_AMOUNT }} </td>
                <td> {{ item.SUPLY_AMOUNT }} </td>
              </tr>
            </template>
            <template v-if="selected.HOUSE_SECD === '04' || selected.HOUSE_SECD === '05' || selected.HOUSE_SECD === '06'">
              <tr class="item">
                <td>주택관리번호</td>
<!--                <td>공고번호</td>-->
                <td>모델번호</td>
                <td>모델타입</td>
                <td>일반공급세대수</td>
                <td>공급금액</td>
              </tr>
              <tr v-for="item in selectedItemDetail" :key="item.MODEL_NO">
                <td> {{ item.HOUSE_MANAGE_NO }} </td>
<!--                <td> {{ item.PBLANC_NO }} </td>-->
                <td> {{ item.MODEL_NO }} </td>
                <td> {{ item.HOUSE_TY }} </td>
                <template v-if="selected.HOUSE_SECD === '06'">
                  <td> {{ item.SPSPLY_HSHLDCO }} </td>
                </template>
                <template v-else>
                  <td> {{ item.SUPLY_HSHLDCO }} </td>
                </template>
                <td> {{ item.LTTOT_TOP_AMOUNT }} </td>
              </tr>
              </template>
          </table>

          <template v-if="isPassed && selectedRate.length > 0" >
            <!-- <div class="modal-scroll"> -->
            <table style="margin-top: 1em;">
                <template v-if="selected.HOUSE_SECD === '01'">
                  <th colspan = "9" style="background-color: #42b983; color:#fff">경쟁률 정보</th>
                </template>
                <template v-else>
                  <th colspan = "4" style="background-color: #42b983; color:#fff">경쟁률 정보</th>
                </template>
               <tr class="item">
                  <!-- <td>모델번호</td> -->
                  <td>주택형</td>
                  <td>공급세대</td>
                  <template v-if="selected.HOUSE_SECD === '01'">
                    <td>거주지역</td>
                  </template>
                  <td>접수건수</td>
                  <td>경쟁률</td>
                  <template v-if="selected.HOUSE_SECD === '01'">
                    <td>순위</td>
                    <td>최저</td>
                    <td>최고</td>
                    <td>평균</td>
                  </template>
                </tr>
              <tr v-for="item in selectedRate" :key="item.HOUSE_MANAGE_NO">
                <!-- <td> {{ item.MODEL_NO }} </td> -->
                <td> {{ item.HOUSE_TY }} </td>
                <td> {{ item.SUPLY_HSHLDCO }} </td>
                <template v-if="selected.HOUSE_SECD === '01'">
                  <template v-if="item.RESIDE_SECD === '01'">
                    <td> 해당 </td>
                  </template>
                  <template v-else-if="item.RESIDE_SECD === '02'">
                    <td> 기타 </td>
                  </template>
                   <template v-else>
                    <td> 기타경기 </td>
                  </template>
                </template>
                <template v-if="selected.HOUSE_SECD === '06'">
                  <td> {{ item.NWWDS_REQ_CNT }} </td>
                  <td> {{ (item.NWWDS_REQ_CNT /  item.NWWDS_HSHLDCO) > 0  === '-' ? '' : (item.NWWDS_REQ_CNT / item.NWWDS_HSHLDCO).toFixed(1) }} </td>
                </template>
                <template v-else>
                  <td> {{ item.REQ_CNT }} </td>
                  <td> {{ item.CMPET_RATE === '-' ? '' : item.CMPET_RATE }} </td>
                </template>
                <template v-if="selected.HOUSE_SECD === '01'">
                  <td> {{ item.SUBSCRPT_RANK_CODE }}</td>
                  <td rowspan="1"> {{ item.LWET_SCORE > 0 ? item.LWET_SCORE : ' ' }} </td>
                    <td rowspan="1"> {{ item.TOP_SCORE > 0 ? item.TOP_SCORE : ' ' }} </td>
                    <td rowspan="1"> {{ item.AVRG_SCORE > 0 ? item.AVRG_SCORE : ' ' }} </td>
                </template>
              </tr>
            </table>
          </template>

          <div class="modal-footer">
            <template v-if="isAlarm">
              <template v-if="isPassed === false">
                <button @click="addFavorite" style="background-color: #42b983; color:#fff">알람추가</button>
              </template>
            </template>
            <button @click.self="$emit('close-modal')">닫기</button>
          </div>
      </div>
    </div>

    </div>
</template>

<script>
import axios from 'axios';
import {mapActions} from "vuex";

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
    async mounted(){
      // console.log(this.selectedItem);
      await this.toggleLoadingbar();
      await this.addDetail();
      if(this.isPassed) await this.getRate();
      await this.toggleLoadingbar();
    },
    computed: {
      favorites() { return this.$store.state.getFavorite },
      category() { return this.$store.state.getCategory },
      selectedItemDetail(){
        return this.selectedDetail;
      },
      isAlarm() { return this.$store.state.isAlarm },
    },
    methods:{
      ...mapActions(['toggleLoadingbar']),
      addFavorite(){
          this.$store.dispatch('updateFavorite', {
            data: this.selectedItem
          });
          // console.log(this.selectedItem);
          alert(this.selectedItem.HOUSE_NM + "가 알람 리스트에 저장되었습니다.");
          this.$emit('close-modal');
      },
      async addDetail(){
        const url = `${process.env.VUE_APP_URL}/api/home/getInfoDetail?category=${this.$store.state.category}&houseManageNo=${this.selected.HOUSE_MANAGE_NO}&pblancNo=${this.selected.PBLANC_NO}`;     
        await this.fetchData(url).then(data => {
          this.selectedDetail = data
        }).catch(err=>
          console.error(err)
        );
        // console.log(this.selectedDetail);
      },
      async getRate(){
        const url = `${process.env.VUE_APP_URL}/api/home/getRateInfo?houseManageNo=${this.selected.HOUSE_MANAGE_NO}&houseSeCd=${this.selected.HOUSE_SECD}`; 
        await this.fetchData(url).then(data => {
          return this.selectedRate = data
        });
        // console.log("!!");
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
          // console.log(res);
          return res.data;
      },
      goHomePage(param){
        console.log(param);
        window.open(param, '_blank').focus();
      },
    },
}
</script>

<style scoped>

.modal__background {
  width: 100%;
  height: 100%;
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
  text-align: center;
  z-index: 9999;
}

button{
  display: inline-block;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #42b983;
  color: #fff;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;
  cursor: pointer;
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
  margin-top: 2em;
	text-align: center;
}

.modal-scroll table{
  min-height : 20em;
}

/*
  ##Device = 태블릿, 아이패드(세로),
*/
@media (min-width: 768px) and (max-width: 1024px) {


}

@media (min-width: 320px) and (max-width: 480px) {
  .modal__content{
    max-width: 80%;
    min-width: 300px;
  }
}

</style>