<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default  {
  name:  'App'
}
</script>
<style>
.el-table .cell{
  overflow:hidden ;
  text-overflow:ellipsis ;
  white-space:nowrap;
}
</style>
