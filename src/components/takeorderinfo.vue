<template>
 <div id="takeorderinfo">
   <h2>这里是接单详细信息</h2>
   {{order_info}}
 </div>
</template>

<script>
export default {
name: "takeorderinfo",
props:{
  order_info:Object,
},
data(){
  return{

  }
}
}
</script>

<style scoped>

</style>