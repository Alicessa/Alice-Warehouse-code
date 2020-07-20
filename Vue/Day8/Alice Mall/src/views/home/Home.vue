<template>
  <div id="home">
    <nav-bar class="home-nav" :fixed="true">
      <div slot="center">购物街</div>
      
    </nav-bar> <tab-control
        @itemClick="tabClick"
        :titles="['流行', '新款', '精选']"
        ref="tabControl2"
      class="tabcon" v-show=" isTabFixed"
      ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentscroll"
      :pull-up-load="true"
      @pullingUp="loadMore" 
    >
     
     
      <!-- 传入数据 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-rev :recommend="recommends" />
      <recommend-view />
      <!-- ul>li{$}*100 -->
      <!-- 传入titles -->
      <tab-control
        @itemClick="tabClick"
        :titles="['流行', '新款', '精选']"
        ref="tabControl"
       
      ></tab-control>
      <goodslist :goods="showGoods" />
    </scroll>
    <!-- 监听组件的事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home";

import TabControl from "components/content/tabControl/TabControl";
import Goodslist from "components/content/goods/Goodslist";


import HomeSwiper from "./chidComps/HomeSwiper";
import HomeRev from "./chidComps/HomeRev";
import RecommendView from "./chidComps/RecommendView";
// 引入防抖函数
import {debounce} from'common/utils'

//导入封装好的引用共同函数的minx。js
import {itemListenerMixin, backTopMixin} from "common/mixin"
 

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRev,
    RecommendView,
    TabControl,
    Goodslist,
    Scroll,
    
  },
  mixins:[itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [], //将取出的数据保存
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop", //当前类型设置默认
    
      //存储当前位置的数据
      tabOffsetTop:0,
      // isTabFixed吸顶判断
      saveY:0,
      isTabFixed:false,
      
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  created() {
    this.getHomeMultidata();
    //请求商品数据的多个数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  // 保持原来的位置，使其再次返回时回到原来的位置，bettr-scroll插件bug之前的做法
  destroyed(){
    // console.log('销毁')
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY)
       this.$refs.scroll.refresh()
  },
  deactivated(){
 this.saveY=this.$refs.scroll.getScrollY()
  
  //取消全局事件的监听以防，在详情页用了goodslist共同插件的推荐拖动影响到home页面
  this.$bus.$off('itemimageLoad',this.ItemImgListener)
},
  methods: {
 

    // backClick() {
    //   //调用scroll里的方法
    //   this.$refs.scroll.scrollTo(0, 0, 1000);
    //   console.log("backClick");
    // },

    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // 获取data里的数据里的数组
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        
      });
    },
    getHomeGoods(type) {
      // 累加请求页码
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // 取出list
        // res.data.list
        //语法将数据解析另一个数组一次添加
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 调用再次执行刷新更多
        // 再次执行
        this.$refs.scroll.finishPullUp();
      });
      
    },
    //监听滚动
    // 拿到srocll组件里的position
    contentscroll(position) {
      //  (-position)改为正值
      //判断backto是否显示
      // 加一个判断isShowBackTop是否为true
      
      
       this.listenShowBackTop(position)
      // 判断tabControl是否吸顶\
      this.isTabFixed=Math.abs(position.y)>this.tabOffsetTop
    },
    // 接受上拉事件pullingUp
    loadMore() {
      
      // 每次触发每次加一页
      this.getHomeGoods(this.currentType);
      
      this.$refs.scroll.refresh();
    },
    swiperImageLoad(){
// 根据tabcontrol里的当前滚动位置的一个赋值
//所以的组件都有一个属性$el用于获取组件里的元素
this.tabOffsetTop=this.$refs.tabControl.$el.offsetTop
  this.$refs.scroll.refresh();

    },
    //事件监听
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this. $refs.tabControl.currentIndex = index;
     this . $refs.tabControl2.currentIndex=index;

      
    }
  },

  mounted() {
   
    

  }
};
</script>

 <style scoped>
/* scoped作用域 */
#home {
  /* padding-top: 44px; */
  /* 适应屏幕 */
  height: 100vh;
  /* position: relative; */
}
.home-nav {
  background-color: var(--color-tint);

  color: white;

  /*在使用浏览器原生滚动时，为了让导航不跟随起滚动*/

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0px;
  z-index: 9; */
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0px;
}
/* .content{
  height: calc(100%-93px);
  overflow: hidden;
  /* margin-top:44px; 
} */
.tabcon{
  position: relative;
  z-index: 9;
}

</style>