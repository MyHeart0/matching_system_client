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

  <div style="padding: 16px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>


</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();
const searchText = ref('');

const originTagList = [
  {
    text: '服务器',
    children: [
      {text: '比尔吉沃特', id: '比尔吉沃特'},
      {text: '德玛西亚', id: '德玛西亚'},
      {text: '弗雷尔卓德', id: '弗雷尔卓德'},
      {text: '弗雷尔卓德', id: '弗雷尔卓德'},
      {text: '恕瑞玛', id: '恕瑞玛'},
      {text: '扭曲丛林', id: '扭曲丛林'},
      {text: '巨龙之巢', id: '巨龙之巢'},

    ],
  },
  {
    text: '段位',
    children: [
      {text: '坚韧黑铁', id: '坚韧黑铁'},
      {text: '英勇黄铜', id: '英勇黄铜'},
      {text: '不屈白银', id: '不屈白银'},
      {text: '荣耀黄金', id: '荣耀黄金'},
      {text: '华贵铂金', id: '华贵铂金'},
      {text: '璀璨钻石', id: '璀璨钻石'},
      {text: '超凡大师', id: '超凡大师'},
      {text: '傲视宗师', id: '傲视宗师'},
      {text: '最强王者', id: '最强王者'},

    ],
  },
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
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

const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: activeIds.value
    }
  })
}

</script>

<style scoped>

</style>