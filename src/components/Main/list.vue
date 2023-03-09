<script setup lang='ts'>
import { ref, reactive, computed } from 'vue'
import { configs } from "@s/config"
import { z, getCollection } from "astro:content";
import { TimeFormat } from "@uti/ParseTime";
import { SortCollectArticles } from "@s/utils/SortArticles";
const baseUrl = '/blog/'

const posts = SortCollectArticles<"posts">(
  await getCollection("posts", ({ data }) => data.draft !== true)
);

const res = posts.map(post => (`
    <article class="post-card">
          <a href=${baseUrl + post.slug}>
            <div class="top-img">
              <img src=${post.data.cover || configs.posts.cover} alt="">
            </div>
            <div class="post-info">
              <h2 class="post-title">${post.data.title}</h2>
            </div>
          </a>
          <span class="post-label">
            <a class="label-link" href="javascript:void(0);">
              <i class="far fa-calendar-alt">${' 发表于' + TimeFormat(post.data.updated || post.data.date)}</i>
            </a>
          </span>
        </article>
        `)).join('')
</script>

<template>
  <div id="post-list" v-html="res">
  </div>
</template>

<style scoped></style>

---


