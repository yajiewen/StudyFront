<template>
  <div id="recharge" class="column is-half">
    <div class="field has-addons has-addons-centered">
      <p class="control">
    <span class="select">
      <select>
        <option>¥</option>
      </select>
    </span>
      </p>
      <p class="control">
        <input class="input" type="number" placeholder="Amount of money" v-model="money">
      </p>
      <p class="control">
        <a class="button is-primary" v-on:click="buycoin">
          充 值
        </a>
      </p>
    </div>

    <div class="qrcode" ref="codeimg">

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import QRCode from 'qrcodejs2'

export default {
  name: "recharge",
  data(){
    return{
      money:0,
      is_show:{
        show_wechatpay:false,
        show_payoutcome:false,
      },
      show_danger:{
        moneydanger:false,
      }
    }
  },
  methods:{
      buycoin(){
        if(this.money !=0){
          axios({
            withCredentials : true,
            url:'wechatpay/buycoin/',
            method:'post',
            data: {
              coin_n:this.money
            }
          }).then(res => {
            if(res.data.is_login == 'yes'){
              if (res.data.code_url != 'no'){
                console.log(res.data.code_url);
                //生成二维码并展示扫码页面
                let qrcode = new QRCode('codeimg',{
                  text: res.data.code_url,
                  width: 100,
                  height: 100,
                  colorDark: '#000000',
                  colorLight: '#ffffff',
                  correctLevel: QRCode.CorrectLevel.H,
                })
              }
            }else{
              alert("请重新登录")
            }
          })
        }else{
          this.show_danger.moneydanger = true
          setTimeout(() =>{
            this.show_danger.moneydanger = false
          },1000)
        }
      }
  }
}
</script>

<style scoped>

</style>