<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right" name="right">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NaBar"
};
</script>

<style>
.nav-bar {
  display: flex;
  line-height: 43px;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100,100,100,0.1);
}
.left,.right {
height: 44px;
  width: 60px;
  /* background-color: red; */
  text-align: center;
 

}
.center {
  flex: 1;
  /* background-color: blue;
} */
}
</style>