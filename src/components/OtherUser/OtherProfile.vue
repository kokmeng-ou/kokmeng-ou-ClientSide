<template>
  <section v-for="(user, index) in getUserDetail" :key="index">
    <div style=" max-width: auto; height: 10rem; background: rgb(140,140,255); background: linear-gradient(90deg, rgba(140,140,255,1) 0%, rgba(0,255,209,1) 100%); "></div>
    <section class="d-flex justify-content-between">
      <div class="d-flex mt-3 container">
        <img :src="user.image" class="rounded-circle bg-purple" alt="Image" width="100" height="100">
        <div class="ms-3 align-self-center">
          <h3 class="m-0">{{ user.username}}</h3>
          <p class="m-0">{{ user.email }}</p>
        </div>
      </div>
      <div class="d-flex gap-2 align-self-center">
        <button name="" id="" class="btn btn-primary" href="#" role="button" v-if="getCheck" @click="sendUnFollow()" >UnFollow</button>
        <button name="" id="" class="btn btn-primary" href="#" role="button" v-else @click="sendFollow()" >Follow</button>
      </div>
    </section>
    <section class="mt-3 container">
      <!--
      <div class="d-flex text-muted pt-3">
          <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
            <strong class="text-gray-dark ">Skill</strong>
            <div class="d-flex gap-2">
              <button class="btn btn-outline-blue" >Design</button>
              <button class="btn btn-outline-blue" >Student</button>
            </div>
          </div>
      </div>
      -->
      <div class="d-flex text-muted pt-3">
          <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
            <strong class="text-gray-dark ">Age</strong>
            <span class="d-block">{{ user.age }}</span>
          </div>
          <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
            <strong class="text-gray-dark ">Website link</strong>
            <span class="d-block">{{ user.weblink }}</span>
          </div>
      </div>
      <div class="d-flex text-muted pt-3">
          <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
            <strong class="text-gray-dark ">Location</strong>
            <span class="d-block">{{ user.Location }}</span>
          </div>
          <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
            <strong class="text-gray-dark ">Phone Number</strong>
            <span class="d-block">{{ user.telephone }}</span>
          </div>
      </div>
      <div class="d-flex text-muted pt-3">
          <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
            <strong class="text-gray-dark ">BIO</strong>
            <span class="d-block">{{ user.Bio }}</span>
          </div>
      </div>
    </section>
  </section>
</template>
<script>
import axios from 'axios'

export default {
  name: 'OtherProfile',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      getUserDetail: {},
      getCheck: ''
    }
  },
  mounted () {
    this.handlerOtherUserProfile()
    this.checkFollowing()
  },
  methods: {
    async handlerOtherUserProfile () {
      await axios
        .get(`http://localhost:3000/profile/another-user/${this.$route.params.name}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.getUserDetail = response.data.user
          console.log(this.getUserDetail)
        })
        .catch(err => { console.log(err) })
    },
    async checkFollowing () {
      await axios
        .get(`http://localhost:3000/profile/isFollowing/${this.$route.params.name}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          this.getCheck = response.data.message
        })
        .catch(err => { console.log(err) })
    },
    async sendUnFollow () {
      await axios
        .patch('http://localhost:3000/profile/unfollow', {
          followerId: this.$route.params.name
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => { this.checkFollowing() })
        .catch(err => { console.log(err) })
    },
    async sendFollow () {
      await axios
        .patch('http://localhost:3000/profile/follow', {
          followId: this.$route.params.name
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => { this.checkFollowing() })
        .catch(err => { console.log(err) })
    }
  }
}
</script>
<style>

</style>
