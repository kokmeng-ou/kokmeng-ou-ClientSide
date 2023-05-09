<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="card-title d-flex ">
        <router-link :to="`/community/${post.id}/Individual-Content`" class="card-title pe-auto fw-bold fs-5 text-dark w-100" >{{ post.title }}</router-link>
        <button type="button" class="btn-close flex-shrink-1" aria-label="Close" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="getDeleteId(post.id)" ></button>
        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5 fw-bold" id="staticBackdropLabel">Delete</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              You can’t redo this ?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click="handleDeletePost()">Okay</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal -->
      </div>
      <section class="d-flex flex-row mb-3 gap-2">
        <router-link class="btn btn-outline-primary"  v-for="tag in post.tags" :key="tag.id" :to="`/community/?tag=${tag}`">{{ tag }}</router-link>
      </section>
      <p class=" overflow-hidden text-side  pe-auto" style="max-height: 60px;">
        <router-link :to="`/community/Individual-Content?title=${post.title}&_id=${post.id}`" class=" text-muted" >{{ post.content }}</router-link>
      </p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'PostProfile',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      getId: ''
    }
  },
  methods: {
    getDeleteId (Id) {
      this.getId = Id
    },
    async handleDeletePost () {
      await axios
        .delete(`http://localhost:3000/content/user-delete-post/${this.getId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          alert(response.data.message)
          this.$router.go()
        })
        .catch(err => { console.log(err) })
    }
  }
}
</script>
<style>

</style>
