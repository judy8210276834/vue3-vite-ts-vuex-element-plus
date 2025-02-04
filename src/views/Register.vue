<template>
  <div class="register">
    <section class="form-container">
      <div class="manage-tip">
        <span class="title">後台管理系統</span>
        <el-form
          ref="ruleFormRef"
          class="registerForm"
          label-width="80px"
          :model="registerUser"
          :rules="rules"
        >
          <el-form-item label="用戶名" prop="name">
            <el-input
              v-model="registerUser.name"
              placeholder="請輸入用戶名稱"
            />
          </el-form-item>
          <el-form-item label="email" prop="email">
            <el-input
              v-model="registerUser.email"
              placeholder="請輸入email"
            ></el-input>
          </el-form-item>
          <el-form-item label="密碼" prop="password">
            <el-input
              v-model="registerUser.password"
              placeholder="請輸入密碼"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="確認密碼" prop="password2">
            <el-input
              v-model="registerUser.password2"
              placeholder="請確認密碼"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item label="選擇身分">
            <el-select v-model="registerUser.identity" placeholder="選擇身分">
              <el-option label="管理員" value="manager"></el-option>
              <el-option label="員工" value="employee"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button @click="handleSubmit(ruleFormRef)" class="submit-btn"
              >註冊</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { registerType, registerRilesType } from "../utils/types";
import type { FormInstance } from "element-plus";
import axios from "axios";
import router from "../router";

const ruleFormRef = ref<FormInstance>();

const registerUser = ref<registerType>({
  name: "Chang",
  email: "judy123@gmail.com",
  password: "123456",
  password2: "123456",
  identity: "管理員",
});

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("密碼不得為空"));
  } else if (value !== registerUser.value.password) {
    callback(new Error("兩次密碼不一致"));
  } else {
    callback();
  }
};

const rules = reactive<registerRilesType>({
  name: [
    { required: true, message: "用戶名不能為空", trigger: "change" },
    { min: 2, max: 30, message: "長度在2-30之間", trigger: "blur" },
  ],
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
  password2: [
    { required: true, message: "密碼不能為空", trigger: "blur" },
    { min: 6, max: 30, message: "長度在6-30之間", trigger: "blur" },
    { validator: validatePass2, trigger: "blur" },
  ],
});

const handleSubmit = (formEl: FormInstance | undefined) => {
  console.log(registerUser.value);
  if (!formEl) return;
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      // console.log("submit!");
      const { data } = await axios.post(
        "/api/users/register",
        registerUser.value
      );
      console.log(data);

      // 已經自動導入了， 所以使用 @ts-ignore 讓他不去檢測，跳紅色錯誤訊息
      // @ts-ignore
      ElMessage({
        message: "註冊成功",
        type: "success",
        plain: true,
      });

      router.push("/");
    } else {
      console.log("error submit!");
    }
  });
};
</script>

<style scoped>

</style>
