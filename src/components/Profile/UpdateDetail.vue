<template>
  <section>
    <div style=" max-width: auto; height: 10rem; background: rgb(140,140,255); background: linear-gradient(90deg, rgba(140,140,255,1) 0%, rgba(0,255,209,1) 100%); "></div>
    <form action="" class="">
      <section class="d-flex justify-content-between">
        <div class="d-flex mt-3 container">
          <img src="" class="rounded-circle bg-purple" alt="Image" width="100" height="100">
          <div class="ms-3 align-self-center">
            <h3 class="m-0">{{ update.username }}</h3>
            <p class="m-0">email</p>
          </div>
        </div>
        <div class="align-self-center d-flex flex-row gap-2">
          <button class="btn btn-blue" disabled="disabled">cancel</button>
          <button type="submit" class="btn btn-outline-blue" @click.prevent="handleUpdateProfile()">save</button>
        </div>
      </section>
      <section class="mt-3 row">
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              name="username"
              id="username"
              placeholder="Username"
              v-model="update.username">
            <label for="username">Username</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
              type="number"
              class="form-control"
              name="Website-link"
              id="Website-link"
              placeholder="Website link"
              v-model="update.age">
            <label for="Website-link">Age</label>
          </div>
        </div>
      </section>
      <section class="mt-3">
        <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              name="Website-link"
              id="Website-link"
              placeholder="Website link"
              v-model="update.web_link">
            <label for="Website-link">Website link</label>
          </div>
      </section>
      <section class="mt-3 row">
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              name="Location"
              id="Location"
              placeholder="Location"
              v-model="update.location">
            <label for="Location">Location</label>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              name="PhoneNumber"
              id="PhoneNumber"
              placeholder="Phone Number"
              v-model="update.phone_number">
            <label for="PhoneNumber">Phone Number</label>
          </div>
        </div>
      </section>
      <section class="mb-3">
            <label for="imageInput" class="form-label">Choose an image</label>
            <input type="file" class="form-control" id="imageInput" @change="handleImageChange">
      </section>
      <section v-if="update.new_image" class="mb-3">
            <img :src="update.new_image" alt="Selected Image" class="img-fluid">
      </section>
      <section class="mb-3">
        <div class="form-floating ">
          <textarea class="form-control"
          placeholder="Leave a Bio here"
          id="Bio"
          style="height: 100px"
          v-model="update.bio"></textarea>
          <label for="Bio">Bio</label>
        </div>
      </section>
    </form>
  </section>
</template>
<script>
import axios from 'axios'
export default {
  name: 'updateProfile',
  data () {
    return {
      update: {
        username: '',
        web_link: '',
        location: '',
        phone_number: '',
        new_image: '',
        bio: '',
        age: ''
      }
    }
  },
  methods: {
    handleImageChange (event) {
      const file = event.target.files[0]
      if (file) {
        this.update.new_image = URL.createObjectURL(file)
      } else {
        this.update.new_image = ''
      }
    },
    async handleUpdateProfile () {
      console.log(this.update)
      await axios
        .put('http://localhost:3000/profile/update', {
          username: this.update.username,
          weblink: this.update.web_link,
          age: this.update.age,
          telephone: this.update.phone_number,
          UserImage: this.update.new_image,
          Location: this.update.location,
          Bio: this.update.bio
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(response => {
          alert(response.data.success)
          localStorage.setItem('name', this.update.username)
          localStorage.setItem('image', this.update.new_image)
          this.$router.push({ name: 'detail' })
        })
        .catch(error => { console.log(error) })
    }
  }
}
</script>
<style>

</style>
