<template>
  <Navabar v-bind:issee='is_show_log_button' v-bind:uname="uname" v-on:getlogout="glogout"></Navabar>
  <div id="identityverify" >
    <div v-if="showupload">
      <div class="columns">
        <div class="column is-6 is-offset-3">
          <h5 class="title is-5" >实名审核</h5>
          <img v-bind:src="imgurl1" alt="">
          <div class="file has-name font2">
            <label class="file-label">
              <input class="file-input" type="file" multiple name="files" v-on:change="getimg1">
              <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              身份证正面
            </span>
          </span>
              <span class="file-name">
            {{filename1}}
          </span>
            </label>
          </div>
        </div>
      </div>

      <div class="columns">
        <div class="column is-6 is-offset-3">
          <img v-bind:src="imgurl2" alt="">
          <div class="file has-name font2">
            <label class="file-label">
              <input class="file-input" type="file" multiple name="files" v-on:change="getimg2">
              <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              身份证背面
            </span>
          </span>
              <span class="file-name">
            {{filename2}}
          </span>
            </label>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-6 is-offset-3">
          <button class="button font2" @click="upload" :class="{'is-loading':is_loading}">提交</button>
        </div>
      </div>
    </div>
    <div v-else class="columns">
      <div class="column is-6 is-offset-3">
        <h5 class="title is-5" >上传成功请耐心等待审核...{{timer}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import Navabar from "../components/Navabar";
import axios from 'axios'
//自定义axios 否则会使用全局default 配置的axios
let upaxios = axios.create({
  headers:{
    'Content-Type': 'multipart/form-data'
  },
  withCredentials : true,
  transformRequest:[function (data){
    return data
  }]
})

export default {
  name: "identityverify",
  components: {
    Navabar,
  },
  data() {
    return {
      uemail: this.$route.params.email,
      uname: this.$route.params.usr_name,
      is_show_log_button: false,
      is_loading:false,
      showupload:true,
      timer:0,
      filename1:'请选择文件',
      imgurl1:'',
      filename2:'请选择文件',
      imgurl2:'',
      formdata: new FormData, //保存文件
      imgstyle:['jpg','jpeg','png',] //可上传的图片格式
    }
  },
  methods: {
    glogout(isshow) {
      this.is_show_log_button = isshow
    },
    getimg1(imgobj){
      let files = imgobj.target.files
      this.filename1 = files[0].name //获取文件名字

      let reader = new FileReader()//获取文件地址(地址是加密的没法看)
      reader.readAsDataURL(files[0])
      reader.onload = ()=>{
        this.imgurl1 = reader.result
      }

      if(this.imgstyle.includes(this.filename1.split('.').pop()))
      {
        this.formdata.append('img1',files[0])
      }else{
        this.filename1='请选择文件'
        alert('文件格式不正确')
      }

    },
    getimg2(imgobj){
      let files = imgobj.target.files
      this.filename2 = files[0].name //获取文件名字

      let reader = new FileReader()//获取文件地址(地址是加密的没法看)
      reader.readAsDataURL(files[0])
      reader.onload = ()=>{
        this.imgurl2 = reader.result
      }

      if(this.imgstyle.includes(this.filename2.split('.').pop()))
      {
        this.formdata.append('img2',files[0])
      }else{
        this.filename2='请选择文件'
        alert('文件格式不正确')
      }
    },
    upload(){
      this.is_loading = true
      this.formdata.append('uemail',this.uemail)
      upaxios.post('verify/iverify/',this.formdata).then(res => {
        console.log(res.data);
        if(res.data.is_login == 'yes'){
          if(res.data.is_upload == 'yes'){
            this.is_loading =false
            this.showupload = false
            this.timer = 6
            let tim = setInterval(()=>{
              this.timer -=1
              if(this.timer == 0){
                this.$router.replace('/')
                clearInterval(tim)
              }
            },1000)
          }
        }else{
          this.is_loading =false
          alert('请重新登录')
        }
      })
    },
  }
}
</script>

<style scoped>
img{
  height:170px ;
  width:350px;
}
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