<template>
  <div id="user-info">
    <a href="#" class="clear-fix"> 
      
      <slot name="user-icon">
        <div class="privateImage-svg left">
        <img src="~assets/img/profile.jpg"/>
        </div>
      </slot>
      <div class="login-info">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <svg data-v-735ff1be="" fill="#fff" class="icon-mobile"><use data-v-735ff1be="" ></use></svg>
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <svg data-v-735ff1be="" fill="#fff" class="arrow-svg right"><use data-v-735ff1be="" ></use></svg>
    </a>
  </div>
</template>

<script>
	export default {
		name: "UserInfo"
	}
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
  }

  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    /* background-color: #fff; */
    border-radius: 30px;
  }

  .left {
    float: left;
  }

  #user-info .arrow-svg {
    width: 11px;
    height: 22px;
    margin-top: 18px;
  }

  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 10px;
  }

  #user-info .login-info .phone {
    position: relative;
width: 100px;
    font-size: 13px;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }
.login-info{
  position: absolute;
  top: 65px;
  left: 80px;

}
  #user-info .login-info .phone .icon-mobile {
    position: absolute;
    width: 50px;
    height: 18px;
    left: -15px;
    top: 0px;
    
  }
  .phone{
  position: absolute;
  top: 0px;
  left: -15px;
  }
  .privateImage-svg img
  {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 100%;
  }
 
</style>
