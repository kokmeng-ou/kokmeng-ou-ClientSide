<template>
  <section id="sectionTwo" class="sectionTwo mt-5 position-relative">
    <div class="container row position-absolute top-50" style="left:30%;">
      <div class="col-md-10 ">
        <h2 class="fw-bolder ">Share you idea with everyone</h2>
        <h2 class="text-purple fw-bolder">Sharing is caring</h2>
        <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Duis dis nulla amet conubia; ro. Duis laoreet ridiculus quisque sociosqu efficitur volutpat amet. Blandit convallis taciti hab</p>
        <router-link to="/community"  class="btn btn-blue fw-bold" style="padding: .45rem 6rem .45rem 6rem ;">Community</router-link>
      </div>
      <div class="col-md-2">
        <img src="./Image/Sharing.png" alt="sharing" width="350px">
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SecondSection',
  props: {

  }
}
</script>
<style scoped>
.sectionTwo{
  width: auto;
  min-height: 20rem;
  max-width: 700px;
}
</style>
