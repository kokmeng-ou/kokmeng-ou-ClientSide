<template>
  <section id="sectionThree" class="sectionThree mt-5 position-relative">
    <div class="container row place">
      <img src="./Image/Saly-10.png" alt="selflearning" class="selflearning col-md-5 ">
      <div class="col-md-6 align-self-center">
        <h3 class="fw-bold">Start build your own <br> Amazing website</h3>
        <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Duis dis nulla amet conubia; ro. Duis laoreet amet conubia; ro. Duis laoreet </p>
        <h6 class="fw-bold text-uppercase" >Create By Kokmeng</h6>
        <button type="button" class="btn btn-green btn-about-me bg-gradient">About Me</button>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SectionThree'
}
</script>
<style scoped>
.sectionThree{
  min-height: 473px;
}
.selflearning{
  max-width: 30rem;
}
.place{
  position: absolute;
  top: 25%;
  left: 10%;
}
.btn-about-me{
  padding: .5rem 5rem .5rem 5rem;
}
</style>
