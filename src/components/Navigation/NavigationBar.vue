<template lang="">
  <div class="w-100 start-0 d-flex justify-content-sm-between pb-3">
      <div class="d-flex gap-4 align-items-center">
        <router-link :to="{name: 'home'}" class="logo-styling fs-4 text-dark" id="logoLink">WebPagEditor</router-link>
        <router-link :to="{path: '/community/'}" class="text-muted" id="communityLink">Inspiration</router-link>
        <router-link :to="{path: '/editor/title'}" class="text-muted" id="EditorLink">Editor</router-link>
      </div>
      <div class="d-flex" v-if="isAuthenticated">
        <searchBar />
        <div class="btn-group dropdown">
          <button type="button" class="btn border border-0 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img :src="user.image" class="rounded-circle bg-purple" width="40" height="40" v-if="user.image">
            <span v-else><i class="bi bi-c-circle"></i></span>
            <span class="fw-bold ms-2">{{ user.username }}</span>
          </button>
          <div class="dropdown-menu">
            <router-link :to="{path: '/editor/title'}" class="Project dropdown-item" id="Project">New Project</router-link>
            <router-link :to="{path: '/profile/update'}" class="Setting dropdown-item" id="Setting">Change Profile</router-link>
            <router-link :to="{path: '/profile/detail'}" class="profile dropdown-item" id="Profile">Profile</router-link>
            <hr class="dropdown-divider">
            <router-link to="/" class="signOut dropdown-item" id="signOut" @click="logout()">SignOut</router-link>
          </div>
        </div>
        <div class="dropdown align-self-md-center">
          <button class="btn border border-0 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <span v-if="isLightMode"><i class="bi bi-lightbulb-fill text-warning"></i></span>
            <span v-if="isDarkMode"><i class="bi bi-lightbulb-off"></i></span>
          </button>
          <div class="dropdown-menu">
            <li v-if="isLightMode"><button class="dropdown-item" type="button" @click="toggleMode()"><i class="bi bi-lightbulb-fill text-warning"></i><span class="ms-2">Light mode</span></button></li>
            <li v-if="isDarkMode"><button class="dropdown-item" type="button" @click="toggleMode()"><i class="bi bi-lightbulb-off"></i><span class="ms-2">Dark mode</span></button></li>
          </div>
        </div>
      </div>
      <div  v-else>
        <router-link to="/auth/login" class="btn border border-0" id="login" role="button">Login</router-link>
        <router-link name="RegisterPage" id="register" class="btn btn-purple" to="/auth/register" role="button">Register</router-link>
      </div>
  </div>
</template>
<script>
import axios from 'axios'
import searchBar from './NavBarSearch.vue'
export default {
  components: {
    searchBar
  },
  name: 'NavBar',
  data () {
    return {
      isAuthenticated: false,
      user: {
        username: '',
        image: '',
        link: ''
      },
      isLightMode: true,
      isDarkMode: false
    }
  },
  mounted () {
    this.updateMode()
  },
  watch: {
    $localStorage () {
      console.log('hi')
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
      if (this.user.image === 'undefine') this.user.image = null
    }
    // Retrieve mode from local storage when the component is created
    const mode = localStorage.getItem('mode')
    if (mode === 'dark') {
      this.isLightMode = false
      this.isDarkMode = true
    }
  },
  methods: {
    async logout () {
      console.log(localStorage.getItem('token'))
      await axios
        .post('http://localhost:3000/profile/logout', {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
          if (response.data.respond === true) {
            localStorage.removeItem('token')
            location.reload()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    toggleMode () {
      // Toggle mode data properties
      this.isLightMode = !this.isLightMode
      this.isDarkMode = !this.isDarkMode

      // Save current mode to local storage
      const mode = this.isDarkMode ? 'dark' : 'light'
      localStorage.setItem('mode', mode)
    },
    updateMode () {
      // Update mode based on local storage when the component is mounted
      const mode = localStorage.getItem('mode')
      if (mode === 'dark') {
        this.isLightMode = false
        this.isDarkMode = true
      }
    }
  }
}
</script>
<style>
a{
  text-decoration: none !important;
}

</style>
