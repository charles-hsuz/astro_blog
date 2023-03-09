---
title: 【中学】判断三角形的形状
slug: 4ad0cf31
date: 2022-12-23 19:08:57
tags: 乐学
categories: 刷题笔记
---
# 【中学】判断三角形的形状

小明上了初中，开始学习三角形
### 要求：
输入三角型的三条边，判断三角形的形状。假设输入的三边边长均>0。
**（提示：本题中应该要用到 if 语句嵌套）**
### 输入：
三角型的3条边的长度（int型）。
### 输出：
等边三角形：equilateral triangle.
等腰三角形：isoceles triangle.
不构成三角形：non-triangle.
一般三角形：triangle.
## 样例：
序号|测试输入| 期待的输出| 额外进程
--------|-------- | -----|--------
1  | `2 2 2↵`|`equilateral triangle.↵`|0
2|`3 2 2↵`|`isoceles triangle.↵`|0
3 | `1 3 1↵`|`non-triangle.↵`|0
4|`1 3 1↵`|`non-triangle.↵`|0
5|`3 4 5↵`|`triangle.↵`|0

### 流程图
![判断三角形形状](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/%E4%B8%89%E8%A7%92%E5%BD%A2%E5%BD%A2%E7%8A%B6.drawio.png)



### 代码
{% hideBlock 查看 %}
```c
#include <stdio.h>
 
int main() 
{
    int x, y, z;
    scanf("%d %d %d", &x, &y, &z);
    if (x + y <= z || x + z <= y || y + z <= x)
        printf("non-triangle.\n");
    else if (x == y || y == z || x == z) 
	{ 
        if (x == y && y == z) 
            printf("equilateral triangle.\n");
        else 
            printf("isoceles triangle.\n");
    }
    else
        printf("triangle.\n");

}
```
{% endhideBlock %}

### 课外思考
如果要再加上直角三角形的判断呢？

显然，在原有程序的基础上，我们只需要在“普通三角形”输出前加上一个判断即可
### 代码
{% hideBlock 查看 %}
```c
#include <stdio.h>
 
int main() 
{
    int x, y, z;
    scanf("%d %d %d", &x, &y, &z);
    if (x + y <= z || x + z <= y || y + z <= x)
        printf("non-triangle.\n");
    else if (x == y || y == z || x == z) 
	{ 
        if (x == y && y == z) 
            printf("equilateral triangle.\n");
        else 
            printf("isoceles triangle.\n");
    }
    else if(x*x+y*y==z*z||x*x+z*z==y*y||y*y+z*z==x*x)
    	printf("right triangle.\n");
    else
        printf("triangle.\n");

}
```

{% endhideBlock %}
