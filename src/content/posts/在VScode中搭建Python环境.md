---
title: 在VScode中搭建Python环境
categories: 语法教程
slug: 2cd2b7cf
date: 2022-12-30 08:42:44
cover: 'https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202302091657180.png'
---
# 在VScode中搭建Python环境

## 安装python拓展

打开拓展(`ctrl` + `shift` + `X`)
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog20221230084551.png)
在搜索栏中输入“Python” （你不需要输入双引号），然后安装第一个即可
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog20221230084810.png)
这可以为你的VScode提供基本的代码编辑、调试、虚拟环境配置能力。
现在，新建一个`.py`文件，使用VScode打开它，你将在下边栏中看见您的Python版本，您可以通过单击它的方式更换版本。
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blogPython.gif)

## 创建虚拟环境
- 打开终端
  - 打开终端的方式有很多 ~~回字的四种写法~~ 
  - 使用 `ctrl` + `shift` + `P` 或 `F1` 打开命令面板，输入 `终端` 或 `Toggle` ，点选 查看：切换终端
  - 直接使用快捷键 `ctrl` + `` ` ``（但不知道为什么我现在用不了这个快捷键）
  - 直接在菜单栏中选择 `终端` - `新建终端`
- 在终端中输入命令 `python3 -m venv {name}` 或 `python -m venv {name}`  其中的 `{name}` 替换成你想要的虚拟环境的名称
- 此时 VScode 会弹出提示框询问你是否使用新的虚拟环境，点击 “是”
- 此时你应该可以在左侧根目录下见到新创建的 `{name}` 文件夹，此处以 `venv` 为例，运行命令：
  - `.\venv\Scripts\activate.bat` windows-cmd
  - `.\venv\Scripts\activate.ps1` windows-powershell
  - `source ~/venv/bin/activate` mac
- 然后你的命令行提示符前应该会出现 `(venv)`
  ![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blogPowershellVenv.gif)
- 如果想要停用环境，使用 `deactivate`
## Debug
打开运行和调试（`ctrl` + `shift` + `D`）
点击 `创建 launch.json 文件`，选择 `Python` `Python File`
关闭打开的.json文件即可

## 其他插件
1. autoDocstring
   1. Visual Studio Code extension to quickly generate docstrings for python functions.
   2. 输入三引号直接回车，可以帮助你为函数写简单的注释。
   ![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blogPythonDoc.gif)
2. AREPL for python
   1. AREPL automatically evaluates python code in real-time as you type.
   2. 点击右上角的“猫”，此插件会“实时运行”你的Python程序。
   ![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog20221230095214.png)
3. python snippets
   1. A snippet pack to make you more productive working with python
   2. 它包含了大量的内置方法，以及string、list、sets、tuple、dictionary、class代码片段，并且还为每个代码段提供至少一个示例。
   ![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blogSnippet.gif)
4. Pylance
   1. 实现类型信息，自动导入，类型检查，代码大纲等功能