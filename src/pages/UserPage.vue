<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.username" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />

  </template>
  <van-button type="danger" block @click="logout" style="width: 80%;margin-left: 10%;margin-top: 90%">退出登录
  </van-button>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant/es";
import {getCurrentUser} from "../services/user";
import {currentID} from "../states/currentID";

const user = ref()

onMounted(async () => {
  user.value  = await getCurrentUser();

})
const router = useRouter();
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    params: {
      a: 1
    },
    query: {
      editKey,
      editName,
      currentValue,

    }
  })
}


const logout =  () => {
  const res = myAxios.post('/user/logout?id='+currentID.value)
  // console.log(res.data, '用户注销');
  // console.log(res.code, '退出码');
  if (res.code === undefined  ) {
    showSuccessToast('注销成功！');
    // 跳转到之前的页面
    router.push({
      path: '/user/login'
    });
  } else {
    showFailToast('注销失败！');
  }
}
</script>

<style scoped>

</style>