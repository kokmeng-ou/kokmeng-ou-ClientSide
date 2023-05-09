<template>
  <!-- invalid alert -->
  <div class="toast align-items-center text-bg-danger bg-gradient border-0 z-3 position-absolute top-0 end-0 m-3 p-1" role="alert" :class="{'show': showAlerts}" aria-live="assertive" aria-atomic="true" >
    <span class="d-flex">
      <strong class="toast-body">
        <i class="bi bi-bug"></i> {{ alertMessage }}
      </strong>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"  @click="hideAlert(showAlerts)"></button>
    </span>
  </div>
</template>
<script>
export default {
  name: 'invalidAlert',
  props: {
    alertMessage: String,
    showAlerts: Boolean,
    hideAlert: Function
  }
}
</script>
<style scoped>

</style>
