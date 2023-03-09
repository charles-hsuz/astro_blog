---
title: 在VScode中编写html+css
categories: 语法教程
slug: 130da42f
date: 2022-12-30 10:20:48
cover: 'https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202302091657180.png'
---
# 在VScode中编写html+css

## 安装编辑用拓展

打开拓展(`ctrl` + `shift` + `X`)
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog20221230084551.png)
搜索“html”，然后安装 `HTML Snippets` 、 `HTML CSS Support` 和 `IntelliSense for CSS class names in HTML`

## 安装浏览用拓展
选择适合自己的一款即可
- 安装 `open in browser` ， 现在可以右键html文件选择`open in default browser` 在默认浏览器中打开 或者 `open in other browser` 在其他浏览器中打开 （每次更改文件后需要保存文件并刷新网页）
- 安装 `live server` ， 点击右下角 `Go live` ， 即可在浏览器中打开 （每次更改文件后只需保存文件）
- 安装 `live server preview` ，按 `F1` 打开命令行，输入 `show live server preview` ，浏览页面内嵌到VScode中 

## 其他插件
- Auto Rename Tag
  - 在你修改开始(结束)标签时自动修改结束(开始)标签
- px to rem & rpx & vw (cssrem)
  - [官方文档(中文)](https://github.com/cipchk/vscode-cssrem/blob/HEAD/README.zh-CN.md)
  - 一个 px 与 rem 单位互转的 VSCode 插件
- Image preview
  - 在文件中即可显示引用图片
  ![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog20221230104925.png)

- CSS Peek
  - This extension extends HTML and ejs code editing with Go To Definition and Go To Symbol in Workspace support for css/scss/less (classes and IDs) found in strings within the source code.
  - 选中样式，按 `F12` 即可跳转到定义（CSS多的时候真的很好用）