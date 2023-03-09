---
title: iTest考完直接查成绩？
tags: 转载
categories: 技巧
copyright_author: m_666888
copyright_author_href: 'https://blog.csdn.net/m0_74001916?type=blog'
copyright_url: 'https://blog.csdn.net/m0_74001916/article/details/128376226'
copyright_info: 版权声明：本文为CSDN博主「m_666888」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
slug: bbfc710f
date: 2022-12-26 12:14:43
cover: 'https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202302091657180.png'
---
# 奇技淫巧
同学们在iTEST上答完题后不能直接看到答案，需要等到教师公布，但下面的代码可以立马给你呈现出来（没有任何影响）。
![](https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog/Adobe/20221226122257.png)
在 “已完成考试界面” 我们只需要按F12，切出控制台，在console这一栏中贴上下面的代码，然后回车，成绩就都出来了。
代码:
`var x=new XMLHttpRequest;x.onreadystatechange=function(){if(4==x.readyState){var e=JSON.parse(this.responseText);e=e.rs.data,console.log(this.responseText);for(var t=0;t<e.length;t++){var r=0;console.info(e[t].ksName);for(var s=e[t].rateObjFinal.rateItems,a=0;a<s.length;a++)for(var o=s[a].rateScoreList,n=0;n<o.length;n++)r+=o[n].score;console.info(r/100)}}},x.open("POST","https://itestcloud.unipus.cn/utest/itest-mobile-api/student/exam/list",!0),x.send('{"curPage":1, "pageSize":5, "history":true}');`


