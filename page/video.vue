<template>
  <div>
    {{mes}}
    <h2>如果产生跨域问题，请让后端添加白名单或者添加代理</h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mes:"您已经切换到了视频页面"
    };
  },
  methods: {}
}

</script>
<style scoped>
</style>