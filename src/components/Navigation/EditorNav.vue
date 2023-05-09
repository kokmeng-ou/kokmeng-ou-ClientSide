<template lang="">
  <navbar class="w-100 start-0 d-flex justify-content-sm-between ">
      <nav-items class="d-flex gap-4 align-items-center">
        <router-link :to="{name: 'home'}" class="logo-styling fs-4 text-dark" id="logoLink">WebPagEditor</router-link>
        <p class="text-dark" id="communityLink">Title : {{ title }}</p>
      </nav-items>
      <nav-items class="d-flex align-items-center gap-3">
        <!---->
        <ChatComponent />
        <DownloadComponent />
        <!---->
        <profile class="btn-group dropdown">
          <button type="button" class="btn border border-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img :src="user.image" class="rounded-circle bg-purple" width="40" height="40" v-if="user.image">
            <span v-else><i class="bi bi-c-circle"></i></span>
            <span class="fw-bold ms-2">{{ user.username }} </span>
          </button>
          <profile-item class="dropdown-menu">
            <router-link :to="{path: '/editor/title'}" class="Project dropdown-item" id="Project">New Project</router-link>
            <router-link :to="{path: '/profile/update'}" class="Setting dropdown-item" id="Setting">Change Profile</router-link>
            <router-link :to="{path: '/profile/detail'}" class="profile dropdown-item" id="Profile">Profile</router-link>
            <hr class="dropdown-divider">
            <router-link to="/" class="signOut dropdown-item" id="signOut">SignOut</router-link>
          </profile-item>
        </profile>
        <bg-mode class="dropdown align-self-md-center">
          <button class="btn border border-0 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-lightbulb-fill text-warning"></i>
          </button>
          <bg-mode-item class="dropdown-menu">
            <li><button class="dropdown-item" type="button"><i class="bi bi-lightbulb-fill text-warning"></i><span class="ms-2">Light mode</span></button></li>
            <li><button class="dropdown-item" type="button"><i class="bi bi-lightbulb-off"></i><span class="ms-2">Dark mode</span></button></li>
          </bg-mode-item>
        </bg-mode>
      </nav-items>
  </navbar>
</template>
<script>
import ChatComponent from './ChatComponent.vue'
import DownloadComponent from './DownloadComponent.vue'
export default {
  components: {
    ChatComponent,
    DownloadComponent
  },
  name: 'EditorNav',
  data () {
    return {
      title: this.$router.currentRoute.value.params.id,
      isAuthenticated: false,
      user: {
        username: '',
        image: '',
        link: ''
      }
    }
  },
  created () {
    // Check if the user is authenticated
    // and set isAuthenticated and user accordingly
    const token = localStorage.getItem('token')
    if (token && token !== null) {
      this.isAuthenticated = true
      this.user.username = localStorage.getItem('name')
      this.user.image = localStorage.getItem('image')
    }
  }
}
</script>
<style lang="">

</style>
