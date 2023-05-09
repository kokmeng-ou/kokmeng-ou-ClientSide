<template lang="">
  <iframe class="container border-height-side pt-2" :srcdoc="outputCode">
  </iframe>
</template>
<script>
import { io } from 'socket.io-client'
export default {
  props: {
    html: {
      type: Object,
      required: true
    },
    css: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      getHTML: [],
      getCSS: [],
      socket: io('http://localhost:3000'),
      htmlCode: '',
      cssCode: localStorage.getItem('CSSdata') || '',
      outputCode: ''
    }
  },
  mounted () {
    console.log(this.getHTML = this.html)
    console.log(this.getCSS = this.css)
    this.outputCode = `<style>h1{ color: red; }</style>${this.handleHTML()}`
  },
  methods: {
    // HTML
    handleHTML () {
      // Get the string from local storage using the key
      const retrievedArrayString = localStorage.getItem('HTMLdata')
      const convertToArray = { respond: JSON.parse(retrievedArrayString) }
      const elementData = []
      convertToArray.respond.forEach(element => {
        elementData.push(this.handleHtmlObject(element))
      })
      this.htmlCode = this.concatenateHtmlObject(elementData)
      // this.htmlCode = addObject
      return this.htmlCode
    },
    handleHtmlObject (element) {
      return element.startTag + ' class:"' +
      element.attributes.className + '" id:"' +
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
    // CSS
    handleCSS () {

    }
  }
}
</script>
<style scoped>
.border-height-side {
  border: 1px #767676 solid;
  width: 100%;
  height: 100vh;
}
</style>
