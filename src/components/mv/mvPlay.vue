<template>
  <div class="musicBottom mvplayBottom">
          <div class="mvplay_tag backgroundColor">
                <div class="iconfont" @click="mvPlayClose()">&#xe607;</div>
                <span>{{videoList.briefDesc}}</span>
            </div>
            <div ref="mvPlay_mv" class="mvplay_mv">
                <video :src="videoSrc" @timeupdate="getTimes" ref="video">
                    您的浏览器不支持 video 视屏播放
                </video>
                <span ref="mvPlay_span" v-show="videoState" v-lazy:background-image="videoList.cover"></span>
            </div>
    <div class="wrapperMusic MVwrapper" ref="mvPlay">
        <div class="contentMusic">
            <div v-if="loadingImg" class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
            </div>
            <div v-if="!loadingImg" class="contentMV_cont">
                <div class="contentMV_cont_user">
                    <img v-lazy="artistList.topicData[0].coverUrl" alt=""/>
                    <p>{{videoList.artistName}}</p>
                    <span>+ 关注</span>
                </div>
                <span>{{videoList.briefDesc}}</span>
                <i>发布：{{videoList.publishTime}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;播放：{{videoList.playCount}}</i>
                <div class="contentMV_cont_tag">
                    <b v-for="(item,key) in artistList.topicData[0].tags" :key="key">
                        {{item}}
                    </b>
                </div>
                <div class="contentMV_cont_Interaction">
                    <div>
                        <i class="iconfont"></i>
                        <i>{{videoList.likeCount}}</i>
                    </div>
                    <div>
                        <i class="iconfont"></i>
                        <i>{{videoList.subCount}}</i>
                    </div>
                    <div>
                        <i class="iconfont"></i>
                        <i>{{videoList.commentCount}}</i>
                    </div>
                    <div>
                        <i class="iconfont"></i>
                        <i>{{videoList.shareCount}}</i>
                    </div>
                </div>
            </div>
            

        </div>
    </div>
  </div>
</template>
<script>
import API from '@/api'
import BScroll from 'better-scroll'
import {mapGetters, mapMutations} from 'vuex';

export default {
  data(){
      return{
          loadingImg:true,//加载数据时的load图
          videoSrc:'',//mv地址
          videoList:[],//mv数据
          videoState:false,//播放状态
          videoHeight:0,//video高度
          artistList:[]//歌手信息
      }
  },
//   store,
  computed:{
      ...mapGetters([
          'mvPlayId',
          'mvPlayState'
      ])
  },
  mounted(){
      this.$nextTick(() => {
          this.slide()
          })
      this.$refs.mvPlay_span.style.height=this.$refs.mvPlay_mv.offsetHeight+"px"
      var params={
          mvid:this.mvPlayId
        }
      API.videos.mvSrc(params).then(({data}) => {//加载MV信息
          console.log(data)
          if(data&&data.code==200){
              this.videoSrc=data.data.brs[240]
              this.videoList=data.data
              this.$nextTick(() => {
                this.$refs.video.play()
                this.videoState=true
              })
            var params={
              id :this.videoList.artistId
            }
            API.user.artist(params).then(({data}) => {//加载MV歌手信息
                console.log(data)
                if(data&&data.code==200){
                    this.loadingImg=false
                    this.artistList=data
                    let str1=[]
                    for(var i=0;i<this.artistList.topicData[0].tags.length;i++){
                        if(str1.indexOf(this.artistList.topicData[0].tags[i])<0){
                            str1.push(this.artistList.topicData[0].tags[i])
                        }
                    }
                    this.artistList.topicData[0].tags=[]
                    this.artistList.topicData[0].tags=str1
                }
            })
          }
      })
  },
  methods:{
      ...mapMutations([
          'set_mvPlayId',
          'set_mvPlayState'
      ]),
      slide(){//初始化slide插件
        this.scroll = new BScroll(this.$refs.mvPlay, {
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
       getTimes(){

       },
       mvPlayClose(){
           this.$refs.video.pause()
           this.videoState=false
           this.set_mvPlayState(false)
       }
      
  }
}
</script>

