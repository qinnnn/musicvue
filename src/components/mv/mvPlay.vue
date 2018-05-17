<template>
  <div>
      mv
  </div>
</template>
<script>
import API from '@/api'
import BScroll from 'better-scroll'
import {mapGetters, mapMutations} from 'vuex';

export default {
  data(){
      return{
          
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

  },
  methods:{
      ...mapMutations([
          'set_mvPlayId',
          'set_mvPlayState'
      ])
      
  }
}
</script>

