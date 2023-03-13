---
title: 卡片式音乐播放器 | aplayer魔改
tags: 魔改
categories: 博客美化 
slug: 637681ac
date: 2023-02-09 15:06:29
updated: 2023-2-18 01:14:24
cover: 'https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202302091648974.png'
---

# 卡片式音乐播放器 | aplayer魔改

:::note{.warning.simple}
本魔改为我个人主题(未完成)中的一部分，未来可能持续更新

目前不具备较好的客制化选项
:::

:::note{.info.simple}
butterfly 版本 4.6.1

不保证低版本可用，魔改前请备份
:::

::bili[testbilibili]{#BV11j411G7fF}

## 展示
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202302091515168.gif)

✅ 可翻转
✅ 可移动
✅ 上/下一首、随机/顺序播放、浏览歌单按钮
✅ 进度条可调整
✅ 支持设置快捷键

## 教程

### 删除原有aplayer

> 若你没有开启aplayer，此步骤可跳过

如果你是按照Butterfly官方文档 [Butterfly添加全局吸底Aplayer教程](https://butterfly.js.org/posts/507c070f/) 添加的aplayer
找到主题配置文件
`themes\butterfly\_config.yml`:
``` diff
inject:
    bottom:
-       - <div class="aplayer no-destroy" data-id="60198" data-server="netease" data-type="playlist" data-fixed="true" data-autoplay="true"> </div>
```

## 开启主题aplayer
修改 `themes\butterfly\_config.yml` 中 `aplayer` 和 `aplayerIject` 选项:

``` yaml
aplayer:
  meting: true
  asset_inject: false

aplayerInject:
  enable: true
  per_page: true
```

## 引入依赖

修改 `themes\butterfly\_config.yml` 中 `aplayer` 和 `aplayerIject`：
```diff
-   # aplayer_js:
+   aplayer_js: 'https://cdn.jsdelivr.net/npm/hsu_package/card-music/aplayer_cus.min.js'
-   # meting_js:
+   meting_js: 'https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js'
```
因为`aplayer_js`是魔改后的版本，所以我无法保证`aplayer_js`的链接长期有效，建议下载到本地

## 结构

新建 `themes\butterfly\layout\includes\custom\music.pug`:
```pug
#card-music.hide
    #card-wrapper
    #card-front
        meting-js#7841201322(server="netease" type="playlist" mutex="true" preload="none" theme="var(--hsu-theme-color)" data-lrctype="0" order="random" list-folded = "true")
    #card-back
        #button-music
            i.fa-solid.fa-music
#music-close-button.hide
    i.fa-solid.fa-music
```

并在 `themes/butterfly/layout/includes/layout.pug` 中引入：
```diff
    !=partial('includes/third-party/search/index', {}, {cache: true})
+   include ./custom/music.pug
    include ./additional-js.pug
```

## 样式

新建 `themes\butterfly\source\css\_custom\music.styl`:

``` stylus
@media screen and (max-width:1200px)
  #card-front,
  #music-close-button,
  #button-music
    display none

.no-select
  -moz-user-select: none; 
  -khtml-user-select: none; 
  user-select: none;

#card-front
  backface-visibility: hidden;
  box-shadow:  11px 11px 22px #8b8b8b
  position: fixed
  bottom: 0
  left: 0
  width: 240px
  height: 320px
  glassMor(#fcfeff, .5, 5px)
  border-radius: 20px
  padding: 15px
  .aplayer-list
    max-height: 250px;
    z-index: 2;
    top: -292px;
    left: 240px;
    position: relative;
    background: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow:  11px 11px 22px #8b8b8b
  .aplayer-list-hide
    padding: 0 10px
  .aplayer.aplayer-withlrc.aplayer-withlist.aplayer-arrow
    box-shadow: none
  .aplayer
    background: transparent
    overflow visible
    .aplayer-play
      height: 50px
      width: 50px
      left: 65px;
      top: 65px;
      transition: .8s
      svg
        width: 50px
        height: 50px
        top: 0
        animation appear .5s linear

    .aplayer-pause
      height: 20px
      width: 20px
      top: 150px
      left: 150px
      transition: .8s
      svg
        top: 4px
        left 4px
        animation appear .5s linear

    .aplayer-info
      position: relative;
      top: 37px;
      left: -15px;
      width: 230px;
      height: 120px
      background: transparent;
      border: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
    .aplayer-controller
      position: relative;
      display: block;
      top: -8px
      .aplayer-thumb
        top: 2px
      .aplayer-bar
        height: 6px
        .aplayer-loaded,
        .aplayer-played
          height: 6px
      .aplayer-bar-wrap
        position: relative;
        margin: 0
      .aplayer-time
        position: relative;
        bottom: 300px;
        left: 150px
        height: 0px;
        .aplayer-time-inner
          top: 300px;
          left: -150px;
          position: relative;

  .aplayer-pic 
    width: 180px
    height: 180px
    position: relative
    top: 15px
    left: -60px
    box-shadow:  17px 17px 29px #9f9f9f
    border-radius: 15px

  .aplayer-music
    position: relative;
    top: -20px;
    left: -5px;
    height: fit-content;
    margin: 0
    .aplayer-title
      font-size: 20px
      font-weight: bold
      margin: 0 0 5px 0;
    .aplayer-author
      margin-left: 20px
    span 
      display: block 

  .aplayer-lrc
    display: none
    &:before,
    &:after
      display: none 

@keyframes appear
  0%
    opacity 0
  50%
    opacity 0
  100%
    opacity 1

#card-front
  .aplayer-volume-wrap
    display: none
  .aplayer-icon-menu,
  .aplayer-icon-order,
  .aplayer-icon-back,
  .aplayer-icon-forward
    display: block
    background: transparent;
    position: relative;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    svg
      height: 50px
      width: 50px
    &:hover
      border-radius: 50px;
      background: #e0e0e0;
      box-shadow:  -5px -5px 11px #ffffff, 5px 5px 11px #7d7d7d;
    &:active
      border-radius: 50px;
      background: #e0e0e0;
      box-shadow: inset -5px -5px 10px #ffffff, inset 5px 5px 10px #7d7d7d;
  .aplayer-icon-order
    svg
      width: 40px;
      height: 40px;
      margin: 5px 6px;
  .aplayer-icon-forward
    transform: rotate(0deg)
    svg
      transform: rotate(180deg)
  

#card-music
  z-index 99
  width: 240px;
  height: 320px;
  position: fixed;
  bottom: 25px;
  left: 80px;
  transform-style: preserve-3d;
  transition: transform 1.5s ease-in .5s
  #card-wrapper
    z-index 10
    background: transparent
    position relative
    top: 0
    left 0
    width: 125px
    height: 35px
    cursor move

#card-music.hide
  transform: perspective(1000px) rotateY(180deg);
  #card-front
    border: solid 1px #000
    transition: .5s
  


#card-back
  top: -35px;
  position: relative;
  width: 100%
  height: 100%
  border: solid 1px transparent
  background: transparent
  backface-visibility: hidden;
  transform: perspective(1000px) rotateY(-180deg);
  transition: .5s
  border-radius: 10px
  #button-music
    transition: 1.2s
    left: -30px
    top: 250px

#music-close-button,
#button-music
  display: flex;
  background: linear-gradient(145deg, #ffffff, #d6d6d6);
  box-shadow:  5px 5px 9px #a9a9a9,
              -5px -5px 9px #ffffff;
  justify-content: center;
  align-items: center;
  border-radius: 50%
  cursor: pointer
  width: 50px
  height: 50px
  position relative
  font-size: 23px
  &:hover
    background: linear-gradient(145deg, #d6d6d6, #ffffff);
    box-shadow:  5px 5px 9px #a9a9a9,
                -5px -5px 9px #ffffff;
  &:active
    background: #eeeeee;
    box-shadow: inset 5px 5px 9px #a9a9a9,
                inset -5px -5px 9px #ffffff;

#card-music:not(.hide)
  #card-back
    background: #fcfeff
    border: solid 1px black
    box-shadow:  11px 11px 22px #8b8b8b
  #button-music
    left: 95px;
    top: 135px;

#music-close-button
  position: fixed;
  left: -13px;
  bottom: -7px;
  transition: all .5s ease-out 1.5s
  i
    transform: rotate(45deg);

#music-close-button.hide
  left: -43px;
  bottom: -53px;


[data-theme='dark'] #card-front
  background: transparent
  border-width: 1px 3px 3px 1px 
  box-shadow: none
  .aplayer-pic,
  .aplayer-list
    box-shadow: none
  .aplayer-list
    background: #444
  .aplayer-list-light
    background: #777
  .aplayer-list-index,
  .aplayer-list-title,
  .aplayer-list-author,
  .aplayer-title,
  .aplayer-author
    color: #eee
  .aplayer-icon path
    fill: #eee
  .aplayer-icon-menu,
  .aplayer-icon-lrc,
  .aplayer-icon-back,
  .aplayer-icon-forward
    &:hover
      background: white;
      box-shadow: 0 0 5px 5px white
      path
        fill: #444

[data-theme='dark'] 
  #music-close-button,
  #button-music
    background: #eee;
    box-shadow:  none
    i
      color black
    &:hover
      background: linear-gradient(145deg, #d6d6d6, #ffffff);
    &:active
      background: #eeeeee;

  #card-music:not(.hide)
    #card-back
      background: #121212
      border: solid 1px #eee
      box-shadow:  none
```
并在 `themes\butterfly\source\css\index.styl` 中引入：

```diff
  @import '_tags/*'
  @import '_mode/*'
+ @import '_custom/music';
```

在 `themes\butterfly\source\css\var.styl` 添加：
``` stylus
glassMor(color = white, alp = .3, _blur = 5px)
  backdrop-filter: blur(_blur);
  background: linear-gradient(to bottom right, alpha(color, .3 + alp), alpha(color, alp))
  border-width: 0 1px 1px 0
  border-color: rgba(255, 255, 255, .6)
  border-style: solid
```
也可以写在 `music.styl` 里

其他变量：
``` css
:root {
    --hsu-theme-color: #49b1f5;
    --hsu-theme-color-dark: #1f1f1f;
    --hsu-input-bg: #f1f1f1;
    --hsu-input-color: dark(var(--hsu-input-bg));
    --hsu-font-light: #bbb;
    --hsu-font-dark: #444;
    --hsu-input-bg-dark: #111111;
    --hsu-mark-bg: #f1f1f1;
    --hsu-mark-color: orange;
}
[data-theme='dark'] {
    --hsu-theme-color: #90c0e0;
}
```

## 行为

新建 `themes\butterfly\source\js\custom\music.js`：
``` javascript
const card = document.querySelector('#card-music'), 
    wrapper = card.querySelector('#card-wrapper'), 
    button = document.querySelector('#card-music #button-music'),
    closeButton = document.querySelector("#music-close-button")
    
var cardApi = null, moveable = false, isOpen = false

function openMusic(){
    document.querySelector('#card-music').classList.remove('hide')
    closeButton.classList.remove('hide')
    cardApi = document.querySelector("#card-music meting-js").aplayer
    isOpen = true
}

function closeMusic(){
    document.querySelector('#card-music').classList.add('hide')
    closeButton.classList.add('hide')
    document.querySelector("#card-front meting-js").aplayer.list.hide()
    cardApi = null
    isOpen = false
}

function skipMusic(x){
    if(cardApi != null){
        if(x > 0) for(let i = 0; i < x; i++) cardApi.skipForward()
        else for(let i = 0; i > x; i--) cardApi.skipBack()
    }
    else {
        cardApi = document.querySelector("#card-music meting-js").aplayer
        skipMusic(x)
        cardApi = null
    }
}

function listToggle(){
    if(cardApi != null) cardApi.list.toggle()
    else {
        openMusic()
        listToggle()
    }
}

function isplaying(){
    return cardApi != null && !(cardApi.audio.paused)
}

function moveCard(e) {
    let x = e.offsetX, y = e.offsetY
    moveable = true
    document.addEventListener('mousemove', (e) => {
        button.style.left = '95px'
        button.style.top = '135px'
        let rest_h = window.innerHeight - card.offsetHeight, rest_w = window.innerWidth - card.offsetWidth
        let _left = e.clientX - x, _top = e.clientY - y
        if(moveable) {
            card.style.top = Math.min(Math.max(0, _top), rest_h) + 'px', card.style.left = Math.min(Math.max(0, _left), rest_w) + 'px'
        }
    })
} 

button.addEventListener("click", openMusic)
closeButton.addEventListener('click', closeMusic)

wrapper.addEventListener('mousedown', (e) => {moveCard(e)})
wrapper.addEventListener('mouseup', () => {moveable = false})

hsu.KCadd('Shift', 'm', () => {
    isOpen ? closeMusic() : openMusic()
})

window.addEventListener('pjax:complete', closeMusic)
```

记得引入，不会请见 [Hexo博客添加自定义css和js文件](https://blog.leonus.cn/2022/custom.html)

提供了一些简单api:
```
<!-- 顾名思义 -->
function openMusic()
function closeMusic()
<!-- 跳过 x 首歌，x 为负数则为回跳 x 首歌 -->
function skipMusic(x)
<!-- 开关list -->
function listToggle()
<!-- 返回是否正在播放 -->
function isplaying()
```
右键点击可见鱼佬的[butterfly魔改aplayer音乐](https://anzhiy.cn/posts/6c69.html#8621afc45ee442faa035f7a3316177d2)
更多aplayer自带api可见 [API](https://aplayer.js.org/#/zh-Hans/?id=api)
meting自带api可见[API](https://github.com/metowolf/Meting/wiki)

其中的`hsu.KCadd()`可见[扩展式搜索框 | algolia魔改](https://www.crowhsu.top/posts/67ad6f26.html)

### 更新日志

{% timeline 更新日志,pink %}
<!-- timeline 23.02.18 -->
修复了`@南方嘉木`同学提出的移动后进度条错位的bug
<!-- endtimeline -->
{% endtimeline %}