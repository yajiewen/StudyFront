<template>
 <div id="TeacherRrgister" class="card column">
   <button class="delete is-small" v-on:click="closetregister"></button>

   <div class="field is-horizontal">
     <div class="field-label">
       <label class="label font2">性别</label>
     </div>
     <div class="field-body">
       <div class="field is-narrow">
         <div class="control">
           <label class="radio font2">
             <input  type="radio" name="member" v-model="usr_sex" value="男">
             男
           </label>
           <label class="radio font2">
             <input type="radio" name="member" v-model="usr_sex" value="女">
             女
           </label>
         </div>
       </div>
     </div>
   </div>

   <div class="field is-horizontal">
     <div class="field-label is-normal">
       <label class="label font2">就读学校</label>
     </div>
     <div class="field-body">
       <div class="field">
         <div class="control">
           <input class="input is-link font2" type="text" placeholder="Your school" v-model="usr_school" maxlength="20">
         </div>
       </div>
     </div>
   </div>


   <div class="field is-horizontal">
     <div class="field-label is-normal">
       <label class="label font2">所学专业</label>
     </div>
     <div class="field-body">
       <div class="field">
         <div class="control">
           <input class="input is-link font2" type="text" placeholder="Your major" v-model="usr_major" maxlength="20">
         </div>
       </div>
     </div>
   </div>


<div class="columns">
<!-- 身份认证 -->
  <div class="column is-offset-1">
    <div class="columns">
      <div class="column">

        <img v-bind:src="imgurl.iimgurl1" alt="">
        <div class="file has-name font2">
          <label class="file-label">
            <input class="file-input" type="file" multiple name="files" v-on:change="getiimg1">
            <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              身份证正面
            </span>
          </span>
            <span class="file-name">
            {{placeholderr.ifilename1}}
          </span>
          </label>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <img v-bind:src="imgurl.iimgurl2" alt="">
        <div class="file has-name font2">
          <label class="file-label">
            <input class="file-input" type="file" multiple name="files" v-on:change="getiimg2">
            <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              身份证背面
            </span>
          </span>
            <span class="file-name">
            {{placeholderr.ifilename2}}
          </span>
          </label>
        </div>
      </div>
    </div>
  </div>
  <!-- 学籍认证 -->
  <div class="column">
    <div class="columns">
      <div class="column">

        <img v-bind:src="imgurl.simgurl1" alt="">
        <div class="file has-name font2">
          <label class="file-label">
            <input class="file-input" type="file" multiple name="files" v-on:change="getsimg1">
            <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              学生证封面
            </span>
          </span>
            <span class="file-name">
            {{placeholderr.sfilename1}}
          </span>
          </label>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <img v-bind:src="imgurl.simgurl2" alt="">
        <div class="file has-name font2">
          <label class="file-label">
            <input class="file-input" type="file" multiple name="files" v-on:change="getsimg2">
            <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              学生证主页
            </span>
          </span>
            <span class="file-name">
            {{placeholderr.sfilename2}}
          </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</div>

 <div class="columns">
   <div class="column is-offset-1">
     <button class="button font2" @click="upload" :class="{'is-loading':is_loading}">提交</button>
     <p class="font3">请保证以上信息和图片内容一致</p>
   </div>
 </div>
 </div>
</template>

<script>
import axios from 'axios'


export default {
  name: "TeacherRrgister",
  props:{
    usrinfo:Object,
  },
  data(){
    return{
      placeholderr:{
        ifilename1:'请选择文件',
        ifilename2:'请选择文件',
        sfilename1:'请选择文件',
        sfilename2:'请选择文件',
      },
      imgurl:{
        iimgurl1:'',
        iimgurl2:'',
        simgurl1:'',
        simgurl2:'',
      },
      usr_info:this.usrinfo, //获取用户信息
      is_loading: false,
      is_loading_2:0,
      timer:0,
      iformdata: new FormData, //保存文件
      sformdata: new FormData, //保存文件
      imgstyle:['jpg','jpeg','png',], //可上传的图片格式
      usr_sex:'',
      usr_school:'',
      usr_major:'',
      imessage:'请输入',
    }
  },
  methods:{
    closetregister(){
      this.$emit('showtregister',false)
    },
    //获取身份证正面
    getiimg1(imgobj){
      let files = imgobj.target.files
      this.placeholderr.ifilename1 = files[0].name //获取文件名字

      let reader = new FileReader()//获取文件地址(地址是加密的没法看)
      reader.readAsDataURL(files[0])
      reader.onload = ()=>{
        this.imgurl.iimgurl1 = reader.result
      }

      if(this.imgstyle.includes(this.placeholderr.ifilename1.split('.').pop()))
      {
        this.iformdata.append('img1',files[0])
      }else{
        this.imgurl.iimgurl1 = ''
        this.placeholderr.ifilename1='请选择文件'
        alert('文件格式不正确')
      }
    },
    //获取身份证背面
    getiimg2(imgobj){
      let files = imgobj.target.files
      this.placeholderr.ifilename2 = files[0].name //获取文件名字

      let reader = new FileReader()//获取文件地址(地址是加密的没法看)
      reader.readAsDataURL(files[0])
      reader.onload = ()=>{
        this.imgurl.iimgurl2 = reader.result
      }

      if(this.imgstyle.includes(this.placeholderr.ifilename2.split('.').pop()))
      {
        this.iformdata.append('img2',files[0])
      }else{
        this.imgurl.iimgurl2 =''
        this.placeholderr.ifilename2='请选择文件'
        alert('文件格式不正确')
      }
    },
    //获取学生证封面
    getsimg1(imgobj){
      let files = imgobj.target.files
      this.placeholderr.sfilename1 = files[0].name //获取文件名字

      let reader = new FileReader()//获取文件地址(地址是加密的没法看)
      reader.readAsDataURL(files[0])
      reader.onload = ()=>{
        this.imgurl.simgurl1 = reader.result
      }

      if(this.imgstyle.includes(this.placeholderr.sfilename1.split('.').pop()))
      {
        this.sformdata.append('img1',files[0])
      }else{
        this.imgurl.simgurl1 =''
        this.placeholderr.sfilename1='请选择文件'
        alert('文件格式不正确')
      }
    },
    //获取学生证主页
    getsimg2(imgobj){
      let files = imgobj.target.files
      this.placeholderr.sfilename2 = files[0].name //获取文件名字

      let reader = new FileReader()//获取文件地址(地址是加密的没法看)
      reader.readAsDataURL(files[0])
      reader.onload = ()=>{
        this.imgurl.simgurl2 = reader.result
      }

      if(this.imgstyle.includes(this.placeholderr.sfilename2.split('.').pop()))
      {
        this.sformdata.append('img2',files[0])
      }else{
        this.imgurl.simgurl2 =''
        this.placeholderr.sfilename2='请选择文件'
        alert('文件格式不正确')
      }
    },
    //上传
    upload(){
      //自定义axios 否则会使用全局default 配置的axios 这个定义在函数里面放外面会404
      let upaxios = axios.create({
        headers:{
          'Content-Type': 'multipart/form-data'
        },
        withCredentials : true,
        transformRequest:[function (data){
          return data
        }]
      })
      if(this.usr_sex && this.usr_school && this.usr_major && this.imgurl.iimgurl1 && this.imgurl.iimgurl2 && this.imgurl.simgurl1 && this.imgurl.simgurl2){
      this.is_loading = true
      //上传身份证
      this.iformdata.append('uemail',this.usrinfo.uemail)
      upaxios.post('verify/iverify/',this.iformdata).then(res => {
        console.log(res.data);
        if(res.data.is_login == 'yes'){
          if(res.data.is_upload == 'yes'){
            this.is_loading_2+=1
            if(this.is_loading_2 == 2){
              this.is_loading =false
              alert('上传成功请耐心等待审核')
            }
          }
        }else{
          this.is_loading =false
          alert('请重新登录')
        }
      })
      //上传学生证
      this.sformdata.append('uemail',this.usrinfo.uemail)
      upaxios.post('verify/sverify/',this.sformdata).then(res => {
        console.log(res.data);
        if(res.data.is_login == 'yes'){
          if(res.data.is_upload == 'yes'){
            this.is_loading_2+=1
            if(this.is_loading_2 == 2){
              this.is_loading =false
              alert('上传成功请耐心等待审核')
            }

            this.$emit('showtregister',false)
          }
        }else{
          alert('请重新登录')
          this.is_loading =false
        }
      })

      //更新信息
      axios({
        withCredentials : true,
        url:'account/upusrinfo/',
        method:'post',
        data: {
          uage:this.usrinfo.uage,
          usex:this.usr_sex,
          uschool: this.usr_school,
          umajor: this.usr_major,
          uteaching_subjects: this.usrinfo.uteaching_subjects,
          uteaching_grade: this.usrinfo.uteaching_grade,
          uexperience: this.usrinfo.uexperience,
          u_phone_number: this.usrinfo.uphone_number,
          u_now_province: this.usrinfo.u_now_province,
          u_now_city_county: this.usrinfo.u_now_city_county,
        }
      }).then(res => {
        console.log(res.data);
        //向home页发送一个emit 请求获取新的用户信息
        this.$emit('getnewinfo')
      })
    }else{
      if(this.usr_sex == ''){
        this.imessage +='性别 '
      }
      if(this.usr_major==''){
        this.imessage +='专业 '
      }
      if(this.usr_school==''){
        this.imessage +='学校 '
      }
      if(this.imgurl.iimgurl1 =='' ||this.imgurl.iimgurl2 =='' ||this.imgurl.simgurl2 ==''|| this.imgurl.simgurl1 ==''){
        this.imessage +='图片信息 '
      }
      alert(this.imessage)
      this.imessage='请输入'
    }
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
img{
  height:100px ;
  width:200px;
}
</style>