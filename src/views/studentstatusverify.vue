<template>
  <Navabar v-bind:issee='is_show_log_button' v-bind:uname="uname" v-on:getlogout="glogout"></Navabar>
  <div id="identityverify" class="columns">
    <div class="column">
      <h2>这里是学籍认证</h2>
      {{uemail}}
      {{uname}}
    </div>
  </div>
</template>

<script>
import Navabar from "../components/Navabar";

export default {
  name: "studentstatusverify",
  components:{
    Navabar,
  },
  data(){
    return{
      uemail:this.$route.params.email,
      uname:this.$route.params.usr_name,
      is_show_log_button:false
    }
  },
  methods:{
    glogout(isshow){
      this.is_show_log_button = isshow
    },
  }
}
</script>

<style scoped>

</style>