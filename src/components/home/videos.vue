<template>
  <div class="contact" ref="videos">
    <div class="contact_cent" style="width:100%">
        <div v-for="(item,key) in videoList" class="contentleft" :key="key" style="margin-bottom:10px;">
            <lazy-component class="videos_list_back" v-lazy:background-image="item.cover">
                <div class="audioState_cent_cd">
                    <div class="videos_list_username">
                    {{item.artistName}}
                    </div>
                </div>
                <div class="videos_list_cont">
                    <span class="iconfont">&#xe77e;</span>
                    <span>{{item.playCount}}</span>
                    <span>{{item.name}}</span>
                </div>
            </lazy-component>
            <div class="videos_list_tag">{{item.briefDesc}}</div>
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
          limit:10,
          videoList:[],
          loadingImg:true,//加载数据时的load图
      }
  },
//   store,
  computed:{
      ...mapGetters([
          'personinfo'
      ])
  },
  mounted(){
      this.$nextTick(() => {
          this.slide()
          })
      var params={
          limit:this.limit
        }
      API.videos.mv(params).then(({data}) => {
        //   console.log(data)
          this.loadingImg=false
          if(data&&data.code==200){
              this.videoList=data.data
          }
          
      })
   },
  methods:{
      ...mapMutations([
          'set_increment'
      ]),
      slide(){//初始化slide插件
        this.scroll = new BScroll(this.$refs.videos, {
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
   
  }
}
</script>

