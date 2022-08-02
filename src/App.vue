
<template>
  <Head />
  <NavigationBar />
  <div class="containerFlex">
    <Menu />
    <MainContent ref="monacoEdit" />
    <PhotoSharing />
  </div>
</template>

<script setup>
import { computed, ref, watch, toRaw } from "vue";
</script>

<style lang="scss" scoped>
.containerFlex {
  display: flex;
  width: 100%;
}
</style>
