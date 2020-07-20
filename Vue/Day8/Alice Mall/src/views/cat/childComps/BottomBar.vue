<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" 
    @click.native="allBtnClick" 
    :is-checked="isSelectAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick" >去计算({{checkLength}})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'

	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed: {
		  totalPrice() {
        const cartList = this.$store.getters.cartList;
        return cartList.filter(item => {
          return item.checked
          // preValue前一次的值
        }).reduce((preValue, item) => {
          return preValue + item.count * item.newPrice
        }, 0).toFixed(2)
      },
      isSelectAll() {
        
        if(this.$store.getters.cartList.length===0)return false
         return !this.$store.getters.cartList.find(item => !item.checked);
      // 过滤看有没有没有选中的，然后取反为false
      //  return !(this.$store.getters.cartList.filter(item=>!item.checked).length)
      // 如果没有购物车没有数据

      //遍历的方法
      // for(let item of this.$store.getters.cartList){
      //   if(!item.checked){
      //     return false
      //   }
      // }
      // return true
      

      },
      checkLength(){
        
        return this.$store.getters.cartList.filter(item=>item.checked).length
      },
    },
    methods: {
      allBtnClick () {
      
        // 1.判断是否有未选中的按钮
        let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);

        // 2.有未选中的内容, 则全部选中
        if (isSelectAll) {
          this.$store.state.cartList.forEach(item => {
            item.checked = true;
          });
        } else {
          this.$store.state.cartList.forEach(item => {
            item.checked = false;
          });
        }
      },
      calcClick(){
        // 判断如果没有商品选中
        if(!this.isSelectAll){

         this.$toast.show('请选择购买购买的商品',1500)
        }
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
