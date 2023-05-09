<template >
  <InvalidAlert :alertMessage="alertMessage" :showAlerts="showAlerts" :hideAlert="hideAlert"/>
  <section class="container w-50 text-center" >
    <div class="d-flex justify-content-center">
      <div class="position-relative make-it-round ">
        <div class="make-it-round rounded-circle bg-purple position-absolute" style="opacity: 0.25;"></div>
        <i class="bi bi-key-fill fs-2 text-purple " style="transform: rotate(-45deg);"></i>
      </div>
    </div>
    <h3 class="fw-bold">Set New Password</h3>
    <p class="text-muted">Your new password must be different <br>to previously used passwords.</p>
    <div class="mt-4 d-flex flex-column " style="align-items: center;">
      <form action="" class="w-50" @submit.prevent="handleSetPassword">
        <div class="form-floating mb-5">
          <input
            type="password"
            class="form-control"
            name="Password"
            id="Password"
            placeholder="Password"
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
            v-model="setPassword.ConfirmPassword">
          <label for="ConfirmPassword">Confirm Password</label>
        </div>
        <button type="submit" class="btn btn-purple bg-gradient w-50 align-self-center mb-3 w-100 p-2">Reset Password</button>
      </form>
      <router-link to="/auth/login"><i class="bi bi-arrow-left me-3 align-self-center"></i> back to log in</router-link>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
import InvalidAlert from '../AuthAlert/InvaildAlert.vue'
export default {
  name: 'SetPassword',
  components: {
    InvalidAlert
  },
  data () {
    return {
      setPassword: {
        password: '',
        ConfirmPassword: ''
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
    async handleSetPassword () {
      if (!this.setPassword.password) this.handleShowError(this.alertMessage = 'Password is required')
      else if (!this.setPassword.ConfirmPassword) this.handleShowError(this.alertMessage = 'Confirm Password is required')
      else if (this.setPassword.password !== this.setPassword.ConfirmPassword) this.handleShowError(this.alertMessage = 'Password must be match with confirm password')
      else {
        await axios
          .post('http://localhost:3000/user/login/reset-password/protected', {
            password: this.setPassword.ConfirmPassword
          },
          {
            headers: {
              Authorization: `Bearer ${this.$route.params.token}`
            }
          })
          .then(response => { this.$router.push('/auth/forget-password/successful-reset-password') })
          .catch(error => { this.handleShowError(error.response.data.message) })
      }
    }
  }
}
</script>
<style scoped>
</style>
