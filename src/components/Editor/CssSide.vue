<template lang="">
  <div class="accordion accordion-flush" id="accordionCSS">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" :data-bs-target="'#'+CSS.name" aria-expanded="false" aria-controls="collapseThree">
          {{ CSS.name }}
        </button>
      </h2>
      <div class="accordion-collapse collapse" data-bs-parent="#accordionCSS" :id="CSS.name">
        <div class="accordion-body text-start d-flex justify-content-between" v-for="(property, index) in CSS.property" :key="index" >
          {{ property.name }}
          {{ property.index }}
          <div v-if="property.color">
            <label>{{ selectedColor[index] }}</label>
            <input type="color"  class="form-control form-control-color" v-model="selectedColor[index]" @input="updateColor(property.name)" >
          </div>
          <div v-else>
            <select class="form-select form-select-sm" aria-label=".form-select-sm" v-model="selectedOptions[index]" @change="updateArray(property.name)" >
                <option selected>None</option>
                <option v-for="val in property.value" :key="val" :value="val"> {{val}} </option>
            </select>
          </div>
          <!--
          <div>
            <div class="input-group mb-3">
              <input type="text" class="form-control" aria-label="Text input with dropdown button">
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Separated link</a></li>
              </ul>
            </div>
          </div>
          -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { io } from 'socket.io-client'
export default {
  name: 'CSSide',
  props: {
    CSS: {
      type: Object,
      required: true
    },
    nameTag: {
      type: String
    }
  },
  data () {
    return {
      socket: io('http://localhost:3000'),
      selectedOptions: [],
      selectedColor: [],
      storeArray: []
    }
  },
  methods: {
    updateArray (property) {
      const getNameTag = JSON.parse(localStorage.getItem('nameTag'))
      if (getNameTag) {
        let propertyText = ''
        let selectedOptionsText = ''
        for (const key in property) {
          console.log('Key:', key)
          propertyText = property
        }
        for (let index = 0; index < this.selectedOptions.length; index++) {
          selectedOptionsText = this.selectedOptions[index]
        }
        this.handleStoring(getNameTag, propertyText, selectedOptionsText)
      } else {
        alert('please select HTML before CSS')
      }
    },
    updateColor (property) {
      const getNameTag = JSON.parse(localStorage.getItem('nameTag'))
      if (getNameTag) {
        let propertyText = ''
        for (const key in property) {
          console.log('Key:', key)
          propertyText = property
        }
        // console.log(propertyText)
        // console.log(this.selectedColor[this.selectedColor.length - 1])
        this.handleStoring(JSON.parse(localStorage.getItem('nameTag')), propertyText, this.selectedColor[this.selectedColor.length - 1])
      } else {
        alert('please select HTML before CSS')
      }
    },
    handleStoring (nameTag, proText, optText) {
      const newArray = {
        elementTag: nameTag.elementTag,
        classTag: nameTag.classTag,
        propertyText: proText,
        optionText: optText
      }
      this.socket.emit('send-css', this.$route.params.id, JSON.stringify(newArray))
    }
  }
}
</script>
<style scoped>
button {
  font-size: 12px;
}
/*
input[type="color"] {
  position:relative;
  border:1px solid #000;
}

input[type="color"]::-webkit-color-swatch {
  position:absolute;
  top:0px;
  left:0px;
  right:0px;
  bottom:0px;
  box-sizing: border-box;
  border:1px solid transparent;
}
*/
</style>
