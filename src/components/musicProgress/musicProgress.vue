<template>
  <div v-if="musicState" :style="musicZIndex" class="audio_cont" @click="loadStick">
    <img class="musicMuListImg" v-lazy="musicBlurPic" style="flex-grow:1;margin-top: 5px;margin-left: 15px;" />
    <div class="audio_tag">
        <div v-if="songTitle" class="audio_tag_text2">{{information.name}}</div>
        <div v-if="songTitle" class="audio_tag_text">{{information.ar[0].name}}/{{information.al.name}}</div>
    </div>
    <div v-if="!musicState2" class="audio_tag_img iconfont" @click="play($event,true)">&#xe624;</div>
    <div v-else class="audio_tag_img iconfont" @click="play($event,false)">&#xe629;</div>
    <div class="audio_tag_img iconfont">&#xe600;</div>

    <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomMusic" @close="closeMusic()">
      <div class="musicBottom" v-lazy:background-image="audioBacground" style="background-size: cover;background-position: 50%;filter: blur(40px);"></div>
      <div class="login_load" style="z-index:9"></div>
      <div class="audioDetails">
          <div class="audioDetails_tag">
              <div class="audioDetails_tag_img iconfont" @click="closeMusic">&#xe607;</div>
              <div class="audio_tag" style="margin-top: 10px;">
                  <div v-if="songTitle" class="audio_tag_text2">{{information.name}}</div>
                  <div style="font-size: 14px;color: #e0e0e0;" v-if="songTitle" class="audio_tag_text">{{information.ar[0].name}}></div>
              </div>
              <div class="audioDetails_tag_img iconfont" @click="closeMusic">&#xe613;</div>
          </div>
          <div class="audioState_cent">
              <transition name="lyric">
              <div v-if="!lyricState" class="audioState_cent_cd">
                  <div class="audioState_cent_cd_m">
                    <div class="audioState_cent_cd_mao" @click="lyricState=!lyricState" v-lazy:background-image="{backgroundImage:'url('+require('../../assets/img/cd2.png')+')',transform:'rotate('+cd2Rotate+'deg)'}"></div>
                  </div>
                  <div class="audioState_cent_cd_pan roter" @click="lyricState=!lyricState" :class="{roter_pause :cdRotate}" :style="{backgroundImage:'url('+require('../../assets/img/cd.png')+')'}"></div>
                  <div class="audioState_cent_cd_img roter" @click="lyricState=!lyricState" :class="{roter_pause :cdRotate}" v-lazy:background-image="musicBlurPic"></div>
              </div>
              </transition>
              <transition name="lyric">
              <div v-if="!lyricState" class="audioState_cent_buttom">
                  <div class="iconfont audioState_cent_buttom_icon">&#xe619;</div>
                  <div class="iconfont audioState_cent_buttom_icon">&#xe611;</div>
                  <div class="iconfont audioState_cent_buttom_icon">&#xe62b;</div>
                  <div class="iconfont audioState_cent_buttom_icon">&#xe679;</div>
              </div>
              </transition>
              <transition name="lyric">
              <div v-if="lyricState" class="audioState_voice">
                  <div class="iconfont" style="font-size:18px;flex-grow: 1;">&#xe64c;</div>
                  <mu-slider v-model="voice" class="audioState_voice_proess" @change="updateVoice"/>
              </div>
              </transition>
              <transition name="lyric">
              <div v-if="lyricState" class="audioState_lyric" @click="lyricState=!lyricState">
                  <div class="audioState_lyric_nolyric" v-if="nolyric">
                    纯音乐，请您欣赏
                  </div>
                  <div class="audioState_lyric_nolyric" v-if="lrc">
                    无歌词
                  </div>
                  <div class="wrapperMusic" v-if="lyricS" ref="lyricWrapper">
                      <div class="contentMusic">
                        <div class="audioState_lyric_current" ref="ScrollCurrent" v-if="lyricScrollCurrent"></div>
                        <div v-if="lyricList[key+1]" class="audioState_lyric_c_font" :class="{audioState_lyric_c_font2:item.time<=ScrollTime&&lyricList[key+1].time>ScrollTime}" v-for="(item,key) in lyricList" :key="key">
                            <!-- <span>{{lyricList[key].time}}{{key+1}}</span> -->
                            <div v-if="item.lrc">
                                <span class="lrc">{{item.lrc}}</span>
                                <span v-if="item.lyric" class="lyric" style="font-size:14px;margin-top:6px;">{{item.lyric}}</span>
                                <span v-else class="lyric" style="font-size:14px;margin-top:6px;">&nbsp;</span>
                            </div>
                            <div v-else>
                                <span class="lrc">&nbsp;</span>
                                <span class="lyric" style="font-size:14px;margin-top:6px;">&nbsp;</span>
                            </div>
                        </div>
                      </div>
                  </div>
              </div>
              </transition>
          </div>
          <div class="audioState">
              <div class="audioState_progress">
                  <div class="audioState_progress_time">{{currentTime}}</div>
                  <mu-slider v-model="progress" class="audioState_progress_tiao" @change="updateTime"/>
                  <div class="audioState_progress_time">{{allTime}}</div>
              </div>
              <div class="audioState_state">
                  <div v-if="loop==1" @click="updateLoop" class="audioState_state_span iconfont">&#xe72f;</div>
                  <div v-if="loop==2" @click="updateLoop" class="audioState_state_span iconfont">&#xe66c;</div>
                  <div v-if="loop==3" @click="updateLoop" class="audioState_state_span iconfont">&#xe66d;</div>
                  <div v-if="loop==4" @click="updateLoop" class="audioState_state_span iconfont">&#xe622;</div>
                  <div class="audioState_state_s">
                    <div class="iconfont audioState_state_sd">&#xe610;</div>
                    <div v-if="!musicState2" @click="play($event,true)" class="iconfont audioState_state_sd" style="font-size:36px">&#xe624;</div>
                    <div v-else @click="play($event,false)" class="iconfont audioState_state_sd" style="font-size:36px">&#xe629;</div>
                    <div class="iconfont audioState_state_sd">&#xe612;</div>
                  </div>
                  <div class="audioState_state_span iconfont">&#xe670;</div>
              </div>
          </div>
          
      </div>
    </mu-popup>
    <audio ref="audio" @ended="endPlay" @timeupdate="getTimes" :src="music.url" id="audio"></audio>
  </div>
</template>
<script>
import API from '@/api'
import BScroll from 'better-scroll'
import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  data(){
      return{
          songTitle:false,//歌曲名和歌手显示状态
          audio:document.querySelector('#audio'),//获取audio的dom
          music:'',//用来保存歌曲的url
          currentTime: '00:00',//当前时间
          allTime:'00:00',//全部时间
          information:'',//保存当前歌曲歌手和歌名
          musicState2:true,//播放状态
          bottomMusic:false,//歌曲弹框
          musicZIndex:{
              zIndex:this.musiczIndex//设置层次
          },
          audioBacground:'',//歌单详情背景图
          progress:0,//当前进度
          loop:1,//循环播放
          cdRotate:true,//cd的旋转
          cd2Rotate:-20,//cd架子旋转
          lyricState:false,//歌词显示状态
          lyricState2:false,//用于防止歌词重复加载次数过多
          voice:100,//音量
          nolyric:false,//是否为纯音乐
          lrc:false,//是否为无歌词
          lyricS:false,//是否为有歌词
          lyricList:[],//歌曲歌词列表
          lyricScroll:'',//歌词的BScroll滚动渲染
          lyricScrollTop:0,//歌词滚动
          lyricScrollSurplus:0,//处理歌词滚动时的偏差值
          lyricScrollState:false,//判断当前滚动插件是否在滑动状态
          lyricScrollCurrent:false,//歌词手动滚动时显示当前滚动的位置
          ScrollTime:0//滚动时间
      }
  },
//   store,
  computed:{
      ...mapGetters([
          'musicId',
          'musicBlurPic',
          'musicState',
          'songSheet',
          'musiczIndex'
      ])
      
  },
  mounted(){
    //   console.log("audio")
    
  },
  watch: {  
      lyricState:function(){//监听歌词是否进行加载
        if(this.lyricState2){
        var params={
            id:this.musicId
        }
        API.music.musicLyric(params).then(({data}) => {//获取歌曲歌词
            // console.log(data)
            this.nolyric=false
            this.lrc=false
            this.lyricS=false
            this.lyricState2=false
            if(data.nolyric){//判断是否为纯音乐
                this.nolyric=true
            }else if(data.lrc=='undefined'||data.uncollected){//判断是否无歌词
                this.lrc=true
            }else{//有歌词就存到数组里
                let list=data.lrc.lyric.split('\n')
                if(data.tlyric.lyric){//判断英文歌是否有中文歌词
                    let list2=data.tlyric.lyric.split('\n')
                    for(var i=0;i<list.length;i++){
                        this.lyricList[i]={
                            time:this.conSeconds(list[i].split(']')[0].split('[')[1])||null
                        }
                        for(var j=0;j<list2.length;j++){
                            if(this.lyricList[i].time==this.conSeconds(list2[j].split(']')[0].split('[')[1])){
                                this.lyricList[i]={//英文歌词时间匹配
                                    time:this.conSeconds(list[i].split(']')[0].split('[')[1])||null,
                                    lrc:list[i].split(']')[1]?list[i].split(']')[1]:null,
                                    lyric:list[i].split(']')[1]?list2[j].split(']')[1]:null
                                }
                            }
                        }
                        if(this.lyricList[i].lyric=='undefined'){
                            this.lyricList[i].lyric=''
                        }
                    }
                }else{
                    for(var i=0;i<list.length;i++){
                        this.lyricList[i]={
                            time:this.conSeconds(list[i].split(']')[0].split('[')[1])||null,
                            lrc:list[i].split(']')[1]?list[i].split(']')[1]:null,
                            lyric:''
                        }
                    }
                }
                this.lyricList.push({//歌词添加最后一组数组
                    time:null
                })
                // console.log(this.lyricList)
                this.lyricS=true
                this.$nextTick(() => {//加载滚动插件
                    this.lyricSlide()
                })
            }
            
        })
        }
      },
      musiczIndex:function(){//监听层次变化
      this.$nextTick(() => {
        this.musicZIndex.zIndex=this.musiczIndex
        })
      },
      musicId: function() {//监听歌曲id是否被改变，如果改变则进行获取url并播放
        var params={
            id:this.musicId
        }
        this.audioBacground=this.musicBlurPic
        API.music.musicUrl(params).then(({data}) => {//获取歌曲url
            // console.log(data)
            var params={
                url:data.data[0].url
            }
            // API.music.musicPlay(params).then(({data}) => {
            //     console.log(data);
            // })
            this.music=data.data[0]
            this.lyricState=false//重置歌词显示 必须写在初始化dom之前
            this.$nextTick(() => {
                this.$refs.audio.play()//获取后进行播放
                this.musicState2=true
                this.cdRotate=false//初始化cd位置
                this.cd2Rotate=0//初始化cd架子位置
                this.lyricState2=true
                this.lyricList=[]
            })
        })
        var params={
            ids:this.musicId
        }
        API.music.musicSong(params).then(({data}) => {//获取歌曲详情信息
            // console.log(data)
            this.information=data.songs[0]
            this.songTitle=true
        })
      }  
  }, 
  methods:{
      ...mapMutations([
          'set_musicId',
          'set_musiczIndex'
      ]),
      getTimes(){//播放中就会一直调用这个方法
        if(this.bottomMusic){
            if(!this.lyricScrollState){
                this.ScrollTime=this.$refs.audio.currentTime
            }
            this.currentTime=this.time(this.$refs.audio.currentTime)
            this.allTime=this.time(this.$refs.audio.duration)
            this.progress=(this.$refs.audio.currentTime/this.$refs.audio.duration)*100
            if(this.lyricState){//判断歌词显示状态
                for(var item=0;item<this.lyricList.length;item++){
                    if(this.lyricList[item+1]&&this.lyricList[item].time<=this.ScrollTime&&this.lyricList[item+1].time>this.ScrollTime&&item>=5&&!this.lyricScrollState){
                      //判断的内容:不进行最后一条歌词的滚动，歌词对应时间小于当前播放时间，下一次歌词时间大于当前播放时间，歌词前5条不加载滚动，判断当前滚动插件是否在滑动状态
                      this.lyricScrollSurplus=0
                        for(var i=0;i<item;i++){
                            if(document.getElementsByClassName("lrc")[i]&&document.getElementsByClassName("lrc")[i].offsetHeight>18){
                                this.lyricScrollSurplus+=(document.getElementsByClassName("lrc")[i].offsetHeight-18)
                            }
                            if(document.getElementsByClassName("lyric")[i]&&document.getElementsByClassName("lyric")[i].offsetHeight>16){
                                this.lyricScrollSurplus+=(document.getElementsByClassName("lyric")[i].offsetHeight-16)
                            }
                        }
                      this.lyricScrollTop=item*50
                      var num=(-this.lyricScrollTop)+(200-this.lyricScrollSurplus)
                      if(num<this.lyricScroll.maxScrollY){//如果当前滚动的位置到了最底部，则不继续滚动
                          num=this.lyricScroll.maxScrollY
                      }
                      this.lyricScroll.scrollTo(0,num,300)
                    }
                }
            }
            
        }
      },
      play(e,state){//播放暂停
          e.cancelBubble = true//事件穿透
          this.musicState2=state
          if(this.musicState2){//根据传来的状态进行播放暂停
              this.$refs.audio.play()//播放
              this.cd2Rotate=0
              this.cdRotate=false
          }else{
              this.$refs.audio.pause()//暂停
              this.cd2Rotate=-20
              this.cdRotate=true
          }
      },
      loadStick(e){//打开歌曲详情
          e.cancelBubble = true//事件穿透
          this.bottomMusic=true
          this.$nextTick(() => {//打开歌曲详情后将歌曲播放状态zIndex移到下一层
            var bottom=document.querySelector('.mu-popup-bottom');
            // console.log(parseInt(bottom.style.zIndex)-2,this.songSheet)
            this.set_musiczIndex(parseInt(bottom.style.zIndex)-2)
          })
      },
      closeMusic(){//关闭歌曲详情
          this.bottomMusic=false
          this.$nextTick(() => {//关闭歌曲详情时重置当前zIndex
            var bottom=document.querySelector('.mu-popup-bottom');
            this.set_musiczIndex(parseInt(bottom.style.zIndex)+1)
          })
      },
      updateTime(e){//进度条拖拽事件
        this.progress=e
        this.$refs.audio.currentTime=(this.progress/100)*this.$refs.audio.duration
      },
      updateLoop(){//修改列表播放状态
        this.loop==4?this.loop=1:this.loop++
      },
      time(value){//设置当前播放的时间
        return this.exent(parseInt(value/60))+":"+this.exent(parseInt(value%60))
      },
      exent(t){//如果时间小于10则补0
        return t<10?'0'+t:t
      },
      updateVoice(e){//设置音量
        this.voice=e
        this.$refs.audio.volume=this.voice/100
      },
      endPlay(e){//播放结束后事件
          this.cd2Rotate=-20
          this.cdRotate=true
          this.$refs.audio.pause()//暂停
          this.musicState2=false//播放暂停，加载列表的歌曲继续播放
      },
      conSeconds(t){//把形如：01：25的时间转化成秒;
        if(t!=null){
            var m=t.substring(0,t.indexOf(":"));
            var s=t.substring(t.indexOf(":")+1);
            s=parseInt(s.replace(/\b(0+)/gi,""));
            if(isNaN(s))
            s=0;
            var totalt=parseInt(m)*60+s;
            if(isNaN(totalt))
            return 0;
            return totalt;
        }else{
            return 0
        }
      },
      lyricSlide(){//歌词滚动初始化
        this.lyricScroll = new BScroll(this.$refs.lyricWrapper, {
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
        
        this.lyricScroll.on("scrollStart",(e)=>{
            this.lyricScrollState=true//暂停歌词自动滚动
            this.lyricScrollCurrent=true//显示当前滚动位置的标识
        })
        this.lyricScroll.on("scroll",(e)=>{//进行滑动时显示效果
            for(var i=0;i<this.lyricList.length;i++){
                if(this.lyricList[i+1]&&document.getElementsByClassName("audioState_lyric_c_font")[i].offsetTop<=-(this.lyricScroll.y-200)&&document.getElementsByClassName("audioState_lyric_c_font")[i+1].offsetTop>-(this.lyricScroll.y-200)){
                    this.ScrollTime=this.lyricList[i].time
                    if(this.$refs.ScrollCurrent!=undefined){
                        this.$refs.ScrollCurrent.style.marginTop=document.getElementsByClassName("audioState_lyric_c_font")[i].offsetTop+17+"px"
                    }
                    
                }
            }
        })
        this.lyricScroll.on("touchEnd",(e)=>{//结束滑动后将当前的确认的时间更改为播放时间
            this.lyricScrollState=false
            this.lyricScrollCurrent=false
            for(var i=0;i<this.lyricList.length;i++){
                if(this.lyricList[i+1]&&document.getElementsByClassName("audioState_lyric_c_font")[i].offsetTop<=-(this.lyricScroll.y-200)&&document.getElementsByClassName("audioState_lyric_c_font")[i+1].offsetTop>-(this.lyricScroll.y-200)){
                    this.$refs.audio.currentTime=this.lyricList[i].time
                }
            }
        })
      }

  }
}
</script>

