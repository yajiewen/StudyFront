<template>
  <div id="badaccount" class="columns">
    <div class="column is-6 is-offset-3">
      <p class="font2">待处理账号数: {{badinfo2.num}}</p>
      <div class="action-buttons">
        <div class="control is-grouped">
          <a class="button is-small" @click="refreshaccount"><i class="fa fa-refresh"></i></a>
          <a class="button is-small" @click="prepage" ><i class="fa fa-chevron-left"></i></a>
          <span class="font3">{{pageindex + 1}}</span>
          <a class="button is-small" @click="nextpage"><i class="fa fa-chevron-right"></i></a>
          <span class="font3">&nbsp&nbsp共{{pagenum}}页</span>
        </div>
      </div>

      <div class="inbox-messages" id="inbox-messages">
        <table class="table font2">
          <tr>
            <td>未验证邮箱</td>
            <td>创建时间</td>
            <td>认证状态</td>
            <td>已经过时间</td>
            <td>处理</td>
          </tr>
          <tr v-for="(info,index) in badinfo2.infolist.slice(slicestart,sliceend)">
            <td v-for="(itemvalue,keyvalue) in info">{{itemvalue}}<span v-if="keyvalue=='how_long'"> 小时</span><span v-if="keyvalue=='usr_verify'">未验证</span></td>
            <td><button @click="delaccount(info.usr_email,index)">删除</button></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "badaccount",
  props:{
    badinfo:Object,
  },
  data(){
    return{
      badinfo2:this.badinfo,  //为了不删除后请求刷新增加一个副本
      pageindex:0,   //页码
      eachpageitemnum:3, //每页显示数
    }
  },
  computed:{
    //切片开始位置
    slicestart(){
      return this.pageindex * this.eachpageitemnum
    },
    //切片结束位置
    sliceend(){
      if (this.slicestart + this.eachpageitemnum > this.badinfo.num){
        return this.badinfo.num
      }else{
        return this.slicestart + this.eachpageitemnum
      }
    },
    //页数
    pagenum(){
      return Math.ceil(this.badinfo2.num/this.eachpageitemnum)
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
    refreshaccount(){
      this.$emit('refresha')
    },
    delaccount(delemial,index){
      axios({
        withCredentials:true,
        method:'post',
        url:'https://127.0.0.1:8081/backstage/deljunkmail/',
        data:{
          uemail:delemial,
        }
      }).then(res => {
        if(res.data.is_login=='yes'){
          if(res.data.is_delet == 'yes'){
            //应为每次切片下标都从0 开始所以要重新求删除元素在原来数组中的下标
            let itemindex = this.pageindex * this.eachpageitemnum + index
            //删除元素使它不显示
            this.badinfo2.infolist.splice(itemindex,1)
            this.badinfo2.num -=1
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
</style>