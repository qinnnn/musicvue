<template>
  <div class="contact" ref="audios">
    <div class="contact_cent" style="width:100%">
        <div class="audios_banner" ref="banner">
            <div class="audios_bannerC">
                <div v-for="(item,key) in banner" class="audios_banner_cont" :key="key" :style="{backgroundImage:'url('+item.pic+')'}">
                    
                </div>
                <div class="audios_banner_tag" ref="audios_banner">
                    <div v-for="(item,key) in banner" class="audios_banner_tag_chang" :class="{audios_banner_tag_chang2 : activeTab==key}" :key="key"></div>
                </div>
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
          banner:[],
          loop:true,
          autoPlay:true,
          bannerSlide:1,
          activeTab: 0,
      }
  },
//   store,
  computed:{
      ...mapGetters([
      ])
  },
  components:{
  },
  mounted(){
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
        let width=this.$refs.banner.offsetWidth;
        this.scroll.scrollTo(-val*width,0,300)
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
        let width=this.$refs.banner.offsetWidth;
        this.scroll.on("scroll",(e)=>{
              let x=-e.x
              let page=0;
              page+=parseInt(x/width)
              if(x%width>width/2){
                page++
              }
              this.slideChange(page)
          })
          this.scroll.on("touchEnd",(e)=>{
            let x=-e.x
            let page=0;
            page+=parseInt(x/width)
            if(x%width>width/2){
              page++
            }
            this.handleTabChange(page)
          })
       },
  }
}
</script>

