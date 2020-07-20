<template>
  <div class="toast" v-show="toastshow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: ""
    // },
    // toastshow: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data(){
  return{
      message:' ',
     toastshow:false
  }
  },
  methods: {
      show(message,duration=1500){
          this.toastshow=true;
          this.message=message
           
        setTimeout(()=>{
          this.toastshow=false;
          this.message=' '
        },duration)

      }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  /* 根据宽度和高度调整位置 */
  transform: translate(-50%, -50%);
  padding: 20px 30px;
  border-radius: 4px;
  color: white;
  background-color: rgb(0, 0, 0, 0.4);
  z-index: 13;
}
</style>