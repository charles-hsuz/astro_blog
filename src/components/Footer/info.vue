<script setup lang='ts'>
import { configs } from '@s/config';
import { ref, reactive, computed } from 'vue'
const copyRight = configs.site.copyRight
const ICP = configs.site.ICP
</script>

<template>
  <div id="footer-info">
    <div class="copyright">{{ copyRight }}</div>
    <a href="https://beian.miit.gov.cn/#/Integrated/index" class="icp">{{ ICP }}</a>
  </div>
  
</template>
