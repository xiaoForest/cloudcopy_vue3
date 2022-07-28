
<template>
  <div class="MenuWrap">
    <a-form layout="inline">
      <a-form-item label="" v-bind="validateInfos.region" style="width: 32%">
        <a-select v-model:value="modelRef.region" placeholder="全部">
          <a-select-option value="1">私有</a-select-option>
          <a-select-option value="2">公开</a-select-option>
          <a-select-option value="3">收藏</a-select-option>
          <a-select-option value="4">分享</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="" v-bind="validateInfos.name" style="width: 45%">
        <a-input
          placeholder="关键字搜索"
          v-model:value="modelRef.name"
          @blur="validate('name', { trigger: 'blur' }).catch(() => {})"
        />
      </a-form-item>

      <a-form-item style="margin-right: 0">
        <a-button type="primary" @click.prevent="onSubmit">
          <template #icon><SearchOutlined /></template>
        </a-button>
      </a-form-item>
    </a-form>

    <a-menu
      id="menu"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      style="width: 100%; border-right: 0"
      mode="inline"
      @click="handleClick"
    >
      <a-sub-menu key="sub1" @titleClick="titleClick">
        <template #icon>
          <ExportOutlined />
        </template>
        <template #title>
          <div class="flexTextFs">
            <span>私有</span>
            <span>4</span>
          </div>
        </template>
        <a-menu-item key="1">枝繁族谱登陆账户</a-menu-item>
        <a-menu-item key="2">Github仓库</a-menu-item>
        <a-menu-item key="3">
          <a href="https://antdv.com/components/menu-cn" target="_blank"
            >a标签链接</a
          >
        </a-menu-item>
        <a-menu-item key="4">个人博客</a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub2" @titleClick="titleClick">
        <template #icon>
          <FolderOpenOutlined />
        </template>
        <template #title>
          <div class="flexTextFs">
            <span>公开</span>
            <span>1</span>
          </div>
        </template>
        <a-menu-item key="6">王者荣耀</a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub3" @titleClick="titleClick">
        <template #icon>
          <StarOutlined />
        </template>
        <template #title>
          <div class="flexTextFs">
            <span>收藏</span>
            <span>1</span>
          </div>
        </template>
        <a-menu-item key="7">QQ音乐</a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub4" @titleClick="titleClick">
        <template #icon>
          <ShareAltOutlined />
        </template>
        <template #title>
          <div class="flexTextFs">
            <span>分享</span>
            <span>1</span>
          </div>
        </template>
        <a-menu-item key="8">行尸走肉</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script setup>
import { ref, watch, defineComponent, reactive } from "vue";
import {
  ExportOutlined,
  ShareAltOutlined,
  StarOutlined,
  FolderOpenOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import { Form } from "ant-design-vue";
const useForm = Form.useForm;

const openKeys = ref(["sub1"]);
const selectedKeys = ref(["2"]);

const handleClick = (e) => {
  console.log("click", e);
};

const titleClick = (e) => {
  console.log("titleClick", e);
};

watch(
  () => openKeys,
  (val) => {
    console.log("openKeys", val);
  }
);

const modelRef = reactive({
  name: "",
  region: undefined,
});
const rulesRef = reactive({
  name: [
    {
      required: true,
      message: "请输入关键字",
    },
    {
      min: 3,
      max: 5,
      message: "字数太少",
      trigger: "blur",
    },
  ],
  region: [
    {
      required: false,
      message: "请选择",
    },
  ],
});
const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);

const onSubmit = () => {
  validate()
    .then(() => {
      console.log(toRaw(modelRef));
    })
    .catch((err) => {
      console.log("error", err);
    });
};
</script>

<style lang="scss" scoped>
.MenuWrap {
  width: 320px;
  height: calc(100vh - 220px);
  border-right: 1px solid #f0f0f0;
  .ant-form {
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 1px #f0f0f0 solid;
  }
}
</style>
