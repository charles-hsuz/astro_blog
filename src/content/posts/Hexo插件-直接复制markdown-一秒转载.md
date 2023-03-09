---
title: Hexo插件 | 直接复制markdown | 一秒转载
tags: 插件
categories: 博客魔改
slug: '6e818316'
date: 2023-02-11 09:30:31
---
# Hexo插件 | 直接复制markdown | 一秒转载

一个Hexo插件，允许你直接从网页复制markdown，主要为butterfly主题开发，但**基本的复制功能是通用的**。

## 安装

```
npm i hexo-butterfly-copymarkdown --save
```

## Config

在Hexo的_config.yml文件中添加配置。

比如：

```
copyMarkdown:
    enable: true
    pureMarkdown: false #使用true以禁用外挂转换 默认为 false
    keyboard: true #cv悬浮组件
    field: post # default: 每个页面   post: 仅文章页面（默认值）
    copyright: true # 是否添加版权信息 默认开启
    Reprint: true # 是否开启一键转载 默认开启
```

[项目地址](https://github.com/charles-hsuz/hexo-butterfly-copymarkdown)

## 效果

目前已适配除mermaid外全部外挂

![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/steve202302111032837.gif)

![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/steve202302111032501.gif)

![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/steve202302111033577.gif)


本博客开启的是默认效果，也就是**会把外挂反编译回真实状态**，[实测页面](/posts/d87f7e0c.html)

~~本来想拿洪哥和鱼佬的博客做个演示，但后来想想还是算了，顺便把本来写好的接口也撤了，现在这个插件“只能”用在自己的博客上被别人复制（可能意义不大，毕竟代码不难）~~

## 碎碎念

最开始是群里聊到 “CV工程师” 的时候，我突然想到可以做一个类似`Bongo Cat`的小组件，一个能响应 `ctrl` `c` `v` 按键并表现出对应动画的悬浮键盘，大概长这样？

![类似这样的](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/steve202302110936582.png)

结果……

![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/steve202302110938757.png)

既然洪哥都发话了，那我肯定要欣然接受建议的嘛(雾)

所以当时我是真的啥都没想就开始写了，当时就想着能转朴素markdown就行，没必要找轮子，然后嘛……真香

![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/steve202302110942907.png)

洪哥的推荐雀食很有质量，但是原谅我我实在没研究明白它的api🧐  
之后就一直卡着，也没人关注这小项目，我也就没再管了，直到后来群里突然开始聊ChatGPT：

![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/steve202302110949230.png)

可以，很可以，我宣布，从今以后**ChatGPT**就是我的首席策划🃏

### 更新日志

{% timeline 更新日志,pink %}
<!-- timeline 23.02.10 -->
1.0.2：nothing to say ~
<!-- endtimeline -->
<!-- timeline 23.02.11 -->
1.0.3：日常更新，修复了一些小bug ~
<!-- endtimeline -->
<!-- timeline 23.02.11 -->
1.0.4：修复了与pjax的冲突
<!-- endtimeline -->
{% endtimeline %}