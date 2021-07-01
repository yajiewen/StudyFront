<template>
 <div id="sendorderinfo" class="column">
  <div class="card-content">
    <div class="notification ">
      订 单 详 情
    </div>
    <br>
    <div class="columns">
      <!--学生信息   -->
      <div class="column font2 is-half">
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
    </div>

    <div class="columns">
      <!--老师信息  -->
      <div class="column is-half font2" v-if="order_info.order_worker_email">
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
          <button class="button is-fullwidth is-small is-left" @click="showtinfo"><i class="fas fa-chevron-down"></i></button>
          <div class="content" v-show="is_show_winfo">
            <ul>
              <li class="font2">年龄:{{workerinfo.usr_age}}</li>
              <li class="font2">性别:{{workerinfo.usr_sex}}</li>
              <li class="font2">毕业学校:{{workerinfo.usr_school}}</li>
              <li class="font2">毕业学校:{{workerinfo.usr_major}}</li>
              <li class="font2">执教年级:{{workerinfo.usr_teaching_grade}}</li>
              <li class="font2">执教学科:{{workerinfo.usr_teaching_subjects}}</li>
              <li class="font2">个人经历:{{workerinfo.usr_experience}}</li>
              <li class="font2">联系电话:{{workerinfo.usr_phone_number}}</li>
              <li class="font2"><span class="tag is-link is-light" v-if="workerinfo.usr_identity_verify == 1">身 份 已 认 证 v</span><span class="tag is-light" v-else>身 份 未 认 证</span></li>
              <li class="font2"><span class="tag is-link is-light" v-if="workerinfo.use_certificate_verify == 1">学 籍 已 认 证 v</span><span class="tag is-light" v-else >学 籍 未 认 证</span></li>
            </ul>
          </div>
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
        <!--       <li><span class="tag is-light">保 证 金</span> {{order_info.order_worker_earnest_money}} 元</li>-->
        <li>
          <div class="columns">
            <div class="column">
              <p class="font2">
                <span class="tag is-light">订 单 状 态</span>
                <span class="tag is-dark " v-if="order_info.order_status == 0">待付款</span>
                <span class="tag is-black " v-if="order_info.order_status == 1">待接单</span>
                <span class="tag is-link " v-if="order_info.order_status == 2">待完成</span>
                <span class="tag is-success " v-if="order_info.order_status == 3">已完成</span>
                <span class="tag is-success " v-if="order_info.order_status == 3 && order_info.order_is_evalute == 1">已评价</span>
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
      </ul>
    </div>
    <br>
    <div v-if="order_info.order_status == 3 && order_info.order_is_evalute == 0">
      <div class="columns">
        <div class="column">
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item" aria-label="like" v-for="(keyvalue,keyname) in heartcolors" v-on:click="changecolor(keyname)">
              <span class="icon is-small" v-bind:class="{'has-text-grey-lighter':!keyvalue,'has-text-link':keyvalue}">
                <i class="fas fa-heart" aria-hidden="true"></i>
              </span>
              </a>
              <span class="font3">{{heartcontent}}</span>
            </div>
          </nav>
        </div>
      </div>
      <div class="columns">
        <div class="column is-three-quarters">
          <div class="field">
            <div class="control">
              <textarea class="textarea is-link font2" placeholder="对此单进行评价" maxlength="290" v-model="econtent"></textarea>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-small" v-on:click="sendevaluate">评价</button> <span class="has-text-success">{{successmess}}</span>
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
  name: "sendorderinfo",
  props:{
    order_info:Object,
    is_show_winfo:Boolean,
    workerinfo:Object,
  },
  data(){
    return{
/*      workerinfo:{
        usr_age:0,
        usr_sex:'',
        usr_school:'',
        usr_teaching_subjects:'',
        usr_teaching_grade : '',
        usr_experience : '',
        usr_credit: '',
        usr_phone_number: '',
        usr_identity_verify: 0,
        use_certificate_verify: 0,
      }*/
      heartcolors:{
        heart1:true,
        heart2:true,
        heart3:true,
        heart4:true,
        heart5:true,
      },
      escore:5,
      econtent:'',
      successmess:'',

    }
  },
  methods:{
    showtinfo(){
      this.$emit('gettinfo',this.order_info.order_worker_email)
    },
    changecolor(keyname){
      let i = 0
      for(let keyv of Object.keys(this.heartcolors)){
        if(keyv != keyname && i ==0){
          this.heartcolors[keyv] = true
        }else{
          i = 1
          this.heartcolors[keyv] = false
        }
      }
      this.heartcolors[keyname] = true
    },
    sendevaluate(){
      axios({
        withCredentials:true,
        url:'https://127.0.0.1:8081/evaluate/evaluateworker/',
        method:'post',
        data:{
          otoken:this.order_info.order_token,
          worker_email:this.order_info.order_worker_email,
          content:this.econtent,
          score:this.escore
        }
      }).then(res => {
        if(res.data.is_login == 'yes'){
            if(res.data.evalu_success =='yes'){
              this.successmess = '评价成功!'
              setTimeout(()=>{this.$emit('refreshsorders')},1000)
            }
        }else{
          alert('请重新登录')
        }
      })
    }
  },
  computed:{
    heartcontent(){
      let mess = ''
      if(this.heartcolors.heart1 && !this.heartcolors.heart2){
        mess = '非常不满意 ヽ(｀Д´)ﾉ 1分'
        this.escore =1
      }
      if(this.heartcolors.heart2 && !this.heartcolors.heart3){
        mess = '不满意 (๑`^´๑) 2分'
        this.escore =2
      }
      if(this.heartcolors.heart3 && !this.heartcolors.heart4){
        mess = '一般 …(﹂_﹂)… 3分'
        this.escore =3
      }
      if(this.heartcolors.heart4 && !this.heartcolors.heart5){
        mess = '满意 (*^-^*) 4分'
        this.escore =4
      }
      if(this.heartcolors.heart5){
        mess = '非常满意 (*^▽^*) 5分'
        this.escore =5
      }
      return mess
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
.heartcolor{
  background-color: red;
}
</style>