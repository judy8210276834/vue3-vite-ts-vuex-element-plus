<template>
  <div class="index">
    <div class="container">
      <h1 class="title">米修在線</h1>
      <p class="lead">專注線上教育</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  background: url(../assets/showcase.png) no-repeat;
  background-size: 100% 100%;
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 100px;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  color: white;
}
.title {
  font-size: 30px;
}
.lead {
  margin-top: 50px;
  font-size: 22px;
}
</style>