<!--<template>-->
<!--  <form action="/">-->
<!--    <van-search-->
<!--        v-model="searchText"-->
<!--        show-action-->
<!--        placeholder="请输入搜索的标签"-->
<!--        @search="onSearch"-->
<!--        @cancel="onCancel"-->
<!--    />-->
<!--  </form>-->

<!--  <van-divider content-position="left">已选标签</van-divider>-->
<!--  <van-tag :show="true" closeable size="medium" type="primary" @close="close">-->
<!--    标签-->
<!--  </van-tag>-->
<!--  <van-tag :show="true" closeable size="medium" type="primary" @close="close">-->
<!--    标签-->
<!--  </van-tag>-->
<!--  <van-tag :show="true" closeable size="medium" type="primary" @close="close">-->
<!--    标签-->
<!--  </van-tag>-->
<!--  <van-divider content-position="left">-->
<!--    <van-collapse v-modeL= "activeNames">-->
<!--      <van-collapse-item title="标题1" name="1">-->
<!--        代码是写出来给人看的，附带能在机器上运行。-->
<!--      </van-collapse-item>-->
<!--      <van-collapse-item title="标题2" name="2">-->
<!--        技术无非就是那些开发它的人的共同灵魂。-->
<!--      </van-collapse-item>-->
<!--      <van-collapse-item title="标题3" name="3">-->
<!--        在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。-->
<!--      </van-collapse-item>-->
<!--    </van-collapse>-->

<!--  </van-divider>-->

<!--</template>-->

<!--<script setup>-->
<!--import {ref} from 'vue';-->
<!--import {Toast} from 'vant';-->

<!--const searchText = ref('');-->
<!--const onSearch = (val) => Toast(val);-->
<!--const onCancel = () => Toast('取消');-->

<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length===0">请选择标签</div>
  <br>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
</template>

<script setup>
import {ref} from 'vue';
import {Toast} from 'vant';

const searchText = ref('');

const originTagList = [{
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大33', id: '大二1111111111'},
      {text: '大3333', id: '大二111111111'},
      {text: '大333', id: '大二1111111111'},

    ],
  },
]

let tagList = ref(originTagList);
const onSearch = (val) => {

  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;

  })

};
const onCancel = (val) => {

  searchText.value = '';
  tagList.value = originTagList;
};

//已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);


//移除标签
const doClose = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}

</script>

<style scoped>

</style>