<template>
  <div id="irecommend" class="column is-half" >
    <div class="notification is-link">
     你可能感兴趣的订单/ / / / / / / / / / / / /共 {{orderlistinfo.ordernum}} 单
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

    <div class="inbox-messages" >
      <div v-for="(order, index) in orderlistinfo.ordersinfo.slice(slicestart,sliceend)" v-bind:class="{cardbackground:index == click_item_id}"  v-bind:id="index" v-on:click="showMessage(index)">
        <div class="columns">
          <div class="column font2"><p class="font3">&nbsp{{order.order_teaching_grade}}</p></div>
          <div class="column font2"><p class="font3">{{order.order_teaching_subjects}}</p></div>
          <div class="column font2"><p class="font3">{{order.order_total_money}} 元</p></div>
          <div class="column font2"><a class="font3" v-on:click="showdetailf(index,order.order_teaching_grade,order.order_teaching_subjects)">详细信息</a></div>
          <div class="column font2">
            <button v-if="usr_info.uemail !=order.order_boss_email " class="button is-small" v-on:click="cshowtakemenu(index)"><i class="fas fa-chevron-down"></i></button>
            <button v-else class="button is-small" disabled="usr_info.uemail == order.order_boss_email " title="我发的定单!"><i class="fas fa-user-alt"></i></button>
          </div>

        </div>
        <!--详细信息      -->
        <div v-if="index == showdetailinfo" class="content">
          <ul class="font3" v-if="index == showdetailinfo">
            <li>年级: {{ order.order_teaching_grade }}</li>
            <li>科目: {{ order.order_teaching_subjects }}</li>
            <li>单价: {{ order.order_hourly_money }} 元/小时</li>
            <li>时长: {{ order.order_teaching_time }} 小时</li>
            <li>总额: {{ order.order_total_money }} 元</li>
            <li>保证金: {{ order.order_worker_earnest_money }} 元</li>
            <li>其它要求: {{ order.order_boss_require }}</li>
          </ul>
        </div>
        <div v-show="showtakemenu == index" class="columns">
          <div class="column is-half is-offset-2">

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label font2">名字</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <input v-bind:class="{'is-danger':showdanger.dname}" class="input font2" type="text" placeholder="Name" v-model.trim="uname" maxlength="10">
                    <span class="icon is-small is-left">
                      <i class="fas fa-user"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label font2">微信</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <p class="control is-expanded has-icons-left">
                    <input v-bind:class="{'is-danger':showdanger.dwechat}" class="input font2" type="text" placeholder="Wechat" v-model.trim="uwechat" maxlength="16">
                    <span class="icon is-small is-left">
                      <i class="fab fa-weixin"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label font2">电话</label>
              </div>
              <div class="field-body">
                <div class="field is-expanded">
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-static font2">
                        +86
                      </a>
                    </p>
                    <p class="control is-expanded">
                      <input v-bind:class="{'is-danger':showdanger.dphonenum}"  class="input font2" type="tel" placeholder="Your phone number" v-model.trim="uphone" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')">
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="field is-horizontal">
              <div class="field-label">
                <!-- Left empty for spacing -->
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <button v-bind:class="{'is-loading':showisloading == index}" class="button is-primary is-small" v-on:click="takeorder(order.order_token,order.order_boss_email,index,order.order_teaching_grade,order.order_teaching_subjects)">
                      接单并支付保证金
                    </button>
                  </div>
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
import axios from "axios";

export default {
  name: "irecommend",
  props:{
    orderlistinfo:Object,
    usr_info:Object,
  },
  data(){
    return{
      pageindex:0,   //页码
      eachpageitemnum:9, //每页显示数
      click_item_id : -1, //用于给item添加样式
      button_is_loading:false, //button 是否在载入状态
      uname:'', //接单人名字
      uwechat:'', //接单人wechat
      uphone:'', //接单人电话

      showfilter:false, //显示筛选
      showtakemenu:-1, //显示接单菜单
      showdetailinfo:-1, //显示详细信息
      showisloading:-1, //按钮是否为loading 状态

      showdanger:{
        dname:false,
        dwechat:false,
        dphonenum:false,
      },

    }
  },
  computed:{
    //切片开始位置
    slicestart(){
      return this.pageindex * this.eachpageitemnum
    },
    //切片结束位置
    sliceend(){
      if (this.slicestart + this.eachpageitemnum > this.orderlistinfo.ordernum){
        return this.orderlistinfo.ordernum
      }else{
        return this.slicestart + this.eachpageitemnum
      }
    },
    //页数
    pagenum(){
      return Math.ceil(this.orderlistinfo.ordernum/this.eachpageitemnum)
    },
    selectedclassString(){
      let class_info =''
      let len = this.selectedclass.length
      let i=0
      for(let classvalue of this.selectedclass){
        if(i < len -1){
          class_info += classvalue +';'
          i+=1
        }else{
          class_info += classvalue
          i+=1
        }
      }
      return class_info
    }
  },
  methods:{
    prepage(){
      if(this.pageindex !=0){
        this.pageindex -=1
        this.click_item_id = -1 //初始化选中的itemid
        this.$emit('closeorderinfo') //切换页面后关闭右边详细信息
        this.showdetailinfo = -1 //切换页面后关闭详细信息
      }
    },
    nextpage(){
      if(this.pageindex < this.pagenum-1){
        this.pageindex +=1
        this.click_item_id = -1 //初始化选中的itemid
        this.$emit('closeorderinfo')
        this.showdetailinfo = -1 //切换页面后关闭详细信息
      }
    },
    refreshorders(){
      this.$emit('refreshaiorderlist')
      this.showdetailinfo = -1 //刷新订单后关闭详细信息
    },
    showMessage(index) {
      this.click_item_id = index
    },
    showdetailf(index,teaching_grade,teaching_subjects){
      if(this.showdetailinfo != index){
        this.showdetailinfo = index
        //记录用户行为
        axios({
          withCredentials:true,
          url:'advertize/upmaps/',
          method:'post',
          data:{
            uemail:this.usr_info.uemail,
            grade:teaching_grade,
            subjects:teaching_subjects,
            takeorder:'no',
          }
        }).then(res => {
          if(res.data.is_ok == 'yes'){
            console.log('upmap ok');
          }
        })
      }else {
        this.showdetailinfo = -1
      }
    },
    cshowtakemenu(index){
      if(this.showtakemenu !=index){
        this.showtakemenu = index
      }else {
        this.showtakemenu = -1
      }
    },
    btshowfilter(){
      this.showfilter = !this.showfilter
    },
    takeorder(ordertoken,bossemail,index,teaching_grade,teaching_subjects){
      if(this.uname && this.uphone.length ==11 && this.uwechat && this.usr_info.uemail != bossemail){ //单这4个符合要求时候发送请求 这里就验证不可以自己接自己的单
        this.showisloading = index
        axios({
          withCredentials : true,
          url:'orders/wtakeover/',
          method:'post',
          data: {
            bemail:bossemail,
            otoken:ordertoken,
            wname:this.uname,
            wphone_number:this.uphone,
            wwei_qq:this.uwechat,
          }
        }).then(res => {
          if(res.data.is_login == 'yes'){
            if(res.data.is_take_over == 'yes'){
              //刷新我接的单
              this.$emit('refreshtorders')
              //刷新主页订单
              this.$emit('refreshorderlist')
              this.$emit('getnewinfo') //刷新个人信息中的钱包
              this.showisloading = -1 //关闭loading 状态
              this.showtakemenu = -1 //关闭接单menu
            }else { //接单失败显示原因(这里逻辑不能错)
              if(res.data.is_self_take == 'yes'){
                alert('不可以自己接自己的订单!')
                this.showisloading = -1
              }else{
                if(res.data.is_lack_eranest_money == 'yes'){
                  alert('金额不足无法支付保证金,请充值')
                  this.showisloading = -1
                }
                if(res.data.order_exist== 'no'){
                  alert('订单已被其他人接手')
                  //刷新主页订单
                  this.$emit('refreshorderlist')
                  this.showisloading = -1
                }
              }
            }
          }else{
            alert("请重新登录")
          }
        })
        //记录用户行为
        axios({
          withCredentials:true,
          url:'advertize/upmaps/',
          method:'post',
          data:{
            uemail:this.usr_info.uemail,
            grade:teaching_grade,
            subjects:teaching_subjects,
            takeorder:'yes',
          }
        }).then(res => {
          if(res.data.is_ok == 'yes'){
            console.log('upmap ok');
          }
        })
      }else{
        if(this.usr_info.uemail == bossemail){
          alert('不可以自己接自己的订单!')
        }

        if(!this.uname){
          this.showdanger.dname = true
        }
        if(!this.uwechat){
          this.showdanger.dwechat = true
        }
        if(this.uphone.length !=11){
          this.showdanger.dphonenum = true
        }
        setTimeout(() => {
          for(let keyvalue of Object.keys(this.showdanger)){
            this.showdanger[keyvalue] = false
          }
        },1000)

      }

    },
    searchorders(){
      let grade= this.selectedgrade
      let classev= this.selectedclassString
      if(this.selectedgrade == '' && this.selectedclassString ==''){
        grade = 'no'
        classev = 'no'
      }
      if(this.selectedclassString == ''){
        classev = 'no'
      }
      this.$emit('searchorders',grade,classev)
    }

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
  background-color:white;
}

</style>