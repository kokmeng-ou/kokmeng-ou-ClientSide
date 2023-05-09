<template>
  <div>
    <button type="button" class="btn border border-0 " data-bs-toggle="modal" data-bs-target="#staticBackdropDownload">
      <img src="./Image/document.png" alt="download" width="40" height="40">
    </button>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="staticBackdropDownload" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Download</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <input type="text"
              class="form-control" name="" id="" placeholder="Enter folder name" v-model="NameOfZipFile">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="downloadZipFile">Download</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { saveAs } from 'file-saver'

export default {
  data () {
    return {
      NameOfZipFile: '',
      cssString: '',
      elements: [],
      StoreCSS: []
    }
  },
  methods: {
    downloadZipFile () {
      this.getHTMl()
      // Create a new JSZip instance
      const JSZip = require('jszip')
      const zip = new JSZip()

      // Add the HTML, CSS, and JSON data to the ZIP file
      zip.file('index.html', this.outputCode)
      // zip.file('styles.css', this.cssString)

      // Generate the ZIP file
      zip.generateAsync({ type: 'blob' })
        .then((content) => {
          // Save the ZIP file using FileSaver.js
          saveAs(content, `${this.NameOfZipFile}.zip`)
        })
        .catch((error) => {
          console.error('Failed to generate ZIP file:', error)
        })
    },
    getHTMl () {
      this.outputCode = localStorage.getItem('downloadHTML')
    }
  }
}
</script>
<style scoped>
</style>
