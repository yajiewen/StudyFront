<template>
  <div id="personalinfo" class="card column is-one-third">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ usr_info.uname }}<span class="tag is-link is-light" v-if="usr_info.is_certificate_verify == 1">认 证 v</span><span class="tag is-light" v-else>未 认 证</span></p>
          <p class="subtitle is-6 font2">{{ usr_info.uemail }}</p>
        </div>
      </div>

      <div class="content">
        <h2><span class="tag is-light">个 人 经 历</span></h2>
        <p class="font2">{{usr_info.uexperience}}</p>
        <ul>
          <li class="font2"><span class="tag is-light">性 别</span>{{ usr_info.usex}}</li>
          <li class="font2"><span class="tag is-light">年 龄</span>{{ usr_info.uage}}</li>
          <li class="font2"><span class="tag is-light">学 校</span>{{ usr_info.uschool}}</li>
          <li class="font2"><span class="tag is-light">专 业</span>{{ usr_info.umajor}}</li>
          <li class="font2"><span class="tag is-light">执 教 年 级</span>{{usr_info.uteaching_grade}}</li>
          <li class="font2"><span class="tag is-light">执 教 学 科</span>{{usr_info.uteaching_subjects}}</li>
          <li class="font2"><span class="tag is-light">电 话</span>{{usr_info.uphone_number}}</li>
          <li class="font2"><span class="tag is-light">所 在 地</span>{{usr_info.u_now_province}} {{usr_info.u_now_city_county}}</li>
        </ul>

        <br>
        <button class=" button is-small is-rounded" @click="showchangeinfo">更新信息</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
name: "personalinfo",
props:{
  usr_info:Object,
},
methods:{
  showchangeinfo(){
    this.$emit('showchangeinfo',true)
  }
}
}
</script>

<style scoped>
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