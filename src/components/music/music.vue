<template>
  <div class="wrapperMusic" ref="wrapperMusic">
    <div class="contentMusic">
        <div>
            <mu-list class="musicMuList">
            <mu-list-item titleClass="musicCont_list_title" afterTextClass="musicCont_list_title_afterText" afterText='(99)' title="本地音乐" class="iconfont"><div slot="left" class="iconfont musicMuIcon">&#xe680;</div></mu-list-item>
            </mu-list>
            <mu-divider inset/>
            <mu-list class="musicMuList">
            <mu-list-item titleClass="musicCont_list_title" afterTextClass="musicCont_list_title_afterText" :afterText="'('+LatelyMusic+')'" title="最近播放" class="iconfont"><div slot="left" class="iconfont musicMuIcon">&#xe601;</div></mu-list-item>
            </mu-list>
            <mu-divider inset/>
            <mu-list class="musicMuList">
            <mu-list-item titleClass="musicCont_list_title" afterTextClass="musicCont_list_title_afterText" afterText="(99)" title="下载管理" class="iconfont"><div slot="left" class="iconfont musicMuIcon">&#xe611;</div></mu-list-item>
            </mu-list>
            <mu-divider inset/>
            <mu-list class="musicMuList">
            <mu-list-item titleClass="musicCont_list_title" afterTextClass="musicCont_list_title_afterText" :afterText="'('+radioStation+')'" title="我的电台" class="iconfont"><div slot="left" class="iconfont musicMuIcon">&#xe606;</div></mu-list-item>
            </mu-list>
            <mu-divider inset/>
            <mu-list class="musicMuList">
            <mu-list-item titleClass="musicCont_list_title" afterTextClass="musicCont_list_title_afterText" afterText="(专题/歌手/视频/专栏)" title="我的收藏" class="iconfont"><div slot="left" class="iconfont musicMuIcon">&#xe66e;</div></mu-list-item>
            </mu-list>
            <mu-divider inset/>
            <div class="musicMuList_dan" @click="MusicSongShee=!MusicSongShee">
                <div v-if="MusicSongShee" class="musicMuList_dan_left">
                    <svg viewBox="0 0 24 24" class="musicMuList_dan_left_icon">
                        <path d="M6 15L12 9L18 15"></path>
                    </svg>
                </div>
                <div v-if="!MusicSongShee" class="musicMuList_dan_left">
                    <svg viewBox="0 0 24 24" class="musicMuList_dan_left_icon">
                        <path d="M6 9L12 15L18 9"></path>
                    </svg>
                </div>
                <div class="musicMuList_dan_cent">
                    创建的歌单
                    ({{mySongSheet}})
                </div>
                <div class="musicMuList_dan_right iconfont">&#xe644;</div>
            </div>
            <transition-group name="musicMuList">
                <div v-if="MusicSongShee" @click="DetailsOfTheSongSheet(index.id)" class="musicSongList" v-for="(index,key) in mySongSheetList" :key="key">
                    <mu-list class="musicMuList" >
                        <mu-list-item titleClass="musicMuList_listdan_title" :title="index.name" textClass="musicMuList_listdan_font" :afterText="index.trackCount+' 首'" afterTextClass="musicMuList_listdan_font">
                            <img class="musicMuListImg" :src="index.coverImgUrl" slot="leftAvatar"/>
                            <div class=" iconfont" slot="right">&#xe679;</div>
                        </mu-list-item>
                    </mu-list>
                    <mu-divider inset/>
                </div>
            </transition-group>
            <div class="musicMuList_dan" @click="thisMusicSongShee=!thisMusicSongShee">
                <div v-if="thisMusicSongShee" class="musicMuList_dan_left">
                    <svg viewBox="0 0 24 24" class="musicMuList_dan_left_icon">
                        <path d="M6 15L12 9L18 15"></path>
                    </svg>
                </div>
                <div v-if="!thisMusicSongShee" class="musicMuList_dan_left">
                    <svg viewBox="0 0 24 24" class="musicMuList_dan_left_icon">
                        <path d="M6 9L12 15L18 9"></path>
                    </svg>
                </div>
                <div class="musicMuList_dan_cent">
                    收藏的歌单
                    ({{thisSongSheet}})
                </div>
                <div class="musicMuList_dan_right iconfont">&#xe644;</div>
            </div>
            <transition-group name="musicMuList">
                <div v-if="thisMusicSongShee" @click="DetailsOfTheSongSheet(index.id)" class="musicSongList" v-for="(index,key) in thisSongSheetList" :key="key">
                    <mu-list class="musicMuList">
                        <mu-list-item titleClass="musicMuList_listdan_title" :title="index.name" textClass="musicMuList_listdan_font">
                            <img class="musicMuListImg" :src="index.coverImgUrl" slot="leftAvatar"/>
                            <span class="musicMuList_listdan_font">
                                {{index.trackCount}}首
                            </span>
                            <div class="iconfont" slot="right">&#xe679;</div>
                        </mu-list-item>
                    </mu-list>
                    <mu-divider inset/>
                </div>
            </transition-group>
        </div>
    </div>

  </div>
</template>
<script>
// import store from '@/vuex/index'
import API from '@/api'
import BScroll from 'better-scroll'

import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  data(){
      return{
          radioStation:0,//我的电台数量
          LatelyMusic:0,//最近播放音乐
          mySongSheet:0,//歌单列表
          MusicSongShee:true,//歌单列表
          mySongSheetList:[],//歌单列表
          thisSongSheet:0,//关注的歌单
          thisMusicSongShee:false,//关注的歌单
          thisSongSheetList:[],//关注的歌单
          
      }
  },
  computed:{
      ...mapGetters([
          'musicState'
      ])
  },
  mounted(){
      this.slideMusic()//初始化滚动插件
      var params={
          uid:sessionStorage.user//传入当前userid
      }
      //获取歌单列表
      API.music.playlist(params).then(({data}) => {
        //   console.log(data)
          if(data.code==200){
          for(var i in data.playlist){
              if(data.playlist[i].userId==sessionStorage.user){
                  this.mySongSheetList.push(data.playlist[i])
              }else{
                  this.thisSongSheetList.push(data.playlist[i])
              }
          }
          this.mySongSheet=this.mySongSheetList.length
          this.thisSongSheet=this.thisSongSheetList.length
          }
      })
  },
  methods:{
      ...mapMutations([
          'set_songSheet',
          'set_songSheetId',
          'set_musiczIndex'
      ]),
      slideMusic(){
        new BScroll(this.$refs.wrapperMusic, {//初始化滚动插件
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
      DetailsOfTheSongSheet(id){//打开歌单
        this.set_songSheet(true)//设置歌单显示状态
        this.set_songSheetId(id)//设置当前歌单的id
        if(this.musicState){
            this.$nextTick(() => {//音乐播放框如果已出现，则每次打开歌单自动设置zindex
                var bottom=document.querySelector('.mu-popup-bottom')
                this.set_musiczIndex(parseInt(bottom.style.zIndex)+1)
            })
        }
      }
  }
}
</script>

