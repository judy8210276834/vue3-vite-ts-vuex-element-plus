<template>
  <el-dialog :model-value="show" title="新增收支資訊">
    <el-form ref="form" label-width="120px" style="margin: 10px; width: auto">
      <el-form-item label="收支類型">
        <el-select placeholder="請選擇">
          <el-option>現金</el-option>
          <el-option>微信</el-option>
          <el-option>支付寶</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收支描述">
        <el-input />
      </el-form-item>
      <el-form-item label="收入">
        <el-input />
      </el-form-item>
      <el-form-item label="支出">
        <el-input />
      </el-form-item>
      <el-form-item label="帳戶現金">
        <el-input />
      </el-form-item>
      <el-form-item label="備註">
        <el-input type="textarea" />
      </el-form-item>
      <el-form-item class="text-right">
        <el-button>取消</el-button>
        <el-button type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
  },
});
</script>

<style></style>
