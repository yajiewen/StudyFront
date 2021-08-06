<template>
  <div id="cintervene" class="columns">

<!--      <div class="column is-3 is-offset-3">-->
<!--        <input class="input" type="text" v-model="otoken">-->
<!--      </div>-->
<!--    <div class="column is-3">-->
<!--      <buttom class="button is-link" @click="getorderinfo">查询</buttom>-->
<!--    </div>-->
    <div class="column is-6 is-offset-3">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">订单号</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control">
              <input class="input" type="text" v-model.trim="otoken">
            </p>
          </div>
        </div>
        <div>
          &nbsp<buttom class="button is-link" @click="getorderinfo">查询</buttom>
        </div>
      </div>

      <div class="card-content" v-if="show_refund">
        <div class="columns">
          <div class="column is-offset-2">
            <span>该功能用于处理订单状态为:进行中,申请结单 的订单</span>
            <ur class="font2">
              <li>执教年级: {{order_info.order_teaching_grade}}</li>
              <li>执教学科: {{order_info.order_teaching_subjects}}</li>
              <li>单价: {{order_info.order_hourly_money}}</li>
              <li>执教时间: {{order_info.order_teaching_time}}</li>
              <li>总金额: {{order_info.order_total_money}}</li>
              <li>家长名字: {{order_info.order_boss_name}}</li>
              <li>家长电话: {{order_info.order_boss_phone_number}}</li>
              <li>家长Wechat/QQ: {{order_info.order_boss_qq_wei}}</li>
              <li>老师名字: {{order_info.order_worker_name}}</li>
              <li>老师电话: {{order_info.order_worker_phone_number}}</li>
              <li>老师Wechat/QQ: {{order_info.order_worker_qq_wei}}</li>
              <li>特殊要求: {{order_info.order_boss_require}}</li>
            </ur>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">退款金额</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input class="input" type="number" placeholder="请输入退款金额" v-model="refundmoney">
              </p>
            </div>
          </div>
          <div>
            &nbsp<button class="button is-link" v-on:click="dorefundmoney">退款</button>
          </div>
        </div>
      </div>
    </div>

    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "cintervene",
  data(){
    return{
      order_info:'',
      otoken:'',
      refundmoney:0,
      show_refund:false,
    }
  },
  watch:{
    refundmoney(){
      if (this.order_info != '' && this.refundmoney >= this.order_info.order_total_money){
        this.refundmoney = this.order_info.order_total_money
      }
    }
  },
  methods:{
    getorderinfo(){
      axios({
        withCredentials:true,
        url:'backstage/getorderinfo/',
        method:"post",
        data:{
          otoken:this.otoken,
        }
      }).then(res => {
        if(res.data.is_login == 'yes'){
          if(res.data.is_get == 'yes') {
            this.order_info = res.data.order_info
            this.show_refund = true
          }else{
            alert('订单不存在')
          }
        }else{
          alert("请重新登录")
        }
      })
    },
    dorefundmoney(){
      axios({
        withCredentials:true,
        url:'backstage/dealorder/',
        method:"post",
        data:{
          otoken:this.otoken,
          refundmoney:this.refundmoney,
        }
      }).then(res => {
        if(res.data.is_login == 'yes'){
          if(res.data.is_deal == 'yes'){
            alert("退款成功")
          }
        }else{
          alert("请重新登录")
        }
      })
    }
  }
}
</script>

<style scoped>
.font2{  /*年级 学科 ...字体大小*/
  font-size: 0.875em
}
</style>