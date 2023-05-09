<template>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" class="form-control" id="password" v-model="password" :class="{ 'is-invalid': !isValid }">
    <div class="invalid-feedback">
      Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.
    </div>
    <div @click="testing">
      click
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      password: '',
      isValid: false
    }
  },
  watch: {
    password () {
      this.validatePassword()
    }
  },
  methods: {
    testing () {
      this.$router.push({ path: 'auth/register/this.$route.params.email}/register-complete' })
    },
    validatePassword () {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      this.isValid = regex.test(this.password)
    }
  }
}
</script>
