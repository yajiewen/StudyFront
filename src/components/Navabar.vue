<template>
<!--  <div class="container block">-->
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="../assets/nav.png" width="112" height="28">
        </a>

        <a role="button" v-bind:class="{'is-active': isactive}" @click="turnactive" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{'is-active': isactive}" >
        <div class="navbar-start">
<!--          <a class="navbar-item" v-on:click="tohome">
            思 达 迪 家 教
          </a>-->


          <a class="navbar-item" v-on:click="toaboutus">
            关 于 我 们
          </a>

<!--          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              更多
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                (功能待扩展)
              </a>
              <a class="navbar-item">
                (功能待扩展)
              </a>
              <a class="navbar-item">
                (功能待扩展)
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item">
                (功能待扩展)
              </a>
            </div>
          </div>-->

        </div>

        <div class="navbar-end">
          <div class="navbar-item" v-if="issee">
            <div class="buttons">
              <a class="button is-link is-small" v-on:click="toregister">
                <strong>注 册</strong>
              </a>
              <a class="button is-light is-small" v-on:click="tologin">
                登 录
              </a>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable" v-else>
            <a class="navbar-link">
              {{uname}}
            </a>
            <div class="navbar-dropdown">
<!--              <a class="navbar-item">
                个人中心
              </a>
              <hr class="navbar-divider">-->
              <a class="navbar-item" v-on:click="logout" v-if="!issee">
                登 出
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <hr class="navbar-divider">
<!--  </div>-->
</template>

<script>
import axios from 'axios'


export default {
name: "Navabar",
props:{
  uname:String,
  issee:Boolean,

},
data(){
  return{
    isactive:false,
  }
},
emits:["getlogout"], // 解决emit waring
methods:{
  tologin(){
    this.$router.push("/login")
  },
  toregister(){
    this.$router.push('/register')
  },
  tohome(){
    this.$router.push('/')
  },
  toaboutus(){
    this.$router.push("/about")
  },
  logout(){
    axios({
      withCredentials : true,
      url:'account/logout/',
      method:'post',
      data: {
      }
    }).then(res => {
      if(res.data.is_logout == 'yes'){
        //向父组件传值
        this.$emit('getlogout',true)
      }
    })
  },
  turnactive(){   //这个必须绑定class 否则 当页面缩小后 点击不会有到导航栏里面的字段 单纯源代码不够
    this.isactive = !this.isactive
  },
  tocreateorder(){
    this.$router.push('/createorder')
  }
}
}
</script>

<style scoped>

</style>