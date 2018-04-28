<template>
  <div id="app" ref="ele">
    <mu-appbar style="height:56px">
      <mu-icon-button class="iconfont" slot="left" @click="open('left')">&#xe6a9;</mu-icon-button>
      <!-- <router-link style="color:#fff" to="/music"><mu-icon-button class="iconfont">&#xe680;</mu-icon-button></router-link>
      <router-link style="color:#fff" to="/home"><mu-icon-button class="iconfont">&#xe623;</mu-icon-button></router-link>
      <router-link style="color:#fff" to="/contacts"><mu-icon-button class="iconfont">&#xe605;</mu-icon-button></router-link> -->
      <mu-tabs :value="activeTab" @change="handleTabChange" class="title" lineClass="lineClass">
        <mu-tab value="0" class="iconfont">&#xe680;</mu-tab>
        <mu-tab value="1" class="iconfont">&#xe623;</mu-tab>
        <mu-tab value="2" class="iconfont">&#xe605;</mu-tab>
      </mu-tabs>
      <mu-icon-button class="iconfont" slot="right" @click="open('right')">&#xe71e;</mu-icon-button>
    </mu-appbar>
    <mu-popup position="left" popupClass="demo-popup-left" :open="leftPopup" @close="close('left')">
      <personal v-if="left1"></personal>
    </mu-popup>

    <mu-popup position="right" popupClass="demo-popup-right" :open="rightPopup" @close="close('right')">
      <mu-raised-button label="关闭弹框" @click="close('right')" primary fullWidth/>
    </mu-popup>
    
    <!-- v-if="activeTab === 'tab1'" -->
    <div class="wrapper2" ref="wrapper2">
      <div class="content2">
        <div class="list" ref="wrapper21">
          <music></music>
        </div>
        <div class="list">
            <home></home>
        </div>
        <div class="list" ref="wrapper22">
          <div>
            <contacts v-if="state2"></contacts>
          </div>
        </div>
      </div>
    </div>
    <musicProgress class="musicProgressStyle"></musicProgress>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import contacts from '@/components/contacts/contacts'
import home from '@/components/home/home'
import music from '@/components/music/music'
import musicProgress from '@/components/musicProgress/musicProgress'
import personal from './personal'


export default {
  data(){
    return {
      rightPopup: false,
      leftPopup: false,
      activeTab: "0",
      left1:false,
      state2:false
    }
  },
  methods:{
    open (position) {
      this[position + 'Popup'] = true
      this[position + '1'] = true
    },
    close (position) {
      this[position + 'Popup'] = false
    },
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
    slide2(){
        this.scroll2 = new BScroll(this.$refs.wrapper22, {
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
    slide1(){
        this.scroll1 = new BScroll(this.$refs.wrapper21, {
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
        if(!this.scroll){
            this.scroll = new BScroll(this.$refs.wrapper2, {
            click:true,
            momentum:false,
            scrollY:false,
            scrollX:true,
            probeType:2,
            useTransition:false,
            stopPropagation:true,
            directionLockThreshold:0,
            bounce:{
              top:false,
              bottom:false
            }
        })
        let width=this.$refs.ele.offsetWidth;
        this.scroll.on("scroll",(e)=>{
            let x=-e.x
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
    }
  },
  components:{
    contacts,
    music,
    home,
    musicProgress,
    personal
  },
  mounted() {
    this.$nextTick(() => {
        this.slide()
        this.slide1()
        this.slide2()
      })
    if(sessionStorage.user){
    }else{
      this.$router.push({path:'/login'})
    }
  }
}
</script>
