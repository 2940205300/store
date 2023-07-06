<template>
  <div >
    <router-view v-if="isRouteAlive"></router-view>
  </div>
</template>

<script>

export default { 
  name: "",
  // 全局provide,调用的时候inject注入进去
  provide(){
    return{
      reload:this.reload
    }
  },
  components: {
  
  },
  data() {
    return {
     isRouteAlive:true
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // 增删改查之后刷新页面
    reload(){
      this.isRouteAlive=false;
      this.$nextTick(()=>{
        this.isRouteAlive=true;
      })
    }
   
  },
};
</script>
<style scoped>
</style>

