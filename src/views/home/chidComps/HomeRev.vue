<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in recommend" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load="recomLoad" />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeRev",
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    recomLoad() {
      this.$emit("recomImgLoad");
    }
  }
};
</script>
<style scoped>
.recommend {
    /* 水平布局 */
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding:  10px 0px 20px;
  border-bottom:  10px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 75px;
  height: 75px;
  margin-bottom: 10px;
}
</style>