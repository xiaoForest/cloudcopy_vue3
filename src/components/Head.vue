
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

      <a-popover title="个人配置" placement="topLeft">
        <template #content>
          <div class="item">
            <p>每日图片推送</p>
            <a-switch v-model:checked="checked1" />
          </div>
          <div class="item">
            <p>评论回复通知</p>
            <a-switch v-model:checked="checked2" />
          </div>
          <div class="item">
            <p>显示搜索工具栏</p>
            <a-switch v-model:checked="checked3" />
          </div>
          <div class="item">
            <p>默认有效时长(分钟)</p>
            <a-input
              v-model:value="inputValue"
              placeholder="Input a number"
              :max-length="25"
              @blur="onBlur"
              style="width: 60px; text-align: center"
            />
          </div>
        </template>
        <a-button type="primary" shape="circle" size="large">
          <template #icon><SettingOutlined /></template>
        </a-button>
      </a-popover>

      <a-button
        v-if="showLogIn"
        type="primary"
        @click="showModal"
        shape="circle"
        size="large"
      >
        <template #icon><UserOutlined /></template>
      </a-button>

      <a-popover
        v-else
        title="您好用户"
        placement="topLeft"
        v-model:visibleUser="visibleUser"
      >
        <template #content>
          <div class="userWrap">
            <div class="img"><img src="../assets/touxiang.jpg" alt="" /></div>
            <span class="name">小英雄</span>
          </div>
          <div class="userItem">
            <a-button type="dashed" @click="LoggedOut">退出登陆</a-button>
          </div>
        </template>
        <a-button type="primary" shape="circle" size="large">
          <template #icon><UserOutlined /></template>
        </a-button>
      </a-popover>
    </div>
  </div>

  <a-modal
    v-model:visible="visible"
    title="微信登陆"
    @ok="handleOk"
    :footer="null"
  >
    <div class="modalWeChat">
      <img src="../assets/code.jpg" alt="" />
      <p>微信扫码登陆</p>
      <a-button type="dashed" @click="onLogIn">点我 假装登陆看状态</a-button>
    </div>
  </a-modal>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import {
  BellOutlined,
  SettingOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
defineProps({
  msg: String,
});

// 个人配置 S
const checked1 = ref(false);
const checked2 = ref(false);
const checked3 = ref(false);

const formatNumber = (value) => {
  value += "";
  const list = value.split(".");
  const prefix = list[0].charAt(0) === "-" ? "-" : "";
  let num = prefix ? list[0].slice(1) : list[0];
  let result = "";

  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }

  if (num) {
    result = num + result;
  }

  return `${prefix}${result}${list[1] ? `.${list[1]}` : ""}`;
};
const inputValue = ref("10");
const formatValue = computed(() => {
  if (inputValue.value === "-") return "-";
  return formatNumber(inputValue.value);
});

const format = (val, preVal) => {
  const reg = /^-?\d*(\.\d*)?$/;

  if ((!isNaN(+val) && reg.test(val)) || val === "" || val === "-") {
    inputValue.value = val;
  } else {
    inputValue.value = preVal;
  }
}; // '.' at the end or only '-' in the input box.

const onBlur = () => {
  if (
    inputValue.value.charAt(inputValue.value.length - 1) === "." ||
    inputValue.value === "-"
  ) {
    format(inputValue.value.slice(0, -1), inputValue.value);
  }
};

watch(inputValue, (val, preVal) => {
  format(val, preVal);
});
// 个人配置 A

// 弹出二维码 S
const showLogIn = ref(true); // 二维码和已登录切换
const visible = ref(false);
const showModal = () => {
  // 点击后弹出二维码
  visible.value = true;
};

// 弹出二维码 A

// 登陆后 S
const visibleUser = ref(false);
const onLogIn = () => {
  visible.value = false;
  showLogIn.value = false;
};
const LoggedOut = () => {
  showLogIn.value = true;
};
// 登陆后 A
</script>

<style lang="scss" scoped>
.headWrap {
  width: 100%;
  padding: 20px;
  height: 80px;
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
    .ant-btn {
      margin-right: 15px;
    }
  }
}
.ant-popover-inner-content {
  .item {
    margin-bottom: 1em;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:last-child {
      margin-bottom: 0;
    }
    p {
      margin: 0;
    }
  }
}
.modalWeChat {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 300px;
  }
  p {
    font-size: 30px;
  }
}
.userWrap {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .img {
    width: 60px;
    height: 60px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .name {
    margin: 5px 0;
  }
}
.userItem {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
