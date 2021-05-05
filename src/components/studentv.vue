<template>
  <div id="studentv" class="columns">
    <div class="column is-6 is-offset-3">
      <p class="font2">待学籍审核数: {{stuinfo2.num}}</p>
      <div class="action-buttons">
        <div class="control is-grouped">
          <a class="button is-small" @click="refreshiden"><i class="fa fa-refresh"></i></a>
          <a class="button is-small" @click="prepage" ><i class="fa fa-chevron-left"></i></a>
          <span class="font3">{{pageindex + 1}}</span>
          <a class="button is-small" @click="nextpage"><i class="fa fa-chevron-right"></i></a>
          <span class="font3">&nbsp&nbsp共{{pagenum}}页</span>
        </div>
      </div>

      <div class="inbox-messages" id="inbox-messages">
        <table class="table font2">
          <tr>
            <td>用户</td>
            <td>图一</td>
            <td>图二</td>
            <td>处理1</td>
            <td>处理2</td>
          </tr>
          <tr v-for="(info,index) in stuinfo2.infolist.slice(slicestart,sliceend)">
            <td>{{info.usr_email}}</td>
            <td><a :href="info.usr_student_imgurl1" target="_blank"><img :src="info.usr_student_imgurl1" alt=""></a></td>
            <td><a :href="info.usr_student_imgurl2" target="_blank"><img :src="info.usr_student_imgurl2" alt=""></a></td>
            <td><button @click="upload_result(info.usr_email,index,1)">通过</button></td>
            <td><button @click="upload_result(info.usr_email,index,2)">拒绝</button></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "studentv",
  props:{
    stuinfo:Object,
  },
  data(){
    return{
      stuinfo2: this.stuinfo,//为了不删除后请求刷新增加一个副本
      pageindex:0,   //页码
      eachpageitemnum:10, //每页显示数
    }
  },
  computed:{
    //切片开始位置
    slicestart(){
      return this.pageindex * this.eachpageitemnum
    },
    //切片结束位置
    sliceend(){
      if (this.slicestart + this.eachpageitemnum > this.stuinfo2.num){
        return this.stuinfo2.num
      }else{
        return this.slicestart + this.eachpageitemnum
      }
    },
    //页数
    pagenum(){
      return Math.ceil(this.stuinfo2.num/this.eachpageitemnum)
    }
  },
  methods:{
    prepage(){
      if(this.pageindex !=0){
        this.pageindex -=1
      }
    },
    nextpage(){
      if(this.pageindex < this.pagenum-1){
        this.pageindex +=1
      }
    },
    refreshiden(){
      this.$emit('refreshi')
    },
    upload_result(emial,index,status){
      axios({
        withCredentials:true,
        method:'post',
        url:'https://127.0.0.1:8081/backstage/sverify/',
        data:{
          uemail:emial,
          status:status,
        }
      }).then(res => {
        if(res.data.is_login=='yes'){
          if(res.data.is_deal == 'yes'){
            //应为每次切片下标都从0 开始所以要重新求删除元素在原来数组中的下标
            let itemindex = this.pageindex * this.eachpageitemnum + index
            //删除元素使它不显示
            this.stuinfo2.infolist.splice(itemindex,1)
            this.stuinfo2.num -=1
          }
        }else{
          alert('请重新登录')
        }
      })
    },
  }
}
</script>

<style scoped>
.font1{   /*发单者字体大小*/
  font-size: 1.1em
}
.font2{  /*年级 学科 ...字体大小*/
  font-size: 0.875em
}
.font3{
  font-size: 0.5em
}
img{
  height: 20px;
  width: 40px;
}
</style>