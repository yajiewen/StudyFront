<template>
 <div id="takeorderinfo" class="column">
  <div class="card-content">
    <div class="notification ">
      订 单 详 情
    </div>
    <br>
    <div class="columns">
      <!--学生信息   -->
      <div class="column font2">
        <div class="card">
          <p>
           <span class="icon">
            <i class="fas fa-user-graduate"></i>
           </span>
            <strong>{{order_info.order_boss_name}}</strong>
          </p>
          <p>
         <span class="icon">
          <i class="fas fa-mobile"></i>
         </span>
            {{order_info.order_boss_phone_number}}
          </p>
          <p>
         <span class="icon">
          <i class="fab fa-weixin"></i>
         </span>
            {{order_info.order_boss_qq_wei}}
          </p>
        </div>
      </div>
      <!--老师信息  -->
      <div class="column font2">
        <div class="card">
          <p>
           <span class="icon">
            <i class="fas fa-user-graduate"></i>
           </span>
            <strong>{{order_info.order_worker_name}}</strong>
          </p>

          <p>
           <span class="icon">
            <i class="fas fa-mobile"></i>
           </span>
            {{order_info.order_worker_phone_number}}
          </p>
          <p>
           <span class="icon">
            <i class="fab fa-weixin"></i>
           </span>
            {{order_info.order_worker_qq_wei}}
          </p>
        </div>
      </div>

    </div>

    <!--  订单信息 -->
    <div class="content font2">
      <ul>
        <li><span class="tag is-light">年 级</span> {{order_info.order_teaching_grade}}</li>
        <li><span class="tag is-light">学 科</span> {{order_info.order_teaching_subjects}}</li>
        <li><span class="tag is-light">金额/小时</span> {{order_info.order_hourly_money}} 元/小时</li>
        <li><span class="tag is-light">教 学 时 长</span> {{order_info.order_teaching_time}} 小时</li>
        <li><span class="tag is-light">总 额</span> {{order_info.order_total_money}} 元</li>
        <li><span class="tag is-light">保 证 金</span> {{order_info.order_worker_earnest_money}} 元 (中途取消订单保证金不退回)</li>
        <li>
          <div class="columns">
            <div class="column">
              <p class="font2">
                <span class="tag is-light">订 单 状 态</span>
                <span class="tag is-link " v-if="order_info.order_status == 2">待完成</span>
                <span class="tag is-success " v-if="order_info.order_status == 3">已完成</span>
                <span class="tag is-danger " v-if="order_info.order_status == 4">申请退款中</span>
                <span class="tag is-info " v-if="order_info.order_status == 5">已退款</span>
                <span class="tag is-primary " v-if="order_info.order_status == 6">已取消</span>
                <span class="tag is-warning " v-if="order_info.order_status == 7">客服处理中</span>
                <span class="tag is-light " v-if="order_info.order_status == 8">待确认</span>
              </p>
            </div>
            <div class="column">
              <p class="font2" v-if="order_info.order_status == 3">完成时间:{{order_info.order_complet_time}}</p>
              <p class="font2" v-if="order_info.order_status == 4">退款金额:{{order_info.order_refund_money}} 元</p>
              <p class="font2" v-if="order_info.order_status == 5">退款金额:{{order_info.order_refund_money}} 元</p>
              <p class="font2" v-if="order_info.order_status == 6">取消时间:{{order_info.order_end_time}}</p>
            </div>
          </div>
        </li>
        <li v-if="order_info.order_status == 4 || order_info.order_status == 5 || order_info.order_status == 7" class="font2"><span class="tag is-light">退 款 原 因</span> {{order_info.order_refund_reason}}</li>
        <li><span class="tag is-light">订单号:</span> {{order_info.order_token}}</li>
      </ul>
    </div>
    <br>
    <p v-if="order_info.order_status == 2 ">
     <span class="icon">
      <i class="fas fa-comment"></i>
     </span>
      <span class="font3">发送上课通知</span>
    </p>

    <div class="columns is-centered" v-if="order_info.order_status == 2 ">
      <div class="column is-two-thirds">
        <div class="field">
          <div class="control">
            <textarea v-bind:class="{'is-danger':is_emailcontentdanger}" class="textarea font2" :placeholder="textplaceholder" rows="5" maxlength="500" v-model.trim="emailcontent"></textarea>
          </div>
          <div class="columns ">
            <span><div class="column"><button v-bind:disabled="bisdisable" v-bind:class="{'is-loading':bisloading}" @click="sendstudynote(order_info.order_boss_email)" class="button is-small font3 is-dark is-outlined">发 送</button></div></span>
            <div class="column"><span class="help ont3 is-danger is-left" v-if="showsuccesssend" >已发送</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
 </div>
</template>

<script>

import axios from 'axios'

export default {
name: "takeorderinfo",
props:{
  order_info:Object,
},
data(){
  return{
    showsuccesssend:false,
    bisloading:false,  //按钮处于loading状态
    bisdisable:false, //按钮被禁用
    textplaceholder :'xxx同学,请于xx时间打开会议链接(https://..),上课',
    emailcontent:'',
    is_emailcontentdanger:false,
  }
},
methods:{
  sendstudynote(studentemail){
    if(this.emailcontent.length != 0){
      this.bisloading = true,
          axios({
            withCredentials:true,
            url:'orders/sendclassreminder/',
            method:"post",
            data:{
              bemail:studentemail,
              umessage:this.emailcontent,
            }
          }).then(res => {
            if(res.data.is_login == 'yes'){
              if(res.data.is_send == 'yes'){
                this.showsuccesssend = true
                setTimeout(() => {this.showsuccesssend = false},2000)
                this.bisloading = false
                this.bisdisable = true
                setTimeout(() => {this.bisdisable = false},1000*60)
              }
            }
          })
    }else {
          this.is_emailcontentdanger = true
          setTimeout(() => {this.is_emailcontentdanger = false},2000)
    }
  }
}
}
</script>

<style scoped>
.font1{   /*发单者字体大小*/
  font-size: 1.2em
}
.font2{  /*年级 学科 ...字体大小*/
  font-size: 0.875em
}
.font3{
  font-size: 0.5em
}
</style>