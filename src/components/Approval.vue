<template>
    <div class="hello">
        <information></information>
        <history></history>
        <opinion></opinion>
    </div>
</template>

<script>
import information from '@/components/information'
import history from '@/components/history'
import opinion from '@/components/opinion'

export default {
  name: "Approval",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      title: "",
      blockList:[
        {
          'title':'',
          'columnList':[{
            'title':'',
            'text':'',
            'fileList':''
          }]
        }
      ],
      columnList:[]
    };
  },
  components:{
    information,
    history,
    opinion
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hello {
  border:1px solid #E5E5E5;
  font-family: PingFangSC-Regular;
  margin-top: 15px;
}
</style>
