<template>
  <nav-bar class="detail-nav">
    <img slot="left" class="back" @click="backClick" src="~assets/img/common/back.svg" />
    <div class="title" slot="center">
      <span
        class="title-item"
        v-for="(item, index) in titleInfos"
        :key="index"
        :class="{'active': index===currentIndex}"
        @click="itemClick(index)"
      >{{item}}</span>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titleInfos: ["商品", "参数", "评论", "推荐"],

      currentIndex: 0
    };
  },

  // props: {
  //   titleInfos: {
  //     type: Array,
  //     default: () => {
  //       return ['商品', '参数', '评论', '推荐']
  //     }
  //   },
  //   currentIndex: {
  //     type: Number,
  //     default: 0
  //   }
  // },
  methods: {
    itemClick(index) {
      this.$emit("itemClick", index);
      this.currentIndex = index;
    },
    backClick() {
      //返回
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.detail-nav {
  background-color: #fff;
  font-weight: normal;
}

.title {
  display: flex;
  padding: 0 20px;
  font-size: 14px;
}

.title-item {
  flex: 1;
}

.title-item.active {
  color: var(--color-high-text);
}

.back {
  margin-top: 12px;
}
</style>
