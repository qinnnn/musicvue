<template>
  <div>
      video
    <h2>{{msg}}</h2>
    <hr/>
    <h3 @click="aaa()">aaaaaaaaa</h3>
    <h3 @click="aaa()">aaaaaaaaa</h3>
    <h3 @click="aaa()">aaaaaaaaa</h3>
    <h3 @click="aaa()">aaaaaaaaa</h3>
    <h3 @click="aaa()">aaaaaaaaa</h3>
    <h3 @click="aaa()">aaaaaaaaa</h3>
    <h3 @click="aaa()">aaaaaaaaa</h3>
    <h3 @click="aaa()">aaaaaaaaa</h3>
    <h3 @click="aaa()">aaaaaaaaa</h3>
    <h3 @click="aaa()">aaaaaaaaa</h3>
    <h3 @click="aaa()">aaaaaaaaa</h3>
    <h3 @click="aaa()">aaaaaaaaa</h3>
    <h3 @click="aaa()">aaaaaaaaa</h3>
    <h3 @click="aaa()">aaaaaaaaa</h3>
    <h3 @click="aaa()">aaaaaaaaa</h3>
    
  </div>
</template>
<script>
// import store from '@/vuex/index'
import {mapGetters, mapMutations, mapActions} from 'vuex';

export default {
  data(){
      return{
          msg:'aaa',
      }
  },
//   store,
  computed:{
      ...mapGetters([
          'personinfo'
      ])
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
      }
  }
}
</script>

