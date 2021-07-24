<template>
  <div id="backnavbar" class="columns">
    <div class="column">
      <div class="tabs is-centered font2">
        <ul>
          <li :class="{'is-active':showactive.stage_usrinfo}" @click="showstageusrinfoblock">
            <a>
              <span class="icon is-small"><i class="fas fa-home" aria-hidden="true"></i></span>
              <span>主页信息</span>
            </a>
          </li>
          <li :class="{'is-active':showactive.badaccouont}" @click="showaccountblock">
            <a>
              <span class="icon is-small"><i class="fas fa-user-alt-slash" aria-hidden="true"></i></span>
              <span>垃圾账号处理</span>
            </a>
          </li>
          <li :class="{'is-active':showactive.identity}" @click="showidentityblock">
            <a>
              <span class="icon is-small"><i class="far fa-address-card" aria-hidden="true"></i></span>
              <span>身份审核</span>
            </a>
          </li>
          <li :class="{'is-active':showactive.stu_status}" @click="showstudentblock">
            <a>
              <span class="icon is-small"><i class="fas fa-graduation-cap" aria-hidden="true"></i></span>
              <span>学籍审核</span>
            </a>
          </li>
          <li :class="{'is-active':showactive.cus_complete}" @click="showcuscompleteblock">
            <a>
              <span class="icon is-small"><i class="fas fa-check-square" aria-hidden="true"></i></span>
              <span>客服结单</span>
            </a>
          </li>
          <li :class="{'is-active':showactive.cus_intervene}" @click="showcusinterveneblock">
            <a>
              <span class="icon is-small"><i class="fas fa-phone" aria-hidden="true"></i></span>
              <span>客服介入</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "backnavbar",
  data(){
    return{
      showactive:{
        badaccouont:false,
        identity:false,
        stu_status:false,
        cus_complete:false,
        cus_intervene:false,
        stage_usrinfo:true,
      }
    }
  },
  methods:{
    showstageusrinfoblock(){
      if(this.showactive.stage_usrinfo == false){
        for(let keyvalue of Object.keys(this.showactive)){
          if(keyvalue == 'stage_usrinfo'){
            this.showactive[keyvalue] = true
          }else{
            this.showactive[keyvalue] = false
          }
          //发射显示account模块
          this.$emit('showsusrinfoblock')
        }
      }
    },
    showaccountblock(){
      if(this.showactive.badaccouont == false){
        for(let keyvalue of Object.keys(this.showactive)){
          if(keyvalue == 'badaccouont'){
            this.showactive[keyvalue] = true
          }else{
            this.showactive[keyvalue] = false
          }
          //发射显示account模块
          this.$emit('showaccountblock')
        }
      }
    },
    showidentityblock(){
      if(this.showactive.identity == false){
        for(let keyvalue of Object.keys(this.showactive)){
          if(keyvalue == 'identity'){
            this.showactive[keyvalue] = true
          }else{
            this.showactive[keyvalue] = false
          }
          //发射显示account模块
          this.$emit('showidentityblock')
        }
      }
    },
    showstudentblock(){
      if(this.showactive.stu_status == false){
        for(let keyvalue of Object.keys(this.showactive)){
          if(keyvalue == 'stu_status'){
            this.showactive[keyvalue] = true
          }else{
            this.showactive[keyvalue] = false
          }
          //发射显示account模块
          this.$emit('showstudentblock')
        }
      }
    },
    showcusinterveneblock(){
      if(this.showactive.cus_intervene == false){
        for(let keyvalue of Object.keys(this.showactive)){
          if(keyvalue == 'cus_intervene'){
            this.showactive[keyvalue] = true
          }else{
            this.showactive[keyvalue] = false
          }
          //发射显示account模块
          this.$emit('showcusinterveneblock')
        }
      }
    },
    showcuscompleteblock(){
      if(this.showactive.cus_complete == false){
        for(let keyvalue of Object.keys(this.showactive)){
          if(keyvalue == 'cus_complete'){
            this.showactive[keyvalue] = true
          }else{
            this.showactive[keyvalue] = false
          }
          //发射显示account模块
          this.$emit('showcusmpleteblock')
        }
      }
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
</style>