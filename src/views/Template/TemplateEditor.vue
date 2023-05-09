<template lang="">
  <header class="p-4">
    <editorNav />
  </header>
  <main class="">
    <router-view></router-view>
  </main>
</template>
<script>
import editorNav from '@/components/Navigation/EditorNav.vue'
export default {
  name: 'TemplateEditor',
  components: {
    editorNav
  }
}

</script>
<style scoped>
section {
  overflow: hidden;
  max-height: 87vh;
}

main {
  font-size: 12px;
}

</style>
