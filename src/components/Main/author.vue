<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
import { configs } from '@s/config'
const greet: string = configs.site.greet
const description: string = configs.site.description
const links: object = configs.site.socialLinks
const followMe = configs.site.followMe
const icons = computed(() => {
  let res:string[][] = [];
  for (const label in links) {
    res.push(label.split('||').concat(links[label]))
  }
  return res
})
</script>

<template>
  <div class="card author">
    <div class="sculpture">
      <img src="https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202302030257633.png" alt="头像">
    </div>
    <div class="greet">
      {{ greet }}
    </div>
    <div class="info">
      {{ description }}
    </div>
    <div class="links">
      <a v-for="icon in icons" :href="icon[2]" :title="icon[0]" class="icon link">
        <i :class="icon[1]"></i>
      </a>
      <a class="button link" :href="followMe">Follow me</a>
    </div>
  </div>
</template>
<style scoped></style>