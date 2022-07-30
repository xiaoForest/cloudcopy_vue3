
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

  <a-modal v-model:visible="visible" title="快捷导航" :footer="null">
    <a-form
      ref="formRef"
      :model="formState"
      name="dynamic_rule"
      v-bind="formItemLayout"
    >
      <a-form-item
        label="URL"
        name="url"
        :rules="[{ required: true, message: 'Please input your url!' }]"
      >
        <a-input v-model:value="formState.url" placeholder="输入链接地址" />
      </a-form-item>

      <a-form-item
        label="网站名称"
        name="urlName"
        :rules="[{ required: true, message: 'Please input your urlName!' }]"
      >
        <a-input
          v-model:value="formState.urlName"
          placeholder="首页最多展示五个字"
        />
      </a-form-item>

      <a-form-item v-bind="formTailLayout">
        <a-button type="primary" @click="onCheck">确定</a-button>
      </a-form-item>
    </a-form>
    <a-divider></a-divider>
    <ul class="webList">
      <li class="items">
        <div class="link">
          <a href="" target="_blank">
            <img src="../assets/vue.svg" alt="" />
            <span>技术开发</span>
          </a>
        </div>
        <div class="info">
          <a-button class="delete" type="text"><DeleteOutlined /></a-button>
          <a-button type="text">
            <a href="" target="_blank"><EllipsisOutlined /></a>
          </a-button>
        </div>
      </li>
      <li class="items">
        <div class="link">
          <a href="" target="_blank">
            <img src="../assets/vue.svg" alt="" />
            <span>技术开发</span>
          </a>
        </div>
        <div class="info">
          <a-button class="delete" type="text"><DeleteOutlined /></a-button>
          <a-button type="text">
            <a href="" target="_blank"><EllipsisOutlined /></a>
          </a-button>
        </div>
      </li>
    </ul>
  </a-modal>
</template>
<script setup>
import { ref, reactive, toRaw, watch } from "vue";
import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons-vue";
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

// 弹窗
const formRef = ref();
const formState = reactive({
  url: "",
  urlName: "",
  checkNick: false,
});
watch(
  () => formState.checkNick,
  () => {
    formRef.value.validateFields(["url"]);
  },
  {
    flush: "post",
  }
);

const onCheck = async () => {
  try {
    const values = await formRef.value.validateFields();
    console.log("Success:", values);
  } catch (errorInfo) {
    console.log("Failed:", errorInfo);
  }
};

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
const formTailLayout = {
  wrapperCol: {
    span: 20,
    offset: 4,
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
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
.webList {
  .items {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
      .delete {
        opacity: 1 !important;
      }
    }
    .link {
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 30px;
        }
        span {
          margin-left: 15px;
        }
      }
    }

    .info {
      .delete {
        opacity: 0;
        transform: 0.3s;
      }
      span {
        font-size: 22px;
      }
    }
  }
}
</style>
