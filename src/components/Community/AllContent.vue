<template >
  <div class="list-group-item list-group-flush d-flex gap-3 mb-3 " aria-current="true">
    <img :src=" contents.userImage " alt="twbs" width="32" height="32" class="rounded-circle flex-shrink-0" v-if="contents.userImage">
    <span v-else><i class="bi bi-c-circle"></i></span>
    <div class="d-flex gap-2 w-100 justify-content-between">
        <div class="d-flex flex-column">
          <router-link class="mb-0 fw-bold fs-5" :to="`/community/${contents.id}/Individual-Content`">{{ contents.title }}</router-link>
          <router-link class="mb-0 opacity-75 fs-6" :to="`/friend/${contents.userId}`" >{{ contents.option }} . By {{ contents.username }}</router-link>
        </div>
        <small class="opacity-50 text-nowrap">3d</small>
    </div>
  </div>
  <div class="mb-3 ms-4">
    <router-link :to="`/community/${contents.id}/Individual-Content`" class="overflow-hidden text-muted fs-5" style="max-height: 7vh;">{{ contents.content }}</router-link>
  </div>
  <div class="d-flex justify-content-between gap-2 ">
    <div class="d-flex gap-2" >
      <div v-for="(tags, index) in contents.tags" :key="index">
        <button class="button" @click="handleTag(tags)">{{tags}}</button>
      </div>
      <!--
      <button class="btn btn-outline-blue" @click="handleTag(contents.tags[0])">{{contents.tags[0]}}</button>
      <button class="btn btn-outline-blue" @click="handleTag(contents.tags[1])">{{contents.tags[1]}}</button>
      <span v-for="tag in contents.tags.slice(2).length" :key="tag"><button type="button" class="btn btn-outline-blue" for >+{{ tag }}</button></span>
      -->
    </div>
    <div class="d-flex gap-2">

      <router-link :to="`/community/${contents.id}/Individual-Content`" type="button" class="btn btn-blue"><i class="bi bi-chat-dots-fill"></i></router-link>
    </div>
  </div>
  <hr>
</template>
<script>

export default {
  name: 'AllContent',
  props: {
    contents: {
      type: Object,
      required: true
    }
  },
  methods: {
    async handleTag (event) {
      this.$router.push({ query: { tag: event } })
    }
  }
}
</script>
<style scoped>
.button {
  display: inline-block;
  outline: 0;
  border: none;
  cursor: pointer;
  font-weight: 600;
  border-radius: 4px;
  font-size: 13px;
  height: 30px;
  background-color: #9147ff;
  color: white;
  padding: 0 20px;
}
.button :hover {
  background-color: #772ce8;
}
</style>
