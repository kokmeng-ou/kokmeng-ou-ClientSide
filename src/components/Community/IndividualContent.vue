<template >
  <!-- Title - image - content - comment -->
    <div class="row g-0" >
        <div class="d-flex flex-column">
          <div class="d-flex justify-content-between gap-2 mb-2">
            <h3 class="fw-bold fs-4" >{{ contents.title }}</h3>
            <div v-if="isLike">
              <button type="button" class="btn text-danger" @click="handleSendUnlike(contents.id)"><i class="bi bi-balloon-heart-fill"></i> Liked {{ likeNumber }}</button>
            </div>
            <div v-else>
              <button type="button" class="btn " @click="handleSendLike(contents.id)"><i class="bi bi-balloon-heart"></i> Like <span>{{ likeNumber }}</span></button>
            </div>
          </div>
          <router-link :to="`/friend/${contents.userId}`" class="fw-bold mb-3 text-dark" >By {{ contents.username }}<small class="text-muted ps-2 fw-light">Last update 3min ago</small></router-link>
          <p>{{ contents.content }}</p>
          <img :src="contents.postImage" class="img-fluid rounded-top" alt="">
          <div class="d-flex gap-2 align-items-center pt-2 pb-2 fw-bold" >
              Tag:
              <div v-for="tag in contents.tags" :key="tag.id">
                <router-link :to="`/community/?tag=${tag}`" class="text-bolder text-dark"> {{tag}} </router-link>
              </div>
          </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'IndividualContent',
  props: {
    contents: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isLike: false,
      likeNumber: this.contents.like
    }
  },
  mounted () {
    this.CheckLike(this.contents.id)
  },
  methods: {
    async CheckLike (likeID) {
      await axios
        .get(`http://localhost:3000/content/${likeID}/isLike`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => { this.isLike = response.data.message })
        .catch()
    },
    async handleSendLike (likeID) {
      await axios
        .post(`http://localhost:3000/content/${likeID}/like`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
          this.CheckLike(likeID)
          this.likeNumber++
        })
        .catch(err => { console.log(err) })
    },
    async handleSendUnlike (likeID) {
      await axios
        .post(`http://localhost:3000/content/${likeID}/unlike`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
          this.CheckLike(likeID)
          this.likeNumber--
        })
        .catch(err => { console.log(err) })
    }

  }
}
</script>
<style lang="">

</style>
