<template>
  <div class="box">
    <!-- 底部 -->
    <div class="limi parent">
      <li class="flex" v-for="item in imgs" :key="item.img">
        <img :src="item.img" alt="" />
        {{ item.title }}
      </li>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      imgs: [
        {
          img: require("../assets/ico_duo.png"),
          title: "品类齐全，轻松购物",
        },
        {
          img: require("../assets/ico_kuai.png"),
          title: "多仓直发，极速配送",
        },
        {
          img: require("../assets/ico_hao.png"),
          title: "正品行货，精致服务",
        },
        {
          img: require("../assets/ico_sheng.png"),
          title: "天天低价，畅选无忧",
        },
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
.box {
  position: relative;
  bottom: 12px;
  background: #eaeaea;
bottom: 0px;
  opacity: 0.8;
  margin-top: 100px;
}
.limi {
  width: 100px;
  height: 80px;
  margin: 0 auto;
}
.parent {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 1000px;
}
.parent li {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 110px;
  height: 45px;
  font-weight: 700;
  list-style: none;
  line-height: 3;
  white-space: nowrap; /* 控制文字不换行 */
}
</style>
