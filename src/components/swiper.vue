<template>
  <div class="limi">
       <div class="swiper">
        <el-carousel :interval="4000" height="300px" width="920px">
          <el-carousel-item v-for="item in imgs" :key="item.index">
            <img :src="item.img" alt="加载失败" />
          </el-carousel-item>
        </el-carousel>
      </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
  },
  data () {
    return {
        imgs: [
        { img: require("../assets/100.jpg") },
        { img: require("../assets/101.jpg") },
        { img: require("../assets/102.jpg") },
        { img: require("../assets/103.jpg") },
        { img: require("../assets/104.jpg") },
        { img: require("../assets/105.jpg") },
      ],
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style scoped>
.limi {
  margin: 0 auto;
  width: 1000px;
  margin-top: 20px;
}
img{
  width: 100%;
  height: 100%;
}
</style>
