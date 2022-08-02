
<template>
  <div class="photoWrap">
    <div class="topHead">
      <a-typography-title :level="4">每日一图</a-typography-title>
      <a-button type="link">
        <DoubleRightOutlined style="font-size: 26px" />
      </a-button>
    </div>
    <div class="mainImg">
      <a-image
        :width="280"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, toRaw, watch } from "vue";
import { DoubleRightOutlined } from "@ant-design/icons-vue";
</script>

<style lang="scss" scoped>
.photoWrap {
  width: 300px;
  border-left: 1px solid #f0f0f0;
  .topHead {
    height: 73px;
    padding: 20px 0 20px 20px;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .ant-typography {
      margin-bottom: 0;
    }
  }
  .mainImg {
    padding: 20px;
  }
}
</style>
