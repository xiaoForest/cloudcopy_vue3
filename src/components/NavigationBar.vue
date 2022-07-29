
<template>
  <section class="navigationBarWrap">
    <div class="formWrap">
      <a-form layout="inline">
        <a-form-item>
          <a-select
            v-model:value="value"
            label-in-value
            style="width: 70px"
            :options="options"
            @change="handleChange"
          ></a-select>
        </a-form-item>

        <a-form-item>
          <a-input v-model:value="valueText" style="width: 270px" />
        </a-form-item>

        <a-form-item>
          <a-button @click.prevent="onSubmit">搜索</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="infoWrap">
      <div class="companyList">
        <a target="_blank" href="https://cn.vuejs.org/index.html" class="items">
          <img src="../assets/vue.svg" alt="" />
          <span>Vue.js</span>
        </a>
        <a target="_blank" href="https://cn.vuejs.org/index.html" class="items">
          <img src="../assets/vue.svg" alt="" />
          <span>Vue.js</span>
        </a>
        <a target="_blank" href="https://cn.vuejs.org/index.html" class="items">
          <img src="../assets/vue.svg" alt="" />
          <span>Vue.js</span>
        </a>
        <a target="_blank" href="https://cn.vuejs.org/index.html" class="items">
          <img src="../assets/vue.svg" alt="" />
          <span>Vue.js</span>
        </a>
      </div>
      <a-button @click="addNav" type="text">
        <PlusOutlined style="color: #fff; font-size: 20px"
      /></a-button>
    </div>
  </section>

  <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
    <p>开发中</p>
  </a-modal>
</template>
<script setup>
import { ref, reactive, toRaw } from "vue";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { Form } from "ant-design-vue";
const useForm = Form.useForm;
defineProps({
  msg: String,
});

const options = ref([
  {
    value: "baidu",
    label: "百度",
  },
  {
    value: "google",
    label: "谷歌",
  },
  {
    value: "bing",
    label: "必应",
  },
  {
    value: "sougou",
    label: "搜狗",
  },
]);
const valueText = ref("");
const handleChange = (value) => {
  console.log(value); // { key: "lucy", label: "Lucy (101)" }
};
const value = ref({
  value: "google",
});

const visible = ref(false);
const addNav = () => {
  visible.value = true;
};
const handleOk = (e) => {
  console.log(e);
  visible.value = false;
};

const onSubmit = () => {
  console.log(value.value.value);
  console.log(valueText.value);
};
</script>

<style lang="scss" scoped>
.navigationBarWrap {
  height: 200px;
  background-color: #1890ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .formWrap {
    display: inline-block;
    padding: 15px;
    margin: 0 auto;

    .ant-form {
      .ant-row {
        margin: 2px;
      }
    }
  }
  .infoWrap {
    display: flex;
    align-items: center;

    .companyList {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .items {
        margin: 0 15px;
        display: flex;
        align-items: center;
        img {
          width: 30px;
        }
        span {
          margin-left: 6px;
          color: #fff;
        }
      }
    }
  }
}
</style>
