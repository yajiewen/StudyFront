<template>
  <div id="tutororder" class="column is-half">
    <div class="notification is-link">
      家 教 订 单/ / / / / / / / / / / / /共 {{orderlistinfo.ordernum}} 单
    </div>
    <div class="field font2">

      <label class="label font1">年 级:</label>
      <div >
        <label class="radio" v-for="grade in pschoolinfo.grades" >
          <input type="radio" name="radio" v-bind:value="grade" v-model="selectedgrade" v-on:click="initselectedclass">
          {{grade+'&nbsp&nbsp'}}
        </label>
      </div>

      <div >
        <label class="radio" v-for="grade in mschoolinfo.grades">
          <input type="radio" name="radio" v-bind:value="grade" v-model="selectedgrade" v-on:click="initselectedclass">
          {{grade+'&nbsp&nbsp'}}
        </label>
      </div>

      <div class="field">
        <label class="radio" v-for="grade in hschoolinfo.grades">
          <input type="radio" name="radio" v-bind:value="grade" v-model="selectedgrade" v-on:click="initselectedclass">
          {{grade+'&nbsp&nbsp'}}
        </label>
      </div>

      <div class="field">
        <label class="label font1">学 科</label>
        <div v-if="showclasses.pclass">
          <label class="checkbox" v-for="classvalue in pschoolinfo.classes">
            <input type="checkbox" v-bind:value="classvalue" v-model="selectedclass" >
            {{classvalue+'&nbsp&nbsp&nbsp&nbsp&nbsp'}}
          </label>
        </div>

        <div v-if="showclasses.mclass">
          <label class="checkbox" v-for="classvalue in mschoolinfo.classes" >
            <input type="checkbox" v-bind:value="classvalue" v-model="selectedclass">
            {{classvalue+'&nbsp&nbsp&nbsp&nbsp&nbsp'}}
          </label>
        </div>

        <div v-if="showclasses.hclass">
          <label class="checkbox" v-for="classvalue in hschoolinfo.classes" >
            <input type="checkbox" v-bind:value="classvalue" v-model="selectedclass">
            {{classvalue+'&nbsp&nbsp&nbsp&nbsp&nbsp'}}
          </label>
        </div>
      </div>
      <a class="button is-small" @click="searchorders"><i class="fas fa-search"></i></a>
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
      <div v-for="(order, index) in orderlistinfo.ordersinfo.slice(slicestart,sliceend)" v-bind:class="{cardbackground:index == click_item_id}" class="card" v-bind:id="index" v-on:click="showMessage(index)">
          <div class="columns">
            <div class="column font2"><p class="font3">&nbsp{{order.order_teaching_grade}}</p></div>
            <div class="column font2"><p class="font3">{{order.order_teaching_subjects}}</p></div>
            <div class="column font2"><p class="font3">{{order.order_total_money}} 元</p></div>
            <div class="column font2"><a class="font3" v-on:click="showdetailf(index)">详细信息</a></div>
            <div class="column font2"><button v-on:click="takeorder(order.order_token,order.order_boss_email)">接 单</button></div>

          </div>
        <!--详细信息      -->
        <div v-if="index == showdetailinfo" class="content">
            <ul class="font3" v-if="index == showdetailinfo">
              <li>年级: {{ order.order_teaching_grade }}</li>
              <li>学科: {{ order.order_teaching_subjects }}</li>
              <li>单价: {{ order.order_hourly_money }} 元</li>
              <li>时长: {{ order.order_teaching_time }}</li>
              <li>总额: {{ order.order_total_money }} 元</li>
              <li>保证金: {{ order.order_worker_earnest_money }} 元</li>
              <li>其它要求: {{ order.order_boss_require }}</li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "tutororder",
  props:{
    orderlistinfo:Object,
    pschoolinfo: Object,
    mschoolinfo: Object,
    hschoolinfo: Object,
    usr_info:Object,
  },
  data(){
    return{
      pageindex:0,   //页码
      eachpageitemnum:10, //每页显示数
      click_item_id : -1, //用于给item添加样式
      button_is_loading:false, //button 是否在载入状态
      uname:'',
      uwechat:'',

      selectedgrade:'',
      selectedclass:[], //选择的课程列表

      showdetailinfo:-1, //显示详细信息
      showclasses:{  //展示对应年级的课程
        pclass:false,
        mclass:false,
        hclass:false,
      }
    }
  },
  watch:{
    selectedgrade(){ //选中的年级是哪个阶段的就显示那个阶段学生的课程
      if(this.pschoolinfo.grades.includes(this.selectedgrade)){
        this.showclasses.pclass = true
        this.showclasses.mclass = false
        this.showclasses.hclass = false
      }else if(this.mschoolinfo.grades.includes(this.selectedgrade)){
        this.showclasses.pclass = false
        this.showclasses.mclass = true
        this.showclasses.hclass = false
      }else if(this.hschoolinfo.grades.includes(this.selectedgrade)){
        this.showclasses.pclass = false
        this.showclasses.mclass = false
        this.showclasses.hclass = true
      }
    },
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
      this.$emit('refreshorderlist')
      this.showdetailinfo = -1 //刷新订单后关闭详细信息
    },
    showMessage(index) {
      this.click_item_id = index
    },
    showdetailf(index){
      if(this.showdetailinfo != index){
        this.showdetailinfo = index
      }else {
        this.showdetailinfo = -1
      }
    },
    takeorder(ordertoken,bossemail){
      axios({
        withCredentials : true,
        url:'https://127.0.0.1:8081/orders/wtakeover/',
        method:'post',
        data: {
          bemail:bossemail,
          otoken:ordertoken,
          wname:this.uname,
          wphone_number:this.usr_info.uphone_number,
          wwei_qq:this.uwechat,
        }
      }).then(res => {

      })
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
  background-color:rgb(10 10 10 / 10%);
}

</style>