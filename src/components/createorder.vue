<template>
  <div is="createorder" class="column is-5 is-offset-2">
    <div class="field font2">
      <p class="help is-danger" v-if="show_danger.grade">
        请选择年级
      </p>
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
        <p class="help is-danger" v-if="show_danger.classvalue">
          请选择科目
        </p>
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
    </div>

    <div class="columns">
      <div class="column is-half">
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <label class="label font2">单价/小时</label>
              <div class="control has-icons-left">
                <input v-bind:class="{'is-danger':show_danger.hourlym}" class="input is-link" type="text" placeholder="" v-model="hourly_money">
                <span class="icon is-small is-left">
                  <i class="fas fa-dollar-sign"></i>
                </span>
              </div>
            </div>

            <div class="field">
              <label class="label font2">时长(小时)</label>
              <div class="control has-icons-left">
                <input v-bind:class="{'is-danger':show_danger.teachtime}" class="input is-success" type="text" placeholder="Time" v-model="teaching_time">
                <span class="icon is-small is-left">
                  <i class="far fa-clock"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <label class="label font2">名 字</label>
          <div class="control has-icons-left">
            <input v-bind:class="{'is-danger':show_danger.sname}" class="input is-link" type="text" placeholder="Student's Name" v-model="student_name">
            <span class="icon is-small is-left">
              <i class="fas fa-signature"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label font2">微 信</label>
          <div class="control has-icons-left">
            <input v-bind:class="{'is-danger':show_danger.swechat}" class="input is-success" type="text" placeholder="Wechat" v-model="student_wei">
            <span class="icon is-small is-left">
              <i class="fab fa-weixin"></i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field is-expanded">
          <div class="field has-addons">
            <p class="control">
              <a class="button is-static">
                +86
              </a>
            </p>
            <p class="control is-expanded">
              <input v-bind:class="{'is-danger':show_danger.sphonenum}" class="input" type="tel" placeholder="Your phone number" v-model="student_phone_number">
            </p>
          </div>
        </div>
      </div>
    </div>


    <div class="field">
      <label class="label font2">其 他 要 求</label>
      <div class="control">
        <textarea class="textarea is-info" placeholder="Other requirements" maxlength="460" v-model="student_require"></textarea>
      </div>
    </div>

<!--    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox">
          I agree to the <a href="#">terms and conditions</a>
        </label>
      </div>
    </div>-->

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link is-light" v-on:click="create_a_order">提 交</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "createorder",
  props:{
    usr_email:String,
    pschoolinfo: Object,
    mschoolinfo: Object,
    hschoolinfo: Object,
  },
  data(){
    return{
      selectedgrade:'',
      selectedclass:[], //选择的课程列表

      hourly_money:80, //单价
      teaching_time:3, //教学时间

      student_name : '', //学生名字
      student_phone_number:'', //学生电话
      student_wei:'', //学生微信
      student_require:'', //其他特殊要求

      show_pay_block:false, //创建成功后显示支付模块 支付成功后显示

      show_danger:{  //单输入不合法时候显示
        grade:false,
        classvalue:false,
        hourlym:false,
        teachtime:false,
        sname:false,
        swechat:false,
        sphonenum:false,
      },
      showclasses:{  //展示对应年级的课程
        pclass:false,
        mclass:false,
        hclass:false,
      }
    }
  },
  computed:{
    total_money(){
      return this.teaching_time * this.hourly_money
    },
    selectedclassString(){
      let class_info =''
      for(let classvalue of this.selectedclass){
        class_info += classvalue +';'
      }
      return class_info
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
  methods:{
    create_a_order(){
      if(this.selectedgrade && this.selectedclassString && this.hourly_money>0 && this.teaching_time >=1 && this.student_name && this.student_wei && this.student_phone_number.length==11){
        axios({
          withCredentials : true,
          url:'https://127.0.0.1:8081/orders/creatorder/',
          method:'post',
          data: {
            uemail:this.usr_email,
            oteaching_grade:this.selectedgrade,
            oteaching_subjects:this.selectedclassString,
            ohourly_money: this.hourly_money,
            oteaching_time: this.teaching_time,
            oboss_name: this.student_name,
            oboss_phone_number: this.student_phone_number,
            oboss_qq_wei: this.student_wei,
            oboss_require: this.student_require,
            ototal_money: this.total_money
          }
        }).then(res => {
          if(res.data.is_login == 'yes'){
            if(res.data.is_add_order == 'yes'){
              //转到支付div
              this.show_pay_block = true
              //向home发送刷新订单请求
              this.$emit('refreshsorders')
            }
          }else{
            alert('请重新登录')
          }
        })
      }else{
        if(!this.selectedgrade){
          this.show_danger.grade = true
        }
        if(!this.selectedclassString){
          this.show_danger.classvalue = true
        }
        if(!(this.hourly_money>0)){
          this.show_danger.hourlym = true
        }
        if(!(this.teaching_time>=1)){
          this.show_danger.teachtime = true
        }
        if(!this.student_name){
          this.show_danger.sname = true
        }
        if(!this.student_wei){
          this.show_danger.swechat = true
        }
        if(!(this.student_phone_number.length == 11)){
          this.show_danger.sphonenum = true
        }
        setTimeout(() => {
          for(let keyvalue of Object.keys(this.show_danger)){
             this.show_danger[keyvalue] = false
          }
        },3000)
      }
    },
    initselectedclass(){
      this.selectedclass = []
    }
  },
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
</style>