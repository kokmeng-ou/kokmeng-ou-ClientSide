<template lang="">
  <div class="mt-3 mb-5">
    <h6 for="comment" class="form-label fw-bold">Leave a Comment</h6>
    <form class="d-flex gap-2" @submit.prevent="handleEnter()">
      <div class="w-100">
        <input class="form-control" id="comment" rows="3" placeholder="send a comment" v-model="comment">
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      comment: ''
    }
  },
  methods: {
    async handleEnter () {
      await axios
        .post(`http://localhost:3000/comment/${this.$route.params.id}/constituteComment`, {
          text: this.comment
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
          alert(response.data.success)
          this.$router.go()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="">

</style>
