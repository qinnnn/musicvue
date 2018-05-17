<template>
    <div class="musicBottom" >
                    <div :class="{musicBottom_cont:musicState,musicBottom_cont2:!musicState,}" ref="wrapperSongSheet">
                        <div class="contentMusic">
                            <div class="musicBottom_tag2" v-lazy:background-image="musicBottomImg"></div>
                            <div class="musicBottom_tag" >
                                <div class="musicBottom_tag_list">
                                    <div style="float:left" class="iconfont musicBottom_tag_list_icon" @click="musicClose()">&#xe607;</div>
                                    <div class="musicBottom_tag_list_icon" style="float:left">歌单</div>
                                    <div style="float:right" class="iconfont musicBottom_tag_list_icon">&#xe679;</div>
                                    <div style="float:right" class="iconfont musicBottom_tag_list_icon">&#xe71e;</div>
                                </div>
                                <div class="musicBottom_tag_list">
                                    <div class="musicBottom_tag_list_img" v-lazy:background-image="musicBottomImg"></div>
                                    <div style="float:left">
                                        <div class="musicBottom_tag_list_title">{{musicBottomTitle}}</div>
                                        <div class="musicBottom_tag_list_user" v-lazy:background-image="musicBottomUser"></div>
                                        <div class="musicBottom_tag_list_username">{{musicBottomUsername}}></div>
                                    </div>
                                </div>
                                <div class="musicBottom_tag_list" style="margin-top:10px;">
                                    <div class="musicBottom_tag_list2">
                                        <div class="musicBottom_tag_list2Tag">
                                            <div style="font-size:20px" class="iconfont" slot="right">&#xe618;</div>
                                            <div class="musicBottom_tag_list2Tag_font">收藏</div>
                                        </div>
                                        <div class="musicBottom_tag_list2Tag">
                                            <div style="font-size:20px" class="iconfont" slot="right">&#xe62b;</div>
                                            <div class="musicBottom_tag_list2Tag_font">评论</div>
                                        </div>
                                        <div class="musicBottom_tag_list2Tag">
                                            <div style="font-size:20px" class="iconfont" slot="right">&#xe613;</div>
                                            <div class="musicBottom_tag_list2Tag_font">分享</div>
                                        </div>
                                        <div class="musicBottom_tag_list2Tag">
                                            <div style="font-size:20px" class="iconfont" slot="right">&#xe611;</div>
                                            <div class="musicBottom_tag_list2Tag_font">下载</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="height:50px;border-bottom:1px solid #E7E7E7;background-color:#f5f5f5;">
                                <div class="iconfont musicBottom_tagLeft">&#xe624;</div>
                                <div class="musicBottom_tagLeft">播放全部</div>
                                <div class="musicBottom_tagLeft2">(共{{musicListNum}}首)</div>
                                <div class="musicBottom_tagRight">多选</div>
                                <div class="iconfont musicBottom_tagRight" style="font-size: 18px">&#xe600;</div>
                            </div>
                            <div v-for="(index,key) in musicList" v-bind:key="key" @click="addMusicAudio(index.id,index.album.blurPicUrl)" style="background-color:#f5f5f5;">
                                <mu-list class="musicMuList" >
                                    <mu-list-item v-if="index.mvid==0" titleClass="musicMuList_listdan_title" :title="index.name" :afterText="index.artists[0].name+'-'+index.album.name" afterTextClass="musicMuList_listdan_font">
                                        <!-- <img class="musicMuListImg" v-lazy="index.album.blurPicUrl" slot="leftAvatar"/> -->
                                        <span slot="leftAvatar" style="text-align: center;font-size: 18px;width: 100%;">{{key+1}}</span>
                                        <div class="iconfont" slot="right">&#xe679;</div>
                                    </mu-list-item>
                                    <mu-list-item v-else titleClass="musicMuList_listdan_title2" :title="index.name" :afterText="index.artists[0].name+'-'+index.album.name" afterTextClass="musicMuList_listdan_font2">
                                        <span slot="leftAvatar" style="text-align: center;font-size: 18px;width: 100%;">{{key+1}}</span>
                                        <div class="iconfont musicMuList_listdan_img">&#xe770;</div><!--mv按钮-->
                                        <div class="iconfont" slot="right">&#xe679;</div>
                                    </mu-list-item>
                                </mu-list>
                                <mu-divider inset/>
                            </div>
                        </div>
                    </div>
                    <!-- <musicProgress class="musicProgressStyle"></musicProgress> -->
                </div>
</template>
<script>
// import store from '@/vuex/index'
import BScroll from 'better-scroll'
import API from '@/api'
import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  data(){
      return{
          musicListNum:0,//音乐列表数量
          musicBottomImg:'',//歌单图片
          musicBottomUser:'',//头像
          musicBottomUsername:'',//用户名
          musicBottomTitle:'',//歌单名称
          musicList:[]//歌单列表
      }
  },
//   store,
  computed:{
      ...mapGetters([
          'songSheetId',
          'songSheet',
          'musicState'
      ])
  },
  methods:{
      ...mapMutations([
          'set_songSheet',
          'set_songSheetId',
          'set_musicId',
          'set_musicBlurPic',
          'set_musicState',
          'set_musiczIndex'
      ]),
        musicClose(){//关闭歌单
            this.set_songSheet(false)
            this.set_songSheetId(0)
        },
        addMusicAudio(id,blurPic){//添加到播放
            this.set_musicState(true)
            this.set_musicId(id)
            this.set_musicBlurPic(blurPic)
            this.$nextTick(() => {
                var bottom=document.querySelector('.mu-popup-bottom')
                this.set_musiczIndex(parseInt(bottom.style.zIndex)+1)
            })
        }
  },
  mounted(){
        new BScroll(this.$refs.wrapperSongSheet, {
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
        var params={
            id:this.songSheetId
        }
        //获取歌单的详情数据
        API.music.musiclist(params).then(({data}) => {
            // console.log(data)
            this.musicBottomImg=data.result.coverImgUrl
            this.musicBottomTitle=data.result.name
            this.musicBottomUser=data.result.creator.avatarUrl
            this.musicBottomUsername=data.result.creator.nickname
            this.musicListNum=data.result.trackCount
            this.musicList=data.result.tracks
        })
  }
}
</script>

