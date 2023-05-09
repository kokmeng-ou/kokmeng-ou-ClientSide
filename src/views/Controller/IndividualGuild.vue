<template>
  <IndividualContent v-for="content in contents" :key="content" :contents="content" />
  <div style="min-height: 20vh;">
    <!-- comment -->
    <h6 class="border-bottom pb-2 mb-0 fw-bold mt-3">Answer</h6>
    <div class="d-flex text-muted pt-3" v-for="comment in comments" :key="comment.id" >
      <img :src="comment.userId.UserImage"  alt="mdo" width="35" height="35" class="rounded-circle me-4"  >
      <div class="pb-3 mb-0 small lh-sm w-100">
        <strong class="text-dark ">{{ comment.userId.username }}</strong>
        <span class="d-block">{{ comment.text }}</span>
      </div>
    </div>
  </div>
  <addComment />
</template>
<script>
import axios from 'axios'
import IndividualContent from '@/components/Community/IndividualContent.vue'
import addComment from '@/components/Community/AddComment.vue'
export default {
  name: 'IndividualCommunityGuild',
  components: {
    IndividualContent,
    addComment
  },
  data () {
    return {
      contents: [],
      comments: []
    }
  },
  async mounted () {
    await this.handleIndividualContent(`http://localhost:3000/content/Individual-Content/${this.$route.params.id}`)
    await this.handleComment(`http://localhost:3000/comment/${this.$route.params.id}`)
  },
  methods: {
    async handleIndividualContent (url) {
      console.log(url)
      await axios
        .get(`${url}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => { this.contents = response.data.response })
        .catch(error => { console.log(error) })
    },
    async handleComment (url) {
      console.log(url)
      await axios
        .get(`${url}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => { this.comments = response.data.comment })
        .catch(error => { console.log(error) })
    }
  }
}
</script>
<style lang="">

</style>
