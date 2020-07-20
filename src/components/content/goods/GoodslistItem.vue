<template>
  <!-- @load="imageLoad"监听图片是否加载完成 -->
  <div class="goods" @click="goToDetail">
  <!-- 使用懒加载lazy -->
    <img v-lazy="getImg" alt @load="imageLoad" />
    <div class="goods-info">
      <p>{{goods.title}}</p>
      <span class="price">¥{{goods.price}}</span>
      <span class="collect">{{goods.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goods: {
      type: Object,
      default: {}
    }
  },
  mounted: function() {
    // console.log(this.goods);
  },
  methods: {
    //图片加载完成
    imageLoad() {
      //判断在不在home'页面
      
      // $bus事件总线，将信息发送给home
      this.$bus.$emit("itemimageLoad");
 

      // console.log(this.$bus)
    },

    goToDetail() {
      // 1.获取iid
      // let iid = this.goods.iid;

      // 2.跳转到详情页面
      this.$router.push("/detail/" + this.goods.iid);
    }
  },
  computed: {
    getImg() {
      //用于各种理由这个插件的图片信息不一样加一个判断
      return this.goods.img || this.goods.image || this.goods.show.img;
    }
  }
};
</script>

<style scoped>
.goods {
  padding-bottom: 40px;
  position: relative;
  /* 根据宽带来显示你的一行里塞几个
  flex-wrap: wrap; */
  /* 设置一个宽度 */
  /* 为了适应各类屏幕设置百分比 */
  width: 48%;
  
}
.goods img {
  width: 100%;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  
 
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
