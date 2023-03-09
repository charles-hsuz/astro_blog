---
title: stl之rope
tags: STL
categories: 算法教程
slug: 48b938d1
date: 2023-01-03 20:41:18
cover: 'https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202302091658477.png'
---
# 记录一下这个“邪门”的STL

## 先写好头部
```cpp
#include <ext/rope>
using namespace __gnu_cxx;
//看到这里事情已经开始不对劲了
```

## 都能做什么
```cpp
rope test;
 
test.push_back(x); //在末尾添加x
 
test.insert(pos,x); //在pos插入x　　
 
test.erase(pos,x); //从pos开始删除x个
 
test.copy(pos,len,x); //从pos开始到pos+len复制到x
 
test.replace(pos,x); //从pos开始换成x
 
test.substr(pos,x); //提取pos开始x个

test.at(x)/[x]; //访问第x个元素
```
看到这里，你可能会想 就这？
但是，如果我告诉你 `rope` 的时间复杂度只有 $O(n\sqrt{n})$，空间复杂度接近 $O(n)$呢
震惊吗，我也很震惊，这似乎和 `rope` 的低层级制有关

**而且可以实现O(1)的复制！！！**
这意味着我们可以轻松地做到**持久化**
```cpp
root[i] = new rope<char>(*root[i-1]);
```
==rope是一种非标准的STL函数，也就是说不是所有OJ都支持==😢

