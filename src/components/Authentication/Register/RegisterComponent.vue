<template lang="">
  <InvalidAlert :alertMessage="alertMessage" :showAlerts="showAlerts" :hideAlert="hideAlert"/>
  <div class="position-absolute top-0 end-0 m-4" style="z-index: 100;">
      <router-link to="/"><i class="bi bi-house-gear-fill fs-5 text-green" ></i></router-link>
  </div>
  <video autoplay muted loop id="myVideo" class="w-100">
    <source src="./Video/reg-made-in-abyss-desktop-wallpaperwaifu.com.mp4" type="video/mp4">
    Your browser does not support HTML5 video.
  </video>
  <section class="bg-light d-flex position-absolute top-0 end-0 " style="width: 37%; min-height: 100vh;">
    <form class="w-100 container" style="max-width: 400px;" @submit.prevent="handleSubmitRegister">
      <h2 class="fw-bold mb-4 text-green">Register</h2>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control border-bottom bg-transparent "
          name="formName"
          id="formName"
          placeholder="username"
          v-model="register_form.username">
        <label for="formName">username</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="email"
          class="form-control border-bottom bg-transparent"
          name="formEmail"
          id="formEmail"
          placeholder="username@example.com"
          v-model="register_form.email">
        <label for="formEmail">Email Address</label>
      </div>
      <button type="submit" class="btn btn-green w-100 mt-3 mb-3 bg-gradient">Register</button>
      <div class="mt-4 d-flex justify-content-center">
        <p>Already have an account?<router-link to="/auth/login"> login</router-link></p>
      </div>
    </form>
  </section>
</template>
<script>
import axios from 'axios'
import InvalidAlert from '../AuthAlert/InvaildAlert.vue'
export default {
  name: 'AuthRegister',
  components: {
    InvalidAlert
  },
  data () {
    return {
      register_form: {
        username: '',
        email: ''
      },
      alertMessage: '',
      showAlerts: false
    }
  },
  methods: {
    async handleShowError (event) {
      this.alertMessage = event
      this.showAlerts = true
      setTimeout(() => {
        this.showAlerts = false
      }, 5000)
    },
    hideAlert (event) {
      if (event === true) this.showAlerts = false
    },
    async handleSubmitRegister () {
      if (!this.register_form.username) this.handleShowError(this.alertMessage = 'Username is required')
      else if (!this.register_form.email) this.handleShowError(this.alertMessage = 'Email is required')
      else if (!this.register_form.email && !this.register_form.username) this.handleShowError(this.alertMessage = 'Email and Username is required')
      else {
        try {
          await axios.post('http://localhost:3000/user/register', {
            email: this.register_form.email,
            username: this.register_form.username
          }).then(response => {
            localStorage.setItem('email', this.register_form.email)
            localStorage.setItem('username', this.register_form.username)
            setTimeout(() => {
              this.$router.push(`register/CheckEmail?email=${this.register_form.email}&username=${this.register_form.username}`)
            }, 5000)
          })
        } catch (error) {
          switch (error.response.status) {
            case 400: this.handleShowError(error.response.data.error)
              break
            case 401: this.handleShowError(error.response.data.error)
              break
            case 404: this.handleShowError(error.response.data.error)
              break
            case 500: this.handleShowError(error.response.data.message)
              break
            default: this.statusMessage = 'Request failed'
              break
          }
        }
      }
    }
  }
}
</script>
<style scoped>
#myVideo {
  transform: scaleX(-1);
  position: fixed;
  left: -221px;
  top: 0;
  min-width: 100%;
  max-height: auto;
  z-index: -1;
}
.d-flex{
  display: flex!important;
  align-items: center;
}
</style>
