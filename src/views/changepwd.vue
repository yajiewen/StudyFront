<template>
  <Navabar v-bind:issee='is_show_log_button'></Navabar>
  <div class="column is-one-quarter is-offset-7">
    <div class="box" id="changepwd">
      <div class="field">
        <img src="../assets/login.png" >
      </div>
      <div class="field" >
        <label class="label">邮箱&nbsp;&nbsp;{{memail}}</label>
        <div class="control  has-icons-left" >
          <input class="input" type="email" placeholder="User Email" v-model.trim="uemail" maxlength="30">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">原密码&nbsp;&nbsp;{{mpass}}</label>
        <div class="control has-icons-left" >
          <input class="input" type="password" placeholder="******** len(8~16)" v-model.trim="upassword" key="pwd1"  onkeyup="this.value=this.value.replace(/\s+/g,'')" maxlength="16">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <label class="label">新密码&nbsp;&nbsp;{{mpass1}}</label>
        <div class="control has-icons-left" >
          <input class="input" type="password" placeholder="******** len(8~16)" v-model.trim="upassword1" key="pwd2"  onkeyup="this.value=this.value.replace(/\s+/g,'')" maxlength="16">
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </div>
      </div>
      <div class="field">
        <button class="button is-link  is-fullwidth" v-on:click="changepassword" ><strong>修&nbsp;改&nbsp;密&nbsp;码</strong></button>
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
  name: "changepwd",
  components:{
    Navabar
  },
  data(){
    return{
      uemail: '',
      upassword: '',
      upassword1:'',
      memail:'',
      mpass:'',
      mpass1:'',
      is_show_log_button:true,

    }
  },
  methods:{
    tologin(){
      this.$router.push("/login")
    },
    changepassword() {
       if (this.mpass == '√' && this.memail =='√' && this.mpass1 =='√'){
         axios({
           withCredentials: true,
           url: 'account/newpassword/',
           method: 'post',
           data: {
             uemail: this.uemail,
             upassword: this.upassword,
             unewpassword: this.upassword1,
           }
         }).then(res => {
          if(res.data.is_verified == 'yes'){
            if (res.data.is_update_password == 'no'){
              if (res.data.is_matching == 'no') {
                this.mpass = '原密码不正确'
                setTimeout(() => {
                  this.mpass = ''
                }, 1000)
              }
            }else{
              alert('修改密码成功!')
            }
          }else{
            this.buttonstyle = 'button is-link is-fullwidth'
            alert('邮箱未验证,请前往邮箱点击链接完成验证!')
          }
         })
       }else{
         alert('输入不合法,请重新输入!')
       }
    }
  },
  watch:{
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
      if (this.upassword1.length >=8 && this.upassword1.length <=16){
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