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
        <div class="audios_recommend">

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
          banner:[],
          loop:true,
          autoPlay:true,
          bannerSlide:1,
          activeTab: 0,
          time:'',
          bannerWidth:0
      }
  },
//   store,
  computed:{
      ...mapGetters([
      ]),

  },
  mounted(){
      this.bannerWidth=this.$refs.banner.offsetWidth
      this.$nextTick(() => {
          this.slide()
          this.slide2()
          })
      var params={
        }
      API.music.banner(params).then(({data}) => {
          console.log(data)
          if(data&&data.code==200){
              this.banner=data.banners
          }
          
      })
  },
  created(){
      this.setTime()
  },
  methods:{
      ...mapMutations([
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
      handleTabChange (val) {
        this.scroll.scrollTo(-val*this.bannerWidth,0,300)
        this.activeTab = val
        },
        slideChange(val){
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
        this.scroll.on("scroll",(e)=>{
              let x=-e.x
              let page=0;
              page+=parseInt(x/this.bannerWidth)
              if(x%this.bannerWidth>this.bannerWidth/2){
                page++
              }
              this.slideChange(page)
          })
          this.scroll.on("touchEnd",(e)=>{
            let x=-e.x
            let page=0;
            page+=parseInt(x/this.bannerWidth)
            if(x%this.bannerWidth>this.bannerWidth/2){
              page++
            }
            this.handleTabChange(page)
          })
       },
       bannerUpdate(key){
            this.scroll.scrollTo(-key*this.bannerWidth,0,300)
            this.activeTab=key
       },
       setTime(){
           this.time=setInterval(() => {
                this.activeTab+=1
                if(this.activeTab>=this.banner.length){
                   this.activeTab=0
               }
                this.bannerUpdate(this.activeTab)
            },4000);
       }
  }
}
</script>

