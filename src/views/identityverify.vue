<template>
  <Navabar v-bind:issee='is_show_log_button' v-bind:uname="uname" v-on:getlogout="glogout"></Navabar>
  <div id="identityverify" class="columns">
    <div class="column">
      <img src="" alt="">
      <div class="file has-name is-right">
        <label class="file-label">
          <input class="file-input" type="file" multiple name="files" v-on:change="upload">
          <span class="file-cta">
            <span class="file-icon">
              <i class="fas fa-upload"></i>
            </span>
            <span class="file-label">
              选择文件
            </span>
          </span>
          <span class="file-name">
            {{filename}}
          </span>
        </label>
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
      filename:'',
    }
  },
  methods: {
    glogout(isshow) {
      this.is_show_log_button = isshow
    },
    upload(e){
      let files = e.target.files
      console.log(files);
      let formData = new FormData()
      this.filename = files[0].name //获取文件名字
      for (let i = 0;i < files.length;i++) {
        formData.append('files', files[i])
        console.log('添加问价n');
      }

      upaxios.post('https://127.0.0.1:8081/test/',formData)
    },
  }
}
</script>

<style scoped>

</style>