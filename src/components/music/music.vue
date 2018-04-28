<template>
  <div class="wrapperMusic" ref="wrapperMusic">
    <div class="contentMusic">
        <div>
            <mu-list class="musicMuList">
            <mu-list-item titleClass="musicCont_list_title" afterTextClass="musicCont_list_title_afterText" :afterText="'('+LocalMusic+')'" title="本地音乐" class="iconfont"><div slot="left" class="iconfont musicMuIcon">&#xe680;</div></mu-list-item>
            </mu-list>
            <mu-divider inset/>
            <mu-list class="musicMuList">
            <mu-list-item titleClass="musicCont_list_title" afterTextClass="musicCont_list_title_afterText" afterText="asd" title="最近播放" class="iconfont"><div slot="left" class="iconfont musicMuIcon">&#xe601;</div></mu-list-item>
            </mu-list>
            <mu-divider inset/>
            <mu-list class="musicMuList">
            <mu-list-item titleClass="musicCont_list_title" afterTextClass="musicCont_list_title_afterText" :afterText="'('+LocalDownload+')'" title="下载管理" class="iconfont"><div slot="left" class="iconfont musicMuIcon">&#xe611;</div></mu-list-item>
            </mu-list>
            <mu-divider inset/>
            <mu-list class="musicMuList">
            <mu-list-item titleClass="musicCont_list_title" afterTextClass="musicCont_list_title_afterText" afterText="(dian)" title="我的电台" class="iconfont"><div slot="left" class="iconfont musicMuIcon">&#xe606;</div></mu-list-item>
            </mu-list>
            <mu-divider inset/>
            <mu-list class="musicMuList">
            <mu-list-item titleClass="musicCont_list_title" afterTextClass="musicCont_list_title_afterText" afterText="(专题/歌手/视频/专栏)" title="我的收藏" class="iconfont"><div slot="left" class="iconfont musicMuIcon">&#xe66e;</div></mu-list-item>
            </mu-list>
            <mu-divider inset/>
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
          msg:'aaa',
          LocalDownload:0,
          LocalMusic:0
      }
  },
//   store,
  computed:{
      ...mapGetters([
          'personinfo'
      ])
  },
  mounted(){
      this.slideMusic()
  },
  methods:{
      ...mapMutations([
          'set_increment'
      ]),
      ...mapActions([
          'countname'
      ]),
      aaa(){
          this.msg=this.personinfo
          this.set_increment(10)
          this.countname(10)
      },
      slideMusic(){
      this.scroll = new BScroll(this.$refs.wrapperMusic, {
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
      }
  }
}
</script>

