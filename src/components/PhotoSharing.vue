
<template>
  <div class="photoWrap">
    <div class="topHead">
      <a-typography-title :level="4">每日一图</a-typography-title>
      <a-button type="link">
        <DoubleRightOutlined style="font-size: 26px" @click="showPhoto" />
      </a-button>
    </div>
    <div class="mainImg">
      <a-image
        :width="imageWidth"
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
      <div class="views">
        <span class="num">32423</span>
        <EyeOutlined style="font-size: 18px; color: #1890ff" />
      </div>
      <div id="gitalk-container"></div>
      <!-- <div class="commentHead">
        <span class="title">评论</span>
        <div class="tabs">
          <a-button type="text">热度</a-button>
          <a-button type="link">最新</a-button>
        </div>
      </div> -->
      <!-- <a-list
        v-if="comments.length"
        :data-source="comments"
        item-layout="horizontal"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-comment>
              <template #actions>
                <span key="comment-basic-like">
                  <a-tooltip title="Like">
                    <template v-if="action === 'liked'">
                      <LikeFilled @click="like" />
                    </template>
                    <template v-else>
                      <LikeOutlined @click="like" />
                    </template>
                  </a-tooltip>
                  <span style="padding-left: 8px; cursor: auto">
                    {{ likes }}
                  </span>
                </span>
                <span key="comment-basic-reply-to">Reply to</span>
              </template>
              <template #author
                ><a>{{ item.author }}</a></template
              >
              <template #avatar>
                <a-avatar
                  src="https://joeschmoe.io/api/v1/random"
                  :alt="item.author"
                />
              </template>
              <template #content>
                <p>
                  {{ item.content }}
                </p>
              </template>
              <template #datetime>
                <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
                  <span>{{ item.datetime }}</span>
                </a-tooltip>
              </template>
            </a-comment>
          </a-list-item>
        </template>
      </a-list>
      <a-comment>
        <template #avatar>
          <a-avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        </template>
        <template #content>
          <a-form-item>
            <a-textarea v-model:value="value" :rows="2" />
          </a-form-item>
          <a-form-item>
            <a-button
              html-type="submit"
              :loading="submitting"
              type="primary"
              @click="handleSubmit"
            >
              Add Comment
            </a-button>
          </a-form-item>
        </template>
      </a-comment> -->
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, toRaw, watch, onMounted } from "vue";
import {
  DoubleRightOutlined,
  LikeFilled,
  LikeOutlined,
  DislikeFilled,
  DislikeOutlined,
  EyeOutlined,
} from "@ant-design/icons-vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";

dayjs.extend(relativeTime);
onMounted(() => {
  let gitalk = new Gitalk({
    clientID: "003e552e3bdf6951bec1",
    clientSecret: "304777dc3bb888af562663c84cb2f518e6a62c0a",
    repo: "cloudcopy_gitalk",
    owner: "xiaoForest",
    admin: ["xiaoForest", "dinggeonly"],
    id: location.pathname, // Ensure uniqueness and length less than 50
    distractionFreeMode: false, // Facebook-like distraction free mode
  });

  gitalk.render("gitalk-container");
});
const likes = ref(0);

const action = ref();

const like = () => {
  likes.value = 1;
  dislikes.value = 0;
  action.value = "liked";
};

const comments = ref([
  {
    author: "Han Solo",
    avatar: "https://joeschmoe.io/api/v1/random",
    content: "哈哈哈哈",
    datetime: dayjs().fromNow(),
  },
]);
const submitting = ref(false);
const value = ref("");

const handleSubmit = () => {
  if (!value.value) {
    return;
  }

  submitting.value = true;
  setTimeout(() => {
    submitting.value = false;
    comments.value = [
      {
        author: "Han Solo",
        avatar: "https://joeschmoe.io/api/v1/random",
        content: value.value,
        datetime: dayjs().fromNow(),
      },
      ...comments.value,
    ];
    value.value = "";
  }, 1000);
};
const imageWidth = ref(265);
const showPhoto = () => {};
</script>

<style lang="scss" scoped>
.photoWrap {
  border-left: 1px solid #f0f0f0;
  max-height: calc(100vh - 280px);
  overflow: hidden;
  .topHead {
    height: 70px;
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
    max-height: calc(100vh - 350px);
    overflow-y: auto;
    .views {
      padding: 10px 0 10px 10px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .num {
        color: #1890ff;
        margin-right: 5px;
        font-size: 16px;
      }
    }
    .commentHead {
      padding: 10px;
      border: 1px solid #f6f6f6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .tabs {
        button {
          &:hover {
            color: #1890ff;
          }
        }
      }
    }
  }
}
</style>
