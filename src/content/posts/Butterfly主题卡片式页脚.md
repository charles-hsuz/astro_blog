---
title: Butterfly主题卡片式页脚
categories: 博客美化
slug: c822e518
date: 2023-01-28 23:29:21
cover: 'https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202302091652512.png'
---
# Butterfly主题卡片式页脚

之前根据 [Jayhrn](https://blog.jayhrn.com/) 的 [Butterfly主题页脚美化](https://blog.jayhrn.com/posts/eaf618d9.html) 修改了本博客的页脚，最近放假比较闲，刚好可以复健一下前端…… 所以对页脚做了一些简单的修改：
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301282335416.png)

其中页脚按钮部分用`css`做了简单的动画：
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301282337522.gif)

---------------

## 教程

### 修改 pug 文件
页脚的`html(pug)`文件路径为`themes/butterfly/layout/includes/footer.pug`：

```pug
//- 页脚按钮
#footer_button
  ul.buttons
    li.icon.Email
      span.bubble Email
      a(href='mailto:charles_hsu@qq.com')
        i.fa-solid.fa-envelope
    li.icon.QQ
      span.bubble QQ
      a(href='tencent://Message/?Uin=1191393280&websiteName=q-zone.qq.com&Menu=yes')
        i.fa-brands.fa-qq
    li.icon.top
      span.bubble top
      a(href='#')
        i.fa-solid.fa-angle-up
    li.icon.github
      span.bubble Github
      a(href='https://github.com/charles-hsuz')
        i.fab.fa-github
    li.icon.CSDN
      span.bubble CSDN
      a(href='https://blog.csdn.net/CharlesHsuu?type=blog')
        i.fa-solid.fa-copyright

//- 真正的页脚卡片
#Hsu-foot
  .footer-group
    h3.footer-title 直达
    .footer-links
      a.footer-item(href="/" target="_blank") 我的主页
      a.footer-item(href="/bb") 个人动态
      a.footer-item(href="/random/index.html") 随机文章
  .footer-group
    h3.footer-title 分类
    .footer-links
      a.footer-item(href="/categories/学习笔记/") 学习笔记
      a.footer-item(href="/categories/算法教程/") 算法教程
      a.footer-item(href="/categories/刷题笔记/") 刷题笔记
      a.footer-item(href="/categories/语法教程/") 语法教程
      a.footer-item(href="/categories/工具分享/") 工具分享
  .footer-group
    h3.footer-title 关于
    .footer-links
      a.footer-item(href="/about") 关于我
      a.footer-item(href="/charts") 博客统计
      a.footer-item(href="/archives") 文章归档
  .footer-group
    h3.footer-title 友链
    .footer-links
      a.footer-item(href="/link") 在这里 ✨
      a.footer-item(href="mailto:charles_hsu@qq.com") 广告位招租啦
  .footer-group
    h3.footer-title 协议
    .footer-links
      a.footer-item(href="/privacy") 隐私协议
      a.footer-item(href="/cookies") Cookie
      a.footer-item(href="/cc") 版权协议

//- 页脚徽章
p#footer-badges
  a.badge(target='_blank' href='https://icp.gov.moe/?keyword=20230318' title='萌ICP备20230318号')
    img.badge(src='https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301280632199.svg')

  a.badge(target='_blank' href='https://hexo.io/zh-cn/' title='基于Hexo v6.3.0')
    img.badge(src='https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301281630150.svg')

  a.badge(target='_blank' href='https://butterfly.js.org/' title='主题基于Butterfly v4.6.1')
    img.badge(src='https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301281634747.svg')

  a.badge(target='_blank' href='https://github.com/charles-hsuz/charles-hsuz.github.io' title='版本控制由github提供')
    img.badge(src='https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301281637830.svg')

  a.badge(target='_blank' href='https://cloud.tencent.com/' title='本博客托管于腾讯云')
    img.badge(src='https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301281651362.svg')
```

其中使用了 [font-awesome v6](https://fontawesome.com/icons?from=io) 图标，可以自行修改
也可以参照 [Akilarの糖果屋](https://akilar.top/) 的 [Iconfont Inject](https://akilar.top/posts/d2ebecef/) 引入阿里图标

## 引入 css 文件

如果不知道如何自定义`css`文件，可以参照 [Hexo博客添加自定义css和js文件](https://blog.leonus.cn/2022/custom.html) - Leonus 



```css
/* 页脚按钮 */
body {
    background-color: #fff8fb76;
}

#footer_button {
    display: grid;
    justify-items: center;
    align-items: center;
    margin: 0;
    padding: 2rem 0 0 0;
}

#footer_button i {
    font-size: 1.6rem;
    transition: .3s;
    line-height: 1.3rem;
    height: 1.3rem;
}

.buttons {
    display: grid;
    width: 45%;
    padding: 0;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(5,1fr);
}

.buttons .icon {
    display: grid;
    justify-items: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    padding: 5px;
    margin: 0px;
    width: 50px;
    height: 50px;
    box-shadow: 1px 10px 10px 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.buttons a {
    display: block;
    height: 28px;
    width: 26px;
    font-size:18px;
    line-height: 35px;
    color: #4c4948;
}

.buttons .bubble {
    position: absolute;
    top: 0;
    font-size: 14px;
    background: #ffffff;
    color: #ffffff;
    padding: 5px 8px;
    border-radius: 5px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.buttons .bubble::before {
    position: absolute;
    content: "";
    height: 8px;
    width: 8px;
    background: #ffffff;
    bottom: -4px;
    left: 50%;
    transform: translate(-50%) rotate(45deg);
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.buttons .icon:hover .bubble {
    top: -15px;
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
}

.buttons .icon:hover span,
.buttons .icon:hover .bubble {
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
}

.buttons .Email:hover,
.buttons .Email:hover .bubble,
.buttons .Email:hover .bubble::before {
    background: #1877F2;
    color: #ffffff;
}
.buttons .Email:hover a {
    color: #ffffff;
}

.buttons .QQ:hover,
.buttons .QQ:hover .bubble,
.buttons .QQ:hover .bubble::before {
    background: #1DA1F2;
    color: #ffffff;
}
.buttons .QQ:hover a {
    color: #ffffff;
}

.buttons .top:hover,
.buttons .top:hover .bubble,
.buttons .top:hover .bubble::before {
    background: #cfcacea5;
    color: #ffffff;
}
.buttons .top:hover a {
    color: #ffffff;
}

.buttons .github:hover,
.buttons .github:hover .bubble,
.buttons .github:hover .bubble::before {
    background: #333333;
    color: #ffffff;
}
.buttons .github:hover a {
    color: #ffffff;
}

.buttons .CSDN:hover,
.buttons .CSDN:hover .bubble,
.buttons .CSDN:hover .bubble::before {
    background: #CD201F;
    color: #ffffff;
}
.buttons .CSDN:hover a {
    color: #ffffff;
}

/* 自适应 */

@media screen and (max-width: 780px) {
    .buttons {
        width: 80%;
    }
}

@media screen and (max-width: 1450px) and (min-width: 780px) {
    .buttons {
        width: 60%;
    }
}

@media screen and (min-width: 1220px) {
    #Hsu-foot {
        margin-left: auto !important;
        margin-right: auto !important;
    }
}

/* dark ♂ mode */
[data-theme="dark"] body {
    background-color: #313131;
}
[data-theme="dark"] #Hsu-foot {
    background-color: #121212;
}

[data-theme="light"] #footer {
    padding-top: 15px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%,rgba(255, 255, 255, 0.4) 18%, #ffffff 97%)
}

/* 深色模式的按钮全部是黑白色 */
[data-theme="dark"] .buttons .icon,
[data-theme="dark"] .buttons .icon:hover,
[data-theme="dark"] .buttons .icon:hover .bubble,
[data-theme="dark"] .buttons .icon:hover .bubble::before,
[data-theme="dark"] .buttons .icon:hover a {
    background: #121212;
    color: #ffffff;
}

/* 页脚 */

#Hsu-foot {
    background-color: rgba(255, 255, 255, 0.4);
    display: grid;
    grid-template-columns: repeat(5, 2fr);
    column-gap: 15px;
    margin: 1%;
    margin-top: 30px;
    padding-bottom: 15px;
    max-width: 1170px;
    box-shadow: 9px 10px 16px 3px rgb(0 0 0 / 10%);
    border-radius: 10px;
}

#Hsu-foot .footer-group {
    display: grid;
    grid-template-rows: 0fr 1fr;
    margin-left: 30px;
}

#Hsu-foot .footer-title {
    display: block;
    font-size: 1rem;
    height: 2rem;
}

#Hsu-foot .footer-links {
    display: grid;
    grid-auto-rows: 2rem;
}

#Hsu-foot .footer-item {
    font-size: 1rem;
    line-height: .8rem;
    margin: .38rem 0;
    color: var(--Jay-fontcolor);
    /*margin-right: auto*/
}

/* 徽章 */

#footer-badges {
    max-width: 1170px;
    margin: auto;
}

#footer-badges .badge {
    margin: 25px 5px 0px 0px;
}
```

不得不承认，我这css写的属实有点拉胯，各位实装之后可以按照自己所需进行更改

PS：为了适应渐变式的页脚背景，我在 `foot.css` 中修改了 `body` 的样式，没有此需求的童鞋可以自行删除

