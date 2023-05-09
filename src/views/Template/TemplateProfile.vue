<template>
  <header class="container">
    <NavigationBar />
  </header>
  <main class=" container">
    <div class="row">
      <section class="col-md-2 col-2 border-end">
        <ProfileSideBar />
      </section>
      <section class="col-md-10 col-10 " >
        <router-view></router-view>
      </section>
    </div>
  </main>
</template>
<script>
import ProfileSideBar from '@/components/Profile/ProfileSideBar.vue'
import NavigationBar from '@/components/Navigation/NavigationBar.vue'
export default {
  name: 'TemplateProfile',
  components: {
    NavigationBar,
    ProfileSideBar
  }
}
</script>
<style scoped>
main {
  margin-top: 20px;
}
section {
  min-height: 100vh;
}
</style>
