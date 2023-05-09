<template lang="">
  <div class="dropdown">
    <button type="button" class="btn border border-0 " data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
      <img src="./Image/chat.png" alt="chat" with="40" height="40">
    </button>
    <div class="dropdown-menu">
      <div class=" d-flex flex-column" style="min-width: 22rem; min-height: 25rem">
        <div class="p-2 flex-grow-1">
          <div class="d-flex justify-content-between">
            <h5>
              Chat
            </h5>
            <div>
              <div data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i class="bi bi-share-fill"></i>
              </div>
            </div>
          </div>
          <div class="d-flex " v-for="msg in messages" :key="msg">
            <img :src="msg.image" class="rounded-circle bg-purple" alt="Image" width="30" height="30">
            <div class="p-2 ">{{ msg.text }}</div>
          </div>
        </div>
        <div class="p-2">
          <input type="text" class="form-control" name="Message" id="Message" placeholder="Message" @keyup.enter="sendMessage" v-model="TextMessages">
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Link</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-9">
              <div class="mb-3">
                <input type="text" class="form-control" name="email" id="email" placeholder="Email" v-model="email">
              </div>
          </div>
            <div class="col-3">
              <button type="button" class="btn btn-dark" @click="sendInvitation()" >Invited</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { io } from 'socket.io-client'
export default {
  name: 'ChatSide',
  data () {
    return {
      email: '',
      socket: null,
      messages: [],
      TextMessages: ''
    }
  },
  mounted () {
    console.log(this.$route.fullPath)
    this.socket = io('http://localhost:3000')
    // Join room
    this.socket.emit('join-Room', this.$route.params.id)
    this.socket.on('chat-message', (msg) => {
      this.messages.push({ id: msg.id, text: msg.text, name: msg.name })
    })
  },
  methods: {
    sendMessage () {
      console.log(this.$route.params.id)
      const messageTxt = {
        id: Date.now(),
        text: this.TextMessages,
        name: localStorage.getItem('name'),
        image: localStorage.getItem('image')
      }
      this.socket.emit('send-chat-message', this.$route.params.id, messageTxt)
      this.TextMessages = ''
    },
    sendInvitation () {
      axios
        .post('http://localhost:3000/Invitation/chat', {
          title: this.$route.params.id,
          email: this.email
        })
        .then(response => { console.log(response.data.Message) })
        .catch(err => { console.log(err) })
    }
  }
}
</script>
<style lang="">

</style>
