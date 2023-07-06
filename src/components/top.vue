<template>
  <div class="top_width">
    <!-- 顶部 -->
    <div class="top">
      <img :src="require('../assets/nav.jpg')" alt="加载失败" />
    </div>
    
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.top{
width: 1000px;
height: 80px;
margin: 0 auto;
}
.top_width{
  background: pink;
  opacity: 0.6;
}

img{
  width: 100%;
  height: 100%;
}
</style>
