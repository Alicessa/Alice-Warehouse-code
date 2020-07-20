<template>
  <!-- 明确拿到类 -->
  <!-- ref如果是绑定在组件中的,那么通过this.Srefs.refname获取到的是-个组件对象.
  ref如果是绑定在昔通的元素中,那么通过this .Srefs.refname获取到的是一个元素对像-->

  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script >
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null //将对象保存起来
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true
    });
    //监听滚动的位置
    if(this.probeType===2||this.probeType==3){
     this.scroll.on("scroll", position => {
      // console.log(position);
      this.$emit("scroll", position);
    });
    }
   
    //监听上拉事件并且传递给home，滚动到底部
    if(this.pullUpLoad){
      this.scroll.on("pullingUp", () => {
      this.$emit('pullingUp')
   
    });
    }
    
   
  },
  methods: {
    // 定义一个scroll的事件
    scrollTo(x, y, time = 300) {
      // &&与语法如果前面为null后面不执行,有值才执行
     this.scroll&&this.scroll.scrollTo(x, y, time);
    },
      // 再次执行加载更多
    finishPullUp(){
     this.scroll&& this.scroll.finishPullUp()
    },
     refresh(){
   this.scroll&&this.scroll.refresh()
  //  console.log('111')
  },
  getScrollY(){
  return this.scroll? this.scroll.y:0
  }
 
  },
  // 封装记录位置
   watch: {
		  data() {
        setTimeout(this.refresh, 20)
      }
   }
  
};
</script>

<style>
</style>