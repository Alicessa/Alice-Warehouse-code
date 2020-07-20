<template>
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper";
export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default: []
    }
  },
  data(){
    return{
      isLoad:false

    }
  },
 components: {
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad(){
      // 加载一个就行了就是为了计算图片位置
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
      
      this.isLoad=true
      }
      
    }
  }
};
</script>

<style>
</style>