<template lang="">
  <div class="mb-auto p-2">
      <div class="d-flex flex-column gap-3 text-start">
        <router-link to="/community" :class="[community ? 'btn btn-blue' : ' text-decoration-none',]">Home</router-link>
        <router-link to="/community?tag" :class="[Tags ? 'btn btn-blue' : ' text-decoration-none']">Tags</router-link>
        <router-link to="/community?search" :class="[Search ? 'btn btn-blue' : ' text-decoration-none']">Search</router-link>
      </div>
  </div>
</template>
<script>
export default {
  name: 'SideBarOfCommunity',
  data () {
    return {
      Search: false,
      Tags: false,
      community: true,
      Editor: false
    }
  },
  mounted () {
    this.handleRoute()
  },
  watch: {
    $route () {
      this.handleRoute()
    }
  },
  methods: {
    handleRoute () {
      const valueSearch = this.$route.query.search
      const valueTag = this.$route.query.tag
      if (valueSearch) {
        this.handleTrueFalse(true, false, false)
      } else if (valueTag) {
        this.handleTrueFalse(false, true, false)
      } else if (this.$route.query) { this.handleTrueFalse(false, false, true) }
    },
    handleTrueFalse (search, Tags, community) {
      this.Search = search
      this.Tags = Tags
      this.community = community
    }
  }
}
</script>
<style lang="">

</style>
