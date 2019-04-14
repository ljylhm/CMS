<template>
  <div class="tap-contain">
     <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item,index) in nameTitleList" :key="index">
            {{item}}
        </el-breadcrumb-item>
     </el-breadcrumb>
  </div>
</template>

<script>
import helper from "@helper"
export default {
  data () {
    return {
        mes:"欢迎来到这里",
        nameTitleList:[]
    }
  },
  methods:{
      toUrl(index){
          console.log(index)
          helper.routerJump(index)
      }
  },
  created(){
    let routeName = this.$route.name || ""
    this.nameTitleList = routeName.split(",")
  },
  props:["name"]
}

</script>
<style scoped>
.tap-contain{
    width: 100%;
    box-sizing: border-box;
    padding: 6px;
    font-size: 14px;
    border-radius: 2px;
    margin-bottom: 12px;
    background-color: #fff
}
</style>