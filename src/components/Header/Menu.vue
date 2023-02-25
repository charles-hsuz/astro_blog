<script setup lang='ts'>
import { Ref } from 'vue'
import { reactive } from 'vue'
import { computed } from '@vue/reactivity';
import { configs } from '@s/config';
import { timerMessage } from 'astro/dist/core/logger/core';

let res = computed(() => {
  let items = ''
  for (const label in configs.menu) {
    const value = configs.menu[label]
    if(typeof value == 'string'){
      const valueArray = value.split('||')
      items += `
      <div class="menu_item">
        <a href="${valueArray[0]}">
          <i class="fa-fw ${valueArray[1] ? valueArray[1].trim() : ''}"></i>
          <span>
            ${label}
          </span>
        </a>
      </div>
      `

    }
    else{
      const labelArray = label.split('||')
      let child = ''
      for(const child_label in value){
        const child_value = value[child_label]
        const valArray = child_value.split('||')
        child += `
        <li>
          <a href="${valArray[0]}">
            <i class="fa-fw ${valArray[1] ? valArray[1].trim() : ''}"></i>
            <span>${' '+child_label}</span>
          </a>
        </li>
        `
      }
      items += `
      <div class="menu_item">
        <a href="javascript:void(0);">
          <i class="fa-fw ${labelArray[1] || ''}"></i>
          <span>${' '+labelArray[0]}</span>
          <i class="fas fa-chevron-down"></i>
        </a>
        <ul class="child_menu">
          ${child}
        </ul>
      </div>
      `
    }
  }
  return items
})

</script>

<template>
  <div id="menu_container" v-if="configs.menu" v-html="res"></div>
</template>

<style scoped lang="stylus">

</style>