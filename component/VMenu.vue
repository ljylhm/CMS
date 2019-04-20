<template>
  <div class="menu-contain">
    <el-menu
    default-active="index"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="toUrl"
    >
    <el-menu-item index="index">
      <i class="el-icon-menu"></i>
      <span slot="title">课程列表</span>
    </el-menu-item>
    <el-menu-item index="serach">
      <i class="el-icon-document"></i>
      <span slot="title">主要课程</span>
    </el-menu-item>
    <el-menu-item index="minclass">
      <i class="el-icon-document"></i>
      <span slot="title">课节管理</span>
    </el-menu-item>
    <el-menu-item index="video">
      <i class="el-icon-mobile-phone"></i>
      <span slot="title">视频列表</span>
    </el-menu-item>
    <el-menu-item index="teacher">
      <i class="el-icon-mobile-phone"></i>
      <span slot="title">教师管理</span>
    </el-menu-item>
    <el-menu-item index="rate">
      <i class="el-icon-news"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="amdin">
      <i class="el-icon-news"></i>
      <span slot="title">登陆角色管理</span>
    </el-menu-item>
    <el-menu-item index="classtype">
      <i class="el-icon-news"></i>
      <span slot="title">课程分类</span>
    </el-menu-item>
    <el-menu-item index="member">
      <i class="el-icon-news"></i>
      <span slot="title">会员管理</span>
    </el-menu-item>
    <el-menu-item index="charge">
      <i class="el-icon-news"></i>
      <span slot="title">购买记录</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
import helper from "@helper"
export default {
  data () {
    return {
      currentUrl:"index"
    }
  },
  methods:{
    toUrl(index){
      console.log(index)
      helper.routerJump(index)
    }
  }
}

</script>
<style scoped>
.menu-contain{
  width: 100%;
}
</style>