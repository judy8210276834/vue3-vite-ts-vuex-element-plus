<template>
  <el-dialog
    :before-close="handleClose"
    :model-value="show"
    :title="props.isEdit === 'edit' ? '編輯收支資訊' : '新增收支資訊'"
  >
    <el-form
      :model="formData"
      ref="form"
      :rules="formRules"
      label-width="120px"
      style="margin: 10px; width: auto"
    >
      <el-form-item label="收支類型">
        <el-select v-model="formData.type" placeholder="請選擇">
          <el-option
            v-for="(formType, index) in typeList"
            :key="index"
            :label="formType"
            :value="formType"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收支描述" prop="describe">
        <el-input v-model="formData.describe" />
      </el-form-item>
      <el-form-item label="收入" prop="income">
        <el-input v-model="formData.income" />
      </el-form-item>
      <el-form-item label="支出" prop="expend">
        <el-input v-model="formData.expend" />
      </el-form-item>
      <el-form-item label="帳戶現金" prop="cash">
        <el-input v-model="formData.cash" />
      </el-form-item>
      <el-form-item label="備註">
        <el-input v-model="formData.remark" type="textarea" />
      </el-form-item>
      <el-form-item class="text-right">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleSubmit(form)">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { FormInstance } from "element-plus";
import type { formDataType, formRulesType } from "../utils/types";
import axios from "../utils/http";

const typeList = ref(["現金", "微信", "支付寶", "信用卡"]);
const form = ref<FormInstance>();

const initData = {
  type: "",
  describe: "",
  income: "",
  expend: "",
  cash: "",
  remark: "",
  date: new Date().toISOString().slice(0, 10),
};
const formData = ref<formDataType | any>(initData);

const formRules: formRulesType = {
  describe: [{ required: true, message: "收支描述不能為空", trigger: "blur" }],
  income: [{ required: true, message: "收入不能為空", trigger: "blur" }],
  expend: [{ required: true, message: "支出不能為空", trigger: "blur" }],
  cash: [{ required: true, message: "帳戶現金不能為空", trigger: "blur" }],
};

const handleSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid: boolean) => {
    if (valid) {
      if (props.isEdit === "add") {
        await axios.post(
          `http://localhost:3000/tableData`,
          formData.value
        );
      }else{
        await axios.put(
          `http://localhost:3000/tableData/${formData.value.id}`,
          formData.value
        );
      }

      // @ts-ignore
      ElMessage.success("保存成功");

      emit("handleUpdateProfiles");
      emit("closeModel");
    } else {
    }
  });
};

const handleClose = () => {
  emit("closeModel");
};

const emit = defineEmits(["closeModel", "handleUpdateProfiles"]);

const props = defineProps({
  show: {
    type: Boolean,
  },
  isEdit: {
    type: String,
  },
  editData: {
    type: Object as () => formDataType,
  },
});

watch([() => props.isEdit, () => props.editData], ([isEdit, editData]) => {
  formData.value = isEdit === "edit" ? editData : initData;
  console.log(isEdit === "edit" ? "編輯模式" : "新增模式", formData.value);
});
</script>

<style></style>
