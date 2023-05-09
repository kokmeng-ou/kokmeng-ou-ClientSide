<template>
  <InvalidAlert :alertMessage="alertMessage" :showAlerts="showAlerts" :hideAlert="hideAlert"/>
  <div class="position-absolute m-4">
    <router-link to="/"><i class="bi bi-house-gear-fill fs-5 text-dark" ></i></router-link>
  </div>
  <video autoplay muted loop id="myVideo" class="w-100">
    <source src="./Video/spy-x-family-on-the-beach-desktop-wallpaperwaifu.com.mp4" type="video/mp4">
    Your browser does not support HTML5 video.
  </video>
  <section class="bg-light d-flex" style="width: 37%; min-height: 100vh;" @submit.prevent="handleSubmitLogin">
    <form class="w-100 container" style="max-width: 400px;" >
      <h2 class="fw-bold mb-4">Login</h2>
      <div class="form-floating mb-3">
        <input
          type="email"
          class="form-control border-bottom bg-transparent"
          name="formEmail"
          id="formEmail"
          placeholder="username@example.com"
          v-model="login_form.Email">
        <label for="formEmail">Email Address</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="password"
          class="form-control border-bottom bg-transparent "
          name="formName"
          id="formName" placeholder="password"
          v-model="login_form.Password">
        <label for="formName">Password</label>
      </div>
      <div class=" d-flex justify-content-end">
        <router-link to="/auth/forget-password">Forget password?</router-link>
      </div>
      <button type="submit" class="btn btn-dark w-100 mt-3 mb-3 ">Login</button>
      <div class="mt-4 d-flex justify-content-center">
        <router-link to="/auth/register">Don't have an account? Sign Up</router-link>
      </div>
    </form>
  </section>
</template>
<script>
import InvalidAlert from '../AuthAlert/InvaildAlert.vue'
import axios from 'axios'
export default {
  name: 'AuthLogin',
  components: {
    InvalidAlert
  },
  data () {
    return {
      login_form: {
        Email: '',
        Password: ''
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
    async handleSubmitLogin () {
      if (!this.login_form.Email && !this.login_form.Password) this.handleShowError(this.alertMessage = 'Email and Password is required')
      else if (!this.login_form.Email) this.handleShowError(this.alertMessage = 'Email is required')
      else if (!this.login_form.Password) this.handleShowError(this.alertMessage = 'Password is required')
      else if (this.login_form.Email && this.login_form.Password) {
        try {
          const response = await axios.post('http://localhost:3000/user/login', {
            email: this.login_form.Email,
            password: this.login_form.Password
          })
          if (!response.data.respond) this.handleShowError('error')
          else {
            localStorage.setItem('token', response.data.respond.token)
            localStorage.setItem('name', response.data.respond.name)
            localStorage.setItem('email', response.data.respond.email)
            localStorage.setItem('image', response.data.respond.image)
            this.$router.push({ name: 'content' })
          }
        } catch (error) {
          switch (error.response.status) {
            case 401:this.handleShowError(error.response.data.message)
              break
            case 402:this.handleShowError(error.response.data.message)
              break
            case 500:this.handleShowError(error.response.data.message)
              break
            default:this.statusMessage = 'Request failed'
              break
          }
        }
      }
    }
  }
}
</script>
<style scoped>
@media screen and (max-width: 800px) {
    #myVideo {
      display: none;
    }
}

#myVideo {
  position: fixed;
  right: -221px;
  top: 0;
  min-width: 100%;
  z-index: -1;
}

.d-flex{
  display: flex!important;
  align-items: center;
}

</style>
