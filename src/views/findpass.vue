<template>
  <Navabar v-bind:issee='is_show_log_button'></Navabar>
  <div class="column is-one-quarter is-offset-7" id="findpass">
    <div class="box">
      <div class="field">
        <img src="../assets/login.png" >
      </div>
      <div class="control has-icons-left has-icons-right">
        <input class="input" type="email" placeholder="Email" v-model.trim="uemail" maxlength="30">
        <span class="icon is-small is-left">
    <i class="fas fa-envelope"></i>
    </span>
        <span class="icon is-small is-right">
      <i class="fas fa-check"></i>
    </span>
      </div>
      <hr>
      <div class="field">
        <button v-bind:class="buttonstyle" v-on:click="getpassword" ><strong>找&nbsp;回&nbsp;密&nbsp;码</strong></button>
      </div>

      <div class="field">
        <button class="button is-primary is-outlined is-fullwidth " v-on:click="tochangepwd" ><strong>修&nbsp;改&nbsp;密&nbsp;码</strong></button>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import Navabar from "../components/Navabar";

export default {
  name: "findpass",
  components:{
    Navabar,
  },
  data(){
    return{
      uemail: '',
      buttonstyle:'button is-link is-fullwidth',
      is_show_log_button:true,
    }
  },
  methods:{
    getpassword(){
      this.buttonstyle = 'button is-link is-fullwidth is-loading'
      if (this.uemail !=''){
        axios({
          withCredentials : true,
          url:'account/sendfindpwd/',
          method:'post',
          data: {
            uemail: this.uemail,
          }
        }).then(res => {
          if(res.data.is_verified =='yes'){
            if (res.data.is_send_password == 'yes'){
              this.buttonstyle = 'button is-link is-fullwidth'
              alert('邮件发送成功!')
              this.$router.push('/login')
            }else{
              this.buttonstyle = 'button is-link is-fullwidth'
              alert('邮箱不存在')
            }
          }else{
            this.buttonstyle = 'button is-link is-fullwidth'
            alert('邮箱未验证,请前往邮箱点击链接完成验证!')
          }
        })
      }else
      {
        alert('请输入邮箱')
      }
    },
    tochangepwd(){
      this.$router.push('/changepwd')
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