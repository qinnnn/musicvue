<template>
  <div class="contact" ref="audios">
    <div class="contact_cent" style="width:100%">
        <div class="audios_banner" ref="banner">
            <div class="audios_bannerC">
                <div v-for="(item,key) in banner" class="audios_banner_cont" :key="key" v-lazy:background-image="item.pic">
                    <div class="audios_banner_title">{{item.typeTitle}}</div>
                </div>
            </div>
            <div class="audios_banner_tag">
                <div v-for="(item,key) in banner" class="audios_banner_tag_chang" @click="bannerUpdate(key)" :class="{audios_banner_tag_chang2 : activeTab==key}" :key="key"></div>
            </div>
        </div>
        <div class="audios_day">
            <i>
            <div>
                <span class="iconfont">&#xe60d;</span>
            </div>
            <p>私人FM</p>
            </i>
            <i>
            <div>
                <span class="iconfont">&#xe603;</span>
            </div>
            <p>每日推荐</p>
            </i>
            <i>
            <div>
                <span class="iconfont" style="font-size:23px">&#xe602;</span>
            </div>
            <p>歌单</p>
            </i>
            <i>
            <div>
                <span class="iconfont">&#xe604;</span>
            </div>
            <p>排行榜</p>
            </i>
        </div>
        <div class="audios_Tager">
            <span></span>
            <i>推荐歌单</i>
            <b class="iconfont">&#xe608;</b>
        </div>
        <div class="audios_recommendSongSheet">
            <div v-if="key<6" v-for="(item,key) in songSheet" @click="songSheetPlay(item.id)" :key="key">
                <span>
                    <b class="iconfont">&#xe678;</b>
                    <i>{{item.playCount | playCount}}</i>
                </span>
                <img v-lazy="item.picUrl" alt=""/>
                <p>{{item.name}}</p>
            </div>
        </div>
        <div class="audios_Tager">
            <span></span>
            <i>独家放送</i>
            <b class="iconfont">&#xe608;</b>
        </div>
        <div class="audios_privatecontent">
            <div v-if="item.alg=='artistbased'" v-for="(item,key) in privatecontent" @click="MVPlay(item.id)" :key="key">
                <span>
                    <b class="iconfont">&#xe770;</b>
                </span>
                <img v-lazy="item.sPicUrl" alt=""/>
                <p>{{item.name}}</p>
            </div>
            <div v-if="item.alg=='featured'" style="width:98%" v-for="(item,key) in privatecontent" @click="MVPlay(item.id)" :key="key">
                <span>
                    <b class="iconfont">&#xe770;</b>
                </span>
                <img v-if="item.alg=='featured'" v-lazy="item.picUrl" alt=""/>
                <p>{{item.name}}</p>
            </div>
        </div>
        <div class="audios_Tager">
            <span></span>
            <i>最新音乐</i>
            <b class="iconfont">&#xe608;</b>
        </div>
        <div class="audios_recommendSongSheet">
            <div v-if="key<6" v-for="(item,key) in newsong" @click="musicPlay(item.id,item.song.album.blurPicUrl)" :key="key">
                <img v-lazy="item.song.album.blurPicUrl" alt=""/>
                <b>{{item.name}}</b>
                <i>{{item.song.artists[0].name}}</i>
            </div>
        </div>
        <div class="audios_Tager">
            <span></span>
            <i>推荐MV</i>
            <b class="iconfont">&#xe608;</b>
        </div>
        <div class="audios_privatecontent">
            <div v-for="(item,key) in recommendMV" @click="MVPlay(item.id)" :key="key">
                <strong>
                    <i class="iconfont">&#xe77e;</i>
                    <b>{{item.playCount | playCount}}</b>
                </strong>
                <img v-lazy="item.picUrl" alt=""/>
                <b>{{item.name}}</b>
                <i>{{item.artistName}}</i>
            </div>
        </div>

    </div>
  </div>
</template>
<script>
import API from '@/api'
import BScroll from 'better-scroll'
import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  data(){
      return{
          banner:[],//banner数组
          activeTab: 0,//banner滚动
          time:'',//计时器
          bannerWidth:0,//当前总宽度
          songSheet:[],//推荐歌单列表
          privatecontent:[],//独家放送列表
          newsong:[],//最新音乐
          recommendMV:[]//推荐mv
      }
  },
//   store,
  computed:{
      ...mapGetters([
          'musicState'
      ]),

  },
  
  mounted(){
      this.bannerWidth=this.$refs.banner.offsetWidth//初始化设置屏幕宽度
      this.$nextTick(() => {//初始化滚动
          this.slide()
          this.slide2()
          })
      var params={
        }
      API.music.banner(params).then(({data}) => {//加载banner信息
        //   console.log(data)
          if(data&&data.code==200){
              this.banner=data.banners
          }
      })
      API.music.recommendSongSheet(params).then(({data}) => {//加载推荐歌单信息
        //   console.log(data)
          if(data&&data.code==200){
              this.songSheet=data.result
          }
      })
      API.music.privatecontent(params).then(({data}) => {//加载独家放送
        //   console.log(data)
          if(data&&data.code==200){
              this.privatecontent=data.result
          }
      })
      API.music.newsong(params).then(({data}) => {//加载最新音乐
        //   console.log(data)
          if(data&&data.code==200){
              this.newsong=data.result
          }
      })
      API.music.recommendMV(params).then(({data}) => {//加载推荐MV
        //   console.log(data)
          if(data&&data.code==200){
              this.recommendMV=data.result
          }
      })
  },
  created(){
      this.setTime()//设置自动滚动banner
  },
  methods:{
      ...mapMutations([
          'set_songSheet',
          'set_songSheetId',
          'set_musiczIndex',
          'set_musicState',
          'set_musicId',
          'set_musicBlurPic',
          'set_mvPlayId',
          'set_mvPlayState',
          'set_musiczPlayState'
      ]),
      slide(){//初始化slide插件
        this.scroll2 = new BScroll(this.$refs.audios, {
          click:true,
          momentum:false,
          probeType:2,
          useTransition:false,
          directionLockThreshold:0,
          bounce:{
              top:false,
              bottom:false
            }
        })
      },
      handleTabChange (val) {//滑动更换当前显示
        this.scroll.scrollTo(-val*this.bannerWidth,0,300)
        this.activeTab = val
        },
        slideChange(val){//滑动更换当前显示
        this.activeTab = val
        },
      slide2(){//初始化banner滚动
        this.scroll = new BScroll(this.$refs.banner, {
          click:true,
          scrollY:false,
          scrollX:true,
          momentum:false,
          probeType:2,
          useTransition:false,
          stopPropagation:true,
          directionLockThreshold:0,
          bounce:{
              top:false,
              bottom:false
            }
        })
        this.scroll.on("scroll",(e)=>{//滑动开始
              let x=-e.x
              let page=0;
              page+=parseInt(x/this.bannerWidth)
              if(x%this.bannerWidth>this.bannerWidth/2){
                page++
              }
              this.slideChange(page)
          })
          this.scroll.on("touchEnd",(e)=>{//滑动结束
            let x=-e.x
            let page=0;
            page+=parseInt(x/this.bannerWidth)
            if(x%this.bannerWidth>this.bannerWidth/2){
              page++
            }
            this.handleTabChange(page)
          })
       },
       bannerUpdate(key){//滚动的时候更新位置
            this.scroll.scrollTo(-key*this.bannerWidth,0,300)
            this.activeTab=key
       },
       setTime(){//banner自动滚动
           this.time=setInterval(() => {
                this.activeTab+=1
                if(this.activeTab>=this.banner.length){
                   this.activeTab=0
               }
                this.bannerUpdate(this.activeTab)
            },4000);
       },
       songSheetPlay(id){//歌单打开
        this.set_songSheet(true)//设置歌单显示状态
        this.set_songSheetId(id)//设置当前歌单的id
        if(this.musicState){
            this.$nextTick(() => {//音乐播放框如果已出现，则每次打开歌单自动设置zindex
                var bottom=document.querySelector('.mu-popup-bottom')
                this.set_musiczIndex(parseInt(bottom.style.zIndex)+1)
            })
        }
       },
       MVPlay(id){//播放mv
        this.set_mvPlayState(true)//打开mv弹框
        this.set_mvPlayId(id)//传入mvid
        this.set_musiczPlayState(false)//开始播放mv暂停音乐播放
       },
        musicPlay(id,picUrl){//播放音乐
        this.set_musicState(true)
        this.set_musicId(id)
        this.set_musicBlurPic(picUrl)
        }
  },
  filters:{
      playCount:function(num){//数量超过1万的数据简化
          if(num>10000){
              num=parseInt(num)/10000
              return parseInt(num)+"万"
          }else{
              return num
          }
      }
  }
}
</script>

