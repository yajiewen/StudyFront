<template>
  <div id="mysendorders" class="card column is-one-third">
    <div class="notification is-link">
      我 的 学 习 订 单
      <span class="rightposition">共 {{mysendordersnum}} 单</span>
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
      <div v-for="(order, index) in mysendorders.slice(slicestart,sliceend)" v-bind:class="{cardbackground:index == click_item_id}" class="card" v-bind:id="index" v-on:click="showMessage(index,order)" v-bind:data-preview-id="index">
        <div class="card-content">
          <div class="msg-header">
            <span class="msg-from font1"><small>老师: {{order.order_worker_name}}</small></span>
            <span class="msg-timestamp"></span>
            <span class="msg-attachment"><i class="fa fa-paperclip"></i></span>
            <p class="font3">创建时间:{{ order.order_start_time }}</p>
          </div>

<!--          <div class="columns">-->
<!--            <div class="column font2">年 级 <p class="font3">{{order.order_teaching_grade}}</p></div>-->
<!--            <div class="column font2">科 目 <p class="font3">{{order.order_teaching_subjects}}</p></div>-->
<!--            <div class="column font2">金 额 <p class="font3">{{order.order_total_money}} 元</p></div>-->
<!--            <div class="column font2">状 态-->
<!--              <div class="tags are-small">-->
<!--                <span class="tag is-dark " v-if="order.order_status == 0">待付款</span>-->
<!--                <span class="tag is-black " v-if="order.order_status == 1">待接单</span>-->
<!--                <span class="tag is-link " v-if="order.order_status == 2">进行中</span>-->
<!--                <span class="tag is-success " v-if="order.order_status == 3">已完成</span>-->
<!--                <span class="tag is-danger " v-if="order.order_status == 4">申请退款中</span>-->
<!--                <span class="tag is-info " v-if="order.order_status == 5">已退款</span>-->
<!--                <span class="tag is-primary " v-if="order.order_status == 6">已取消</span>-->
<!--                <span class="tag is-warning " v-if="order.order_status == 7">客服处理中</span>-->
<!--                <span class="tag is-light " v-if="order.order_status == 8">待确认</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
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
                    <span class="tag is-dark " v-if="order.order_status == 0">待付款</span>
                    <span class="tag is-black " v-if="order.order_status == 1">待接单</span>
                    <span class="tag is-link " v-if="order.order_status == 2">进行中</span>
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
          <span class="rightposition2" v-if="order.order_status == 3 || order.order_status == 5 || order.order_status == 6"><button class="delete is-small" v-on:click="bhideorder(order.order_token)"></button></span>
          <div>
            <button class="button is-small" v-on:click="payorder(order.order_token,order.order_boss_email)" v-if="order.order_status == 0">付款</button>
            <button class="button is-small" v-on:click="cancelorder(order.order_token,order.order_boss_email)" v-if="order.order_status == 0 ||order.order_status ==1">取消订单</button>
            <button v-bind:class="{'is-loading':button_is_loading}" class="button is-small" v-on:click="cancelrefund(order.order_token)" v-if="order.order_status == 4">取消退款</button>
            <button v-bind:class="{'is-loading':button_is_loading}" class="button is-small" v-on:click="agreecomplete(order.order_token)" v-if="order.order_status == 8">同意收货</button>
            <button class="button is-small" v-on:click="showrefundmenu(index)" v-if="(order.order_status == 8||order.order_status == 2)">退款</button>
            <div v-if="(order.order_status == 8||order.order_status == 2)&&isshowrefundmenu == index">
              <button class="delete is-small" v-on:click="showrefundmenu(index)"></button>
              <div class="field">
                <label class="label">退款金额</label>
                <div class="control">
                  <input class="input" type="number"  placeholder="退款金额" min="0"  v-model.trim="refundmoney">
                </div>
              </div>

              <div class="field">
                <label class="label">退款原因</label>
                <div class="control">
                  <textarea class="textarea" placeholder="请输入退款原因" maxlength="500" v-model.trim="refundreason"></textarea>
                </div>
              </div>

              <div class="field is-grouped">
                <div class="control">
                  <button v-bind:class="{'is-loading':button_is_loading}" class="button is-link is-small" v-on:click="dorefund(order.order_boss_email,order.order_token,order.order_total_money)">提交</button>
                </div>
                <div class="control">
                  <button class="button is-link is-light is-small" v-on:click="isshowrefundmenu=true">取消</button>
                </div>
              </div>
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
  name: "mysendorders",
  props:{
    mysendorders:Array,
    mysendordersnum:Number, //订单数
  },
  data(){
    return{
      pageindex:0,   //页码
      eachpageitemnum:4, //每页显示数
      click_item_id : -1, //用于给item添加样式

      isshowrefundmenu:-1, //显示退款菜单

      refundmoney:0, //退款金额
      refundreason:'', //退款原因
      button_is_loading:false, //button 是否在载入状态
    }
  },
  computed:{
    //切片开始位置
    slicestart(){
      return this.pageindex * this.eachpageitemnum
    },
    //切片结束位置
    sliceend(){
      if (this.slicestart + this.eachpageitemnum > this.mysendordersnum){
        return this.mysendordersnum
      }else{
        return this.slicestart + this.eachpageitemnum
      }
    },
    //页数
    pagenum(){
      return Math.ceil(this.mysendordersnum/this.eachpageitemnum)
    },
  },
  methods:{
    prepage(){
      if(this.pageindex !=0){
        this.pageindex -=1
        this.click_item_id = -1 //初始化选中的itemid
        this.isshowrefundmenu = -1 //关闭退款菜单
        this.$emit('closeorderinfo') //切换页面后关闭右边详细信息
      }
    },
    nextpage(){
      if(this.pageindex < this.pagenum-1){
        this.pageindex +=1
        this.click_item_id = -1 //初始化选中的itemid
        this.isshowrefundmenu = -1 //关闭退款菜单
        this.$emit('closeorderinfo')
      }
    },
    showMessage(index,order) {
      this.click_item_id = index
      this.$emit('sorderinfo',order)
    },
    refreshorders(){
      this.$emit('refreshsorders')
      this.$emit('closeorderinfo')
      this.isshowrefundmenu = -1 //关闭退款菜单
    },
    showrefundmenu(index){
      if(this.isshowrefundmenu !=index){
        this.isshowrefundmenu = index
      }else{
        this.isshowrefundmenu = -1
      }
    },

    payorder(order_token,order_boss_email){ //支付订单
      axios({
        withCredentials:true,
        url:'orders/payorder/',
        method:"post",
        data:{
          otoken:order_token,
          uemail:order_boss_email,
        }
      }).then(res => {
        if(res.data.is_payed == 'yes'){
            this.$emit('refreshsorders') //刷新订单
            this.$emit('closeorderinfo') //需要关闭订单详细信息重新点 因为没法自动更新信息
          this.$emit('getnewinfo') //刷新个人信息中的钱包
        }else if(res.data.lack_money == 'yes'){
          alert('金额不足请充值后支付')
        }
      })
    },

    cancelorder(order_token,order_boss_email){ //取消订单
      axios({
        withCredentials:true,
        url:'orders/bcancelorder/',
        method:"post",
        data:{
          otoken:order_token,
          uemail:order_boss_email,
        }
      }).then(res => {
        if(res.data.is_login == 'yes'){
          if(res.data.is_order_cancel == 'yes'){
            this.$emit('refreshsorders') //刷新订单
            this.$emit('closeorderinfo') //需要关闭订单详细信息重新点 因为没法自动更新信息
            this.$emit('refreshorderlist') //刷新主页代接订单
            this.$emit('getnewinfo') //刷新个人信息中的钱包
            alert('退回金额:'+res.data.coin_refund)
          }
        }
      })
    },
    cancelrefund(order_token){  //取消申请退款
      this.button_is_loading = true
      axios({
        withCredentials:true,
        url:'orders/bcancelrefund/',
        method:"post",
        data:{
          otoken:order_token,
        }
      }).then(res => {
        if(res.data.is_login == 'yes'){
          if(res.data.is_cancel_refund == 'yes'){
            this.$emit('refreshsorders') //刷新订单
            this.$emit('closeorderinfo') //需要关闭订单详细信息重新点 因为没法自动更新信息
            this.button_is_loading = false
            alert('已经取消申请退款')
          }
        }else{
          this.button_is_loading = false
          alert('请重新登录')
        }
      })
    },
    agreecomplete(order_token){  //同意结单
      this.button_is_loading = true
      axios({
        withCredentials:true,
        url:'orders/bagreeok/',
        method:"post",
        data:{
          otoken:order_token,
        }
      }).then(res => {
        if(res.data.is_login == 'yes'){
          if(res.data.agree_success == 'yes'){
            this.button_is_loading = false
            this.$emit('refreshsorders') //刷新订单
            this.$emit('closeorderinfo') //需要关闭订单详细信息重新点 因为没法自动更新信息
          }
        }else{
          this.button_is_loading = false
          alert('请重新登录')
        }
      })
    },
    dorefund(boss_email,order_token,totalmoney){ //学生申请退款
      this.button_is_loading = true
      if(this.refundmoney > 0 && this.refundmoney <= totalmoney){
        axios({
          withCredentials:true,
          url:'orders/brefundorder/',
          method:"post",
          data:{
            otoken:order_token,
            uemail:boss_email,
            remoney:this.refundmoney,
            reason:this.refundreason,
          }
        }).then(res => {
          if(res.data.is_login == 'yes'){
            if(res.data.is_order_refund == 'doing'){  //接单后一小时申请
              this.$emit('refreshsorders') //刷新订单
              this.$emit('closeorderinfo') //需要关闭订单详细信息重新点 因为没法自动更新信息
              this.button_is_loading = false
              this.isshowrefundmenu = true  //要加这句话
              this.refundmoney = 0
              this.refundreason=''
              this.isshowrefundmenu = -1 //关闭退款菜单
            }else if(res.data.is_order_refund == 'yes'){  //被接后1小时内申请
              this.$emit('refreshsorders') //刷新订单
              this.$emit('closeorderinfo') //需要关闭订单详细信息重新点 因为没法自动更新信息
              this.$emit('getnewinfo') //刷新个人信息中的钱包
              this.button_is_loading = false
              this.isshowrefundmenu = true
              this.refundmoney = 0
              this.refundreason=''
              this.isshowrefundmenu = -1 //关闭退款菜单
              alert('退回金额:'+res.data.coin_refund)
            }
          }else {
            this.button_is_loading = false
            alert('请重新登录')
          }
        })
      }else{
        this.refundmoney = 0
        this.button_is_loading = false
        alert('请重新输入')
      }
    },
    bhideorder(order_token){
      axios({
        withCredentials:true,
        url:'orders/bhideorder/',
        method:"post",
        data:{
          otoken:order_token,
        }
      }).then(res => {
        if(res.data.is_login == 'yes'){
          if(res.data.is_hide == 'yes'){
            this.$emit('refreshsorders') //刷新订单
            this.$emit('closeorderinfo') //需要关闭订单详细信息重新点 因为没法自动更新信息
            alert("订单删除成功")
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
.cardbackground{  /*选中后换的背景颜色*/
  background-color: #F5F5F5;
}
.tablepading{
  width: 100%;
}

.rightposition{
  position: absolute;
  right: 10%;
}
.rightposition2{
  position: absolute;
  right: 1%;
}
</style>