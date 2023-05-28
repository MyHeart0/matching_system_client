<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-image style="margin-left: 25%"
                 round
                 width="10rem"
                 height="10rem"
                 :src="lol"

      />
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
    <br>
    <span @click="toAddUser" class="float-right"><font color="#F45749">注册新用户</font></span>
  </van-form>

</template>

<script setup lang="ts">

import myAxios from "../plugins/myAxios.ts";
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {showFailToast, showSuccessToast, showToast} from "vant/es";
import lol from '../assets/yauo.png';

const router = useRouter();
const route = useRoute();

const userAccount = ref('');
const userPassword = ref('');

const onSubmit = async () => {
  // console.log("用户登录");
  const res = await myAxios.post("/user/login", {
    userAccount: userAccount.value,
    userPassword: userPassword.value
  });
  if (res.code == 0 && res.data != null) {
    showSuccessToast('登录成功');
    const redirectUrl = route.query?.redirect  as string ?? '/';
    window.location.href = redirectUrl;
  } else {
    showFailToast('登录失败');
  }
};
const toAddUser=()=>{
  window.location.href = `/user/register`;
}
</script>


<style scoped>
.float-right {
  display: block;
  /*float: right;*/
  margin-left: 13px;
  overflow: hidden;
  text-align: right;
  margin-right: 10px;
}

</style>