---
title: stl之pbds
categories: 算法教程
slug: 3012010d
date: 2023-01-06 11:36:45
cover: 'https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202302091658477.png'
---
# STLのpbds

`pbds`是一个**强大的**库，封装了`hash, tree, trie, priority_queue`四种数据结构

## 引入
```cpp
#include<bits/extc++.h>
using namespace __gnu_pbds;
```
但是在`dev c++`中会有文件缺失，得写成
```cpp
#include<ext/pb_ds/assoc_container.hpp>
#include<ext/pb_ds/tree_policy.hpp>
#include<ext/pb_ds/hash_policy.hpp>
#include<ext/pb_ds/trie_policy.hpp>
#include<ext/pb_ds/priority_queue.hpp>
using namespace __gnu_pbds;
```
编译器选择`g++`，`chang++`会报错
## hash_table
探测法和拉链法都有提供：
```cpp
cc_hash_table<key,value> h;//拉链法
gp_hash_table<key,value> h;//探测法
```
只用到映射的时候使用，不支持排序（遍历时的顺序既不是插入时的顺序也不是排序后的顺序）
支持`[]`和`find`
（其实不如`unordered_map`快）
## tree
是平衡树:
```cpp
tree<int,null_type,less<pii>,rb_tree_tag,tree_order_statistics_node_update> tr;
int //key 的类型
null_type //无映射(低版本g++为null_mapped_type)
//简单理解就是使用 set 而不是 map
less<pii> //从小到大排序
rb_tree_tag //红黑树
splay_tree_tag //伸展树
ov_tree_tag //不知道啥树
tree_order_statistics_node_update //更新方式 

tr.insert(x); //插入x
tr.erase(x); //删除x
tr.order_of_key(); //求排名 
tr.find_by_order(x); //找k小值，返回迭代器，没有返回 end()
tr.order_of_key(x); //找x的排名，返回整数，x不需要在tr中，求解严格小于x的元素的个数
tr.join(b); //将b并入tr，前提是两棵树类型一样且没有重复元素 
tr.split(v,b); //分裂，key小于等于v的元素属于tr，其余的属于b
tr.lower_bound(x); //返回第一个大于等于x的元素的迭代器
tr.upper_bound(x); //返回第一个大于x的元素的迭代器
```
**以上所有操作的时间复杂度均为O(logn)**

## trie
字典树：
```cpp
using tr = trie<string,null_type,trie_string_access_traits<>,pat_trie_tag,trie_prefix_search_node_update>;
//第一个参数必须为字符串类型，tag也有别的tag，但pat最快
tr.insert(s); //插入s 
tr.erase(s); //删除s 
tr.join(b); //将b并入tr 
pair//pair的使用如下：
pair<tr::iterator,tr::iterator> range = base.prefix_range(x);
for(tr::iterator it= range.first; it != range.second; it ++)
    cout<<*it<<' '<<endl;
//pair中第一个是起始迭代器，第二个是终止迭代器，遍历过去就可以找到所有字符串了。 
```
## priority_queue
优先队列：
```cpp
__gnu_pbds::priority_queue<int,greater<int>,pairing_help_tag> Q;
//防止和 std 冲突
//三个参数分别是 元素类型 仿函数类 堆的类型
Q.push(x);//有返回值，返回迭代器
Q.pop();
Q.top();
Q.join(b);// b 被清空
Q.empty();
Q.size(); 
Q.modify(it,6);
Q.erase(it);
//迭代器声明
__gnu_pbds::priority_queue::point_iterator it;  
```
堆的类型有：
- `pairing_heap_tag`：配对堆 ✨
- `thin_heap_tag`：斐波那契堆 ✨
- `binomial_heap_tag`：二项堆
- `binary_heap_tag`：二叉堆

其中仿函数类可以手写(按b降序)：
```cpp
struct cmp{
    bool operator()(node x, node y){
        return x.b < y.b;
    }
}
// 反着写就好了
```
和`std::priority_queue`对比
```cpp
__gnu_pbds::priority_queue<int, greater<int>, pairing_heap_tag> q;
std::priority<int, vector<int>, greater<int>> q;
```

## 参考
🌐 [pbds库学习笔记(优先队列、平衡树、哈希表)](https://blog.csdn.net/Gh0st_Lx/article/details/122851588)
🌐 [比STL还STL？——平板电视](https://www.luogu.com.cn/blog/Chanis/gnu-pbds)