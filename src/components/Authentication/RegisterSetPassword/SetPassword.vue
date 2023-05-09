<template >
  <InvalidAlert :alertMessage="alertMessage" :showAlerts="showAlerts" :hideAlert="hideAlert"/>
  <section class="container w-50 text-center" >
    <div class="d-flex justify-content-center">
      <div class="position-relative make-it-round ">
        <div class="make-it-round rounded-circle bg-green position-absolute" style="opacity: 0.25;"></div>
        <i class="bi bi-key-fill fs-2 text-green " style="transform: rotate(-45deg);"></i>
      </div>
    </div>
    <h3 class="fw-bold">New Password</h3>
    <p class="text-muted">Please provide your password to complete register</p>
    <div class="mt-4 d-flex flex-column " style="align-items: center;">
      <form action="" class="w-50" @submit.prevent="handlePassword">
        <div class="form-floating mb-5">
          <input
            type="password"
            class="form-control"
            name="Password"
            id="Password"
            placeholder="Password"
            :class="{ 'is-invalid': !isValid }"
            v-model="setPassword.password">
          <label for="Password">Password</label>
          <div class="position-relative">
            <span class="position-absolute start-0 text-muted" > Must be at least 8 characters</span>
          </div>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            name="ConfirmPassword"
            id="ConfirmPassword"
            placeholder="Confirm Password"
            v-model="setPassword.confirmPassword"
            :class="{ 'is-invalid': !isValid }">
          <label for="ConfirmPassword">Confirm Password</label>
        </div>
        <button type="submit" class="btn btn-green bg-gradient w-50 align-self-center mb-3 w-100 p-2">Complete Register</button>
      </form>
      <router-link to="/auth/register"><i class="bi bi-arrow-left me-3 align-self-center"></i> Back to register</router-link>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
import InvalidAlert from '../AuthAlert/InvaildAlert.vue'
export default {
  name: 'RegisterSetPassword',
  components: {
    InvalidAlert
  },
  data () {
    return {
      setPassword: {
        password: '',
        confirmPassword: ''
      },
      alertMessage: '',
      isValid: true,
      showAlerts: false
    }
  },
  methods: {
    async handleShowError (event) {
      this.alertMessage = event
      this.showAlerts = true
      this.isValid = false
      setTimeout(() => {
        this.showAlerts = false
        this.isValid = true
      }, 5000)
    },
    hideAlert (event) {
      if (event === true) this.showAlerts = false
    },
    async handlePassword () {
      const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      console.log(this.setPassword.password)
      if (!this.setPassword.password) this.handleShowError(this.alertMessage = 'Password is required')
      else if (!regex.test(this.setPassword.password)) this.handleShowError(this.alertMessage = 'Password must contain at least 8 characters, including one uppercase, one lowercase letter, one number, and one special character ')
      else if (!this.setPassword.confirmPassword) this.handleShowError(this.alertMessage = 'Confirm Password is required')
      else if (this.setPassword.password !== this.setPassword.confirmPassword) this.handleShowError(this.alertMessage = 'Password must be match with confirm password')
      else {
        await axios
          .post('http://localhost:3000/user/register/setPassword', {
            password: this.setPassword.confirmPassword
          },
          {
            headers: {
              Authorization: `bearer ${this.$route.params.email}`
            }
          })
          .then(response => { this.$router.push({ path: `auth/register/${this.$route.params.email}/register-complete` }) })
          .catch(error => { this.handleShowError(error.response.data.message) })
      }
    }
  }
}
</script>
<style scoped>
</style>
