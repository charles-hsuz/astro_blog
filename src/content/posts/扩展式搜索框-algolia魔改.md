---
title: 扩展式搜索框 | algolia魔改
categories: 博客美化
slug: 67ad6f26
date: 2023-02-04 15:55:33
tags: 魔改
cover: 'https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202302091651867.png'
---

# 扩展式搜索框 | algolia魔改

我实在是无法接受`butterfly`自带的搜索框样式，看了`Heo`大佬的搜索栏格式也不是我想要的：

✅ 弹出动画
✅ 不影响主页面操作（可选）
✅ 搜索时滚动页面锁定导航栏（可选）
✅ 自适应布局
✅ 快捷键（可选）
✅ glassmorphism（可选）

（这里指的是**我喜欢的搜索栏样式**，不是指**好的/正确的搜索栏样式**）

## 展示

**浅色模式**
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202302040050189.gif)

**深色模式**
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202302040105030.gif)

**移动设备**
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202302040107812.gif)

## 教程

{% note warning simple %}
本魔改为我个人主题(未完成)中的一部分，未来可能持续更新，且有可能与其他魔改产生冲突
{% endnote %}

{% note info simple %}
butterfly 版本 4.6.1
hexo-algoliasearch 版本 0.3.2
{% endnote %}

对所有模块我都会提供`diff`和`source`两份代码，因为魔改量比较大（代码写的丑），推荐使用`source`版本直接替换

### 修改 algolia.js
`butterfly\source\js\search\algolia.js`:

{% tabs code %}
<!-- tab source -->
```javascript
window.addEventListener('load', () => {
  const openSearch = () => {
    document.querySelector('#algolia-search .search-dialog').classList.add('active')
    document.querySelector('#algolia-search .ais-SearchBox-input').placeholder = GLOBAL_CONFIG.algolia.languages.input_placeholder
    const bodyStyle = document.body.style
    bodyStyle.width = '100%'
    // bodyStyle.overflow = 'hidden'
    document.querySelector('header#page-header').classList.add('fixed')
    btf.animateIn(document.getElementById('search-mask'), 'to_show 0.5s')
    setTimeout(() => { document.querySelector('#algolia-search .ais-SearchBox-input').focus() }, 100)

    // shortcut: ESC
    document.addEventListener('keydown', function f(event) {
      if (event.code === 'Escape') {
        closeSearch()
        document.removeEventListener('keydown', f)
      }
    })
  }
  hsu.KCadd('Shift','k',openSearch)
  const closeSearch = () => {
    document.querySelector('header#page-header').classList.remove('fixed')
    document.querySelector('#algolia-search .search-dialog').classList.remove('active')
    document.querySelector('.ais-SearchBox input').value = ''
    document.querySelector('#algolia-search .ais-SearchBox-input').placeholder = 'shift K'
    btf.animateOut(document.getElementById('search-mask'), 'to_hide 0.5s')
    const bodyStyle = document.body.style
    bodyStyle.width = ''
    bodyStyle.overflow = ''
  }

  const searchClickFn = () => {
    document.querySelector('#algolia-search .search-dialog').onclick = function(){
      openSearch()
    } 
  }

  const searchClickFnOnce = () => {
    document.getElementById('search-mask').addEventListener('click', closeSearch)
    // document.querySelector('#algolia-search .search-close-button').addEventListener('click', closeSearch)
  }

  const cutContent = content => {
    if (content === '') return ''
    const firstOccur = content.indexOf('<mark>')
    let start = firstOccur - 30
    let end = firstOccur + 120
    let pre = ''
    let post = ''

    if (start <= 0) {
      start = 0
      end = 140
    } else {
      pre = '...'
    }

    if (end > content.length) {
      end = content.length
    } else {
      post = '...'
    }

    const matchContent = pre + content.substring(start, end) + post
    return matchContent
  }

  const algolia = GLOBAL_CONFIG.algolia
  const isAlgoliaValid = algolia.appId && algolia.apiKey && algolia.indexName
  if (!isAlgoliaValid) {
    return console.error('Algolia setting is invalid!')
  }

  const search = instantsearch({
    indexName: algolia.indexName,
    /* global algoliasearch */
    searchClient: algoliasearch(algolia.appId, algolia.apiKey),
    searchFunction(helper) {
      helper.state.query && helper.search()
    }
  })

  const configure = instantsearch.widgets.configure({
    hitsPerPage: 5
  })

  const searchBox = instantsearch.widgets.searchBox({
    container: '#algolia-search-input',
    showReset: false,
    showSubmit: false,
    placeholder: 'shift K',
    showLoadingIndicator: true,
    cssClasses: {

    }
  })

  const hits = instantsearch.widgets.hits({
    container: '#algolia-hits',
    templates: {
      item(data) {
        const link = data.permalink ? data.permalink : (GLOBAL_CONFIG.root + data.path)
        const result = data._highlightResult
        const content = result.contentStripTruncate
          ? cutContent(result.contentStripTruncate.value)
          : result.contentStrip
            ? cutContent(result.contentStrip.value)
            : result.content
              ? cutContent(result.content.value)
              : ''
        return `
          <a href="${link}" class="algolia-hit-item-link">
          ${result.title.value || 'no-title'}
          </a>
          <p class="algolia-hit-item-content">${content}</p>`
      },
      empty: function (data) {
        return (
          '<div id="algolia-hits-empty">' +
          GLOBAL_CONFIG.algolia.languages.hits_empty.replace(/\$\{query}/, data.query) +
          '</div>'
        )
      }
    }
  })

  const stats = instantsearch.widgets.stats({
    container: '#algolia-info > .algolia-stats',
    templates: {
      text: function (data) {
        const stats = GLOBAL_CONFIG.algolia.languages.hits_stats
          .replace(/\$\{hits}/, data.nbHits)
          .replace(/\$\{time}/, data.processingTimeMS)
        return (
          `<hr>${stats}`
        )
      }
    }
  })

  const powerBy = instantsearch.widgets.poweredBy({
    container: '#algolia-info > .algolia-poweredBy'
  })

  const pagination = instantsearch.widgets.pagination({
    container: '#algolia-pagination',
    totalPages: 5,
    templates: {
      first: '<i class="fas fa-angle-double-left"></i>',
      last: '<i class="fas fa-angle-double-right"></i>',
      previous: '<i class="fas fa-angle-left"></i>',
      next: '<i class="fas fa-angle-right"></i>'
    }
  })

  search.addWidgets([configure, searchBox, hits, stats, powerBy, pagination]) // add the widgets to the instantsearch instance

  search.start()
  searchClickFn()
  searchClickFnOnce()

  window.addEventListener('pjax:complete', () => {
    getComputedStyle(document.querySelector('#algolia-search .search-dialog')).display === 'block' && closeSearch()
    searchClickFn()
  })

  window.pjax && search.on('render', () => {
    window.pjax.refresh(document.getElementById('algolia-hits'))
  })
})

```
<!-- endtab -->

<!-- tab diff -->
```diff
window.addEventListener('load', () => {
    const openSearch = () => {
+        document.querySelector('#algolia-search .search-dialog').classList.add('active')
+        document.querySelector('#algolia-search .ais-SearchBox-input').placeholder = GLOBAL_CONFIG.algolia.languages.input_placeholder
        const bodyStyle = document.body.style
        bodyStyle.width = '100%'
-        bodyStyle.overflow = 'hidden'
+        document.querySelector('header#page-header').classList.add('fixed')
        btf.animateIn(document.getElementById('search-mask'), 'to_show 0.5s')
-       btf.animateIn(document.querySelector('#algolia-search .search-dialog'), 'titleScale 0.5s')
        setTimeout(() => { document.querySelector('#algolia-search .ais-SearchBox-input').focus() }, 100)
        // shortcut: ESC
        document.addEventListener('keydown', function f(event) {
            if (event.code === 'Escape') {
                closeSearch()
                document.removeEventListener('keydown', f)
            }
        })
    }
# 快捷键 
+    hsu.KCadd('Shift','k',openSearch) 
    const closeSearch = () => {
+        document.querySelector('header#page-header').classList.remove('fixed')
+        document.querySelector('#algolia-search .search-dialog').classList.remove('active')
+        document.querySelector('.ais-SearchBox input').value = ''
+        document.querySelector('#algolia-search .ais-SearchBox-input').placeholder = 'shift K'
        const bodyStyle = document.body.style
        bodyStyle.width = ''
        bodyStyle.overflow = ''
-        btf.animateOut(document.querySelector('#algolia-search .search-dialog'), 'search_close .5s')
-        btf.animateOut(document.getElementById('search-mask'), 'to_hide 0.5s')
    }
    const searchClickFn = () => {
-        document.querySelector('#search-button > .search').addEventListener('click', openSearch)
-        ....(这个函数直接重写吧，我找不到旧文件了)
+        document.querySelector('#algolia-search .search-dialog').onclick = function(){
+          openSearch()
+        } 
    }
    const searchClickFnOnce = () => {
        document.getElementById('search-mask').addEventListener('click', closeSearch)
        document.querySelector('#algolia-search .search-close-button').addEventListener('click', closeSearch)
    }
    const cutContent = content => {
        if (content === '') return ''
        const firstOccur = content.indexOf('<mark>')
        let start = firstOccur - 30
        let end = firstOccur + 120
        let pre = ''
        let post = ''
        if (start <= 0) {
            start = 0
            end = 140
        } else {
            pre = '...'
        }
        if (end > content.length) {
            end = content.length
        } else {
            post = '...'
        }
        const matchContent = pre + content.substring(start, end) + post
        return matchContent
    }
    const algolia = GLOBAL_CONFIG.algolia
    const isAlgoliaValid = algolia.appId && algolia.apiKey && algolia.indexName
    if (!isAlgoliaValid) {
        return console.error('Algolia setting is invalid!')
    }
    const search = instantsearch({
        indexName: algolia.indexName,
        /* global algoliasearch */
        searchClient: algoliasearch(algolia.appId, algolia.apiKey),
        searchFunction(helper) {
            helper.state.query && helper.search()
        }
    })
    const configure = instantsearch.widgets.configure({
        hitsPerPage: 5
    })
    const searchBox = instantsearch.widgets.searchBox({
        container: '#algolia-search-input',
        showReset: false,
        showSubmit: false,
+        placeholder: 'shift K',
-        placeholder: GLOBAL_CONFIG.algolia.languages.input_placeholder,
        showLoadingIndicator: true,
+        cssClasses: {
        }
    })
    const hits = instantsearch.widgets.hits({
        container: '#algolia-hits',
        templates: {
            item(data) {
                const link = data.permalink ? data.permalink : (GLOBAL_CONFIG.root + data.path)
                const result = data._highlightResult
                const content = result.contentStripTruncate
                    ? cutContent(result.contentStripTruncate.value)
                    : result.contentStrip
                        ? cutContent(result.contentStrip.value)
                        : result.content
                            ? cutContent(result.content.value)
                            : ''
                return `
            <a href="${link}" class="algolia-hit-item-link">
            ${result.title.value || 'no-title'}
            </a>
            <p class="algolia-hit-item-content">${content}</p>`
            },
            empty: function (data) {
                return (
                    '<div id="algolia-hits-empty">' +
                    GLOBAL_CONFIG.algolia.languages.hits_empty.replace(/\$\{query}/, data.query) +
                    '</div>'
                )
            }
        }
    })
    const stats = instantsearch.widgets.stats({
        container: '#algolia-info > .algolia-stats',
        templates: {
            text: function (data) {
                const stats = GLOBAL_CONFIG.algolia.languages.hits_stats
                    .replace(/\$\{hits}/, data.nbHits)
                    .replace(/\$\{time}/, data.processingTimeMS)
                return (
                    `<hr>${stats}`
                )
            }
        }
    })
    const powerBy = instantsearch.widgets.poweredBy({
        container: '#algolia-info > .algolia-poweredBy'
    })
    const pagination = instantsearch.widgets.pagination({
        container: '#algolia-pagination',
        totalPages: 5,
        templates: {
            first: '<i class="fas fa-angle-double-left"></i>',
            last: '<i class="fas fa-angle-double-right"></i>',
            previous: '<i class="fas fa-angle-left"></i>',
            next: '<i class="fas fa-angle-right"></i>'
        }
    })
    search.addWidgets([configure, searchBox, hits, stats, powerBy, pagination]) // add the widgets to the instantsearch instance
    search.start()
    searchClickFn()
    searchClickFnOnce()
    window.addEventListener('pjax:complete', () => {
        getComputedStyle(document.querySelector('#algolia-search .search-dialog')).display === 'block' && closeSearch()
        searchClickFn()
    })
    window.pjax && search.on('render', () => {
        window.pjax.refresh(document.getElementById('algolia-hits'))
    })
})
```
<!-- endtab -->
{% endtabs %}


### 修改 nav.pug
`themes\butterfly\layout\includes\header\nav.pug`:

{% tabs code %}
<!-- tab source -->
```pug
nav#nav
  span#blog-info
    a(href=url_for('/') title=config.title)
      if theme.nav.logo
        img.site-icon(src=url_for(theme.nav.logo))
      if theme.nav.display_title
        span.site-name=config.title
    
  #menus
    if (theme.algolia_search.enable || theme.local_search.enable)
    #algolia-search
      .search-dialog
        .search-wrap
          #algolia-search-input
          hr
          #algolia-search-results
            #algolia-hits
            #algolia-pagination
            #algolia-info
              .algolia-stats
              .algolia-poweredBy
      #search-mask
      
    !=partial('includes/header/menu_item', {}, {cache: true})

    #toggle-menu
      a.site-page(href="javascript:void(0);")
        i.fas.fa-bars.fa-fw
```
<!-- endtab -->

<!-- tab diff -->
```diff
nav#nav
  span#blog-info
    a(href=url_for('/') title=config.title)
      if theme.nav.logo
        img.site-icon(src=url_for(theme.nav.logo))
      if theme.nav.display_title
        span.site-name=config.title
    
  #menus
    if (theme.algolia_search.enable || theme.local_search.enable)
-    #search-button
-      a.site-page.social-icon.search(href="javascript:void(0);")
-        i.fas.fa-search.fa-fw
-        span=' '+_p('search.title')
+    #algolia-search
+      .search-dialog
+        .search-wrap
+          #algolia-search-input
+          hr
+          #algolia-search-results
+            #algolia-hits
+            #algolia-pagination
+            #algolia-info
+              .algolia-stats
+              .algolia-poweredBy
+      #search-mask
    !=partial('includes/header/menu_item', {}, {cache: true})

    #toggle-menu
      a.site-page(href="javascript:void(0);")
        i.fas.fa-bars.fa-fw
```
<!-- endtab -->
{% endtabs %}

### 添加样式文件
需要自己添加引用

**样式**
`nav.css`:

```css
/* 导航栏布局更改 */

#nav .menus_items {
    display: flex;
    flex-direction: row;
    align-items: center;
}

#nav .menus_items .menus_item {
    display: flex !important;
    position: relative;
    padding: 0 0 0 14px;
}

#menus {
    display: flex;
    align-items: center;
}

/* 确保透明蒙版可点击 */

#search-mask {
    background-color: transparent !important;
    cursor: default;
}

/* 主体 */

.search-dialog {
    position: static !important;
    top: 10%;
    left: 50%;
    z-index: 1001;
    display: none;
    margin-left: 0 !important;
    padding: 0 !important;
    width: 36px !important;
    border-radius: 0 !important;
    background: none !important;
    transition: .3s;
}

/* 搜索模式 */

#algolia-search .search-dialog.active {
    width: 600px !important;
    max-width: 80vw;
}

#algolia-search .search-dialog.active .ais-SearchBox {
    border: 1px solid var(--hsu-theme-color);
}

#algolia-search .search-dialog.active .search-wrap {
    height: auto;
    border-radius: 8px;
    padding: 10px;
    background: var(--hsu-glass-bg);
    backdrop-filter: blur(5px);
    box-shadow: 2px 2px 12px -4px rgb(0 0 0 / 50%);
    border-width: 0 1px 1px 0;
    border-color: rgba(255, 255, 255, .6);
    border-style: solid;
}

#algolia-search .search-dialog.active #algolia-search-results {
    min-height: 36px;
}

/* 隐藏模式 */

#algolia-search .search-dialog:not(.active):hover {
    background-color: var(--hsu-input-bg);
    width: 120px !important;
}

#algolia-search .search-dialog:not(.active):hover .ais-SearchBox {
    border: 1px solid var(--hsu-theme-color);
}

#algolia-search .search-dialog:not(.active) hr,
#algolia-search .search-dialog:not(.active) #algolia-search-results,
#algolia-search .search-dialog:not(.active) #algolia-search-results * {
    opacity: 0;
    position: absolute;
    height: 0 !important;
    width: 0 !important;
    margin: 0 !important;
}

#algolia-search .search-dialog:not(.active) input {
    caret-color: rgba(0, 0, 0, 0);
}

#algolia-search .search-dialog:not(.active) input::placeholder {
    width: 34px;
    color: var(--hsu-font-light);
    border: 1px solid var(--hsu-font-light);
    border-radius: 4px;
    padding: 0 10px;
    font-size: 14px;
}

/* 其他格式 */

#algolia-search .search-dialog .ais-SearchBox input {
    display: flex;
    position: relative;
    left: 24px;
    padding: 0 !important;
    width: 100%;
    height: 100%;
    outline: none;
    border: none !important;
    border-radius: 0 !important;
    background: none !important;
    color: black;
    font-size: 18px;
}

#algolia-search {
    height: 36px !important;
    display: flex;
}

.ais-SearchBox {
    height: 36px;
    background: var(--hsu-input-bg);
    border-radius: 18px;
    display: flex;
    justify-content: space-between;
}

.ais-SearchBox::after {
    position: relative;
    height: 1px;
    right: 9px;
    top: 8px;
    content: '\f002';
    font: var(--fa-font-solid);
    font-size: 18px;
}

.ais-SearchBox-form {
    width: calc(100% - 36px - 24px);
}

.search-wrap {
    transition: .3s;
    height: 1px;
}

.search-wrap hr {
    box-sizing: content-box;
    height: 0px;
    overflow: visible;
    margin: 1rem 0;
    border: 1px dashed var(--hsu-font-light);
}

#algolia-search .search-dialog .ais-Pagination .ais-Pagination-item--selected a {
    background: var(--hsu-theme-color) !important;
    border-radius: 4px;
}

/* 深色模式 */

[data-theme="dark"] .ais-SearchBox {
    background: var(--hsu-input-bg-dark);
}

[data-theme='dark'] #algolia-search .search-dialog:not(.active):hover .ais-SearchBox {
    border: 2px solid var(--hsu-font-light);
}

[data-theme='dark'] #algolia-search .search-dialog:not(.active) input::placeholder {
    color: var(--hsu-theme-color-dark);
    border: 1px solid var(--hsu-theme-color-dark);
}

[data-theme='dark'] #algolia-search .search-dialog.active .search-wrap {
    background: rgba(0, 0, 0, .1);
    backdrop-filter: blur(5px);
    box-shadow: 2px 2px 12px -4px rgb(0 0 0 / 50%);
}

[data-theme='dark'] #algolia-search .search-dialog.active .ais-SearchBox {
    border: 1px solid var(--hsu-font-light);
}

/* upadate 0.0.1 修复pjax冲突 */

.search-dialog {
    display: block !important; 
    animation: 0.1s ease 0s 1 normal none running titleScale;
}

```

`nobody.css`:

```css
*::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

*::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, .3);
    border-radius: 8px;
    cursor: pointer;
}

*::-webkit-scrollbar-track {
    background: transparent;
}

.search-wrap *::-webkit-scrollbar-thumb {
    background-color: var(--none) !important;
}

input::placeholder {
    color: #999;
}

hr:before {
    content: '' !important;
}

```

**变量**
`var.css`:

```css
:root {
    --hsu-theme-color: #49b1f5;
    --hsu-theme-color-dark: #1f1f1f;
    --hsu-input-bg: #f1f1f1;
    --hsu-glass-bg: linear-gradient(to bottom right, rgba(255, 255, 255, .8), rgba(255, 255, 255, .5));
    --hsu-font-light: #bbb;
    --hsu-input-bg-dark: #111111;
}
```


### 修改行为

**快捷键**

`hsu.js`:

```javascript
const hsu = {
    // 上上下下左右左右abab
    Dmode: function () {
        this.Debug = true;
        return '已启用Debug模式'
    },
    Debug: false,
    keyCombo: {
        'Shift': {},
        'Alt': {},
        'Ctrl': {}
    },
    // fkey 功能键 
    // ckey 组合键
    // func 回调函数
    KCadd: function(fkey, ckey, func) {
        ckey = ckey.toLowerCase()
        if(this.keyCombo[fkey] == undefined) {
            throw '功能键只能为 Shift/Alt/Ctrl'
        } else if(this.keyCombo[fkey][ckey] != undefined) {
            throw 'keyCombo has existed!'
        } else if (typeof fkey != 'string' || typeof ckey != 'string') {
            throw 'keyCombo should be string type!'
        }
        else {
            this.keyCombo[fkey][ckey] = func
            if(this.Debug) console.log(fkey + "+" + ckey + "已绑定" + func)
        }
    },
}

$(window).on("keydown", function (event) {
    if(event.shiftKey){
        let func = hsu.keyCombo['Shift'][event.key.toLowerCase()]
        if(func != undefined){
            func()
            if(hsu.Debug) console.log('快捷键' + 'Shift + ' + event.key.toLowerCase() + ' 启用 : ' + func)
        }
    }
})
```

### 修改位置
`themes\butterfly\layout\includes\layout.pug`
把原有的注释掉就行
```diff
- !=partial('includes/third-party/search/index', {}, {cache: true})
+ //- !=partial('includes/third-party/search/index', {}, {cache: true})
```

### end

基本就是这些了，在全部主题完成之前会一直更新，如果有什么问题或者BUG反馈在下面评论即可，看到之后会第一时间回复。

**2023-02-04更新** 第二天就被通知有bug，乐
- ❎ 原魔改方案与`pjax`有冲突，在开启`pjax`的情况下，如果站内跳转会导致搜索框消失(**没搞清楚原理**)
- ✅ 修复了无法使用快捷键的bug，并封装了`hsu.KCadd(fkey, ckey, func)`函数，实现任意自定义双键组合快捷键