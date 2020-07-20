<template>
  <div class="goods">
    <goodslist-item v-for="(item, index) in goods" :key="index" :goods="item"></goodslist-item>
  </div>
</template>

<script>
import GoodslistItem from "./GoodslistItem";
export default {
  name: "Goodslist",
  components: {
    GoodslistItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
.goods{
  /* //往一行里面塞 */
  display: flex;
  /* 根据宽带来显示你的一行里塞几个 */
  flex-wrap: wrap;
  /* 均等分布局列表-中间 */
  justify-content: space-around;
  padding: 3px;
}
</style>