<template>
  <div :class="{'light-mode': isLightMode, 'dark-mode': isDarkMode}">
    <router-view/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isLightMode: true,
      isDarkMode: false
    }
  },
  mounted () {
    this.updateMode()
  },
  methods: {
    updateMode () {
      // Update mode based on local storage when the component is mounted
      const mode = localStorage.getItem('mode')
      if (mode === 'dark') {
        this.isLightMode = false
        this.isDarkMode = true
      }
    }
  }
}
</script>
<style lang="scss">
@import url(@/assets/index.css);
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@500&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  padding-top: 20px ;
}

a {
    color: #2c3e50;
    text-decoration: none;
}

.logo-styling {
  font-family: 'Bebas Neue', cursive;
}

</style>
