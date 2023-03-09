---
title: VScode搭建cpp环境
categories: 语法教程
slug: 30226dd9
date: 2023-01-06 11:21:04
cover: 'https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202302091657180.png'
---
# 在VScode中搭建cpp环境

## 下载安装编译器
[MinGW下载地址](https://nuwen.net/mingw.html)
点击上方下载地址，点击`mingw-18.0-without-git.exe`进行下载

![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301061525353.png)

双击下载好的`.exe`文件选择安装路径，**记住你选择的路径**
安装结束后打开**安装路径**，选择进入`bin`目录，复制路径(比如我这里就是`E:\MinGW\bin`)

![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301061529526.png)

## 配置环境变量

打开 `设置 -> 系统信息 -> 高级系统设置`

![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301061532104.png)

选择`环境变量`

![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301061532702.png)

找到`Path`(选择用户变量还是系统变量取决于你需要为所有用户配置还是只为你自己配置)

![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301061534899.png)

点击对应的`编辑`，进入后点击`新建`，粘贴你刚刚复制的地址

![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301061535317.png)

然后一直点确定退出

使用 `win` + `R`，输入 `cmd`，回车
在弹出的 `cmd` 窗口中输入 `g++ --version` 和 `gcc -v` 如果能显示版本号，说明安装成功

![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301061538349.png)

## 配置运行环境
打开拓展(`ctrl` + `shift` + `X`)
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog20221230084551.png)

在搜索栏中输入“c” （你不需要输入双引号），然后安装第一个即可
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301061522014.png)

安装`Code Runner`插件，这能让你的“码”跑起来
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301061543519.png)

这个时候会提示你“重新加载”，也就是重启一下`VScode`

完成之后，找到`Code Runner`，点击旁边的 齿轮图标进入`扩展设置`
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301061555758.png)
找到`Run In Terminal`，勾选

完成之后，在`扩展-已安装`中找到`C/C ++`，点击旁边的 齿轮图标进入`扩展设置`
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301061556707.png)

找到`Compile Path`也可以直接搜索
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301061557060.png)
里面粘贴刚刚复制的路径加`\g++.exe`

找到`Include Path`，选择`添加项`，粘贴刚刚复制的路径并将`bin`改为`lib`
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301061602204.png)

找到`Intelli Sense Mode` 并选择`gcc X64`
(IntelliSense可以实现当光标悬停在函数上时显示类定义和注释，当您在 IDE 中键入函数名时，IntelliSense 还可以完成这些名称。)

找到`Cpp Standard`和`C Standard`，并选择你想要使用的编译器版本

现在，您可以直接在编辑窗口右键选择`Run Code`，或使用`Ctrl` + `Alt` + `N`运行代码

## 调试
使用`ctrl` + `shift` + `D`，点击`运行和调试`（或者直接按下`F5`）
选择`C++(GDB/LLDB)`-`C/C++:g++.exe`
等待片刻，看到调试页面代表配置成功

PS:如果想要在`外部调试台`进行调试，请先更换更低版本的`C/C++`插件(1.8.4即可)
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202301061621694.png)
然后重新执行上述操作，此后会生成一个`launch.json`文件，进入文件，将`externalconsole`的值改为`true`即可

## 模板
在大量做题时，我们往往要新建大量的文件，并且每个文件的开头都几乎差不多，这个时候就可以使用`用户代码`功能

来到`文件-首选项-用户代码片段`，选择`cpp.json`

开头注释部分无关紧要，我们主要关注`"Print to console"`的内容：
`prefix`-“快捷输入”，在新建的空白`cpp`文件中输入对应内容并回车，则会自动帮你补全模板内容
`body`-模板主要内容，见下方例子：
```json
"body": [
   "#include <iostream>",
   "using namespace std;",
   "", //空行
   "int main()",
   "{",
   "    $0", //光标会在这里等待输入
   "     return 0;",
   "}",
],
```