<template>
  <div class="login">
    <section class="form-container">
      <div class="manage-tip">
        <span class="title">後臺管理系統</span>
        <el-form
          ref="ruleFormRef"
          class="loginForm"
          label-width="80px"
          :model="loginUser"
          :rules="rules"
        >
          <el-form-item label="email" prop="email">
            <el-input
              v-model="loginUser.email"
              placeholder="請輸入email"
            ></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <el-input
              v-model="loginUser.password"
              placeholder="請輸入密碼"
              type="password"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="handleSubmit(ruleFormRef)" class="submit-btn"
              >登入</el-button
            >
          </el-form-item>

          <div class="tiparea">
            <p>還沒有帳號? <router-link to="/register">註冊</router-link></p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { registerType, registerRilesType, userType } from "../utils/types";
import type { FormInstance } from "element-plus";
import axios from "axios";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../store";

const ruleFormRef = ref<FormInstance>();
const router = useRouter();
const store = useAuthStore();

const loginUser = ref<registerType>({
  email: "judy123@gmail.com",
  password: "123456",
});

const rules = reactive<registerRilesType>({
  email: [
    {
      type: "email",
      required: true,
      message: "信箱格式不正確",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "密碼不能為空", trigger: "blur" },
    { min: 6, max: 30, message: "長度在6-30之間", trigger: "blur" },
  ],
});

const handleSubmit = (formEl: FormInstance | undefined) => {
  console.log(loginUser.value);
  if (!formEl) return;
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      // console.log("submit!");
      const {
        data: { success, token },
      } = await axios.post("/api/users/login", loginUser.value);
      // console.log(data);

      if (success && token) {
        localStorage.setItem("token", token);

        // 解析token
        const decode:userType = jwtDecode(token);
        console.log(decode);

        store.setAuth(!!decode);
        store.setUser(decode);

        // 已經自動導入了， 所以使用 @ts-ignore 讓他不去檢測，跳紅色錯誤訊息
        // @ts-ignore
        ElMessage({
          message: "用戶登入成功",
          type: "success",
          plain: true,
        });

        router.push("/");
      }
    } else {
      console.log("error submit!");
    }
  });
};
</script>

<style scoped></style>
