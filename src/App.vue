<script setup lang="ts">
import { watchEffect } from "vue";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "./store";

const store = useAuthStore();

watchEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    const decode = jwtDecode(token);
    store.setAuth(!!decode);
    store.setUser(decode);
  }

  // if(localStorage.getItem("token")){
  //   const decode = jwtDecode(localStorage.getItem("token")); //string or undefined
  // }

  // if(localStorage.token){
  //   const decode = jwtDecode(localStorage.token); //typescript 當作any 所以不對他檢查
  // }
});
</script>

<template>
  <router-view></router-view>
</template>

<style>
html,
body,
#app {
  width: 100%;
  height: 100%;
}

.register,
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(./assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}

.form-container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}

.form-container .manage-tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}

.registerForm,
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
  width: 100%;
}

.tiparea {
  text-align: right;
  color: #333;
}

.tiparea p a {
  color: #409eff;
}
</style>
