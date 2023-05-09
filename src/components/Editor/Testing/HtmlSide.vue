<template lang="">
  <div class="accordion accordion-flush" id="accordionHtml">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" :data-bs-target="'#'+html.toggle" aria-expanded="false" :aria-controls="html.toggle">
          {{ html.name }}
        </button>
      </h2>
      <div :id="html.toggle" class="accordion-collapse collapse" data-bs-parent="#accordionHtml">
        <div class="accordion-body p-0" >
          <ul class="list" v-for="tag in html.tags" :key="tag">
            <!-- Button trigger modal -->
            <li>
              <button type="button" class="btn w-100 text-start border-start-0 border-end-0 rounded-0 ps-4" data-bs-toggle="modal" :data-bs-target="'#'+tag.tag">
                {{ tag.tag }}
              </button>
            </li>
            <!-- Modal -->
            <div class="modal fade" :id="tag.tag" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5 fw-bold" id="staticBackdropLabel">{{ tag.tag }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <!-- body -->
                  <div class="modal-body text-start">

                      <div class="mb-3">
                        <label for="" class="form-label">Id</label>
                        <input type="text"
                          class="form-control" name="" id="" placeholder="Id" v-model="content.id">
                      </div>

                      <div class="mb-3">
                        <label for="" class="form-label">Class</label>
                        <input type="text"
                          class="form-control" name="" id="" placeholder="Class" v-model="content.class">
                      </div>

                      <div class="mb-3">
                        <label for="" class="form-label">Text</label>
                        <textarea class="form-control" name="" id="" rows="3" placeholder="Text" v-model="content.text"></textarea>
                      </div>

                  </div>
                  <!-- footer -->
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="saveToLocalStorage(tag.tag, tag.startTag, tag.endTag)">Understood</button>
                  </div>
                </div>
              </div>
            </div>

          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { io } from 'socket.io-client'
export default {
  props: {
    html: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      socket: io('http://localhost:3000'),
      content: {
        id: '',
        class: '',
        text: ''
      },
      storeArray: JSON.parse(localStorage.getItem('HTMLdata')),
      receivedText: ''
    }
  },
  methods: {
    saveToLocalStorage (tag, startTag, endTag) {
      try {
        const formData = {
          startTag: `<${tag}`,
          attributes: {
            id: this.content.id,
            className: this.content.class
          },
          close: '>',
          text: this.content.text,
          endTag: endTag
        }
        // this.storeArray.push(formData)
        this.socket.emit('send-html', 'testing', formData)
      } catch (error) {
        console.error('Error saving to local storage:', error)
      }
    }
  }
}
</script>
<style scoped>
.list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.list li {
  margin-left: 0;
  padding-left: 0;
}

button {
  font-size: 12px;
}
</style>
