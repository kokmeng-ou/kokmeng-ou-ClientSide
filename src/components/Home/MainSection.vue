<template>
  <section id="sectionOne" class="sectionOne position-relative" >
    <HomeImage />
    <div class="position-absolute top-50 start-50 translate-middle">
      <h1 class="fw-bold">Why Write in HTML and CSS,</h1>
      <h1 class="fw-bold"> when you can select them </h1>
      <p class="mb-3 fs-5">Lorem ipsum odor amet, consectetuer adipiscing elit. Duis dis nulla amet conubia; ro. Duis laoreet ridiculus quisque sociosqu efficitur volutpat amet. Blandit convallis taciti hab</p>
      <router-link to="/editor/title" type="button" class="btn btn-purple bg-gradient btn-getStart fs-4 fw-bold text-uppercase ">Get Started</router-link>
    </div>
  </section>
</template>
<script>
import HomeImage from './HomeImage.vue'
export default {
  name: 'MainSection',
  props: {
  },
  components: {
    HomeImage
  }
}
</script>
<style scoped>
  .sectionOne{
    min-height: 700px;
    text-align: center;
  }
  .btn-getStart{
    padding: 0.5rem 7rem 0.5rem 7rem;
  }
</style>
