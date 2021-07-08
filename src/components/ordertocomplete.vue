<template>
  <div id="ordertocomplete" class="columns">
    <div class="column is-6 is-offset-3">
      <p class="font2">待处理订单数: {{corderinfo2.num}}</p>
      <div class="action-buttons">
        <div class="control is-grouped">
          <a class="button is-small" @click="refreshcorders"><i class="fa fa-refresh"></i></a>
          <a class="button is-small" @click="prepage" ><i class="fa fa-chevron-left"></i></a>
          <span class="font3">{{pageindex + 1}}</span>
          <a class="button is-small" @click="nextpage"><i class="fa fa-chevron-right"></i></a>
          <span class="font3">&nbsp&nbsp共{{pagenum}}页</span>
          <button v-on:click="completeorders" class="button is-small is-rounded is-link" style="position: absolute;right: 10%" >一键结单</button>
        </div>
      </div>

      <div class="inbox-messages" id="inbox-messages">
        <table class="table font2">
          <tr>
            <td>订单号</td>
            <td>申请完成时间</td>
            <td>已经过时间</td>
          </tr>
          <tr v-for="(info,index) in corderinfo2.infolist.slice(slicestart,sliceend)">
            <td v-for="(itemvalue,keyvalue) in info">{{itemvalue}}<span v-if="keyvalue=='how_long'"> 小时</span></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "ordertocomplete",
  props:{
    corderinfo:Object,
  },
  data(){
    return{
      corderinfo2:this.corderinfo,  //为了不删除后请求刷新增加一个副本
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
      if (this.slicestart + this.eachpageitemnum > this.corderinfo2.num){
        return this.corderinfo2.num
      }else{
        return this.slicestart + this.eachpageitemnum
      }
    },
    //页数
    pagenum(){
      return Math.ceil(this.corderinfo2.num/this.eachpageitemnum)
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
    refreshcorders(){
      this.$emit('refreshco')
    },
    completeorders(){
      if(this.corderinfo2.num !=0){
        axios({
          withCredentials:true,
          method:'post',
          url:'backstage/completeorders/'
        }).then(res => {
          if(res.data.is_login=='yes'){
            if(res.data.is_complete == 'yes'){
              alert("自动结单数:" + res.data.order_num)
              this.$emit('refreshco')
            }
          }
        })
      }else{
        alert("自动结单数:" +this.corderinfo2.num)
      }
    }
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