<template>
  <div>
    <textarea v-model="htmlCode" @input="updateOutput"></textarea>
    <textarea v-model="cssCode" @input="updateOutput"></textarea>
    <div class="output" v-html="outputCode"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      htmlCode: '',
      cssCode: '',
      outputCode: ''
    }
  },
  methods: {
    updateOutput () {
      this.outputCode = `<style>${this.cssCode}</style>${this.htmlCode}`
    }
  }
}
</script>

<style scoped>
textarea {
  width: 100%;
  height: 200px;
}
.output {
  margin-top: 10px;
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
