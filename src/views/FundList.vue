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
            {{ scope.row.date.slice(0, 10) }}
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
          <span style="#00d053"> +{{ scope.row.date.slice(0, 10) }} </span>
        </template>
      </el-table-column>
      <el-table-column label="支出" align="center" width="auto" prop="expend"
        ><template #default="scope">
          <span style="#f56767"> -{{ scope.row.date.slice(0, 10) }} </span>
        </template>
      </el-table-column>
      <el-table-column label="現金" align="center" width="auto" prop="cash"
        ><template #default="scope">
          <span style="#4db3ff"> {{ scope.row.date.slice(0, 10) }} </span>
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
            @click="handleDelete(scope.$idnex, scope.row)"
            >刪除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>

  <DialogModal :show="show" />
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import axios from "../utils/http";

const tableData = ref([]);
const show = ref(false);

const getProfiles = async () => {
  const { data } = await axios.get("/api/profiles");
  tableData.value = data;

  console.log(data);
};

watchEffect(() => getProfiles());

const handleEdit = (row: any) => {};
const handleDelete = (row: any, index: any) => {};
const handleAdd = () => {
  show.value = true;
  console.log('open');
  
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
