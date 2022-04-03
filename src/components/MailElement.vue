<template>
<div>
    <h3>{{element.HOUSE_NM}}</h3>    
    <table>
        <th colspan = "7" style="background-color: #42b983; color:#fff">기본정보</th>

        <tr class="item" style="font-weight:bold"> 
            <td>주택구분</td>
            <td>분양/임대</td>
            <td>건설업체</td>
            <td>청약접수시작일</td>
            <td>청약접수종료일</td>
            <td>당첨자발표일</td>
            <td>공급지역</td>
        </tr>
        <tr>
            <td>{{element.HOUSE_DTL_SECD_NM}}</td>
            <td>{{element.RENT_SECD_NM}}</td>
            <td>{{element.CNSTRCT_ENTRPS_NM}}</td>
            <td>{{element.RCEPT_BGNDE}}</td>
            <td>{{element.RCEPT_ENDDE}}</td>
            <td>{{element.PRZWNER_PRESNATN_DE}}</td>
            <td>{{element.SUBSCRPT_AREA_CODE_NM}}</td>  
        </tr>
          </table>
    <div class="footer">
        <button @click="removeFavorite">제거</button>
    </div>
</div>
</template>

<script>
export default {
    name : 'mailElement',
    props:["favorite"],
    data : function(){
        return{
            element : this.favorite
        }
    },
    methods:{
        removeFavorite(){
            this.$store.dispatch('removeFavorite', {
                data: this.element
            });
        }
    }
}
</script>

<style>
li{
    border-radius: 1em;
    margin: 1em;
    padding : 0.5em;
    box-shadow: 3px 10px 20px rgba(0, 0, 0, 0.2);
}

.footer{
    padding : 1em;
}

.footer button{
    background-color: #f44336;; /* Green */
    border: none;
    color: white;
    padding: 1em 1.5em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 8px;
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

</style>