<template>
  <div>
  <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
  mounted(){
    if(sessionStorage.user){
      this.$router.push({path:'/index'})
    }else{
      this.$router.push({path:'/login'})
    }
  },
}
</script>
<style>

</style>

