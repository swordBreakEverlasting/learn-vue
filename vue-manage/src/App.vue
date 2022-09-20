<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
html,body{
  margin:0px;
  padding:0px;
}
#app {
  /* 100vh表示页面就算没有元素也会撑开到与页面一致大小 */
  /* 如果是100%，页面没有元素是不会撑开的 */
  height: 100vh;
}
</style>
