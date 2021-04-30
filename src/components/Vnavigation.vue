<template>
  <div id="Vnavigation">
    <aside class="menu" >
      <p class="menu-label">
        Tutoring business
      </p>
      <ul class="menu-list">
        <li>
          <a class="is-active" v-on:click="show_tutoring_business" >家 教 业 务</a>
          <ul v-show="isunfold_tutoring_business">
            <li><a v-bind:class="{font1:changefontsize.tutor_order,font2:!changefontsize.tutor_order}" v-on:click="show_order_to_take_list">家教订单</a></li>
            <li><a v-bind:class="{font1:changefontsize.airecommend,font2:!changefontsize.airecommend}">智能推荐</a></li>
            <li><a v-bind:class="{font1:changefontsize.findteacher,font2:!changefontsize.findteacher}">找老师</a></li>
          </ul>
        </li>
      </ul>

      <p class="menu-label">
        Personal business
      </p>
      <ul class="menu-list">
        <li>
          <a class="is-active" v-on:click="show_personal_center">个 人 中 心</a>
          <ul v-show="isunfold_personal_center">
            <li><a @click="show_myinfo" v-bind:class="{font1:changefontsize.person_info,font2:!changefontsize.person_info}">个人信息</a></li>
            <li><a @click="show_take_orders" v-bind:class="{font1:changefontsize.mytorder,font2:!changefontsize.mytorder}">我接的单</a></li>
            <li><a @click="show_send_orders" v-bind:class="{font1:changefontsize.mysorder,font2:!changefontsize.mysorder}">我发的单</a></li>
            <li><a @click="show_create_order" v-bind:class="{font1:changefontsize.createorder,font2:!changefontsize.createorder}">创建订单</a></li>
          </ul>
        </li>
      </ul>

      <p class="menu-label">
        Transactions
      </p>
      <ul class="menu-list">
        <li>
          <a class="is-active" v-on:click="show_paid_business">充 值 业 务</a>
          <ul v-show="isunfold_paid_business">
            <li><a v-bind:class="{font1:changefontsize.recharge, font2:!changefontsize.recharge}">充 值</a></li>
            <li><a v-bind:class="{font1:changefontsize.withdrawal, font2:!changefontsize.withdrawal}">提 现</a></li>
          </ul>
        </li>
      </ul>

    </aside>
  </div>
</template>

<script>
export default {
name: "Vnavigation",
props:{
  isunfold_tutoring_business:Boolean,
  isunfold_personal_center:Boolean,
  isunfold_paid_business:Boolean,
  is_login:Boolean,
},
data(){
  return{
    changefontsize:{
      tutor_order:true, //主页家教订单字体大小
      airecommend:false, //智能推荐字体大小
      findteacher:false, //找老师字体大小
      person_info:false, //个人信息..
      mytorder:false, //我接的单..
      mysorder:false, //我发的单..
      recharge:false, //充值
      withdrawal:false, //提现
      createorder:false, //创建订单
    }
  }
},
methods:{
  show_tutoring_business(){  //展示家教业务
    this.$emit('changstatetb')
  },
  show_personal_center(){ //展示个人中心
    if(this.is_login){
      this.$emit('changestatepc')
    }
  },
  show_paid_business(){ //展示充值业务
    if(this.is_login){
      this.$emit('changestatepb')
    }
  },
  show_myinfo(){ //在中间展示个人信息
    if(this.is_login){
      this.$emit('showmyinfo')
      //改变导航栏字大小
      for(let keyvalue of Object.keys(this.changefontsize)){
        if(keyvalue != "person_info"){
          this.changefontsize[keyvalue] = false
        }else {
          this.changefontsize[keyvalue] = true
        }
      }
    }
  },
  show_take_orders(){ //在中间和右边展示接单信息
    if(this.is_login){
      this.$emit('showtorders')
      //改变导航栏字大小
      for(let keyvalue of Object.keys(this.changefontsize)){
        if(keyvalue != "mytorder"){
          this.changefontsize[keyvalue] = false
        }else {
          this.changefontsize[keyvalue] = true
        }
      }
    }
  },
  show_send_orders(){
    if(this.is_login){
      this.$emit('showsorders')
      //改变导航栏字大小
      for(let keyvalue of Object.keys(this.changefontsize)){
        if(keyvalue != "mysorder"){
          this.changefontsize[keyvalue] = false
        }else {
          this.changefontsize[keyvalue] = true
        }
      }
    }
  },
  show_create_order(){ //显示创建订单项
    if(this.is_login){
      this.$emit('showcorder')
      //改变导航栏字大小
      for(let keyvalue of Object.keys(this.changefontsize)){
        if(keyvalue != "createorder"){
          this.changefontsize[keyvalue] = false
        }else {
          this.changefontsize[keyvalue] = true
        }
      }
    }
  },
  show_order_to_take_list(){
      this.$emit('showzorderlist')
      //改变导航栏字大小
      for(let keyvalue of Object.keys(this.changefontsize)){
        if(keyvalue != "tutor_order"){
          this.changefontsize[keyvalue] = false
        }else {
          this.changefontsize[keyvalue] = true
        }
      }
  },

}
}
</script>

<style scoped>
.vnavfontcolor{
  color: skyblue;
}
.font1{
  font-size: 1em
}
.font2{
  font-size: 0.875em
}
.font3{
  font-size: 0.5em
}

</style>