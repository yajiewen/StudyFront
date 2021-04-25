<template>
  <div id="personalinfo" class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ usr_info.uname }}<span class="tag is-link is-light" v-if="usr_info.is_certificate_verify == 1">认 证 v</span><span class="tag is-light" v-else>未 认 证</span></p>
          <p class="subtitle is-6">{{ usr_info.uemail }}</p>
        </div>
      </div>

      <div class="content">
        <h2><span class="tag is-light">个 人 经 历</span></h2>
        <p>{{usr_info.uexperience}}</p>
        <ul>
          <li><span class="tag is-light">性 别</span>{{ usr_info.usex}}</li>
          <li><span class="tag is-light">年 龄</span>{{ usr_info.uage}}</li>
          <li><span class="tag is-light">学 校</span>{{ usr_info.uschool}}</li>
          <li><span class="tag is-light">专 业</span>{{ usr_info.umajor}}</li>
          <li><span class="tag is-light">电 话</span>{{usr_info.uphone_number}}</li>
          <li><span class="tag is-light">执 教 年 级</span>{{usr_info.uteaching_grade}}</li>
          <li><span class="tag is-light">执 教 学 科</span>{{usr_info.uteaching_subjects}}</li>
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

</style>