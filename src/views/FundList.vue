<template>
  <div class="fillcontain">
    <div>
      <el-form :inline="true">
        <el-form-item class="btn-right">
          <el-button type="primary" size="small" @click="handleAdd"
            >新增</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      max-height="450"
      border
      v-if="tableData.length > 0"
    >
      <el-table-column type="index" label="序號" align="center" width="70" />
      <el-table-column label="時間" align="center" width="auto" prop="date">
        <template #default="scope">
          <el-icon><Timer /></el-icon>
          <span style="margin-left: 10px">
            {{ scope.row.date }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="收支類型"
        align="center"
        width="auto"
        prop="type"
      />
      <el-table-column
        label="收支描述"
        align="center"
        width="auto"
        prop="describe"
      />
      <el-table-column label="收入" align="center" width="auto" prop="income">
        <template #default="scope">
          <span style="#00d053"> +{{ scope.row.income }} </span>
        </template>
      </el-table-column>
      <el-table-column label="支出" align="center" width="auto" prop="expend"
        ><template #default="scope">
          <span style="#f56767"> -{{ scope.row.expend }} </span>
        </template>
      </el-table-column>
      <el-table-column label="現金" align="center" width="auto" prop="cash"
        ><template #default="scope">
          <span style="#4db3ff"> {{ scope.row.cash }} </span>
        </template>
      </el-table-column>
      <el-table-column label="備註" align="center" width="auto" prop="remark" />
      <el-table-column label="操作" align="center" width="auto" prop="operation"
        ><template #default="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)"
            >編輯</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
            >刪除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>

  <DialogModal
    :show="show"
    @closeModel="show = false"
    @handleUpdateProfiles="handleUpdateProfiles"
    :editData="editData"
    :isEdit="isEdit"
  />
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import axios from "../utils/http";
import type { formDataType } from "../utils/types";
import { ElMessage } from "element-plus";

const tableData = ref([]);

// const tableData = Array.from({ length: 100 }).map(() => ({
//   date: new Date(Date.now() - Math.random() * 31556995200) // 過去一年內隨機日期
//     .toISOString()
//     .slice(0, 10),
//   type: ["小明", "小華", "阿強", "小美", "阿君"][Math.floor(Math.random() * 5)],
//   describe: [
//     "台北市大安區復興南路",
//     "新北市板橋區文化路",
//     "台中市西屯區中港路",
//     "高雄市三民區建工路",
//     "台南市東區東門路",
//   ][Math.floor(Math.random() * 5)],
//   income: (Math.random() * 9000 + 1000).toFixed(0),
//   expend: (Math.random() * 7000 + 500).toFixed(0),
//   cash: (Math.random() * 5000 + 1000).toFixed(0),
//   remark: ["每月開銷", "年度預算", "臨時支出", "收入記錄", "儲蓄計畫"][
//     Math.floor(Math.random() * 5)
//   ],
// }));
const show = ref<boolean>(false);
const isEdit = ref("");
const editData = ref<formDataType>();

const getProfiles = async () => {
  const { data } = await axios.get("http://localhost:3000/tableData");
  tableData.value = data;

  console.log(data);
};

watchEffect(() => getProfiles());

const handleEdit = (row: formDataType) => {
  show.value = true;
  editData.value = row;
  isEdit.value = "edit";
};
const handleDelete = async (row: formDataType) => {
  await axios.delete(`http://localhost:3000/tableData/${row.id}`);
  ElMessage.success("刪除成功");
  getProfiles();
};

const handleAdd = () => {
  show.value = true;
  isEdit.value = "add";
};

const handleUpdateProfiles = () => {
  getProfiles();
};
</script>

<style>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.btn-right {
  float: right;
}
</style>
