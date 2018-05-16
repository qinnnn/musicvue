<template>
    <div>
  <div class="wrapperleft" ref="wrapperleft">
      <div class="contentleft">
        <div class="userCont" :style="{backgroundImage: 'url(' +backgroundImg+ ')',position:'absolute'}">
            <div class="userCont_img" :style="{backgroundImage: 'url(' +userImg+ ')'}"></div>
            <div class="userCont_name">{{username}}</div>
            <div class="userCont_level">LV.{{userlevel}}</div>
            <div class="userCont_qiandao iconfont">&#xe641;签到</div>
        </div>
        <div class="userCont"></div>
        <div class="userCont_list">
            <mu-list class="userCont_list_mu">
            <mu-list-item titleClass="userCont_list_title" title="我的消息"><div slot="left" class="iconfont">&#xe617;</div><div class="userCont_list_title_news" slot="right">99+</div></mu-list-item>
            <mu-list-item titleClass="userCont_list_title" title="VIP会员" class="iconfont"><div slot="left" class="iconfont">&#xe642;</div></mu-list-item>
            <mu-list-item titleClass="userCont_list_title" title="商城" class="iconfont"><div slot="left" class="iconfont">&#xe647;</div></mu-list-item>
            <mu-list-item titleClass="userCont_list_title" title="在线听免流量" class="iconfont"><div slot="left" class="iconfont">&#xe79d;</div></mu-list-item>
            </mu-list>
            <div class="userCont_list_ttt"></div>
            <mu-list class="userCont_list_mu">
            <mu-list-item titleClass="userCont_list_title" title="我的好友"><div slot="left" class="iconfont">&#xe625;</div></mu-list-item>
            <mu-list-item titleClass="userCont_list_title" title="附近的人"><div slot="left" class="iconfont">&#xe60a;</div></mu-list-item>
            </mu-list>
            <div class="userCont_list_ttt"></div>
            <mu-list class="userCont_list_mu">
            <mu-list-item titleClass="userCont_list_title" title="个性换肤"><div slot="left" class="iconfont">&#xe638;</div><div class="userCont_list_title_pifu" slot="right">teal</div></mu-list-item>
            <mu-list-item titleClass="userCont_list_title" title="听歌识曲"><div slot="left" class="iconfont">&#xe895;</div></mu-list-item>
            <mu-list-item titleClass="userCont_list_title" title="定时停止播放"><div slot="left" class="iconfont">&#xe609;</div></mu-list-item>
            <mu-list-item titleClass="userCont_list_title" title="扫一扫"><div slot="left" class="iconfont">&#xe62e;</div></mu-list-item>
            <mu-list-item titleClass="userCont_list_title" title="音乐闹钟"><div slot="left" class="iconfont">&#xe614;</div></mu-list-item>
            <mu-list-item titleClass="userCont_list_title" title="驾驶模式"><div slot="left" class="iconfont">&#xe6a5;</div></mu-list-item>
            <mu-list-item titleClass="userCont_list_title" title="音乐云盘"><div slot="left" class="iconfont">&#xe60b;</div></mu-list-item>
            </mu-list>
        </div>
      </div>
      
  </div>
   <mu-tabs class="userBottom" lineClass="userlineClass">
        <mu-tab class="iconfont userBottomFont">&#xe650;<span>夜间模式</span></mu-tab>
        <mu-tab class="iconfont userBottomFont">&#xe644;<span>设置</span></mu-tab>
        <mu-tab class="iconfont userBottomFont">&#xe6b7;<span>退出</span></mu-tab>
      </mu-tabs>
  </div>
</template>
<script>
import API from '@/api'
import BScroll from 'better-scroll'
export default {
  data(){
      return{
          userImg:'',//用户头像
          backgroundImg:'',//用户背景图片
          username:'',//用户名
          userlevel:''//用户等级
      }
  },
  mounted(){
      this.slide()
      var params={//传入userid
          uid:sessionStorage.user
      }
      API.user.information(params).then(({data}) => {//获取用户详情信息
        //   console.log(data)
          this.userImg=data.profile.avatarUrl
          this.backgroundImg=data.profile.backgroundUrl
          this.username=data.profile.nickname
          this.userlevel=data.level
      })
      
  },
  methods:{
      slide(){
      this.scroll = new BScroll(this.$refs.wrapperleft, {//初始化滑动组件
          click:true,
          momentum:false,
          probeType:2,
          directionLockThreshold:0,
          bounce:{
              top:false,
              left:false,
              right:false,
              bottom:false
            }
        })
    },
  }
}
</script>

