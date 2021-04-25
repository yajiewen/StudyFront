<template>
  <Navabar v-bind:issee='is_show_log_button'></Navabar>
  <div class="column is-one-quarter">
    <div class="box" id="register">
      <div class="field" >
        <label class="label">用户名&nbsp;&nbsp;{{mname}}</label>
        <div class="control  has-icons-left" >
          <input class="input" type="text" v-bind:class="{'is-danger':namedanger}" placeholder="User Name len(6~16)" v-model.trim="uname" onkeyup="value=value.replace(/[^\w\u4E00-\u9FA5]/g, '')" maxlength="16">
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>
        </div>
        <p class="help is-danger" v-show="namedanger">用户名已存在</p>
      </div>

      <div class="field" >
        <label class="label">邮箱&nbsp;&nbsp;{{memail}}</label>
        <div class="control  has-icons-left" >
          <input class="input" type="email" v-bind:class="{'is-danger':emaildanger}" placeholder="User Email" v-model.trim="uemail"  onKeyUp="value=value.replace(/[^\d|chun]/g,'')" onkeyup="this.value=this.value.replace(/\s+/g,'')" maxlength="30">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
        <p class="help is-danger" v-show="emaildanger">邮箱已注册</p>
      </div>

      <div class="field">
        <label class="label">密码&nbsp;&nbsp;{{mpass}}</label>
        <div class="control has-icons-left" >
          <input class="input" type="password" placeholder="******** len(8~16)" v-model.trim="upassword" key="pwd1" onKeyUp="value=value.replace(/[^\d|chun]/g,'')" onkeyup="this.value=this.value.replace(/\s+/g,'')" maxlength="16">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <label class="label">确认密码&nbsp;&nbsp;{{mpass1}}</label>
        <div class="control has-icons-left" >
          <input class="input" type="password" placeholder="******** len(8~16)" v-model.trim="upassword1" key="pwd2" onKeyUp="value=value.replace(/[^\d|chun]/g,'')" onkeyup="this.value=this.value.replace(/\s+/g,'')" maxlength="16">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <button v-bind:class="buttonstyle" v-on:click="registeraccount" ><strong>注&nbsp;&nbsp;册</strong></button>
      </div>

      <div class="field">
        <button class="button is-primary is-outlined  is-fullwidth" v-on:click="tologin" ><strong>前&nbsp;往&nbsp;登&nbsp;录</strong></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navabar from "../components/Navabar";

export default {
  name: "register",
  components:{
    Navabar
  },
  data(){
    return{
      uname:'',
      uemail: '',
      upassword: '',
      upassword1:'',
      mname:'',
      memail:'',
      mpass:'',
      mpass1:'',
      buttonstyle:'button is-link is-fullwidth',
      is_show_log_button: true,
      namedanger:false,
      emaildanger:false,

    }
  },
  methods:{
     registeraccount(){
       this.buttonstyle = 'button is-link is-fullwidth is-loading'
       if(this.mname =='√' && this.memail == '√' && this.mpass == '√' && this.mpass1 == '√'){
          axios({
            withCredentials : true,
            url:'https://127.0.0.1:8081/account/add/',
            method:'post',
            data: {
              uname: this.uname,
              uemail: this.uemail,
              upassword: this.upassword
            }
          }).then(res => {
             console.log(res.data)
            if(res.data.is_add == 'no'){
              if(res.data.uemail_exist =='yes'){
                this.emaildanger = true
              }else if(res.data.uname_exist == 'yes'){
                this.namedanger = true
              }
            }else{
              for(let i =0;i<=100;i++){
                this.processvalue++
              }
              alert('注册成功!请前往邮箱激活后登录!')
              this.buttonstyle = 'button is-link is-fullwidth '
              this.$router.push('/login')
            }
            setTimeout(() => {this.emaildanger = false,this.namedanger = false},5000)
          })
       }else{
         this.buttonstyle = 'button is-link is-fullwidth '
         alert('输入不合法,请重新输入!')
       }
       this.buttonstyle = 'button is-link is-fullwidth '
     },
    tologin(){
       this.$router.push("/login")
    }
  },
  watch:{
    uname(){
      if (this.uname.length >=6 && this.uname.length <=16){
        this.mname = '√'
      }else{
        this.mname = ''
      }
    },
    uemail(){
      if(this.uemail.match(/^\w+@\w+\.\w+$/i)){
        this.memail='√'
      }else{
        this.memail=''
      }
    },
    upassword(){
      if (this.upassword.length >=8 && this.upassword.length <=16)
      {
        this.mpass = '√'
      }else{
        this.mpass = ''
      }
    },
    upassword1(){
      if (this.upassword == this.upassword1){
        this.mpass1 = '√'
      }else{
        this.mpass1 = ''
      }
    }
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
</style>