<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <team-card-list :team-list="teamList"/>
    <van-empty v-if="teamList?.length < 1" description="数据为空"></van-empty>

  </div>

</template>

<script setup>
import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant/es";


const router = useRouter();
const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/join", {
    params: {
      searchText: val,
      pageNum: 1
    }

  });

  if (res?.code === 0) {
    teamList.value = res.data;
  } else {
    showFailToast("加载失败，请刷新");
  }
};
//点击加入队伍后跳转对应页面
const doJoinTeam = () => {
  router.push({
    path: "/team/add",
  })
}
const onSearch = (val) => {
  listTeam(val);
}

const teamList = ref([]);

onMounted(async () => {
  listTeam('');
})


</script>

<style scoped>

</style>