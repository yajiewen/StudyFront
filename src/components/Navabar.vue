<template>
  <div class="container block">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <!--          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">-->
          <img src="../assets/red-treelog.png" width="112" height="28">
        </a>

        <a role="button" v-bind:class="{'is-active': isactive}" @click="turnactive" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{'is-active': isactive}" >
        <div class="navbar-start">
          <a class="navbar-item" v-on:click="tohome">
            红 树 林 家 教
          </a>


          <a class="navbar-item">
            关 于 我 们
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              More
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                About
              </a>
              <a class="navbar-item">
                Jobs
              </a>
              <a class="navbar-item">
                Contact
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item">
                Report an issue
              </a>
            </div>
          </div>

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
  </div>
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
  logout(){
    axios({
      withCredentials : true,
      url:'https://127.0.0.1:8081/account/logout/',
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