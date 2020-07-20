import Toast from './Toast'
const toastobj={}

// 当mian里调用时执行安装安装函数,默认传入参数Vue
toastobj.install=function(Vue){
// Vue.extend(Toast)
// 放到body里
// document.body.appendChild(Toast.$el)
//不行因为创建时el还没有挂载进去



//插件组件构造器
const toastcontrustor=Vue.extend(Toast)
//2new的方式根据组件构造器,可以创建出来一个组件对象

const toast= new toastcontrustor()
//3将组件对象,手动挂载某一个元素上
toast.$mount(document.createElement('div'))

//4toast.$el对应的就是div
    // 给vue的原型添加$toast

document.body.appendChild(toast.$el)

    Vue.prototype.$toast=toast
    
}

export default toastobj
