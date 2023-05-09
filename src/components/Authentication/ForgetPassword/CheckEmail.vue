<template >
  <section class="container w-50 text-center" >
    <div class="d-flex justify-content-center">
      <div class="position-relative make-it-round ">
        <div class="make-it-round rounded-circle bg-purple position-absolute" style="opacity: 0.25;"></div>
        <i class="bi bi-envelope-check-fill fs-2 text-purple "></i>
      </div>
    </div>
    <h3 class="fw-bold">Check your email</h3>
    <p class="text-muted">We sent a password reset link to {{ this.$route.query.email }}</p>
    <div class="mt-4 d-flex flex-column">
        <a class="btn btn-purple bg-gradient w-50 align-self-center mb-3" href="https://mail.google.com/mail/u/0/#inbox" target="_blank">Open email app</a>
        <p>Didn't receive the email? <button class="border border-0 bg-transparent align-self-center text-purple fw-bold"
          @click="$event =>handleResend(this.$route.params.email)">Click to resend</button></p>
        <router-link to="/auth/login"><i class="bi bi-arrow-left me-3 align-self-center"></i> back to log in</router-link>
    </div>
  </section>
</template>
<script>
import axios from 'axios'

export default {
  name: 'checkEmail',
  methods: {
    async handleResend (event) {
      await axios
        .post('http://localhost:3000/user/login/reset-password', {
          email: event
        })
        .then(response => { console.log(response) })
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
