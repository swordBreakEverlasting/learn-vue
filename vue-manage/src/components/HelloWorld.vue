<template>
  <div class="hello">
    <router-link to="/">
      <el-button>去到Home按钮</el-button>
    </router-link>
    <router-link to="/user">
      <el-button type="primary">去到User按钮</el-button>
    </router-link>

    <el-radio disabled v-model="radio" label="禁用">备选项</el-radio>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      radio: 1,
    };
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

