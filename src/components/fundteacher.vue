<template>
 <div id="fundteacher" class="column is-half">
   <div v-if="usr_info.is_login !='yes'">
     <button class="button is-small is-rounded" v-on:click="gotologin">前往登录</button>
   </div>
<!-- 实名认证模块  -->
   <div v-if="usr_info.is_identity_verify == 0">
<!--      <h2 class="font3">该功能需实名认证,请前往实名认证</h2>-->
     <button class="button is-small" v-on:click="gotoiverify">前往实名认证</button>
   </div>
<!--  购买找老师模块-->
   <div v-if="usr_info.is_identity_verify==1 && usr_info.can_fund_teacher==0">
<!--      <h2>花10元开通找老师模块</h2>-->
      <button class="button is-small" v-on:click="buyfundteacher">花10元开通找老师模块</button>
   </div>
<!--老师信息列表   -->
   <div v-if="usr_info.is_identity_verify==1 && usr_info.can_fund_teacher==1">
     <div class="notification is-link">
       老 师 信 息 列 表 / / / / / / / / / / / / /共 {{teacherinfo.teachernum}} 位 老 师
     </div>
     <div>
       <a class="button is-small" @click="showfilte"><i class="fas fa-caret-down">筛选</i></a>
       <a class="button is-small" @click="searchteachers"><i class="fas fa-search"></i></a>
     </div>
         <!--省市   -->
         <div class="field is-horizontal" v-show="isshowfilter">
           <div class="field-body">
             <div class="field is-expanded">
               <div class="field has-addons">
                 <div class="select is-link is-small" v-bind:class="{'is-danger':showselectdanger.provincedanger}">
                   <select v-model="selectcity.province" >
                     <option value="a" disabled>省.自治区.直辖市</option>
                     <option v-for="provincename in Object.keys(cityinfo)" v-bind:value="provincename">{{provincename}}</option>
                   </select>
                 </div>
                 <div class="select is-link is-small" v-bind:class="{'is-danger':showselectdanger.citydanger}">
                   <select v-model="selectcity.city" >
                     <option value="b" disabled>地级市.地区.自治州</option>
                     <option v-for="cityname in Object.keys(cityinfo[selectcity.province])" v-bind:value="cityname">{{cityname}}</option>
                   </select>
                 </div>
                 <div class="select is-link is-small" v-bind:class="{'is-danger':showselectdanger.countydanger}">
                   <select v-model="selectcity.county" >
                     <option value="c" disabled>市辖区.县级市.县</option>
                     <option v-for="countyname in cityinfo[selectcity.province][selectcity.city]" v-bind:value="countyname">{{countyname}}</option>
                   </select>
                 </div>
               </div>
             </div>
           </div>
         </div>
     <div class="columns" v-show="isshowfilter">

       <div class="column">
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
         </div>
       </div>
     </div>
     <div class="action-buttons">
       <div class="control is-grouped">
         <a class="button is-small" @click="refreshlist"><i class="fa fa-refresh"></i></a>
         <a class="button is-small" @click="prepage" ><i class="fa fa-chevron-left"></i></a>
         <span class="font3">{{pageindex + 1}}</span>
         <a class="button is-small" @click="nextpage"><i class="fa fa-chevron-right"></i></a>
         <span class="font3">&nbsp&nbsp共{{pagenum}}页</span>
       </div>
     </div>

     <div class="inbox-messages" id="inbox-messages">
       <div v-for="(teacher, index) in teacherinfo.teacherinfolist.slice(slicestart,sliceend)" v-bind:class="{cardbackground:index == click_item_id}" class="card" v-bind:id="index" v-on:click="showMessage(index)" >
         <div class="card-content">
           <div class="columns">
             <div class="column font2">年 龄 <p class="font3">{{teacher.usr_age}}</p></div>
             <div class="column font2">毕 业 学 校 <p class="font3">{{teacher.usr_school}}</p></div>
             <div class="column font2">联 系 电 话<p class="font3">{{teacher.usr_phone_number}}</p></div>
             <div class="column font2"><button class="button is-small" v-on:click="showdetailinfo(index)"><i class="fas fa-chevron-down"></i></button></div>
           </div>

<!--详细信息-->
           <div v-show="showdetail == index">
             <ul>
               <li class="font2">执 教 年 级: {{teacher.usr_teaching_grade}}</li>
               <li class="font2">执 教 学 科: {{teacher.usr_teaching_subjects}}</li>
               <li><span class="tag is-link is-light" v-if="teacher.usr_identity_verify == 1">身 份 已 认 证 v</span><span class="tag is-light" v-else >身 份 未 认 证</span></li>
               <li><span class="tag is-link is-light" v-if="teacher.use_certificate_verify == 1">学 籍 已 认 证 v</span><span class="tag is-light" v-else >学 籍 未 认 证</span></li>
             </ul>
           </div>
         </div>

       </div>
     </div>
   </div>

 </div>
</template>

<script>
import axios from 'axios'
import cityjson from '../assets/cityinfo.json'  //导入中国省市县json文件
export default {
  name: "fundteacher",
  props:{
    usr_info:Object,
    teacherinfo:Object,
    pschoolinfo: Object,
    mschoolinfo: Object,
    hschoolinfo: Object,
  },
  data(){
    return{
      pageindex:0,   //页码
      eachpageitemnum:4, //每页显示数
      click_item_id : -1, //用于给item添加样式

      showdetail :-1, //显示详细信息
      isshowfilter:false, //展示过滤框
      showclasses:{  //展示对应年级的课程
        pclass:false,
        mclass:false,
        hclass:false,
      },
      selectedgrade:'',
      selectedclass:[], //选择的课程列表
      cityinfo:cityjson, //中国省市县
      selectcity:{   //城市下拉列表中选择的内容
        province:'北京市',
        city:'市辖区',
        county:'东城区',
      },
      showselectdanger:{
        provincedanger:false,
        citydanger:false,
        countydanger:false,
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
    usr_info(){
      if(this.usr_info.u_now_city_county.split(' ')[0]!='' &&this.usr_info.u_now_city_county.split(' ')[1]!=''&&this.usr_info.u_now_province != ''){
        this.selectcity.province = this.usr_info.u_now_province
        this.selectcity.city = this.usr_info.u_now_city_county.split(' ')[0]
        this.selectcity.county = this.usr_info.u_now_city_county.split(' ')[1]
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
      if (this.slicestart + this.eachpageitemnum > this.teacherinfo.teachernum){
        return this.teacherinfo.teachernum
      }else{
        return this.slicestart + this.eachpageitemnum
      }
    },
    //页数
    pagenum(){
      return Math.ceil(this.teacherinfo.teachernum/this.eachpageitemnum)
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
      }
    },
    nextpage(){
      if(this.pageindex < this.pagenum-1){
        this.pageindex +=1
        this.click_item_id = -1 //初始化选中的itemid
      }
    },
    showMessage(index) {
      this.click_item_id = index
    },
    showdetailinfo(index){
      if(this.showdetail !=index){
        this.showdetail = index
      }else{
        this.showdetail = -1
      }
    },
    refreshlist(){
      this.$emit('refreshteacherlist','no','no','no') //后面两个参数位学科和年级
    },
    searchteachers(){
      let grade= this.selectedgrade
      let classev= this.selectedclassString
      if(this.selectedgrade == '' && this.selectedclassString ==''){
        grade = 'no'
        classev = 'no'
      }
      if(this.selectedclassString == ''){
        classev = 'no'
      }
      if(!(this.cityinfo[this.selectcity.province].hasOwnProperty(this.selectcity.city) && this.cityinfo[this.selectcity.province][this.selectcity.city].includes(this.selectcity.county))){
        if(!this.cityinfo[this.selectcity.province].hasOwnProperty(this.selectcity.city))
        {
          this.showselectdanger.citydanger =true
          this.showselectdanger.countydanger =true
        }else{
          if(!this.cityinfo[this.selectcity.province][this.selectcity.city].includes(this.selectcity.county))
          {
            this.showselectdanger.countydanger =true
          }
        }
        setTimeout(()=>{
          for(let keyvalue of Object.keys(this.showselectdanger)){
            this.showselectdanger[keyvalue] = false
          }
        },3000)
      }else{
        this.$emit('refreshteacherlist',classev,grade,this.selectcity.city+' '+this.selectcity.county)
      }
    },
    gotoiverify(){
      this.$router.push({name:'identity', params:{email:this.usr_info.uemail,usr_name:this.usr_info.uname}})
    },
    buyfundteacher(){
      axios({
        withCredentials:true,
        url:'account/buyteacherfunc/',
        method:'post',
        data:{},
      }).then(res => {
        console.log(res.data);
        if(res.data.paid_success =='yes')
        {
          //刷新个人信息(主要是钱包)
          this.$emit('getnewinfo')
          alert('购买成功')
        }else if(res.data.is_lack_money == 'yes')
        {
          alert('金额不足,请充值!')
        }
      })
    },
    gotologin(){
      this.$router.push('/login')
    },
    showfilte(){
      this.isshowfilter =! this.isshowfilter
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
  /*background-color:ghostwhite;*/
  /*background-color: rgb(10 10 10 / 10%);*/
  background-color: #F5F5F5;
}
</style>