<template>
    <div>
        
        <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
            手机号输入错误
        </mu-popup>
        <div class="note" :style="note">
            <div class="login_span">
            <div class="login_span_font">登录</div>
            <mu-text-field style="width:100%" label="手机号" v-model="phone" hintText="请输入手机号" labelFloat></mu-text-field>
            <mu-text-field style="width:100%" @keyup.enter.native="login" label="密码" v-model="password" hintText="请输入密码" type="password" labelFloat></mu-text-field>
            <div class="login_span_buttom">
                <mu-raised-button @click="login()" label="登录" class="demo-raised-button" primary/>
                <mu-raised-button label="注册" class="demo-raised-button" secondary/>
            </div>
            </div>
            <div class="login_load" v-if="VloginLoad">
                <mu-circular-progress :size="60" :strokeWidth="5"/>
            </div>
        </div>
    </div>
</template>

<script>
import API from '@/api'
export default {
  data(){
    return {
        note: {//设置背景图片
            backgroundImage: "url(" + require("../../assets/img/background.jpeg") + ")",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            position: "absolute",
            top: 0,
            bottom: 0,
          },
        topPopup: false,//状态弹框
        phone:'',//手机号
        password:'',//密码
        VloginLoad:false//加载图
    }
  },
  methods:{
      open (position) {//弹框
        this[position + 'Popup'] = true
        },
        close (position) {//关闭弹框
        this[position + 'Popup'] = false
        },
      login(){//登录
          var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
          if (!myreg.test(this.phone)) {  
              this.open('top')
          } else {  
            var params={
            phone:this.phone,
            password:this.password
            }
            this.VloginLoad=true//开启加载loading
            API.login.login(params).then(({data}) => {
            // console.log(data)
            sessionStorage.user = data.account.id
            this.VloginLoad=false//关闭加载loading
            this.$router.push({path:'/index'})//跳转路由
            })
          }
          
      }
  },
  mounted(){//判断是否已登录
    if(sessionStorage.user){
      this.$router.push({path:'/index'})
    }else{
    }
  },
  watch: {//弹框监听
    topPopup (val) {
      if (val) {
        setTimeout(() => {
          this.topPopup = false
        }, 2000)
      }
    }
  }
}
</script>
