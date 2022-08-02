import {
    createApp
} from 'vue'
import './style.css'
import App from './App.vue'
import {
    message
} from "ant-design-vue";
import "ant-design-vue/es/message/style/css";
message.config({
    duration: 2, // 提示时常单位为s
    top: "40px", // 距离顶部的位置
    maxCount: 4, // 最多显示提示信息条数(后面的会替换前面的提示)
});

window.$message = message;
createApp(App).mount('#app')