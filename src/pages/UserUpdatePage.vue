<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to='/user/edit' :value="user.username"
              @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="用户名" :value="user.userAccount"/><!-- 用户名注册后不可修改-->
    <van-cell title="头像" is-link to="/user/edit">
      <img style="height: 48px" :src="user.avatarUrl" :value="user.avatarUrl"
           @click="toEdit('avatarUrl', '头像', user.avatarUrl)"/>
    </van-cell>
    <van-cell title="性别" is-link :value="user.gender === 0 ? '女': '男'"
              @click="toEdit('gender', '性别', user.gender)"/>
    <van-cell title="电话" is-link to='/user/edit' :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link to='/user/edit' :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="个人介绍" is-link to="/user/edit" :value="user.profile"
              @click="toEdit('profile', '个人介绍', user.profile)"/>
    <van-cell title="标签" is-link to="/user/edit/tag" :value="user.tags" @click="toUpdateTag"/>
    <van-cell title="注册时间" :value="user.createTime"/>
  </template>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant/es";
import {getCurrentUser} from "../services/user";

const user = ref()

onMounted(async () => {
  user.value = await getCurrentUser();

})
const route = useRoute();
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


const toUpdateTag = () => {
  router.push({
        path: '/user/edit/tag'
      }
  )
}
</script>

<style scoped>

</style>