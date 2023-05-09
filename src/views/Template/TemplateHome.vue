<template>
  <BgComponents />
  <Subbackground/>
  <header class="container">
    <navigationTop/>
  </header>
  <main class="container">
    <sectionOne/>
    <sectionTwo/>
    <sectionThree/>
  </main>
</template>

<script>
import BgComponents from '@/components/Background/BgComponents.vue'
import Subbackground from '@/components/Background/BgComponentTwo.vue'
import navigationTop from '@/components/Navigation/NavigationBar.vue'
// section
import sectionOne from '@/components/Home/MainSection.vue'
import sectionTwo from '@/components/Home/SecondSection.vue'
import sectionThree from '@/components/Home/ThirdSection.vue'
export default {
  name: 'HomeView',
  components: {
    BgComponents,
    Subbackground,
    navigationTop,
    sectionOne,
    sectionTwo,
    sectionThree
  }
}
</script>
<style scoped>
#app{
  width: 100%;
  height: 1665.550px;
}
</style>
