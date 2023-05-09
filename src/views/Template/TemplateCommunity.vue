<template lang="">
  <header class="container">
    <NavigationBar></NavigationBar>
    <section class="hero-section">
          <div class="py-5 p-2">
            <h3 class="fw-bold">Discussions</h3>
            <p class="col-md-8 fs-5 text-muted">Ask questions, find support, connect with the community, and share you idea .</p>
            <AddContent ></AddContent>
          </div>
    </section>
  </header >
  <main class="container">
    <div class="row">
      <section class="col-md-2 col-2">
        <SideNav />
      </section>
      <section class="col-md-10 col-10 pe-5" >
        <router-view></router-view>
      </section>
    </div>
  </main>
</template>
<script>
import SideNav from '@/components/Community/SideNav.vue'
import AddContent from '@/components/Community/AddContent.vue'
import NavigationBar from '@/components/Navigation/NavigationBar.vue'
export default {
  name: 'TemplateCommunity',
  components: {
    SideNav,
    NavigationBar,
    AddContent
  }
}
</script>
<style lang="">

</style>
