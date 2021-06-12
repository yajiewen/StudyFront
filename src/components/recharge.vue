<template>
  <div id="recharge" class="column is-half">
    <div class="field has-addons " v-show="!is_show.show_wechatpay">
      <p class="control">
    <span class="select">
      <select>
        <option>¥</option>
      </select>
    </span>
      </p>
      <p class="control">
        <input class="input" type="number" placeholder="Amount of money" v-model.number="money" onkeyup="this.value=this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')">
      </p>
      <p class="control">
        <a class="button" v-on:click="buycoin">
          充 值
        </a>
      </p>
    </div>
    <div class="field" v-show="is_show.show_wechatpay">
      <h4 class="title is-4">思达迪 收银台</h4>
      <img src="../assets/WePayLogo.png" width="130">
      <div class="has-text-centered">
        <p class="font2">充值金额 : {{money}} 元</p>
        <div id="codeimg" class="qrcode_content">

        </div>
        <br>
        <img src="../assets/subwords.png" width="170">
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import QRCode from 'qrcodejs2'
let qrcode = '' //定义一个二维码容器

export default {
  name: "recharge",
  data(){
    return{
      money:10,
      order_token:'',
      is_close_time:'no',
      is_show:{
        show_wechatpay:false,
      },
      show_danger:{
        moneydanger:false,
      }

    }
  },
  methods:{
      buycoin(){
        if(this.money >=0.01){
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
                this.order_token = res.data.order_token //获取订单号
                this.is_show.show_wechatpay = true
                //生成二维码并展示扫码页面
                if (qrcode){
                  qrcode = null
                }
                qrcode = new QRCode('codeimg',{
                  text: res.data.code_url,
                  width: 170,
                  height: 170,
                  colorDark: '#000000',
                  colorLight: '#ffffff',
                  correctLevel: QRCode.CorrectLevel.H,
                })

                console.log(this.order_token);
                let order_token = this.order_token
                let num = 0
                let timer = setInterval((oorder_token=order_token) =>{
                  axios({
                    withCredentials : true,
                    url:'wechatpay/payoutcome/' + oorder_token + '/',
                    method:'get',
                  }).then(res => {
                    if(res.data.is_paid == 'yes'){
                      console.log(res.data);
                      this.is_show.show_wechatpay = false
                      //发送更新用户信息
                      this.$emit('getnewinfo') //刷新个人信息中的钱包
                      qrcode.clear()
                      alert("充值成功,金额:"+ this.money)
                      clearInterval(timer)
                    }else{
                      num += 1
                      if(num == 30)
                      {
                        clearInterval(timer)
                      }
                    }
                  })
                },3000)
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
      },
  },
}
</script>

<style scoped>
.font2{  /*年级 学科 ...字体大小*/
  font-size: 0.875em
}

.qrcode_content {
  display: flex;
  justify-content: center;
}

</style>