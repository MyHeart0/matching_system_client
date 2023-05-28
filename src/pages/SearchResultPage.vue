<template>
  <user-card-list :user-list="userList"/>
  <van-empty  v-if="!userList || userList.length < 1" description="搜索结果为空" />

</template>

<script setup>
import {Toast} from "vant";
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import myAxios from "../plugins/myAxios.ts";
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const {tags} = route.query;

const userList = ref([]);
onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params   => {
      return qs.stringify(params, {indices: false})
    }
  })
      .then(function (response) {
        console.log('/user/search/tags succeed', response);
        return response?.data;
      })
      .catch(function (error) {
        console.error('/user/search/tags error', error);
        Toast.fail('请求失败');
      })
  console.log(userListData)

  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
         user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }

})


// const mockUser = {
//   id: 1,
//   username: '哈哈哥',
//   userAccount: 'tianber',
//   profile: '精神小伙，全栈工程师，加油加油加油！！！!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!！！',
//   gender: 0,
//   phone: '234234',
//   email: '324242342@qq.com',
//   tags: ['java', 'emo', 'hihi'],
//   avatar: 'https://img1.baidu.com/it/u=1645832847,2375824523&fm=253&fmt=auto&app=138&f=JPEG?w=480&h=480',
//   createTime: new Date().toDateString()
// }


</script>

<style scoped>

</style>