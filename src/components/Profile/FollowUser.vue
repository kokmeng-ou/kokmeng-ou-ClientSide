<template>
      <div class="d-flex text-body-secondary pt-3" v-if="following.following_id">
        <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"></rect><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
        <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
          <div class="d-flex justify-content-between">
            <router-link :to="`/friend/${following.following_id}`" class="text-gray-dark">{{ following.following_username }}</router-link>
            <button class="btn border border-0" @click="sendUnFollow(following.following_id)">Follow</button>
          </div>
          <span class="d-block">{{ following.following_email }}</span>
        </div>
      </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'FollowUSer',
  props: {
    following: {
      type: Object,
      required: true
    }
  },
  methods: {
    async sendUnFollow (id) {
      await axios
        .patch('http://localhost:3000/profile/unfollow', {
          followerId: id
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => { this.$router.go(0) })
        .catch(err => { console.log(err) })
    }
  }
}
</script>
<style scoped>

</style>
