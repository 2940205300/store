<!--
 * @Description: 
 * @Autor: deng
 * @Date: 2021-05-29 15:22:27
 * @LastEditors: deng
 * @LastEditTime: 2021-06-22 15:57:44
-->
<template>
  <div>
    <div
      style="
        display: flex;
        flex-wrap: wrap;
        flex-driction: row;
        justify-self: space-between;
      "
    >
      <div v-for="item in BooksList" :key="item.g_id" class="imglist">
        <img
          v-lazy="`${loc}${item.g_img}`"
          alt="加载失败"
          style="width: 160px; height: 210px"
          :title="item.g_name"
          v-on:click="imgClick(item)"
        />
        <el-link>
          {{ item.g_name }}
        </el-link>
      </div>

    </div>
    <div v-show="sorry">对不起没有找到您想要的。</div>
  </div>
</template>

<script>
export default {
  props:['BooksList','sorry'],
  name: "",
  components: {},
  data() {
    return {
      loc: `http://127.0.0.1:3000/assets/uploads/images/`,
   
    };
  },
  computed: {
 
  },
  created() {
  },
  mounted() {
  },
  methods: {
    imgClick(item) {
      this.$emit('ClickDetail',item)
    },
  },
};
</script>
<style scoped>
/* 图片外层的盒子 */
.imglist {
  width: 200px;
  height: 260px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
img {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.12);
}
.imglist:hover {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.12);
}
</style>
