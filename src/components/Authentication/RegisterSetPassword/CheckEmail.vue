<template>
  <section class="container w-50 text-center" >
    <div class="d-flex justify-content-center">
      <div class="position-relative make-it-round ">
        <div class="make-it-round rounded-circle bg-green position-absolute" style="opacity: 0.25;"></div>
        <i class="bi bi-envelope-check-fill fs-2 text-green "></i>
      </div>
    </div>
    <h3 class="fw-bold">Check your email</h3>
    <p class="text-muted">We sent a password reset link to {{ this.$route.query.email }}</p>
    <div class="mt-4 d-flex flex-column">
        <a class="btn btn-green bg-gradient w-50 align-self-center mb-3" href="https://mail.google.com/mail/u/0/#inbox" target="_blank">Open email app</a>
        <p>Didn't receive the email?
          <button class="border border-0 bg-transparent align-self-center text-green"
          @click="handleReSend"
          :disabled="buttonDisabled">
          {{ handleMessage }}
          </button>
          <span v-if="time > 0">{{ time }} seconds left</span>
        </p>
        <router-link to="/auth/register"><i class="bi bi-arrow-left me-3 align-self-center"></i> Back to register</router-link>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
export default {
  name: 'registerCheckEmail',
  data () {
    return {
      time: 0,
      handleMessage: 'Click to Resend',
      buttonDisabled: false
    }
  },
  methods: {
    async handleReSend () {
      this.buttonDisabled = true
      this.handleMessage = ''
      this.time = 120
      setInterval(() => {
        this.time--
      }, 1000)
      setTimeout(() => {
        this.handleMessage = 'Click to Resend'
        this.buttonDisabled = false
      }, this.time * 1000)
      await axios
        .post('http://localhost:3000/user/register', {
          email: localStorage.getItem('email'),
          username: localStorage.getItem('username')
        })
        .then(response => { alert(response.data.message) })
        .catch(error => { console.log(error) })
    }
  }
}
</script>
<style >

</style>
