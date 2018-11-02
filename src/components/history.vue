<template>
  <div class="history">
    <p>审批历史</p>
    <table  border="0" cellpadding="0" cellspacing="0" >
        <thead>
            <tr>
                <th>节点名称</th>
                <th>结果</th>
                <th>意见</th>
            </tr>
        </thead>
        <tbody  >
            <tr class="trlen" v-for="arrItem in opinionList">
                <td>
                    <div>{{arrItem.taskName}}</div>
                    <div>{{arrItem.completeDeptCname}}</div>
                </td>
                <td>
                    <div>{{arrItem.approvalResult}}</div>
                    <div>{{arrItem.completerFullname}}</div>
                </td>
                <td>
                    <div>{{arrItem.opinion}}</div>
                    <div>{{arrItem.endTime}}</div>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="weui-panel__ft more" @click="more">
        <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
            <div class="weui-cell__bd">查看更多</div>
            <span class="weui-cell__ft"></span>
        </a>    
    </div>
  </div>
</template>
<script>
export default {
  name: 'history',
  data () {
    return {
      opinionList:[]
    }
  },
   mounted() {
       this.$ajax.post('/service/S_EW_HB_43',
          {
            "msg":"","msgKey":"","detailMsg":"","status":0,"traceId":"","attr":{"processInstanceId":"8349e20d-7c04-11e7-bed8-26fd523be844"},"blocks":{}
          },
          response => {
             if (response.status >= 200 && response.status < 300) {
               let _data = response.data;
               if (response.data !== undefined) {
                   this.opinionList = _data.attr.opinion;
               }
            } else {
                console.log(response.message);
            }
        });   
    },
    updated:function(){
        $('.trlen').each(function(i){
            if(i > 3){
                $(this).css('display','none');
                }
            });
        },
              
    methods:{
        more(){
            $('.trlen').each(function(i){
                if(i > 3){
                    $(this).css('display','');
                }
                $('.more').css('display','none');   
            });
        }
    }          
}
</script>
<style scoped>
.hide{
    display: none;
}
.history{
   width: 100%;
    margin: 0 auto;
    background-color: white;
    font-family: PingFangSC-Regular;
    margin-top: 15px;
}
p{
    text-align: left;
    margin-left: 15px;
    height: 53px;
    line-height: 53px;
    font-size: 16px;
    color: #4A4A4A;
}

table {
    width: 100%;
    font-size: 14px;
}
table thead tr {
    line-height: 40px;
}
thead tr th{
    border-top: 0.5px solid #E5E5E5;
    border-bottom: 0.5px solid #E5E5E5;
   padding-left: 15px;
}
thead tr th:nth-child(1){
    /* width: 60%; */
    text-align: left;
    padding-left: 17px;
}

tbody tr{
height: 48px;
}
tbody tr td {
     padding-left: 15px;
      border-bottom: 0.5px solid#E5E5E5;
       padding-top: 10px;
    padding-bottom: 10px;
}
tbody tr td div:nth-child(1){
    font-size: 14px;
    color: #000000;
    display: inline-block;
}
tbody tr td div:nth-child(2){
    font-size: 14px;
    color: #888888;
}
tbody tr td:nth-child(1){
    text-align: left;
    width: 40%;
}

</style>