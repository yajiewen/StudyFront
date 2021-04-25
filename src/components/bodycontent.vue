<template>
  <div class="columns">
    <div class="column is-one-fifth">
      <slot name="left">这里是左边</slot>
    </div>
    <div class="column is-three-fifth">
      <slot name="middle">这里是中间</slot>
    </div>
    <div class="column">
      <slot name="right">这里是右边</slot>
    </div>
  </div>

  <div class="columns">
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
          is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
name: "bodycontent"
}
</script>

<style scoped>
div{
  border-style: solid;
}

</style>