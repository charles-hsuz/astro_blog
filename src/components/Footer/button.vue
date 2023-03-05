<script setup lang='ts'>
  import { Ref } from 'vue'
  import { reactive } from 'vue'
  import { computed } from '@vue/reactivity';
  import { configs } from '@s/config';
import { text } from 'stream/consumers';
  const buttons = configs.footer.buttons;
  let res='';
  let num = 0;
  for(const button in buttons){
    const href = buttons[button];
    const [text,icon,color] = button.split("||")
    res+=`
    <li class="icon bg-${color}">
      <span class="bubble bg-${color}">${text}</span>
      <a target="_blank" rel="noopener" href="${href}">
        <i class="${icon}"></i>
      </a>
    </li>
    `
  }
  const Claa = ".icon";
</script>

<template>
  <ul class="buttons" v-html="res">
  </ul>
</template>

<style scoped>
  
</style>