<template>
  <div class="cart">
<nav-bar class="nav-bar"><div slot="center">购物车({{cartCount}})</div></nav-bar>
<cart-list/>


<bottom-bar/>
  </div>

    
    
 
</template>

<script>
import CartList from './childComps/CartList'
 import NavBar from 'components/common/navbar/NavBar'
import BottomBar from'./childComps/BottomBar'

 import {mapGetters} from'vuex'
export default {
  name: "Cat",

   components: {
      NavBar,
      CartList,
      BottomBar
    
    },
  data() {
    return {
      scroll: null
    };
  },
  created() {
    //找到类，再进行渲染
  },
   computed: {
		  // cartList() {
		  //   return this.$store.getters.cartList
      // },
      // cartCount() {
		  //   return this.$store.getters.cartCount
      // }

      // 解构
      ...mapGetters(['cartList','cartCount'])
      // 如果名字不一
      // length:''cartCount'
    },
  mounted() {
   

  }
};
</script>

<style scoped>
.cart{
  height: 100vh;
}
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
</style>