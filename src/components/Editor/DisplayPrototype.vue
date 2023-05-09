<template lang="">
  <h6 class="text-start fw-bold">Prototype</h6>
  <div v-if="checkArray">
    <div class="text-start d-flex" v-for="(item, index) in getHTML" :key="index">
      <p @click="handleSelect(index)" :class="{ 'light-blue-background': isSelected[index] }">{{ item }}</p>
      <button type="button" class="btn-close"  @click="deleteItem(index)"></button>
    </div>
  </div>
  <div v-else>
  </div>
</template>
<script>
import { io } from 'socket.io-client'
export default {
  name: 'displayPrototype',
  data () {
    return {
      socket: '',
      checkArray: false,
      isSelected: [],
      getHTML: [],
      convertToArray: [],
      getCSS: ''
    }
  },
  mounted () {
    this.socket = io('http://localhost:3000')
    this.socket.emit('join-Room', this.$route.params.id)
    this.socket.on('html-message', (html) => {
      this.startDelayedFunction()
    })
    this.socket.on('rerun-message', (run) => {
      this.startDelayedFunction()
    })
    for (let i = 0; i < this.getHTML.length; i++) {
      this.isSelected[i] = false
    }
  },
  methods: {
    handleHTML () {
      // Get the string from local storage using the key
      const retrievedArrayString = localStorage.getItem('HTMLdata')
      this.convertToArray = JSON.parse(retrievedArrayString)
      if (this.convertToArray.length > 0) {
        this.checkArray = true
      } else {
        this.checkArray = false
      }
      const elementData = []
      this.convertToArray.forEach(element => {
        elementData.push(this.handleHtmlObject(element))
      })
      for (const key in elementData) {
        console.log('Key:', key)
        this.getHTML = elementData
      }
      console.log(this.getHTML)
    },
    handleHtmlObject (element) {
      return '<' + element.startTag + ' class="' +
      element.attributes.className + '" id="' +
      element.attributes.id + '">' +
      element.text +
      element.endTag
    },
    concatenateHtmlObject (elements) {
      if (elements.length >= 1) {
        let result = ''
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i]
          result += element + ' '
        }
        return result
      } else {
        return 'ERROR 123 T-T'
      }
    },
    handleSelect (index) {
      for (let i = 0; i < this.isSelected.length; i++) {
        if (this.isSelected[i] !== index) {
          this.isSelected[i] = false
        }
      }
      this.isSelected[index] = !this.isSelected[index]
      console.log('index:', this.isSelected[index])
      console.log(this.convertToArray[index].attributes.className)
      const nameTag = {
        elementTag: this.convertToArray[index].startTag,
        classTag: this.convertToArray[index].attributes.className
      }
      localStorage.setItem('nameTag', JSON.stringify(nameTag))
      console.log(nameTag)
    },
    startDelayedFunction () {
      setTimeout(() => {
        // Function to be executed after 3 seconds
        this.handleHTML()
      }, 500) // 3000ms = 3 seconds
    },
    deleteItem (index) {
      this.socket.emit('rerun', this.$route.params.id, index)
    }
  }
}
</script>
<style scoped>
.light-blue-background {
  background-color: lightblue;
}

button {
    padding: 5px 3px 5px 3px;
    border-bottom: 4px solid gray;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
}

</style>
