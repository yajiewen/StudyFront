<template>
 <div id="changeinfo" class="card">
   <div class="block">
           <button class="delete is-small" v-on:click="closecmyinfo"></button>
   </div>
<!--   <div class="block">
     <button class="button is-link is-outlined is-small" v-on:click="closecmyinfo">
       <span>关闭</span>
       <span class="icon is-small">
      <i class="fas fa-times"></i>
    </span>
     </button>
   </div>-->

   <div class="field is-horizontal">
     <div class="field-label is-normal">
       <label class="label">年龄</label>
     </div>
     <div class="field-body">
       <div class="field">
         <div class="columns">
           <div class="column is-two-fifths">
             <p class="control  is-expanded has-icons-left">
               <input class="input" type="number" placeholder="Age"  v-model="usr_age">
               <span class="icon is-small is-left">
              <i class="fas fa-baby"></i>
              </span>
             </p>
           </div>
         </div>
       </div>
     </div>
   </div>

   <div class="field is-horizontal">
     <div class="field-label"></div>
     <div class="field-body">
       <div class="field is-expanded">
         <div class="field has-addons">
           <p class="control">
             <a class="button is-static">
               +86
             </a>
           </p>
           <p class="control is-expanded">
             <input class="input" type="tel" placeholder="Your phone number" v-model="usr_phone_number">
           </p>
         </div>
<!--         <p class="help">Do not enter the first zero</p>-->
       </div>
     </div>
   </div>



   <div class="field is-horizontal">
     <div class="field-label">
       <label class="label">性别</label>
     </div>
     <div class="field-body">
       <div class="field is-narrow">
         <div class="control">
           <label class="radio">
             <input type="radio" name="member" v-model="usr_sex" value="男">
             男
           </label>
           <label class="radio">
             <input type="radio" name="member" v-model="usr_sex" value="女">
             女
           </label>
         </div>
       </div>
     </div>
   </div>

   <div class="field is-horizontal">
     <div class="field-label is-normal">
       <label class="label">就读学校</label>
     </div>
     <div class="field-body">
       <div class="field">
         <div class="control">
           <input class="input is-link" type="text" placeholder="Your school" v-model="usr_school" v-bind:disabled="usr_is_certificate_verify">
         </div>

       </div>
     </div>
   </div>


   <div class="field is-horizontal">
     <div class="field-label is-normal">
       <label class="label">所学专业</label>
     </div>
     <div class="field-body">
       <div class="field">
         <div class="control">
           <input class="input is-link" type="text" placeholder="Your major" v-model="usr_major" v-bind:disabled="usr_is_certificate_verify">
         </div>
       </div>
     </div>
   </div>

   <div class="field is-horizontal">
     <div class="field-label is-normal">
       <label class="label">执教年级</label>
     </div>
     <div class="field-body">
       <div class="field">
         <div class="control">
           <div class="select is-multiple ">
             <select multiple size="6" v-model="selectedg.selectedpgrades">
               <option v-bind:value="grade" v-for="grade in pschool.grades">{{grade}}</option>
             </select>
           </div>
           <div class="select is-multiple ">
             <select multiple size="6" v-model="selectedg.selectedmgrades">
               <option v-bind:value="grade" v-for="grade in mschool.grades">{{grade}}</option>
             </select>
           </div>
           <div class="select is-multiple ">
             <select multiple size="6" v-model="selectedg.selectedhgrades">
               <option v-bind:value="grade" v-for="grade in hschool.grades">{{grade}}</option>
             </select>
           </div>
         </div>
       </div>
     </div>
   </div>
  <p><span class="tag is-link">小 学</span>{{selectedg.selectedpgrades}}<span class="tag is-link">初 中</span>{{selectedg.selectedmgrades}}<span class="tag is-link">高 中</span>{{selectedg.selectedhgrades}}</p>

   <div class="field is-horizontal">
     <div class="field-label is-normal">
       <label class="label">执教学科</label>
     </div>
     <div class="field-body">
       <div class="field">
         <div class="control">
           <div class="select is-multiple ">
             <select multiple size="8" v-model="selectedc.selectedpclasses">
               <option v-bind:value="classvalue" v-for="classvalue in pschool.classes">{{classvalue}}</option>
             </select>
           </div>
           <div class="select is-multiple ">
             <select multiple size="8" v-model="selectedc.selectedmclasses">
               <option v-bind:value="classvalue" v-for="classvalue in mschool.classes">{{classvalue}}</option>
             </select>
           </div>
           <div class="select is-multiple ">
             <select multiple size="8" v-model="selectedc.selectedhclasses">
               <option v-bind:value="classvalue" v-for="classvalue in hschool.classes">{{classvalue}}</option>
             </select>
           </div>
         </div>
       </div>
     </div>
   </div>
   <p><span class="tag is-link">小 学</span>{{selectedc.selectedpclasses}}<span class="tag is-link">初 中</span>{{selectedc.selectedmclasses}}<span class="tag is-link">高 中</span>{{selectedc.selectedhclasses}}</p>

   <div class="field is-horizontal">
     <div class="field-label is-normal">
       <label class="label">个人经历</label>
     </div>
     <div class="field-body">
       <div class="field">
         <div class="control">
           <textarea class="textarea is-link" placeholder="Please enter your personal history" rows="6" maxlength="500" v-model="usr_experience"></textarea>
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
           <button class="button is-primary is-small" @click="uploadinfo">
             上 传
           </button>
         </div>
       </div>
     </div>
   </div>
 </div>
</template>

<script>
import axios from 'axios'

export default {
name: "changeinfo",
props:{
  usr_info:Object,
  pschool: Object,
  mschool: Object,
  hschool: Object,
},
data(){
    return {
      usr_age: 0,
      usr_sex: '',
      usr_teaching_subjects: '',
      usr_teaching_grade: '',
      usr_school: '',
      usr_major: '',
      usr_experience: '',
      usr_phone_number: '',
      usr_is_certificate_verify:0,
      //选中的执教年级和学科
      selectedg:{
        selectedpgrades:[],
        selectedmgrades:[],
        selectedhgrades:[],
      },
      selectedc:{
        selectedpclasses:[],
        selectedmclasses:[],
        selectedhclasses:[],
      },
    }
},
watch:{
  usr_info(){
    this.usr_age = this.usr_info.uage
    this.usr_sex = this.usr_info.usex
/*    this.usr_teaching_subjects= this.usr_info.uteaching_subjects
    this.usr_teaching_grade = this.usr_info.uteaching_grade*/
    this.usr_school = this.usr_info.uschool
    this.usr_major = this.usr_info.umajor
    this.usr_experience = this.usr_info.uexperience
    this.usr_phone_number = this.usr_info.uphone_number
    this.usr_is_certificate_verify = this.usr_info.is_certificate_verify
  },
  usr_age(){
    if(this.usr_age <0 ){
      this.usr_age = 0
    }else if (this.usr_age > 100){
      this.usr_age = 100
    }
  }
},
methods:{
  uploadinfo(){

    const strs=['小学:','初中:','高中:']
    let idex = 0
    //根据选取设置执教年级
    for(let keyvalue of Object.keys(this.selectedg)){
      if(this.selectedg[keyvalue].length !=0){
        this.usr_teaching_grade += strs[idex] + '('
        idex +=1
        for(let grade of this.selectedg[keyvalue]){
          this.usr_teaching_grade += grade +' '
        }
        this.usr_teaching_grade += ') '
      }
    }
    //根据选取设置执教学科
    idex = 0
    for(let keyvalue of Object.keys(this.selectedc)){
      if(this.selectedc[keyvalue].length !=0){
        this.usr_teaching_subjects += strs[idex] + '('
        idex +=1
        for(let classev of this.selectedc[keyvalue]){
          this.usr_teaching_subjects += classev +' '
        }
        this.usr_teaching_subjects += ') '
      }
    }
/*    console.log(this.usr_teaching_subjects);*/
    axios({
      withCredentials : true,
      url:'https://127.0.0.1:8081/account/upusrinfo/',
      method:'post',
      data: {
        uage:this.usr_age,
        usex:this.usr_sex,
        uschool: this.usr_school,
        uteaching_subjects: this.usr_teaching_subjects,
        uteaching_grade: this.usr_teaching_grade,
        uexperience: this.usr_experience,
        umajor: this.usr_major,
        u_phone_number: this.usr_phone_number,
      }
    }).then(res => {
      console.log(res.data);
      //向home页发送一个emit 请求获取新的用户信息
      this.$emit('getnewinfo')
    })
    //这里必须更新为空,否则再次更新会在上次的基础上继续加新内容
    this.usr_teaching_grade =''
    this.usr_teaching_subjects=''

  },
  closecmyinfo(){
    this.$emit('closecmyinfo',false)
  }
},

}
</script>

<style scoped>

</style>