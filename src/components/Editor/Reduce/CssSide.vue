<template lang="">
  <div class="accordion accordion-flush" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" :data-bs-target="'#'+CSS.name" aria-expanded="false" aria-controls="collapseThree">
          {{ CSS.name }}
        </button>
      </h2>
      <div :id="CSS.name" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
        <div class="accordion-body" v-for="(property, index) in CSS.property" :key="index">

          <label class="form-check text-start" >

            <input class="form-check-input" type="checkbox" @change="updateArray(property.name)">
            {{ property.name }}

            <div v-if="property.color" >
              <input :id="property.name" type="color" v-model="selectedColor[index]" :name="property.name">
            </div>
            <div v-else>
              <select class="form-select form-select-sm" aria-label=".form-select-sm" v-model="selectedOptions[index]">
                <option v-for="(val, index) in property.value" :key="index" :value="val" > {{val}} </option>
              </select>
            </div>

          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CSSide',
  props: {
    CSS: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      myArray: [], // Declare an empty array
      selectedOptions: [],
      selectedColor: []
    }
  },
  watch: {
    selectedOptions: {
      handler (newVal) {
        console.log(newVal)
        console.log('Selected options changed:', newVal[newVal.length - 1])
        this.handleOption(newVal)
      },
      deep: true
    }
  },

  methods: {
    updateArray (property) {
      const existingIndex = this.myArray.findIndex(item => item.name === property)
      console.log(existingIndex)
      if (existingIndex !== -1) {
        this.myArray.splice(existingIndex, 1)
        console.log(this.myArray)
      } else {
        const formCSS = {
          property: property,
          value: ''
        }
        this.myArray.push(formCSS)
        console.log(this.myArray)
        localStorage.setItem('CSSdata', this.myArray)
      }
    },
    handleOption (newVal) {
      for (let i = 0; i < newVal.length; i++) {
        console.log(newVal[i])
      }
    }
  }
}
</script>
<style scoped>
button {
  font-size: 12px;
}

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
</style>
