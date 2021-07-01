<template>
  <div id="mytakeorders" class="card column is-one-third">
    <div class="notification is-link">
      我 的 教 学 订 单 / / / / / / / / / / / / /共 {{mytakeordersnum}} 单
    </div>
    <div class="action-buttons">
      <div class="control is-grouped">
        <a class="button is-small" @click="refreshorders"><i class="fa fa-refresh"></i></a>
        <a class="button is-small" @click="prepage" ><i class="fa fa-chevron-left"></i></a>
        <span class="font3">{{pageindex + 1}}</span>
        <a class="button is-small" @click="nextpage"><i class="fa fa-chevron-right"></i></a>
        <span class="font3">&nbsp&nbsp共{{pagenum}}页</span>
      </div>
    </div>

    <div class="inbox-messages" id="inbox-messages">
      <div v-for="(order, index) in mytakeorders.slice(slicestart,sliceend)" v-bind:class="{cardbackground:index == click_item_id}" class="card" v-bind:id="index" v-on:click="showMessage(index,order)" v-bind:data-preview-id="index">
        <div class="card-content">
          <div class="msg-header">
            <span class="msg-from font1"><small>学生: {{order.order_boss_name}}</small></span>
            <span class="msg-timestamp"></span>
            <span class="msg-attachment"><i class="fa fa-paperclip"></i></span>
            <p class="font3">接单时间:{{ order.order_accept_time }}</p>
          </div>

          <table class="tablepading">
            <tr>
              <td><span class="font2">年 级</span></td>
              <td><span class="font2">科 目</span></td>
              <td><span class="font2">金 额</span></td>
              <td><span class="font2">状 态</span></td>
            </tr>
            <tr>
              <td><span class="font3">{{order.order_teaching_grade}}</span></td>
              <td><span class="font3">{{order.order_teaching_subjects}}</span></td>
              <td><span class="font3">{{order.order_total_money}} 元</span></td>
              <td>
                <span class="font3">
                  <div class="tags are-small">
                    <span class="tag is-link " v-if="order.order_status == 2">待完成</span>
                    <span class="tag is-success " v-if="order.order_status == 3">已完成</span>
                    <span class="tag is-danger " v-if="order.order_status == 4">申请退款中</span>
                    <span class="tag is-info " v-if="order.order_status == 5">已退款</span>
                    <span class="tag is-primary " v-if="order.order_status == 6">已取消</span>
                    <span class="tag is-warning " v-if="order.order_status == 7">客服处理中</span>
                    <span class="tag is-light " v-if="order.order_status == 8">待确认</span>
                  </div>
                </span>
              </td>
            </tr>
          </table>

          <div>
            <button v-bind:class="{'is-loading':button_is_loading}" class="button is-small" v-on:click="askcomplete(order.order_token)" v-if="order.order_status == 2">结单</button>
            <button v-bind:class="{'is-loading':button_is_loading}" class="button is-small" v-on:click="cancelorder(order.order_token)" v-if="order.order_status == 2">取消订单</button>
            <button v-bind:class="{'is-loading':button_is_loading}" class="button is-small" v-on:click="agreerefund(order.order_token)" v-if="order.order_status == 4">同意退款</button>
            <button class="button is-small" v-on:click="disagreerefund(order.order_token)" v-if="order.order_status == 4">拒绝退款</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: "mytakeorders",
  props:{
    mytakeorders:Array,
    mytakeordersnum:Number, //订单数
  },
  data(){
    return{
      pageindex:0,   //页码
      eachpageitemnum:4, //每页显示数
      click_item_id : -1, //用于给item添加样式
      button_is_loading:false,
    }
  },
  computed:{
    //切片开始位置
    slicestart(){
      return this.pageindex * this.eachpageitemnum
    },
    //切片结束位置
    sliceend(){
      if (this.slicestart + this.eachpageitemnum > this.mytakeordersnum){
        return this.mytakeordersnum
      }else{
        return this.slicestart + this.eachpageitemnum
      }
    },
    //页数
    pagenum(){
      return Math.ceil(this.mytakeordersnum/this.eachpageitemnum)
    }
  },
  methods:{
    prepage(){
      if(this.pageindex !=0){
        this.pageindex -=1
        this.click_item_id = -1 //初始化选中的itemid
        this.$emit('closeorderinfo') //切换页面后关闭右边详细信息
      }
    },
    nextpage(){
     if(this.pageindex < this.pagenum-1){
       this.pageindex +=1
       this.click_item_id = -1 //初始化选中的itemid
       this.$emit('closeorderinfo')
     }
    },
    showMessage(index,order) {
      this.click_item_id = index
      console.log(order)
      this.$emit('torderinfo',order)
    },
    refreshorders(){
      this.$emit('refreshtorders')
      this.$emit('closeorderinfo')
    },
    askcomplete(otoken){ //申请结单
      this.button_is_loading = true
      axios({
        withCredentials:true,
        url:'orders/waskok/',
        method:"post",
        data:{
          otoken:otoken,
        }
      }).then(res => {
        if(res.data.is_login == 'yes'){
          if(res.data.ask_success == 'yes'){
            this.button_is_loading = false
            this.$emit('refreshtorders') //刷新订单
            this.$emit('closeorderinfo') //需要关闭订单详细信息重新点 因为没法自动更新信息
          }
        }else{
          this.button_is_loading = false
          alert("请重新登录")
        }
      })
    },
    cancelorder(otoken){ //取消接单
      this.button_is_loading = true
      axios({
        withCredentials:true,
        url:'orders/wcancelorder/',
        method:"post",
        data:{
          otoken:otoken,
        }
      }).then(res => {
        if(res.data.is_login == 'yes'){
          if(res.data.is_order_cancel == 'yes'){
            this.button_is_loading = false
            this.$emit('refreshtorders') //刷新订单
            this.$emit('closeorderinfo') //需要关闭订单详细信息重新点 因为没法自动更新信息
          }
        }else{
          this.button_is_loading = false
          alert("请重新登录")
        }
      })
    },
    agreerefund(otoken){ //同意退款
      this.button_is_loading = true
      axios({
        withCredentials:true,
        url:'orders/wagreerefund/',
        method:"post",
        data:{
          otoken:otoken,
        }
      }).then(res => {
        if(res.data.is_login == 'yes'){
          if(res.data.agree_success == 'yes'){
            this.button_is_loading = false
            this.$emit('refreshtorders') //刷新订单
            this.$emit('closeorderinfo') //需要关闭订单详细信息重新点 因为没法自动更新信息
          }
        }else{
          this.button_is_loading = false
          alert("请重新登录")
        }
      })
    },
    disagreerefund(otoken){ //拒绝退款
      axios({
        withCredentials:true,
        url:'orders/wdenyrefund/',
        method:"post",
        data:{
          otoken:otoken,
        }
      }).then(res => {
        if(res.data.is_login == 'yes'){
          if(res.data.deny_success == 'yes'){
            this.$emit('refreshtorders') //刷新订单
            this.$emit('closeorderinfo') //需要关闭订单详细信息重新点 因为没法自动更新信息
          }
        }else{
          alert("请重新登录")
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
.cardbackground{  /*选中后换的背景颜色*/
  /*background-color:ghostwhite;*/
  /*background-color: rgb(10 10 10 / 10%);*/
  background-color: #F5F5F5;
}
.tablepading{
  width: 100%;
}
</style>