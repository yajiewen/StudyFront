<template>
 <div id="backstage">
   <div class="column is-one-quarter is-offset-4 loginblock" v-if="!shownavbar">
     <div class="box" id="login">
       <div class="field" >
         <label class="label">管理员账号</label>
         <div class="control  has-icons-left has-icons-right" >
           <input class="input" type="email" placeholder="Admin account" v-model.trim="uaccount" onKeyUp="value=value.replace(/[^\d|chun]/g,'')" onkeyup="this.value=this.value.replace(/\s+/g,'')" maxlength="30">
           <span class="icon is-small is-left">
           <i class="fas fa-user-cog"></i>
          </span>
           <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
         </div>
       </div>

       <div class="field">
         <label class="label">密码</label>
         <div class="control has-icons-left" >
           <input class="input" type="password" v-on:keyup.enter="sendlogin"  placeholder="********" v-model.trim="upassword" key="pwd" onKeyUp="value=value.replace(/[^\d|chun]/g,'')" onkeyup="this.value=this.value.replace(/\s+/g,'')" maxlength="16">
           <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
         </div>
         <p class="help is-danger">{{message}}</p>
       </div>

       <div class="field">
         <button class="button is-link is-fullwidth" v-on:click="sendlogin" ><strong>登&nbsp;&nbsp;录</strong></button>
       </div>
       <hr>
     </div>
   </div>
<!-- 主页面-->
   <div v-if="shownavbar">
     <!-- 导航栏-->
     <backnavbar @showsusrinfoblock="showstageusrinfo" @showcusmpleteblock="showcuscomplete" @showcusinterveneblock="showcusinterv" @showstudentblock="showstudent" @showidentityblock="showinden" @showaccountblock="showacc"></backnavbar>
      <!--  body内容-->
      <badaccount @refresha="getbadaccountlist" :badinfo="badainfo" v-show="blockshow.account_v"></badaccount>
      <identityv @refreshi="getidentitylist" :identinfo="ideninfo" v-show="blockshow.identity_v"></identityv>
      <studentv @refreshs="getstudetlist" :stuinfo="stuinfo" v-show="blockshow.student_v"></studentv>
      <ordertocomplete @refreshco="getcorderlist" :corderinfo="corderinfo" v-show="blockshow.cuscomple_v"></ordertocomplete>
      <cintervene v-show="blockshow.cusinter_v"></cintervene>
      <stageusrinfo v-show="blockshow.stageusrinfo_v" :stage_usr_info="stage_usr_info"></stageusrinfo>
   </div>

 </div>
</template>

<script>
import axios from 'axios'
import backnavbar from "../components/backnavbar";
import badaccount from "../components/badaccount";
import identityv from "../components/identityv";
import studentv from "../components/studentv";
import cintervene from "../components/cintervene";
import ordertocomplete from "../components/ordertocomplete";
import stageusrinfo from "../components/stageusrinfo";

export default {
  name: "backstage",
  components:{
    backnavbar,
    badaccount,
    identityv,
    studentv,
    cintervene,
    ordertocomplete,
    stageusrinfo,
  },
  data(){
    return{
      uaccount: '',
      upassword: '',
      message:'',
      //垃圾账号信息
      badainfo:{
        num:0,
        infolist:[],
      },
      // 待结单列表
      corderinfo:{
        num:0,
        infolist:[],
      },
      //身份审核列表
      ideninfo:{
        num:0,
        infolist:[],
      },
      //学籍审核列表
      stuinfo:{
        num:0,
        infolist:[],
      },
      // 平台用户统计信息
      stage_usr_info:{
        regs_num:0,
        id_identified_num:0,
        teacher_num:0,
        buy_find_teacher_num:0,
      },
      //模块显示
      shownavbar:false,
      blockshow:{
        account_v:false,
        identity_v:false,
        student_v:false,
        cuscomple_v:false,
        cusinter_v:false,
        stageusrinfo_v:true,
      }
    }
  },
  created() {
    //请求垃圾账号信息
    axios({
      withCredentials:true,
      method:'get',
      url:'backstage/badaccountlist/'
    }).then(res => {
      if(res.data.is_login=='yes'){
        this.badainfo.num = res.data.account_num
        this.badainfo.infolist = res.data.bad_account_list
      }
    })

    //请求待结单列表
    axios({
      withCredentials:true,
      method:'get',
      url:'backstage/orderstocomplete/'
    }).then(res => {
      if(res.data.is_login=='yes'){
        this.corderinfo.num = res.data.order_num
        this.corderinfo.infolist = res.data.order_list
      }
    })

    //请求身份审核列表
    axios({
      withCredentials:true,
      method:'get',
      url:'backstage/ilist/'
    }).then(res => {
      if(res.data.is_login=='yes'){
        this.shownavbar = true
        this.ideninfo.num = res.data.identity_num
        this.ideninfo.infolist = res.data.identity_list
      }
    })

    //请求学籍审核列表
    axios({
      withCredentials:true,
      method:'get',
      url:'backstage/slist/'
    }).then(res => {
      if(res.data.is_login=='yes'){
        this.stuinfo.num = res.data.student_num
        this.stuinfo.infolist = res.data.student_list
      }
    })

    //请求平台用户统计信息
    axios({
      withCredentials:true,
      method:'get',
      url:'backstage/stageusrinfo/'
    }).then(res => {
      if(res.data.is_login=='yes'){
          this.stage_usr_info.regs_num = res.data.regs_num
          this.stage_usr_info.id_identified_num = res.data.id_identified_num
          this.stage_usr_info.teacher_num = res.data.teacher_num
          this.stage_usr_info.buy_find_teacher_num = res.data.buy_find_teacher_num
      }
    })
  },
  methods:{
    showacc(){ //显示垃圾账号模块
      for(let keyvalue of Object.keys(this.blockshow)){
        if(keyvalue == 'account_v'){
          this.blockshow[keyvalue]= true
        }else{
          this.blockshow[keyvalue]= false
        }
      }
    },
    showinden(){ //显示垃圾账号模块
      for(let keyvalue of Object.keys(this.blockshow)){
        if(keyvalue == 'identity_v'){
          this.blockshow[keyvalue]= true
        }else{
          this.blockshow[keyvalue]= false
        }
      }
    },
    showstudent(){ //显示垃圾账号模块
      for(let keyvalue of Object.keys(this.blockshow)){
        if(keyvalue == 'student_v'){
          this.blockshow[keyvalue]= true
        }else{
          this.blockshow[keyvalue]= false
        }
      }
    },
    showcuscomplete(){ // 显示客服结单模块
      for(let keyvalue of Object.keys(this.blockshow)){
        if(keyvalue == 'cuscomple_v'){
          this.blockshow[keyvalue]= true
        }else{
          this.blockshow[keyvalue]= false
        }
      }
    },
    showcusinterv(){ //显示垃圾账号模块
      for(let keyvalue of Object.keys(this.blockshow)){
        if(keyvalue == 'cusinter_v'){
          this.blockshow[keyvalue]= true
        }else{
          this.blockshow[keyvalue]= false
        }
      }
    },
    // 显示平台用户信息统计模块
    showstageusrinfo(){
      for(let keyvalue of Object.keys(this.blockshow)){
        if(keyvalue == 'stageusrinfo_v'){
          this.blockshow[keyvalue]= true
        }else{
          this.blockshow[keyvalue]= false
        }
      }
    },
    //请求垃圾账号信息
    getbadaccountlist(){
      //请求垃圾账号信息
      axios({
        withCredentials:true,
        method:'get',
        url:'backstage/badaccountlist/'
      }).then(res => {
        if(res.data.is_login=='yes'){
          console.log("获取bad");
          this.badainfo.num = res.data.account_num
          this.badainfo.infolist = res.data.bad_account_list
        }else{
          alert('请重新登录')
        }
      })
    },
    //请求身份审核列表
    getidentitylist(){
      //请求身份审核列表
      axios({
        withCredentials:true,
        method:'get',
        url:'backstage/ilist/'
      }).then(res => {
        if(res.data.is_login=='yes'){
          console.log("获取i");
          this.ideninfo.num = res.data.identity_num
          this.ideninfo.infolist = res.data.identity_list
        }else{
          alert('请重新登录')
        }
      })
    },
    //请求学籍审核列表
    getstudetlist(){
      //请求学籍审核列表
      axios({
        withCredentials:true,
        method:'get',
        url:'backstage/slist/'
      }).then(res => {
        if(res.data.is_login=='yes'){
          console.log("获取s");
          this.stuinfo.num = res.data.student_num
          this.stuinfo.infolist = res.data.student_list
        }else{
          alert('请重新登录')
        }
      })
    },
    getcorderlist(){
      axios({
        withCredentials:true,
        method:'get',
        url:'backstage/orderstocomplete/'
      }).then(res => {
        if(res.data.is_login=='yes'){
          this.corderinfo.num = res.data.order_num
          this.corderinfo.infolist = res.data.order_list
        }
      })
    },
    sendlogin(){
      if (this.uaccount == '' || this.upassword == '')
      {
        this.message = '*账号密码不可为空'
        setTimeout(() =>{this.message=''},1000)
      }
      else
      {
        axios({
          withCredentials : true,
          url:'backstage/login/',
          method:'post',
          data: {
            account: this.uaccount,
            password: this.upassword,
          }

        }).then(res => {
          if (res.data.is_login == 'yes'){
            this.shownavbar = true
            //登录成功后进行数据请求
            //请求垃圾账号信息
            axios({
              withCredentials:true,
              method:'get',
              url:'backstage/badaccountlist/'
            }).then(res => {
              if(res.data.is_login=='yes'){
                this.badainfo.num = res.data.account_num
                this.badainfo.infolist = res.data.bad_account_list
              }
            })

            //请求待结单列表
            axios({
              withCredentials:true,
              method:'get',
              url:'backstage/orderstocomplete/'
            }).then(res => {
              if(res.data.is_login=='yes'){
                this.corderinfo.num = res.data.order_num
                this.corderinfo.infolist = res.data.order_list
              }
            })

            //请求身份审核列表
            axios({
              withCredentials:true,
              method:'get',
              url:'backstage/ilist/'
            }).then(res => {
              if(res.data.is_login=='yes'){
                this.shownavbar = true
                this.ideninfo.num = res.data.identity_num
                this.ideninfo.infolist = res.data.identity_list
              }
            })

            //请求学籍审核列表
            axios({
              withCredentials:true,
              method:'get',
              url:'backstage/slist/'
            }).then(res => {
              if(res.data.is_login=='yes'){
                this.stuinfo.num = res.data.student_num
                this.stuinfo.infolist = res.data.student_list
              }
            })

            //请求平台用户统计信息
            axios({
              withCredentials:true,
              method:'get',
              url:'backstage/stageusrinfo/'
            }).then(res => {
              if(res.data.is_login=='yes'){
                this.stage_usr_info.regs_num = res.data.regs_num
                this.stage_usr_info.id_identified_num = res.data.id_identified_num
                this.stage_usr_info.teacher_num = res.data.teacher_num
                this.stage_usr_info.buy_find_teacher_num = res.data.buy_find_teacher_num
              }
            })

          }else{
            this.message = '账号密码不匹配'
            setTimeout(()=>{this.message=''},1000)
          }
        })
      }
    },

  }
}
</script>

<style scoped>
label{
  font-family: Serif;
}
button{
  font-family: Serif;
}
input{
  font-family: Serif;
}
a{
  font-family: Serif;
}
strong{
  font-family: Serif;
}
.loginblock{
  position:absolute;
  top:25%;

}
</style>