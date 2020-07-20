<template>
  <div id="detail">
    <detail-nav-bar class="detailnav" @itemClick="itemClick" ref="detailnavbar" />
    <scroll class="content" :probe-type="3" ref="scroll" 
    @scroll="contentScroll">
      <!-- 传属性数据驼峰带- -->  
      <detail-swiper :top-images="topImages" />
      <detail-base-Info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" ref="param" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommendList" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!-- 传入字符串不需要： -->
    <!-- <toast :message="message" :toastshow="toastshow"/> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";



import GoodsList from "components/content/goods/Goodslist";

// import Toast from "components/common/toast/Toast"


import {mapActions} from"vuex"

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,


  
} from "network/detail";
// 引入防抖函数
import { debounce } from "common/utils";
import { itemListenerMixin,backTopMixin } from "common/mixin";

export default {
  name: "Detail",

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    // Toast
  },
 mixins:[itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTopYs: [],
      currentIndex: 0,
      // message:'',
      // toastshow:false
        
    };
  },
  methods: {
// 映射指定addcrat
...mapActions(['addCart']),

    imageLoad() {
      this.$refs.scroll.refresh();

      this.themeTopYs = [];
      this.themeTopYs.push(0),
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // 给判断页面位置活动商品详情的页面的标题的判断给于一个最大值
      this.themeTopYs.push(Number.MAX_VALUE);
    },

    itemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    addToCart() {
      // 1.创建对象
      const obj = {};
      // 2.对象信息
      obj.iid = this.iid;
      obj.imgURL = this.topImages[0];
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.newPrice = this.goods.realPrice;
      // 3.添加到Store中
      // this.$store.commit("addCart", obj);

      // 利用分发actions
      // this.$store.dispatch("addCart", obj).then(res=>{
      //   console.log(res);
      // })
      //简写方式利用mapActions，原理相同调用的方法一样
      this.addCart(obj).then(res=>{
        // this.toastshow=true;
        // this.message=res;
        // setTimeout(()=>{
        //   this.toastshow=false;
        //   this.message=' '
        // },1500)
        
        this.$toast.show(res,1500)
      })
    
      
     
     
     
    },
    // 判断页面位置活动商品详情的页面的标题
    contentScroll(position) {

      // 判断是否显示backtop
 this.listenShowBackTop(position)
      //  获取y值
      // 2.positoinY和主题中值进行对比
      // [0, 7938, 9120， 9452 ,maxvue]
      //positoinY在0和7938之间，index=0
      // positoinY 在7938和9120之间，index = 1
      // positoinY在9120 和9452之间，index = 2

// 由于样式问题给y轴加上一个100px的值
      const positionY = -position.y+100;
      
      // 由于正数还要第三个值获取不到的原因这种方法不行
      // for (let i in this.themeTopYs) {
      //   if (
      //     positionY > this.themeTopYs[i] &&
      //     positionY < this.themeTopYs[i + 1]
      //   ) {
      //     console.log(i);
      //   }
      // }
      // 分两种情况
      let length = this.themeTopYs.length;
      // for (let i =0 ; i<length;i++) {
      //   // this.currentIndex!=i防止赋值调用过于频繁
      //   if(this.currentIndex!=i&&((i<length-1&&positionY>=this.themeTopYs[i]&&positionY
      //   <this.themeTopYs[i+1])||(i===length-1&&positionY>=this.themeTopYs[i])))
      //   {
      //     this.currentIndex=i

      //     // 让这个活动的值等于我们判断的值
      //     this.$refs.detailnavbar.currentIndex=this.currentIndex

      //   }
      // }
      // 方法二.由于多加了一个maxvue的问题
      for (let i = 0; i < length - 1; i++) {
        // this.currentIndex!=i防止赋值调用过于频繁
        if (
          this.currentIndex != i &&
          positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;

          // 让这个活动的值等于我们判断的值
          this.$refs.detailnavbar.currentIndex = this.currentIndex;
        }
      }
    }
  },

  created() {
    //保存iid

    this.iid = this.$route.params.iid;
    //根据iid请求数据
    getDetail(this.iid).then(res => {
      //获取顶部的img
      this.topImages = res.result.itemInfo.topImages;

      const data = res.result;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 2.4.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // 2.5.获取商品信息
      this.detailInfo = data.detailInfo;
      // 2.6.保存参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 2.7.保存评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //请求推荐数据
    getRecommend().then((res, error) => {
      if (error) return;
      this.recommendList = res.data.list;
    });
    // this.$nextTick,,判定是dom是已经渲染,但是不包含图片等前面渲染完成再回调
    //   this.$nextTick(()=>{
    //     this.themeTopYs=[]
    //       this.themeTopYs.push(0),
    //  this.themeTopYs.push(this.$refs.param.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    //   console.log(this.themeTopYs)
    //   })
  },
  mounted() {},

  //  取消的事件不同因为没有使用keep-alive
  destroyed() {
    //取消全局事件的监听以防，在详情页用了goodslist共同插件的推荐拖动影响到home页面
    this.$bus.$off("itemimageLoad", this.ItemImgListener);
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 0px;
  bottom: 60px;
  left: 0px;
  
  
}
.detailnav {
  position: relative;
  z-index: 10;
  background-clip: #fff;
}
</style>