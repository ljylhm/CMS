<template>
  <div class="tap-contain">
     课程列表
  </div>
</template>

<script>
import helper from "@helper"
export default {
  data () {
    return {
        mes:"欢迎来到这里"
    }
  },
  methods:{
      toUrl(index){
          console.log(index)
          helper.routerJump(index)
      }
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