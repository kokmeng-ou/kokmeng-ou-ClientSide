<template lang="">
  <div class="position-absolute top-50 start-50 translate-middle" style="min-width: 300px;" >
    <form @submit.prevent="handleTitle()">
      <label for=""></label>
      <div class="mb-3">
        <label for="" class="form-label">Title: {{ title }}</label>
        <input type="text"
          class="form-control" name="title" id="title" aria-describedby="helpId" placeholder="Enter title" v-model="title">
      </div>
      <button class="btn btn-purple w-100">button</button>
    </form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: ''
    }
  },
  methods: {
    handleTitle () {
      const getTitle = this.title
      this.$router.push({ name: 'editorId', params: { id: getTitle } })
    }
  }
}
</script>
<style>

</style>
