<template>
  <section class="container w-50 text-center" >
    <div class="d-flex justify-content-center">
      <div class="position-relative make-it-round ">
        <div class="make-it-round rounded-circle bg-green position-absolute" style="opacity: 0.25;"></div>
        <i class="bi bi-check2-circle fs-2 text-green"></i>
      </div>
    </div>
    <h3 class="fw-bold">Complete Register</h3>
    <p class="text-muted">your password has been successfully complete register <br> Click below to log in</p>
    <div class="mt-4 d-flex flex-column">
      <div class="w-100 mb-3">
        <router-link to="/auth/login" class="btn btn-green bg-gradient w-50 p-2">Continue</router-link>
      </div>
        <router-link to="/auth/login"><i class="bi bi-arrow-left me-3 align-self-center"></i> back to log in</router-link>
    </div>
  </section>
</template>
<script>
export default {
  name: 'SuccessSetPassword'
}
</script>
<style>

</style>
