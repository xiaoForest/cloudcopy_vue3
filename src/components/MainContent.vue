<template>
  <div class="codeEditWrap">
    <div class="codeEditInfo">
      <a-form layout="inline">
        <a-form-item>
          <a-select
           :default-value="language"
            labelInValue
            style="width: 150px"
            :options="options"
            @change="handleChange"
          ></a-select>
        </a-form-item>
        <a-form-item>
          <a-select
           :default-value="ThemeValue"
            labelInValue
            style="width: 150px"
            :options="optionsThem"
            @change="ThemeChange"
          ></a-select>
        </a-form-item>
      </a-form>
    </div>
    <div id="codeEditBox" class="codeEditBox"></div>
  </div>
</template>
<script setup>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution"; // 代码高亮
import "monaco-editor/esm/vs/basic-languages/php/php.contribution"; // 代码高亮
import "monaco-editor/esm/vs/basic-languages/python/python.contribution"; // 代码高亮
import "monaco-editor/esm/vs/basic-languages/css/css.contribution"; // 代码高亮
import "monaco-editor/esm/vs/basic-languages/html/html.contribution"; // 代码高亮
import "monaco-editor/esm/vs/basic-languages/scss/scss.contribution"; // 代码高亮

import { computed, ref, watch, toRaw, onMounted } from "vue";
const editor = ref(null);

const language = ref("javascript");
const ThemeValue = ref("vs-dark");

const initEditor = () => {
  // 初始化编辑器，确保dom已经渲染
  editor.value = monaco.editor.create(document.getElementById("codeEditBox"), {
    value: "", //编辑器初始显示文字
    language: language.value, //此处使用的python，其他语言支持自行查阅demo
    theme: ThemeValue.value, //官方自带三种主题vs, hc-black, or vs-dark
    selectOnLineNumbers: true, //显示行号
    roundedSelection: false,
    readOnly: false, // 只读
    cursorStyle: "line", //光标样式
    automaticLayout: true, //自动布局
    glyphMargin: true, //字形边缘
    useTabStops: false,
    fontSize: 15, //字体大小
    autoIndent: true, //自动布局
    quickSuggestionsDelay: 100, //代码提示延时
  });
  // 监听值的变化
  editor.value.onDidChangeModelContent((val) => {
    console.log(val.changes[0].text);
  });
};
onMounted(() => {
  initEditor();
});

const options = ref([
  {
    value: "python",
    label: "python",
  },
  {
    value: "javascript",
    label: "javascript",
  },
  {
    value: "html",
    label: "html",
  },
  {
    value: "css",
    label: "css",
  },
  {
    value: "scss",
    label: "scss",
  },
  {
    value: "php",
    label: "php",
  },
]);
const optionsThem = ref([
  {
    value: "vs",
    label: "vs",
  },
  {
    value: "vs-dark",
    label: "vs-dark",
  },
  {
    value: "hc-black",
    label: "hc-black",
  },
]);

const handleChange = (value) => {
  language.value = value.key;
  monaco.editor.setModelLanguage(
    toRaw(editor.value).getModel(),
    language.value
  );
};
const ThemeChange = (value) => {
  ThemeValue.value = value.key;
  monaco.editor.setTheme(ThemeValue.value);
};
</script>
<style lang="scss" scoped>
.codeEditWrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  .codeEditInfo {
    padding: 20px;
  }
  .codeEditBox {
    width: 100%;
    height: calc(100vh - 400px);
  }
}
</style>