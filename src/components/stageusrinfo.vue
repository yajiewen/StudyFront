<template>
  <div id="stageusrinfo">
    <div class="content has-text-centered font1">
      <p>平台注册人数为: {{stage_usr_info.regs_num}} 人</p>
      <p>平台老师人数为: {{stage_usr_info.teacher_num}} 人</p>
      <p>平台实名认证人数为: {{stage_usr_info.id_identified_num}} 人</p>
      <p>平台购买找老师人数为: {{stage_usr_info.buy_find_teacher_num}} 人</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "stageusrinfo",
  props:{
    stage_usr_info:Object,
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