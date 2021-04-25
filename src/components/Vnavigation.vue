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
            <li><a>家教订单</a></li>
            <li><a>智能推荐</a></li>
            <li><a>找老师</a></li>
          </ul>
        </li>
<!--        <li><a>Invitations</a></li>
        <li><a>Cloud Storage Environment Settings</a></li>
        <li><a>Authentication</a></li>-->
      </ul>

      <p class="menu-label">
        Personal business
      </p>
      <ul class="menu-list">
        <li>
          <a class="is-active" v-on:click="show_personal_center">个 人 中 心</a>
          <ul v-show="isunfold_personal_center">
            <li><a @click="show_myinfo">个人信息</a></li>
            <li><a>我接的单</a></li>
            <li><a>我发的单</a></li>
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
            <li><a>充值树叶</a></li>
            <li><a>提现</a></li>
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
methods:{
  show_tutoring_business(){
    this.$emit('changstatetb')
  },
  show_personal_center(){
    if(this.is_login){
      this.$emit('changestatepc')
    }
  },
  show_paid_business(){
    if(this.is_login){
      this.$emit('changestatepb')
    }
  },
  show_myinfo(){
    if(this.is_login){
      this.$emit('showmyinfo')
    }
  }
}
}
</script>

<style scoped>

</style>