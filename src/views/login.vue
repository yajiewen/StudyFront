<template>
  <Navabar v-bind:issee='is_show_log_button'></Navabar>
  <div class="column is-one-quarter is-offset-7">
    <div class="box" id="login">
      <div class="field" >
        <label class="label">邮箱</label>
        <div class="control  has-icons-left has-icons-right" >
          <input class="input" type="email" placeholder="User Email" v-model.trim="uemail" onKeyUp="value=value.replace(/[^\d|chun]/g,'')" onkeyup="this.value=this.value.replace(/\s+/g,'')" maxlength="30">
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
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
      <a v-on:click="tofindpassword" style="color: hsl(204, 86%, 53%) ;font-style: italic;text-align: right;">找回密码</a>

      <div class="field">
        <button class="button is-link is-fullwidth" v-on:click="sendlogin" ><strong>登&nbsp;&nbsp;录</strong></button>
      </div>
      <hr>
      <div class="field">
        <button class="button is-primary is-outlined  is-fullwidth" v-on:click="toregister" ><strong>前&nbsp;往&nbsp;注&nbsp;册</strong></button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Navabar from "../components/Navabar";

  export default {
    name: "login",
    components:{
      Navabar
    },
    data(){
      return{
        uemail: '',
        upassword: '',
        message:'',
        is_show_log_button:true,
      }
    },
    methods:{
      sendlogin(){
/*        console.log(this.uemail);
        console.log(this.upassword);*/
        if (this.uemail == '' || this.upassword == '')
        {
          this.message = '*账号密码不可为空'
          setTimeout(() =>{this.message=''},1000)
        }
        else
        {
          axios({
            withCredentials : true,
            url:'account/login/',
            method:'post',
            data: {
              uemail: this.uemail,
              upassword: this.upassword,
            }

          }).then(res => {
            console.log(res.data);
            if (res.data.is_login =='yes' && res.data.is_verify =='yes')
            {
              this.$router.push('/')
            }
            else if(res.data.is_login =='no' && res.data.is_verify =='yes')
            {
              this.message = '用户名密码不匹配'
              setTimeout(() =>{this.message=''},1000)
            }
            else if(res.data.is_login =='no' && res.data.is_verify =='no')
            {
              this.message = '*邮箱未验证'
              setTimeout(() =>{this.message=''},1000)
            }

          })
        }
      },
      tofindpassword(){
        this.$router.push('/findpass')
      },
      toregister(){
        this.$router.push('/register')
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