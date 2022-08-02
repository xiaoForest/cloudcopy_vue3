
<template>
  <Head ref="changeValue" />
  <NavigationBar />
  <div class="containerFlex">
    <Menu class="boxes1" v-if="!showMenu" />
    <div v-else class="boxes1"></div>
    <MainContent ref="monacoEdit" class="boxes2" />
    <PhotoSharing class="boxes3" v-if="!showPhoto" />
    <div v-else class="boxes3"></div>
  </div>
</template>

<script setup>
import { computed, ref, watch, toRaw, watchEffect } from "vue";
const changeValue = ref();
const showMenu = ref(false);
const showPhoto = ref(false);
watchEffect(() => {
  if (changeValue.value != undefined) {
    showMenu.value = changeValue.value.checked3;
    showPhoto.value = changeValue.value.checked1;
  }
});
</script>

<style lang="scss" scoped>
.containerFlex {
  display: flex;
  width: 100%;
  .boxes1 {
    width: 320px;
  }
  .boxes2 {
    width: calc(100% - 640px);
  }
  .boxes3 {
    width: 320px;
  }
}
</style>
