<template>
  <div class="columns">
    <div class="column is-one-fifth ">
      <slot name="left">这里是左边</slot>
    </div>
<!--    is-two-fifths-->
<!--    <div class="column is-one-third">
      <slot name="middle">这里是中间</slot>
    </div>-->
<!--修改后中间和右边部分需要自己写上 class="column is-two-fifths" 以及大小is-two-fifths-->
    <slot name="middle">这里是中间</slot>
<!--    <div class="column">
      <slot name="right">这里是右边</slot>
    </div>-->
    <slot name="right">这里是右边</slot>
  </div>

  <div class="columns blockbackground">
    <div class="column">
      <footer class="footer">
        <div class="content has-text-centered font2">
          <p>
            <strong>思 达 迪  </strong>线上 线下大学生家教平台
          </p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "bodycontent"
}
</script>

<style scoped>

.blockbackground{
  background-color: #F9F9F9;
}
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