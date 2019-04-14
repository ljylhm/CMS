<template>
  <div class="index-page">
      <h2>工号12345,彭于晏欢迎您,访问
        <a :href=eleUrl>{{eleUrl}}</a>
       获取element框架 
      </h2>
  </div>
</template>

<script>
import helper from "@helper"
import http from "@http"
export default {
  data () {
    return {
        mes:"welcome to this search",
        eleUrl:"http://element-cn.eleme.io/2.0/#/zh-CN/"
    }
  },
  created(){
    
    // 放开注释即可看到效果
    // loading 示范
    // let s = helper.showLoading()
    // let timer = setTimeout(()=>{
    //   helper.loadingClose(s)
    //   clearTimeout(timer)
    // },2000)
    // message 示范
    helper.message("成功展示","success")
    // alert 示范
    // helper.alertInfo("成功信息的展示","提示","success",function(){
    //   console.log("成功信息的展示")
    // })
    // httpGET 示范
    // http.httpGet("https://api.apiopen.top/getJoke",{
    //   "page":"1",
    //   "count":"2",
    //   "type":"video"
    // }).then(function(response){
    //   console.log(response)
    // })
  }
}

</script>
<style scoped>
.index-page{
  width: 100%;
  height: 100vh;
  position: relative
}
.index-page h2{
  position:absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%)
  /* line-height; */
}
</style>