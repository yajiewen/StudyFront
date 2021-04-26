<template>
 <div id="sendorderinfo">
    <h2>这里是订单信息</h2>
   {{order_info}}
 </div>
</template>

<script>
export default {
  name: "sendorderinfo",
  props:{
    order_info:Object,
  }
}
</script>

<style scoped>

</style>