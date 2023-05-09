<template>
  <main class="position-relative">
    <video autoplay muted loop id="myVideo" class="w-100">
      <source src="./Video/NotFound.mp4" type="video/mp4">
      Your browser does not support HTML5 video.
    </video>
    <div class="position-absolute top-50 start-50 translate-middle text-center ">
      <span class="fw-bold" style="font-size:96px;" >404.Not Found</span>
      <h1>UH OH! You're Lost.</h1>
      <h5>The Page you are looking for does not exist. How you got here is mystery. But you can click the button below to go back to the homepage</h5>
      <button type="button" class="btn btn-dark w-25" @click="handleNotFound">Go back</button>
    </div>
  </main>
</template>
<script>
export default {
  methods: {
    async handleNotFound () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
<style scoped>
main{
  min-height: 100vh;
  color:#fff;
}
#myVideo {
  position: fixed;
  left: 0;
  top: 0;
  min-width: 100%;
  max-height: auto;
  z-index: -1;
}
</style>
