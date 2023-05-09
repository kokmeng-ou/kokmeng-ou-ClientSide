<template>
  <section>
    <div class="card">
      <div class="card-header fw-bold">
        Where you're logged in
      </div>
      <div class="card-body">
        <h6 class="card-title fw-bold">logged</h6>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
      </div>
    </div>
    <div class="card mt-4">
      <div class="card-header fw-bold">
        Login
      </div>
      <div class="card-body">
        <div class="d-flex text-muted pt-3">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="2rem" height="2rem" viewBox="0 0 24 24" class="iconify iconify--mdi"><path fill="currentColor" d="M12.63 2c5.53 0 10.01 4.5 10.01 10s-4.48 10-10.01 10c-3.51 0-6.58-1.82-8.37-4.57l1.58-1.25C7.25 18.47 9.76 20 12.64 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8C8.56 4 5.2 7.06 4.71 11h2.76l-3.74 3.73L0 11h2.69c.5-5.05 4.76-9 9.94-9m2.96 8.24c.5.01.91.41.91.92v4.61c0 .5-.41.92-.92.92h-5.53c-.51 0-.92-.42-.92-.92v-4.61c0-.51.41-.91.91-.92V9.23c0-1.53 1.25-2.77 2.77-2.77c1.53 0 2.78 1.24 2.78 2.77v1.01m-2.78-2.38c-.75 0-1.37.61-1.37 1.37v1.01h2.75V9.23c0-.76-.62-1.37-1.38-1.37Z"></path></svg>
          <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
            <strong class="text-gray-dark ">Change password</strong>
            <span class="d-block">It's a good idea to use a strong password that you don't use elsewhere</span>
          </div>
        </div>
        <div class="container mt-3" style="max-width: 400px;">
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control" name="Current" id="Current" placeholder="Current Password" v-model="password.current">
            <label for="formId1">Current Password</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control" name="New" id="New" placeholder="New Password" v-model="password.new">
            <label for="formId1">New Password</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control" name="Confirm" id="Confirm" placeholder="Confirm Password" v-model="password.confirm">
            <label for="formId1">Confirm Password</label>
          </div>
          <button type="submit" class="btn btn-outline-secondary w-100" @click="handleValidation()">Save Password</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios'
export default {
  name: 'SettingProfile',
  data () {
    return {
      password: {
        current: '',
        new: '',
        confirm: ''
      }
    }
  },
  methods: {
    async handleValidation () {
      if (this.password.new !== this.password.confirm) alert('password Need to match')
      else this.handlePassword()
    },
    async handlePassword () {
      await axios
        .put('http://localhost:3000/profile/new-password', {
          currentPassword: this.password.current,
          password: this.password.new
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          alert(response.data.success)
          this.$router.go()
        })
        .catch(error => { console.log(error) })
    }
  }
}
</script>
<style>

</style>
