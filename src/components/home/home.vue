<template>
<div style="width:100%;height:100%" ref="ele">
  <div style="background-color:#009688">
        <mu-tabs :value="activeTab" @change="handleTabChange" class="title">
          <mu-tab value="0" title="音乐"/>
          <mu-tab value="1" title="视频"/>
          <mu-tab value="2" title="电台"/>
        </mu-tabs>
      </div>
  <div class="wrapper" ref="wrapper">
    <div class="content" ref="ele2">
      <div class="homeList" ref="wrapper1">
        <audios></audios>
      </div>
      <div class="homeList" >
        <!-- ref="wrapper2" -->
        <!-- <div> -->
        <videos v-if="state1"></videos>
        <!-- </div> -->
      </div>
      <div class="homeList" ref="wrapper3">
        <div>
        <radios v-if="state2"></radios>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import audios from '@/components/home/audios'
import radios from '@/components/home/radios'
import videos from '@/components/home/videos'

export default {
  name: 'home',
  data () {
    return {
      activeTab: '0',
      state1:false,
      state2:false
    }
  },
  components:{
    audios,
    radios,
    videos
  },
  methods: {
    handleTabChange (val) {
      let width=this.$refs.ele.offsetWidth;
      this.scroll.scrollTo(-val*width,0,300)
      this["state"+val] = true
      this.activeTab = val
    },
    slideChange(val){
      this.activeTab = val
      this["state"+val] = true
    },
    slide1(){
      this.scroll1 = new BScroll(this.$refs.wrapper1, {
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
    slide2(){
      // this.scroll2 = new BScroll(this.$refs.wrapper2, {
      //     click:true,
      //     momentum:false,
      //     probeType:2,
      //     useTransition:false,
      //     directionLockThreshold:0,
      //     bounce:{
      //         top:false,
      //         bottom:false
      //       }
      //   })
    },
    slide3(){
      this.scroll3 = new BScroll(this.$refs.wrapper3, {
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
    slide(){
      this.$nextTick(() => {
        if(!this.scroll){
            this.scroll = new BScroll(this.$refs.wrapper, {
            click:true,
            momentum:false,
            scrollX:true,
            scrollY:false,
            probeType:2,
            useTransition:false,
            stopPropagation:true,
            directionLockThreshold:0,
            bounce:{
              top:false,
              bottom:false,
              left:false,
              right:false
            }
          })
          let width=this.$refs.ele.offsetWidth;
          // this.scroll2.on("scrollStart",()=>{
          //     // console.log(this.scroll2.movingDirectionX,this.scroll2.x)
          //     if((this.scroll2.movingDirectionX==-1&&this.scroll2.x==-0||0)||(this.scroll2.movingDirectionX==1&&-(this.scroll2.x-width)==this.$refs.ele2.offsetWidth)){
          //       this.scroll2.options.stopPropagation=false
          //     }else{
          //       this.scroll2.options.stopPropagation=true
          //     }
          //     console.log(this.scroll2.options.stopPropagation)
          // })
          this.scroll.on("scroll",(e)=>{
              let x=-e.x
              // if((this.scroll2.movingDirectionX==-1&&e.x==0)||(this.scroll2.movingDirectionX==1&&-(e.x-width)==this.$refs.ele2.offsetWidth)){
              //   this.scroll2.options.stopPropagation=false
              // }else{
              //   this.scroll2.options.stopPropagation=true
              // }
              let page=0;
              page+=parseInt(x/width)
              if(x%width>width/2){
                page++
              }
              this.slideChange(page.toString())
          })
          this.scroll.on("touchEnd",(e)=>{
            let x=-e.x
            let page=0;
            page+=parseInt(x/width)
            if(x%width>width/2){
              page++
            }
            this.handleTabChange(page.toString())
          })
        }else if(!this.$refs.wrapper){
            return
        }
        else{
            this.scroll.refresh()
        }
      })
    }
  },
  mounted() {
      this.slide()
      this.slide1()
      this.slide2()
      this.slide3()
  }
}
</script>