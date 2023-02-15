<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { initDynamicRoutes } from '@/router'
export default {
  name: 'app',
  created () {
    initDynamicRoutes()
  },
  components: {
  }
}
</script>

<style>
 #app {
   width: 100%;
   height: 100vh;
 }
</style>
