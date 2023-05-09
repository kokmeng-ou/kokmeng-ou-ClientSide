<template lang="">
  <div class="mb-auto p-2">
      <div class="d-flex flex-column gap-3 text-start">
        <router-link to="/profile/detail" :class="[General ? 'btn btn-blue' : ' text-decoration-none',]">General</router-link>
        <router-link to="/profile/update" :class="[Update ? 'btn btn-blue' : ' text-decoration-none']">Update</router-link>
        <router-link to="/profile/posts" :class="[post ? 'btn btn-blue' : ' text-decoration-none']">Post</router-link>
        <router-link to="/profile/following" :class="[Following ? 'btn btn-blue' : ' text-decoration-none']">Following</router-link>
        <router-link to="/profile/new-password" :class="[newPassword ? 'btn btn-blue' : ' text-decoration-none']">New-password</router-link>
      </div>
    </div>
</template>
<script>
export default {
  name: 'userSideBar',
  data () {
    return {
      General: false,
      Update: false,
      post: false,
      Following: false,
      newPassword: false
    }
  },
  mounted () {
    this.handleRoute()
  },
  watch: {
    $route () {
      this.handleRoute()
    }
  },
  methods: {
    handleRoute () {
      switch (this.$route.name) {
        case 'detail':
          this.General = true
          this.Update = false
          this.post = false
          this.Following = false
          this.newPassword = false
          break
        case 'update':
          this.General = false
          this.Update = true
          this.post = false
          this.Following = false
          this.newPassword = false
          break
        case 'post':
          this.General = false
          this.Update = false
          this.post = true
          this.Following = false
          this.newPassword = false
          break
        case 'following':
          this.General = false
          this.Update = false
          this.post = false
          this.Following = true
          this.newPassword = false
          break
        case 'new-password':
          this.General = false
          this.Update = false
          this.post = false
          this.Following = false
          this.newPassword = true
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="">

</style>
