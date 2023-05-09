<template lang="">
  <div class="text-start" v-for="(item, index) in getHTML" :key="index">
    <button  @click="handleSelect(index)" :class="{ 'light-blue-background': isSelected[index] }">{{ item }}</button>
  </div>
</template>
<script>
export default {
  name: 'displayPrototype',
  data () {
    return {
      isSelected: [],
      getHTML: [],
      getCSS: ''
    }
  },
  mounted () {
    this.handleHTML()
    for (let i = 0; i < this.getHTML.length; i++) {
      this.isSelected[i] = false
    }
  },
  methods: {
    handleHTML () {
      // Get the string from local storage using the key
      const retrievedArrayString = localStorage.getItem('HTMLdata')
      const convertToArray = { respond: JSON.parse(retrievedArrayString) }
      console.log(convertToArray)
      const elementData = []
      convertToArray.respond.forEach(element => {
        elementData.push(this.handleHtmlObject(element))
      })
      console.log(elementData)
      for (const key in elementData) {
        console.log('Key:', key)
        this.getHTML = elementData
      }
      console.log(this.getHTML)
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
    handleSelect (index) {
      for (let i = 0; i < this.isSelected.length; i++) {
        if (this.isSelected[i] !== index) {
          this.isSelected[i] = false
        }
      }
      console.log(this.isSelected)
      this.isSelected[index] = !this.isSelected[index]
      console.log('index:', this.isSelected[index])
      console.log(this.isSelected)
    }
  }
}
</script>
<style scoped>
.light-blue-background {
  background-color: lightblue;
}

</style>
