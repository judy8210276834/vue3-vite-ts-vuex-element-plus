<template>
  <div class="info-container">
    <el-row class="content">
      <el-col :span="8">
        <div class="user">
          <img
            v-if="store.user.avatar"
            :src="store.user.avatar"
            class="avatar"
            alt=""
          />
          <img v-else src="../assets/logo.png" class="avatar" alt="" />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <i class="fa fa-user"></i>
            <span>{{ store.user.name }}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-cog"></i>
            <span>{{
              store.user.identity === "管理員" ? "管理員" : "一般用戶"
            }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "../store";

const store: any = useAuthStore();
</script>

<style scoped>
.info-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.content {
  width: 100%;
  height: 100%;
}

.user {
  text-align: center;
  position: relative;
  top: 30%;
}

.user img {
  border-radius: 50%;
  /* width: 150px; */
}

.user span {
  display: block;
  text-align: center;
}

.userinfo {
  background-color: #cdcdcd;
  height: 100%;
}

.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
</style>
