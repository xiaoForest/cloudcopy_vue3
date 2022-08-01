
<template>
  <Head />
  <NavigationBar />
  <div class="containerFlex">
    <Menu />
    <MainContent
      ref="monacoEdit"
      :value="ruleForm.content"
      @contentChange="contentChange"
    />
  </div>
</template>

<script setup>
import { computed, ref, watch, toRaw } from "vue";
const countent = ref("");
const props = defineProps({
  propData: {
    type: String,
    default: "",
  },
});
const ruleForm = ref({
  content: "",
});
const getList = () => {
  ruleForm.value.content = "console.log()";
};
function contentChange(val) {
  //先拿一个值存放monaco组件传递过来的值
  countent.value = val;
  console.log(val);
}
</script>

<style lang="scss" scoped>
.containerFlex {
  display: flex;
}
</style>
