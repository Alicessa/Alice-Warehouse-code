<template>
  <div id="app">
    <!-- 将detail详页面排除在外 -->
    <keep-alive exclude="Detail"> 
      <router-view/>
    </keep-alive>
   
    <main-tabar/>
  </div>
</template>

<script>

import MainTabar from 'components/content/mainTabar/MainTabar'
export default {
  name: 'App',
  components: {
 MainTabar
  }
}
</script>

<style>
@import '~assets/css/base.css';
</style>
