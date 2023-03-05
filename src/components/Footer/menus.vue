<script setup lang='ts'>
  import { Ref } from 'vue'
  import { reactive } from 'vue'
  import { computed } from '@vue/reactivity';
  import { configs } from '@s/config';
  const menus = configs.footer.menu
</script>

<template>
  <div class="footer-menu" v-for="contents,menu in menus">
    <h3 class="menu-title">{{ menu }}</h3>
    <div class="menu-contents">
      <a v-for="content in contents" :href="content.split('||')[1]">{{ content.split('||')[0] }}</a>
    </div>
  </div>
</template>

<style scoped>
  
</style>