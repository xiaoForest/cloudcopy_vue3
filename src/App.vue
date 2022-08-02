
<template>
  <Head />
  <NavigationBar />
  <div class="containerFlex">
    <Menu class="boxes1" />
    <MainContent ref="monacoEdit" class="boxes2" />
    <PhotoSharing class="boxes3" />
  </div>
</template>

<script setup>
import { computed, ref, watch, toRaw } from "vue";
</script>

<style lang="scss" scoped>
.containerFlex {
  display: flex;
  width: 100%;
  .boxes1 {
    width: 20%;
  }
  .boxes2 {
    width: calc(80% - 320px);
  }
  .boxes3 {
    width: 320px;
  }
}
</style>
