<template >
    <iframe class="container border-height-side pt-2" ref="outputFrame"></iframe>
</template>
<script>
import { io } from 'socket.io-client'
export default {
  props: {
    html: {
      type: String
    }
  },
  data () {
    return {
      htmlCode: [],
      htmlString: [],
      StoreHTML: [],
      cssCode: [],
      cssString: [],
      StoreCSS: [],
      elements: [],
      check: false,
      outputCode: ''
    }
  },
  mounted () {
    this.socket = io('http://localhost:3000')
    this.socket.emit('join-Room', this.$route.params.id)
    this.socket.on('html-message', (html) => {
      this.htmlCode = html
    })
    this.socket.on('css-message', (css) => {
      this.cssCode = JSON.parse(css)
      this.storeArrayCSS(this.cssCode)
      localStorage.setItem('downloadHTML', this.outputCode)
      this.cssCode.length = 0
    })
    this.socket.on('rerun-message', (run) => {
      if (this.StoreHTML.length > 0) {
        this.deleteItem(run)
        localStorage.setItem('downloadHTML', this.outputCode)
      } else {
        console.log('break')
      }
    })
  },
  watch: {
    htmlCode: {
      handler (newValue, oldValue) {
        this.storeArrayHTML(newValue)
        localStorage.setItem('downloadHTML', this.outputCode)
      },
      deep: true
    }
  },
  methods: {
    deleteItem (index) {
      this.StoreHTML.splice(index, 1)
      localStorage.setItem('HTMLdata', JSON.stringify(this.StoreHTML))
      this.handleHTML()
    },
    storeArrayHTML (newValue) {
      this.StoreHTML.push(newValue)
      localStorage.setItem('HTMLdata', JSON.stringify(this.StoreHTML))
      this.handleHTML()
    },
    // HTML
    handleHTML () {
      const retrievedArrayString = localStorage.getItem('HTMLdata')
      const convertToArray = JSON.parse(retrievedArrayString)
      const elementData = []
      convertToArray.forEach(element => {
        elementData.push(this.handleHtmlObject(element))
      })
      this.htmlString = this.concatenateHtmlObject(elementData)
      this.handleOutput()
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
        return ''
      }
    },
    // CSS
    storeArrayCSS (newValue) {
      if (this.StoreCSS.length > 0) {
        for (let i = 0; i < this.StoreCSS.length; i++) {
          if (this.StoreCSS[i].elementTag === newValue.elementTag) {
            if (this.StoreCSS[i].classTag === newValue.classTag) {
              if (this.StoreCSS[i].propertyText === newValue.propertyText) {
                this.StoreCSS[i].optionText = newValue.optionText
              } else {
                this.StoreCSS.push(newValue)
              }
            } else {
              this.StoreCSS.push(newValue)
            }
          } else {
            this.StoreCSS.push(newValue)
          }
        }
        // console.log(localStorage.getItem('nameTag'))
        this.StoreCSS.push(newValue)
        this.findAndRemoveDuplicates()
        this.handleCSSObject()
        this.handleOutput()
        localStorage.setItem('cssData', JSON.stringify(this.StoreCSS))
        // console.log('testing three: ', this.StoreCSS)
      } else {
        // console.log(localStorage.getItem('nameTag'))
        this.StoreCSS.push(newValue)
        this.findAndRemoveDuplicates()
        this.handleCSSObject()
        this.handleOutput()
        localStorage.setItem('cssData', JSON.stringify(this.StoreCSS))
        // console.log('testing three: ', this.StoreCSS)
      }
    },
    findAndRemoveDuplicates () {
      const duplicates = []
      const seenProperties = new Set()
      let i = 0

      while (i < this.StoreCSS.length) {
        const item = this.StoreCSS[i]
        const itemKey = `${item.elementTag}_${item.classTag}_${item.propertyText}` // Create a unique key for each item

        if (seenProperties.has(itemKey)) {
          duplicates.push(item)
          this.StoreCSS.splice(i, 1) // Remove the duplicate item from the items array
        } else {
          seenProperties.add(itemKey)
          i++
        }
      }

      // console.log(seenProperties)
      // console.log(duplicates)
      // console.log(this.StoreCSS)
      return duplicates
    },
    handleCSSObject () {
      let element = ''
      for (let index = 0; index < this.StoreCSS.length; index++) {
        const store = this.StoreCSS[index]
        const elementTag = store.elementTag
        const classTag = store.classTag
        const propertyText = store.propertyText
        const optionText = store.optionText
        element = elementTag
        if (classTag !== '') {
          element += '.' + classTag
          element += this.handleCSScomponent(propertyText, optionText)
          this.elements.push(element)
        } else {
          element += this.handleCSScomponent(propertyText, optionText)
          this.elements.push(element)
        }
      }
      // console.log(this.elements)
      this.cssString = this.elements.join(' ')
      // console.log(this.cssString)
      this.elements.length = 0
    },
    handleCSScomponent (property, value) {
      return ' {' + property + ': ' + value + ';}'
    },
    concatenateCSSObject (elements) {
      return elements.join(' ')
    },
    handleOutput () {
      // console.log(this.cssString)
      this.outputCode = '<!DOCTYPE html>' +
        '<html lang="en"><head>' + '<meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title>' +
        '<style>' + this.cssString + '</style>' +
        '</head><body>' + this.htmlString + '</body></html>'
      this.$refs.outputFrame.contentDocument.open()
      this.$refs.outputFrame.contentDocument.write(this.outputCode)
      this.$refs.outputFrame.contentDocument.close()
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
