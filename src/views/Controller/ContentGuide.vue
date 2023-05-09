<template lang="">
  <section>
    <FullContent v-for="content in contents" :key="content" :contents="content" />
  </section>
</template>
<script>
import FullContent from '@/components/Community/AllContent.vue'
import axios from 'axios'
export default {
  name: 'CommunityController',
  components: {
    FullContent
  },
  data () {
    return {
      contents: []
    }
  },
  mounted () {
    if (!this.$route.query.tag && !this.$route.query.search) this.handleContent('http://localhost:3000/content')
    else if (this.$route.query.tag) this.handleContent(`http://localhost:3000/content/tag/${this.$route.query.tag}`)
    else if (this.$route.query.search) this.handleContent(`http://localhost:3000/content/search?searchTitle=${this.$route.query.search}`)
  },
  watch: {
    $route () {
      if (!this.$route.query.tag && !this.$route.query.search) this.handleContent('http://localhost:3000/content')
      else if (this.$route.query.tag) this.handleContent(`http://localhost:3000/content/tag/${this.$route.query.tag}`)
      else if (this.$route.query.search) this.handleContent(`http://localhost:3000/content/search?searchTitle=${this.$route.query.search}`)
    }
  },
  methods: {
    async handleContent (url) {
      await axios
        .get(`${url}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => { this.contents = response.data.response })
        .catch(error => { console.log(error) })
    }
  }
}
</script>
<style lang="">

</style>
