<!---->
<template>
  <router-view></router-view>
</template>

<script  setup>
import { reactive, ref, toRefs } from 'vue'
</script>
<style>
html,
body,
#app {
  height: 100%;
}

* {
  margin: 0;
  padding: 0;
}

/* 滚动条的样式优化 */
::-webkit-scrollbar {
  width: 5px;
  position: absolute;
}

::-webkit-scrollbar-thumb {
  background: #1890ff;
}

::-webkit-scrollbar-track {
  background-color: #ddd;
}
</style>
