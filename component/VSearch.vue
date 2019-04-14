<template>
  <div class="search-contain">
      <p class="title">
        <strong>{{title}}</strong>
      </p>
      <div class="search-main">
        <slot>暂无数据</slot>
      </div>
  </div>
</template>

<script>
import helper from "@helper"
export default {
  data () {
    return {
        title:""
    }
  },
  created(){
    this.title = this.searchName || ""
  },
  props:["searchName"]
}

</script>
<style scoped>
.search-contain{
    width: 100%;
    box-sizing: border-box;
    border-radius: 2px;
    min-height: 40px;
    /* padding: 10px 20px; */
    background-color: #fff;
}
.search-contain .title{
  padding: 10px 5px 10px 8px;
  /* color:#999; */
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

.search-main{
  box-sizing: border-box;
  padding: 20px 12px 5px;
}
</style>