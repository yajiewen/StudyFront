<template>
  <div id="personalinfo" class="card column is-one-third">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <input type="file" style="display:none;" id="upload" accept="image/gif,image/jpeg,image/png,image/jpg" v-on:change="uploadImg" />
            <div @click="showUploadImg">
              <img :src="Headimgurl" alt="Placeholder image">
            </div>
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ usr_info.uname }}<span class="tag is-link is-light" v-if="usr_info.is_certificate_verify == 1">学 籍 认 证 v</span><span class="tag is-light" v-else v-on:click="gotosverify">学 籍 未 认 证</span></p>
          <p class="subtitle is-6 font2">{{ usr_info.uemail }}<span class="tag is-link is-light" v-if="usr_info.is_identity_verify == 1">身 份 认 证 v</span><span class="tag is-light" v-else v-on:click="gotoiverify">身 份 未 认 证</span></p>
        </div>
      </div>

      <div class="content">
        <h2><span class="tag is-light">个 人 经 历</span></h2>
        <p class="font2">{{usr_info.uexperience}}</p>
        <ul>
          <li class="font2"><span class="tag is-light">性 别</span>{{ usr_info.usex}}</li>
          <li class="font2"><span class="tag is-light">年 龄</span>{{ usr_info.uage}}</li>
          <li class="font2"><span class="tag is-light">学 校</span>{{ usr_info.uschool}}</li>
          <li class="font2"><span class="tag is-light">专 业</span>{{ usr_info.umajor}}</li>
          <li class="font2"><span class="tag is-light">执 教 年 级</span>{{usr_info.uteaching_grade}}</li>
          <li class="font2"><span class="tag is-light">执 教 学 科</span>{{usr_info.uteaching_subjects}}</li>
          <li class="font2"><span class="tag is-light">电 话</span>{{usr_info.uphone_number}}</li>
          <li class="font2"><span class="tag is-light">所 在 地</span>{{usr_info.u_now_province}} {{usr_info.u_now_city_county}}</li>
        </ul>

        <br>
        <div class="field">
          <p class="font1">
          <span class="icon is-small is-left">
              <i class="fas fa-wallet"></i>
          </span>
            &nbsp{{ parseFloat(usr_info.ucoin).toFixed(2)}}&nbsp元
          </p>
        </div>
        <button class=" button is-small is-rounded" @click="showchangeinfo">更新信息</button>
        <button class=" button is-small is-rounded" @click="showtregister" v-bind:disabled="usr_info.is_certificate_verify ==1 &&usr_info.is_identity_verify ==1">{{buttonmess}}</button>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
name: "personalinfo",
  props:{
    usr_info:Object,
  },
  data(){
    return {
      Headimgurl: 'https://bulma.io/images/placeholders/96x96.png', //未上传的用户的默认头像
      ImgFormData: new FormData, //保存文件
      imgstyle:['jpg','jpeg','png',] //可上传的图片格式
    }
  },
  computed:{
   buttonmess(){
     if(this.usr_info.is_certificate_verify ==1 && this.usr_info.is_identity_verify ==1){
       return '老师已认证'
     }else{
       return '老师认证'
     }
   }
  },
  watch:{
   usr_info(){
     if(this.usr_info.head_img_url != ''){
       this.Headimgurl = this.usr_info.head_img_url
     }
   }
  },
  methods:{
    showchangeinfo(){
      this.$emit('showchangeinfo',true)
    },
    showtregister(){
      this.$emit('showtregister',true)
    },
    gotoiverify(){ //转到身份认证
      this.$router.push({name:'identity', params:{email:this.usr_info.uemail,usr_name:this.usr_info.uname}})
    },
    gotosverify(){ //转到学籍认证
      this.$router.push({name:'studentstatus',params:{email:this.usr_info.uemail,usr_name:this.usr_info.uname}})
    },
    showUploadImg(){ //打开上传头像窗口
      document.getElementById('upload').click();
    },
    uploadImg(imgobj){ // 开始上传文件
      //自定义axios 否则会使用全局default 配置的axios
      let upaxios1 = axios.create({
        headers:{
          'Content-Type': 'multipart/form-data'
        },
        withCredentials : true,
        transformRequest:[function (data){
          return data
        }]
      })
      let files = imgobj.target.files
      let filename = files[0].name //获取文件名字

      let reader = new FileReader()//获取文件地址(地址是加密的没法看)
      reader.readAsDataURL(files[0])
      reader.onload = ()=>{
        this.Headimgurl = reader.result
      }

      if(this.imgstyle.includes(filename.split('.').pop()))
      {
        this.ImgFormData.append('headimg',files[0])
      }else{
        this.Headimgurl = 'https://bulma.io/images/placeholders/96x96.png'
        alert('文件格式不正确')
      }

      // 开始上传
      this.ImgFormData.append('uemail',this.usr_info.uemail) //添加uemial参数
      upaxios1.post('account/uploadheadimg/',this.ImgFormData).then(res => {
        console.log(res.data);
        if(res.data.is_login == 'yes'){
          if(res.data.is_upload == 'yes'){
            alert('头像上传成功!')
          }
        }else{
          alert('头像上传失败,请重新登录!')
        }
      })
    }
  }
}
</script>

<style scoped>
.font1{   /*发单者字体大小*/
  font-size: 1.2em
}
.font2{  /*年级 学科 ...字体大小*/
  font-size: 0.875em
}
.font3{
  font-size: 0.5em
}
</style>