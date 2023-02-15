<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item, idx) in breads" :key="idx" :to="{ path: item.path }">
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['addBread'])
  },
  mounted () {
    const value = this.$route
    this.addBread({
      name: value.query.name,
      query: value.query,
      fullPath: value.fullPath
    })
  },
  computed: {
    ...mapState(['breads'])
  },
  // 监听路由的变化进行添加、删除 tagview，对于 fullPath 不一样的给予更新
  watch: {
    $route (value) {
      console.log(value)
      this.addBread({
        name: value.query.name,
        query: value.query,
        fullPath: value.fullPath
      })
    }
  }
}
</script>

<style>

</style>