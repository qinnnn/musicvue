<template>
  <div class="contact" ref="contact">
    <div class="contact_cent">
        <div class="contact_list" v-for="(item,key) in contcatsList" :key="key">
            <div v-if="contcatsListJson[key].actId" class="contact_list_userImg" v-lazy:background-image="contcatsListJson[key].coverMobileUrl"></div>
            <div v-else class="contact_list_userImg" v-lazy:background-image="item.user.avatarUrl"></div>
            <div class="contact_list_cont">
                <div class="contact_list_left">
                    <div class="contact_list_user">
                        <span v-if="contcatsListJson[key].actId">{{contcatsListJson[key].title}}</span>
                        <span v-else>{{item.user.nickname}}</span>
                        <nav v-if="contcatsListJson[key].video" style="float:right;">发布视频</nav>
                        <nav v-if="contcatsListJson[key].song" style="float:right;">发布音乐</nav>
                        <nav v-if="contcatsListJson[key].playlist" style="float:right;">发布歌单</nav>
                        <nav v-if="contcatsListJson[key].actId" style="float:right;">活动</nav>
                    </div>
                    <div class="contact_list_showTime">
                        {{item.eventTime | dateTime}}
                    </div>
                </div>
                <div v-if="!contcatsListJson[key].actId" class="contact_list_right"> + 关 注 </div>
                <div class="contact_list_title">
                    {{contcatsListJson[key].msg}}
                </div>
                <!-- video 视频-->
                <div v-if="contcatsListJson[key].video" class="contact_list_video" @click="MVPlay(contcatsListJson[key].video.id)" v-lazy:background-image="contcatsListJson[key].video.coverUrl">
                    <div class="contact_list_video_title">
                        {{contcatsListJson[key].video.title}}
                        <span>-by{{contcatsListJson[key].video.creator.nickname}}</span>
                    </div>
                    <div class="contact_list_video_bottom">
                        <span style="float:left" class="iconfont">&#xe77e;</span>
                        <div style="float:left">{{contcatsListJson[key].video.playTime}}</div>
                        <div style="float:right">{{contcatsListJson[key].video.duration | dateTime('mm:ss')}}</div>
                        <span style="float:right" class="iconfont">&#xe659;</span>
                    </div>
                </div>
                <!-- song -->
                <div v-else-if="contcatsListJson[key].song" @click="musicPlay(contcatsListJson[key].song.id,contcatsListJson[key].song.album.blurPicUrl)" class="contact_list_video" v-lazy:background-image="contcatsListJson[key].song.album.blurPicUrl">
                    <div class="contact_list_video_bottom">
                        <span style="float:left" class="iconfont">&#xe77e;</span>
                        <span style="float:left">{{contcatsListJson[key].song.popularity}}</span>
                        <span style="float:right">{{contcatsListJson[key].song.duration | dateTime('mm:ss')}}</span>
                        <span style="float:right" class="iconfont">&#xe659;</span>
                    </div>
                </div>
                <!-- playlist 歌单-->
                <div v-else-if="contcatsListJson[key].playlist" @click="songSheetPlay(contcatsListJson[key].playlist.id)" class="contact_list_video" v-lazy:background-image="contcatsListJson[key].playlist.coverImgUrl">
                    <div class="contact_list_video_bottom">
                        <span style="float:left" class="iconfont">&#xe77e;</span>
                        <span style="float:left">{{contcatsListJson[key].playlist.popularity}}</span>
                        <span style="float:right">歌单</span>
                    </div>
                </div>
                <!-- program -->
                <div v-else-if="contcatsListJson[key].program" class="contact_list_video" v-lazy:background-image="contcatsListJson[key].program.coverUrl">
                    <div class="contact_list_video_bottom">
                        <span style="float:left" class="iconfont">&#xe77e;</span>
                        <span style="float:left">{{contcatsListJson[key].program.listenerCount}}</span>
                        <span style="float:right">{{contcatsListJson[key].program.channels[0]}}</span>
                    </div>
                </div>
                <!-- 活动 -->
                <div v-else-if="contcatsListJson[key].actId" class="contact_list_video" v-lazy:background-image="contcatsListJson[key].coverMobileUrl">
                    <div class="contact_list_video_bottom">
                        <span style="float:left">{{contcatsListJson[key].participateCount}}</span>
                        <span style="float:right">{{contcatsListJson[key].meetingBeginTime | dateTime}}</span>
                        <span style="float:right" class="iconfont">&#xe659;</span>
                    </div>
                </div>
                <div v-if="item.rcmdInfo" class="contact_list_introduce">——{{item.rcmdInfo.reason}}</div>
                <div v-if="!contcatsListJson[key].actId" class="contact_list_bottom">
                    <span style="font-size:18px;" class="iconfont">&#xe60c;<i>{{item.info.likedCount}}</i></span>
                    <span style="font-size:18px;" class="iconfont">&#xe62b;<i>{{item.info.commentCount}}</i></span>
                    <span style="font-size:18px;" class="iconfont">&#xe613;<i>{{item.info.shareCount}}</i></span>
                    <span style="font-size:18px;" class="iconfont">&#xe679;</span>
                </div>
            </div>
        </div>
        <div v-if="loadingImg" class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    </div>
  </div>
</template>
<script>
import API from '@/api'
import moment from 'moment/moment'
import BScroll from 'better-scroll'
import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  data(){
      return{
          loadingImg:true,//加载数据时的load图
          contcatsList:[],//热点信息数据
          contcatsListJson:{}
      }
  },
//   store,
  computed:{
      ...mapGetters([
          'musicState'
      ])
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
        this.scroll2 = new BScroll(this.$refs.contact, {
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
      musicPlay(id,blurPic){//开始播放音乐
        this.set_musicState(true)
        this.set_musicId(id)
        this.set_musicBlurPic(blurPic)
      },
      songSheetPlay(id){//打开歌单
        this.set_songSheet(true)//设置歌单显示状态
        this.set_songSheetId(id)//设置当前歌单的id
        // this.set_musicBlurPic(blurPic)
        if(this.musicState){
            this.$nextTick(() => {//音乐播放框如果已出现，则每次打开歌单自动设置zindex
                var bottom=document.querySelector('.mu-popup-bottom')
                this.set_musiczIndex(parseInt(bottom.style.zIndex)+1)
            })
        }
      },
      MVPlay(id){//播放mv
        console.log(id)
        this.set_mvPlayState(true)//打开mv弹框
        this.set_mvPlayId(id)//传入mvid
        this.set_musiczPlayState(false)//开始播放mv暂停音乐播放
       },
  },
  mounted(){
      this.$nextTick(() => {
          this.slide()
          })
      var params={

        }
      API.contacts.event(params).then(({data}) => {
        //   console.log(data)
          if(data&&data.code==200){
              this.loadingImg=false//结束加载load图
              this.contcatsList=data.event
              for(let i in data.event){
                  this.contcatsListJson[i]=JSON.parse(data.event[i].json)
              }
          }
          
      })
  },
  filters:{
      dateTime:function(value,formatString){
        formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
        return moment(value).format(formatString); // 这是时间戳转时间
      }
  }
}
</script>

