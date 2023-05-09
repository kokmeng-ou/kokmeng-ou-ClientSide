<template lang="">
  <div class="row text-center m-0 box-side">
    <section class="col-md-2 section-one">
      <div class="d-flex flex-column mb-3">
        <!--
        <div class="d-flex flex-row-reverse">
          <addHTML />
        </div>
        -->
        <div class="p-2">
            <input type="text"
              class="form-control" name="html" id="html" placeholder="Search HTML" v-model="searchHTML" @input="inputSearch">
        </div>
        <div class="p-2 html-display">
          <HtmlSide v-for="html in filteredHTML" :key="html" :html="html" />
        </div>
        <div class="p-2 prototype-display">
          <displayPrototype />
        </div>
      </div>
    </section>
    <section class="col-md-7 section-two">
      <Display />
    </section>
    <section class="col-md-3 section-three">
      <div class="d-flex flex-column mb-3">
        <div class="p-2">
            <input type="text"
              class="form-control" name="css" id=""  placeholder="Search CSS" v-model="searchCSS" @input="inputSearch">
        </div>
        <div class="p-2">
          <CssSide v-for="css in filteredCSS" :key="css" :CSS="css" />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import HtmlSide from '@/components/Editor/HtmlSide.vue'
// import addHTML from '@/components/Editor/AddHTML.vue'
import displayPrototype from '@/components/Editor/DisplayPrototype.vue'
import CssSide from '@/components/Editor/CssSide.vue'
import Display from '@/components/Editor/DisplayFrame.vue'
import HtmlJson from './JsonFile/HTML.json'
import CSSJson from './JsonFile/CSS.json'
export default {
  components: {
    HtmlSide,
    displayPrototype,
    CssSide,
    Display
    // addHTML
  },
  data () {
    return {
      HTML: [], // Array to hold the fetched data
      CSS: [],
      searchHTML: '',
      searchCSS: ''
    }
  },
  created () {
    this.HTML = HtmlJson
    this.CSS = CSSJson
  },
  computed: {
    filteredHTML () {
      return this.HTML.filter(HTML =>
        HTML.name.toLowerCase().includes(this.searchHTML.toLowerCase())
      )
    },
    filteredCSS () {
      return this.CSS.filter(CSS =>
        CSS.name.toLowerCase().includes(this.searchCSS.toLowerCase())
      )
    }
  },
  methods: {
    deleteSpecificItemFromLocalStorage () {
      // Replace 'itemKey' with the key of the specific item you want to delete
      localStorage.removeItem('nameTag') // Remove specific item from localStorage
    }
  }
}
</script>
<style scoped>
.box-side {
  min-height: 87vh;
}
section {
  max-height: 87vh;
}

*{
  font-size: 14px;
}

*::-webkit-scrollbar{
  display: none;
}

.section-two {
  overflow-y: scroll;
}
.section-three {
  overflow-y: scroll;
}
.html-display{
  overflow-y: scroll;
  max-height: 38vh;
}

.prototype-display{
  overflow-y: scroll;
  max-height: 46vh;
}
</style>
