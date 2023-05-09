<template lang="">
  <div>
    <button @click="downloadZipFile">Download ZIP</button>
  </div>
</template>
<script>
import { saveAs } from 'file-saver'

export default {
  methods: {
    downloadZipFile () {
      // Create a new JSZip instance
      const JSZip = require('jszip')
      const zip = new JSZip()

      // Add the HTML, CSS, and JSON data to the ZIP file
      zip.file('index.html', '<html><head></head><body><h1>Hello World!</h1></body></html>')
      zip.file('styles.css', 'body {background-color: red;}')
      zip.file('data.json', JSON.stringify({ name: 'John', age: 30 }))

      // Generate the ZIP file
      zip.generateAsync({ type: 'blob' })
        .then((content) => {
          // Save the ZIP file using FileSaver.js
          saveAs(content, 'website.zip')
        })
        .catch((error) => {
          console.error('Failed to generate ZIP file:', error)
        })
    }
  }
}
</script>

<style lang="">

</style>
