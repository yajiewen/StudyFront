<template>
 <div id="fundteacher" class="column is-half">
   <div v-if="usr_info.is_login !='yes'">
     <button class="button is-small is-rounded" v-on:click="gotologin">前往登录</button>
   </div>
<!-- 实名认证模块  -->
   <div v-if="usr_info.is_identity_verify == 0">
      <h2 class="font3">该功能需实名认证,请前往实名认证</h2>
     <button class="button is-small" v-on:click="gotoiverify">前往</button>
   </div>
<!--  购买找老师模块-->
   <div v-if="usr_info.is_identity_verify==1 && usr_info.can_fund_teacher==0">
      <h2>花10元开通找老师模块</h2>
      <button class="button is-small" v-on:click="buyfundteacher">开通</button>
   </div>
<!--老师信息列表   -->
   <div v-if="usr_info.is_identity_verify==1 && usr_info.can_fund_teacher==1">
     <div class="notification is-link">
       老 师 信 息 列 表 / / / / / / / / / / / / /共 {{teacherinfo.teachernum}} 位 老 师
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
export default {
  name: "fundteacher",
  props:{
    usr_info:Object,
    teacherinfo:Object,
  },
  data(){
    return{
      pageindex:0,   //页码
      eachpageitemnum:4, //每页显示数
      click_item_id : -1, //用于给item添加样式

      showdetail :-1, //显示详细信息
    }
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
      this.$emit('refreshteacherlist','no','no') //后面两个参数位学科和年级
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
        }
      })
    },
    gotologin(){
      this.$router.push('/login')
    },
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