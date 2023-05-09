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
    this.socket.emit('join-Room', 'testing')
    this.socket.on('html-message', (html) => {
      this.htmlCode = html
    })
    this.socket.on('css-message', (css) => {
      this.storeArrayCSS(css)
    })
  },
  watch: {
    htmlCode: {
      handler (newValue, oldValue) {
        this.storeArrayHTML(newValue)
      },
      deep: true
    }
  },
  methods: {
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
        return 'ERROR 123 T-T'
      }
    },
    // CSS
    storeArrayCSS (newValue) {
      const getItem = JSON.parse(localStorage.getItem('nameTag'))
      const duplicateProperty = newValue.propertyText
      const duplicateOption = newValue.optionText
      if (this.StoreCSS.length === 0) {
        const setItem = {
          elementTag: getItem.elementTag,
          classTag: getItem.classTag,
          property: newValue
        }
        this.StoreCSS.push(setItem)
        console.log(setItem)
      } else if (this.StoreCSS.length > 0) {
        for (let i = 0; i < this.StoreCSS.length; i++) {
          console.log(this.StoreCSS[i].elementTag === getItem.elementTag)
          console.log(this.StoreCSS[i].elementTag !== getItem.elementTag)
          if (this.StoreCSS[i].elementTag === getItem.elementTag) {
            for (let j = 0; j < this.StoreCSS[i].property.length; j++) {
              if (this.StoreCSS[i].classTag === getItem.classTag) {
                if (this.StoreCSS[i].property[j].propertyText === duplicateProperty) {
                  this.StoreCSS[i].property[j].optionText = duplicateOption
                  break
                } else if (this.StoreCSS[i].property[j].propertyText !== duplicateProperty) {
                  const prepare = {
                    propertyText: duplicateProperty,
                    optionText: duplicateOption
                  }
                  this.StoreCSS[i].property.push(prepare)
                  break
                }
                break
              } else if (this.StoreCSS[i].classTag !== getItem.classTag) {
                if (this.StoreCSS[i].property[j].propertyText === duplicateProperty) {
                  this.StoreCSS[i].property[j].optionText = duplicateOption
                  break
                } else if (this.StoreCSS[i].property[j].propertyText !== duplicateProperty) {
                  const prepare = {
                    propertyText: duplicateProperty,
                    optionText: duplicateOption
                  }
                  this.StoreCSS[i].property.push(prepare)
                  break
                }
              }
            }
            break
          }
          if ((this.StoreCSS[i].elementTag !== getItem.elementTag) === true) {
            const setItem = {
              elementTag: getItem.elementTag,
              classTag: getItem.classTag,
              property: newValue
            }
            this.StoreCSS.push(setItem)
            break
          }
        }
        console.log('first step')
      }
      console.log(this.StoreCSS)
      newValue.length = 0
      getItem.length = 0
    },
    handleCSSObject () {
      let element = ''
      for (let index = 0; index < this.StoreCSS.length; index++) {
        const store = this.StoreCSS[index]
        const nameTag = store.nameTag
        const properties = store.property

        for (let j = 0; j < properties.length; j++) {
          const property = properties[j]
          const propertyText = property.propertyText
          const optionText = property.optionText
          const elementTag = nameTag.elementTag
          const classTag = nameTag.classTag

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
      }
      console.log(this.elements)
      this.cssString = this.elements.join(' ')
      console.log(this.cssString)
      this.elements.length = 0
    },
    handleCSScomponent (property, value) {
      return ' {' + property + ': ' + value + ';}'
    },
    concatenateCSSObject (elements) {
      return elements.join(' ')
    },
    handleOutput () {
      console.log(this.cssString)
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
