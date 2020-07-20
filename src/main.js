import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//解决移动端延迟300毫秒的问题
import FastClick from 'fastclick'

import VueLazyLoad from 'vue-lazyload'


// 将封装好共用组件进行一开始就引入
import toast  from"components/common/toast"

Vue.config.productionTip = false
// 给$bus一个vue实例
Vue.prototype.$bus=new Vue()//使其可以发射事件
//安装封装好的插件
Vue.use(toast)

//附加到body里
FastClick.attach(document.body)
//使用懒加载
Vue.use(VueLazyLoad,{
  // 加载时显示的图片,还有加载错误显示的图片.....
  loading:require('assets/img/common/lazyload.jpeg')

})

new Vue({
  render: h => h(App),
  router,
  store 
}).$mount('#app')
