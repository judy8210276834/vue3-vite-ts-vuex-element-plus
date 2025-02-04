<template>
  <el-row class="menu-container">
    <el-col :span="12">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#074c62"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
      >
        <router-link to="/">
          <el-menu-item index="1">
            <el-icon><HomeFilled /></el-icon>
            <span>首頁</span>
          </el-menu-item>
        </router-link>

        <template v-for="menu in menus" :key="menu.path">
          <el-sub-menu v-if="menu.children" :index="menu.path">
            <template #title>
              <el-icon><component :is="menu.icon"></component></el-icon>

              <span>{{ menu.name }}</span>
            </template>
            <el-menu-item-group>
              <router-link
                v-for="(item, index) in menu.children"
                :key="index"
                :to="item.path"
              >
                <el-menu-item :index="item.path">{{ item.name }}</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-sub-menu>
        </template>
        <!-- <el-sub-menu index="2">
          <template #title>
            <el-icon><Money /></el-icon>
            <span>資金管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">資金流水</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><InfoFilled /></el-icon>
            <span>信息管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">個人信息</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu> -->
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { HomeFilled, Money, InfoFilled } from "@element-plus/icons-vue";
import { ref } from "vue";

const menus = ref([
  {
    icon: "Money",
    name: "資金管理",
    path: "fund",
    children: [
      {
        path: "fundList",
        name: "資金流水",
      },
    ],
  },
  {
    icon: "InfoFilled",
    name: "資金管理",
    path: "info",
    children: [
      {
        path: "userinfo",
        name: "個人信息",
      },
    ],
  },
]);
</script>

<style>
.menu-container {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #074c62;
  z-index: 99;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 100vh;
}

.el-menu-vertical-demo {
  width: 35px;
}

.el-sub-menu .el-menu-item {
  min-width: 180px;
}

a {
  text-decoration: none;
}
</style>
