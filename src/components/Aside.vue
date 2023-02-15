<template>
  <div class="aside">
    <el-menu
      background-color="#00BFFF"
      text-color="#fff"
    >
      <el-submenu class="nav-title" :index="item.id" v-for="item in user.rights" :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{item.authName}}</span>
        </template>
        <el-menu-item v-for="items in item.children" :key="items.id" @click="$router.push({ path: items.path, query: { name: item.authName }})">{{ items.authName }}</el-menu-item>
        <!-- <el-menu-item @click="$router.push({ path: '/menu/one', query: { name: '菜单栏1' }})">菜单栏1</el-menu-item>
        <el-menu-item @click="$router.push({ path: '/menu/two', query: { name: '菜单栏2' }})">菜单栏2</el-menu-item>
        <el-menu-item @click="$router.push({ path: '/menu/three', query: { name: '菜单栏3' }})">菜单栏3</el-menu-item> -->
      </el-submenu>
      <!-- <el-submenu class="nav-title" index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航二</span>
        </template>
        <el-menu-item @click="$router.push({ path: '/menu/four', query: { name: '菜单栏4' }})">菜单栏4</el-menu-item>
        <el-menu-item @click="$router.push({ path: '/menu/five', query: { name: '菜单栏5' }})">菜单栏5</el-menu-item>
      </el-submenu> -->
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({ user: state => state.user })
  }
}
</script>

<style lang="less" scoped>
.nav-title {
  & /deep/ i {
    color: #fff;
  }
  .el-menu-item {
    color: #fff;
  }
}
</style>
