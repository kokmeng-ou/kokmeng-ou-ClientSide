<template lang="">
  <form class="w-100 me-3 position-relative" role="search" @submit.prevent="search">
    <i class="bi bi-search position-absolute start-0 translate-middle-y" style="padding-left: 14px; top: 20px;"></i>
    <input type="search" class="form-control move-placeholder" placeholder="" aria-label="Search" v-model="SearchInput">
  </form>
</template>
<script>

export default {
  data () {
    return {
      SearchInput: ''
    }
  },
  methods: {
    search () {
      // Navigate to search results page and pass search query as parameter
      console.log(this.SearchInput.length)
      console.log(this.SearchInput)
      if (this.SearchInput.length > 0) this.$router.push({ path: '/community', query: { search: this.SearchInput } })
      else if (this.SearchInput.length < 1) {
        window.location.assign('/community')
      }
    }
  }
}
</script>
<style scoped>
.move-placeholder{
  padding-left: 43px;
}
</style>
