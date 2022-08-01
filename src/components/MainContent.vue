<template>
  <div class="editorWrap" :style="'height:' + props.height + 'px;'">
    <div id="codeBox"></div>
  </div>
</template>
<script setup>
import { computed, ref, watch, toRaw, onMounted } from "vue";
import * as monaco from "monaco-editor";
import vCompletion from "../utils/sql.js"; //引入补全代码文件
const emit = defineEmits(["contentChange"]);
const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  height: {
    type: [String, Number],
    default: 500,
  },
});

const showInit = ref(true);
const editor = ref(null);
const provider = ref(null);
const mylang = ref(null);
const color = ref(null);
const hover = ref(null);
watch(
  () => props.value,
  (newVal, oldVal) => {
    toRaw(editor.value).setValue(newVal);
  },
  { deep: true }
);
const cloneDeep = (suggestions) => {
  return JSON.parse(JSON.stringify(suggestions));
};
const hoverTips = (arr, word) => {
  let tip = "";
  arr.forEach((item) => {
    if (word == item.text) {
      tip = {
        contents: [{ value: item.title || "" }, { value: item.content || "" }],
      };
    }
  });
  return tip;
};
const initEditor = () => {
  // 初始化编辑器，确保dom已经渲染
  monaco.languages.register({ id: "MyLanguage" });
  provider.value = monaco.languages.registerCompletionItemProvider(
    "MyLanguage",
    {
      provideCompletionItems(model, position) {
        return {
          suggestions: cloneDeep(vCompletion), //自定义代码补全
        };
      },
      triggerCharacters: ["."],
    }
  );
  mylang.value = monaco.languages.setLanguageConfiguration("MyLanguage", {
    //自定义括号，冒号等符号的补全规则
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"],
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: '"', close: "", notIn: ["string"] },
      { open: "'", close: "", notIn: ["string", "comment"] },
      { open: "`", close: "`", notIn: ["string", "comment"] },
    ],
  });
  color.value = monaco.languages.setMonarchTokensProvider("MyLanguage", {
    //自定义文本颜色
    ignoreCase: true,
    tokenizer: {
      root: [
        [/pageData|currentUser/, { token: "keyword" }], //蓝色
        [
          /[+]|[-]|[*]|[/]|[%]|[>]|[<]|[=]|[!]|[:]|[&&]|[||]/,
          { token: "string" },
        ], //红色
        [/'.*?'|".*?"/, { token: "string.escape" }], //橙色
        [/#--.*?\--#/, { token: "comment" }], //绿色
        [/null/, { token: "regexp" }], //粉色
        [/[{]|[}]/, { token: "type" }], //青色
        // [/[\u4e00-\u9fa5]/, { token: 'predefined' }],//亮粉色
        // [/''/, { token: 'invalid' }],//红色
        // [/[\u4e00-\u9fa5]/, { token: 'number.binary' }],//浅绿
        [/(?!.*[a-zA-Z])[0-9]/, { token: "number.hex" }], //浅绿
        [/[(]|[)]/, { token: "number.octal" }], //浅绿
        // [/[\u4e00-\u9fa5]/, { token: 'number.float' }],//浅绿
      ],
    },
  });
  hover.value = monaco.languages.registerHoverProvider("MyLanguage", {
    //自定义文字悬浮提示
    provideHover: (model, position) => {
      if (model.getWordAtPosition(position) != null) {
        const word = model.getWordAtPosition(position).word;
        let arr = [
          {
            text: "SqlUtil", //悬浮文字
            title: "数据库操作", //标题
            content: "对数据进行操作，支持sql,addConditionExist等操作", //提示内容
          },
        ];
        return hoverTips(arr, word);
      }
    },
  });
  editor.value = monaco.editor.create(document.getElementById("codeBox"), {
    //初始化配置
    value: props.value,
    theme: "vs-dark",
    autoIndex: true,
    language: "javascript", // 语言类型
    tabCompletion: "on",
    cursorSmoothCaretAnimation: true,
    formatOnPaste: true,
    mouseWheelZoom: true,
    folding: true, //代码折叠
    autoClosingBrackets: "always",
    autoClosingOvertype: "always",
    autoClosingQuotes: "always",
    automaticLayout: "always",
  });

  // 监听值的变化
  editor.value.onDidChangeModelContent((val) => {
    //给父组件实时返回最新文本
    emit("contentChange", toRaw(editor.value).getValue());
  });
};
onMounted(() => {
  initEditor();
});
</script>
<style lang="scss" scoped>
#codeBox {
  width: 100%;
  height: calc(100vh - 380px);
}
.editorWrap {
  width: 100%;
}
</style>