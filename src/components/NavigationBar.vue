
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
  </section>
</template>
<script setup>
import { ref, reactive, toRaw } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";
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

const onSubmit = () => {
  console.log(value.value.value);
  console.log(valueText.value);
};
</script>

<style lang="scss" scoped>
.navigationBarWrap {
  height: 140px;
  background-color: #1890ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .formWrap {
    display: inline-block;
    padding: 15px;
    margin: 0 auto;
    background-color: #fff;
    .ant-form {
      .ant-row {
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
