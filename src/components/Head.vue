
<template>
  <div class="headWrap">
    <div class="boxes">
      <div class="logo">
        <img src="../assets/vue.svg" alt="" />
        <h1>云拷贝</h1>
        <span>不只是拷贝</span>
      </div>
    </div>
    <div class="boxes">
      <span class="hint">即日起 注册用户可订阅2个以上主题啦</span>
    </div>
    <div class="boxes">
      <a-button type="primary" shape="circle" size="large">
        <template #icon><BellOutlined /></template>
      </a-button>
      <a-button type="primary" shape="circle" size="large">
        <template #icon><SettingOutlined /></template>
      </a-button>
      <a-button type="primary" shape="circle" size="large">
        <template #icon><UserOutlined /></template>
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  BellOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
defineProps({
  msg: String,
});
</script>

<style lang="scss" scoped>
.headWrap {
  width: 100%;
  padding: 20px;
  border-bottom: 1px #f0f0f0 solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .boxes {
    .logo {
      display: flex;
      align-items: center;
      img {
        margin-right: 10px;
      }
      h1 {
        font-size: 26px;
        line-height: 1.2;
        margin: 0;
      }
      span {
        position: relative;
        top: 4px;
        line-height: 1.2;
        font-size: 16px;
        margin-left: 10px;
        display: block;
      }
    }
    .hint {
    }
    button {
      margin-right: 15px;
    }
  }
}
</style>
