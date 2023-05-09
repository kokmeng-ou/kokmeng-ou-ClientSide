<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-purple fw-bold " data-bs-toggle="modal" data-bs-target="#ContentModal">New Discussions</button>

  <!-- Modal -->
  <div class="modal fade" id="ContentModal" tabindex="-1" aria-labelledby="ContentModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 fw-bold " id="ContentModalLabel">Add content</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">

          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingInput" placeholder="" v-model="title">
            <label for="floatingInput">Title</label>
          </div>
          <div class="mb-3">
            <label for="imageInput" class="form-label">Choose an image</label>
            <input type="file" class="form-control" id="imageInput" @change="handleImageChange">
          </div>
          <div v-if="imageUrl" class="mb-3">
            <img :src="imageUrl" alt="Selected Image" class="img-fluid">
          </div>
          <div class="form-floating mb-3">
            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" v-model="getText"></textarea>
            <label for="floatingTextarea2">Content</label>
          </div>
          <span class="mb-3">Please select option you want to ask</span>
          <select class="form-select mb-3" aria-label="Default select" v-model="selectOption">
            <option selected>Open this select menu</option>
            <option value="Ask Community">Ask Community</option>
            <option value="Ask CSS">Ask CSS</option>
            <option value="Editor Error">Editor Error</option>
          </select>
          <div class="mb-3">
            <label for="tagsInput" class="form-label">Tags: </label>
            <input type="text" class="form-control" id="tagsInput" v-model="tag" aria-describedby="helpId"  @keydown.enter="addTag">
            <small id="helpId" class="form-text text-danger">No more than 5 tag</small>
          </div>
          <div class="mb-3">
            <div class="badge bg-purple me-1" v-for="(tag, index) in selectedTags" :key="index">
              {{ tag }}
              <span type="button" class="text-light" aria-label="Close" @click="removeTag(index)"><i class="bi bi-x-lg"></i></span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="handleSendConstitute()">Post</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      selectedTags: [],
      title: '',
      selectOption: '',
      getText: '',
      tag: '',
      imageUrl: ''
    }
  },
  methods: {
    addTag () {
      if (this.tag && this.selectedTags.length < 5) {
        if (!this.selectedTags.includes(this.tag)) {
          this.selectedTags.push(this.tag)
        } else {
          alert('you can have the same tag')
        }
      } else {
        this.tag = ''
      }
    },
    removeTag (index) {
      this.selectedTags.splice(index, 1)
      // console.log(this.selectedTags)
    },
    handleImageChange (event) {
      const file = event.target.files[0]
      if (file) {
        this.imageUrl = URL.createObjectURL(file)
      } else {
        this.imageUrl = ''
      }
    },
    async handleSendConstitute () {
      await axios
        .post('http://localhost:3000/content/constitute-content', {
          title: this.title,
          postImage: this.imageUrl,
          content: this.getText,
          option: this.selectOption,
          tags: this.selectedTags
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => { 'your content have been added' })
        .catch(err => { console.log(err) })
    }
  }
}
</script>
<style scoped>

</style>
