<template>
  <section class="container w-50 text-center " >
    <div class="d-flex justify-content-center">
      <div class="position-relative make-it-round ">
        <div class="make-it-round rounded-circle bg-purple position-absolute" style="opacity: 0.25;"></div>
        <i class="bi bi-key-fill fs-2 text-purple " style="transform: rotate(-45deg);"></i>
      </div>
    </div>
    <h3 class="fw-bold">Forgot password?</h3>
    <p class="text-muted">Enter the email address associated with your account and we'll send you <br> a link to reset your password</p>
    <div class="mt-4 d-flex justify-content-center">
      <form action="" class="w-50" @submit.prevent="handleEmail">
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            name="emailForgetPassword"
            id="emailForgetPassword"
            placeholder="EmailAddress"
            v-model="Email">
          <label for="emailForgetPassword">Email Address</label>
        </div>
        <button type="submit" class="btn btn-purple bg-gradient w-100">Reset Password</button>
      </form>
    </div>
    <div class="mt-4 d-flex justify-content-center">
      <router-link to="/auth/login"><i class="bi bi-arrow-left me-3"></i> back to log in</router-link>
    </div>
  </section>
</template>
<script>
import axios from 'axios'

export default {
  name: 'ForgetPassword',
  data () {
    return {
      Email: ''
    }
  },
  methods: {
    async handleEmail () {
      await axios
        .post('http://localhost:3000/user/login/reset-password', {
          email: this.Email
        })
        .then(response => { this.$router.push(`forget-password/${this.Email}/check-email`) })
        .catch(error => { console.log(error) })
    }
  }
}
</script>
<style scoped>
section {
  margin-top: 100px;
}
</style>
