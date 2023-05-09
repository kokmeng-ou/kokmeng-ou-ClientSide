<template lang="">
  <div v-if="detail">
    <ProfileDetail v-for="user in userDetails" :key="user" :user="user"/>
  </div>
  <div v-else-if="update" class="text-muted">
    <updateProfile />
  </div>
  <div v-else-if="post">
    <PostDetail v-for="posts in postDetails" :key="posts" :post="posts"/>
  </div>
  <div v-else-if="following">
    <div class="card" style="height: 87vh;">
      <div class="card-header fw-bolder">
        Following
      </div>
      <div class="card-body">
        <FollowUser v-for="following in userDetails" :key="following" :following="following"/>
      </div>
    </div>
  </div>
  <div v-else-if="new_password">
    <SettingProfile />
  </div>
</template>
<script>
import ProfileDetail from '@/components/Profile/ProfileDetail.vue'
import updateProfile from '@/components/Profile/UpdateDetail.vue'
import PostDetail from '@/components/Profile/PostDetail.vue'
import FollowUser from '@/components/Profile/FollowUser.vue'
import SettingProfile from '@/components/Profile/SettingProfile.vue'
import axios from 'axios'
export default {
  components: {
    ProfileDetail,
    updateProfile,
    PostDetail,
    SettingProfile,
    FollowUser
  },
  data () {
    return {
      userDetails: {},
      postDetails: [],
      detail: false,
      update: false,
      post: false,
      following: false,
      new_password: false
    }
  },
  async mounted () {
    this.handleRoute()
  },
  watch: {
    $route () {
      this.handleRoute()
    }
  },
  methods: {
    handleRoute () {
      switch (this.$route.name) {
        case 'detail':
          this.OpenAndClose(true, false, false, false, false)
          this.handleProfile()
          break
        case 'update':
          this.OpenAndClose(false, true, false, false, false)
          break
        case 'post':
          this.OpenAndClose(false, false, true, false, false)
          this.handlePost()
          break
        case 'following':
          this.OpenAndClose(false, false, false, true, false)
          this.handleProfile()
          break
        case 'new-password':
          this.OpenAndClose(false, false, false, false, true)
          break
        default:
          break
      }
    },
    async OpenAndClose (detail, update, post, following, newPassword) {
      this.detail = detail
      this.update = update
      this.post = post
      this.following = following
      this.new_password = newPassword
    },
    async handleProfile () {
      await axios
        .get('http://localhost:3000/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => { this.userDetails = response.data })
        .catch(err => { console.log(err) })
    },
    async handlePost () {
      await axios
        .get('http://localhost:3000/content/user-post', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => { this.postDetails = response.data.response })
        .catch(err => { console.log(err) })
    }
  }
}
</script>
<style lang="">

</style>
