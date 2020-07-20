// 减少代码之间用于使用相同函数或者方法使其封装
import BackTop from "components/content/backTop/BackTop";
import {POP, NEW, SELL} from "./const";
// 引入防抖函数

import {debounce} from'common/utils'
export const itemListenerMixin={
    components:{

    },
    methods:{

    },
    data() {
        return {
            ItemImgListener:null
        }
    },
    mounted(){
         //调用太快频繁，进行防抖函数操作，
    // 在一定的时间内看有没有数据的更新操作
    // 如果有则不执行该函数一旦停止或者检测到没有数据则执行该函数
    //开始监听goodlistitem里imageLoad的事件，加载完成
     const refresh = debounce(this.$refs.scroll.refresh,300);
     // this.$bus.$on("itemimageLoad", () => {
   
     //   // 开始调用
     //   refresh();
     // })
 
 
     // 为了取消使用共同插件所带来的事件
     this.ItemImgListener=() => {
   
       // 开始调用
       refresh();
     }
     // 对事件的监听做一个保存
     this.$bus.$on("itemimageLoad", this.ItemImgListener)
    
    
    }
}
export const backTopMixin={
    components:{
        BackTop
    },
    data(){
        return {
            isShowBackTop: false,
            
        }
    },
    methods:{
        backClick() {
            //调用scroll里的方法
            this.$refs.scroll.scrollTo(0, 0, 1000);
            console.log("backClick");
          },
          listenShowBackTop(position){
        this.isShowBackTop = position.y < -2000;
         },
    }
    
}

export const tabControlMixin = {
    data: function () {
      return {
        currentType: POP
      }
    },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
        console.log(this.currentType);
      }
    }
  }