---
title: Bessie's Dream
slug: 2981d3e8
date: 2022-12-22 21:55:20
updated: 2022-12-22 21:55:20
tags: USACO
categories: 刷题笔记
---
# Bessie's Dream
**题目来源：USACO 2015 December Contest Gold**
Bessie has broken into Farmer John's house again! She has discovered a pile of lemons and a pile of oranges in the kitchen (effectively an unlimited number of each），and she is determined to eat as much as possible. Bessie has a maximum fullness of T(1≤TS5,000,000 ）.Eating an orange increases her fullness by A，and eating a lemon increases her fulness by B （1≤A,BST）.Additionally， if she wants，Bessie can drink water at most one time，which will instantly decrease her fullness by half (and will round down）.
Help Bessie determine the maximum fullness she can achieve!
## INPUT FORMAT（file feast.in）:
The first (and only） line has three integers TA，and B.
## OUTPUT FORMAT（file feast.out):
A single integer，representing the maximum fullness Bessie can achieve.

**译文来源：[acwing 1862. 贝茜的梦](https://www.acwing.com/problem/content/description/1864/)**

在约翰的厨房里吃了太多的水果后，贝茜做了一些非常奇怪的梦。
在她最近的梦中，她被困到了一个迷宫中，迷宫可视为 N×M 的方格矩阵。
开始时她位于左上角的格子，出口在右下角的格子。
当她位于某个格子中时，她可以沿四个基本方向中的任意一个移动至相邻格子中。
可是等等！
每个格子都有一种颜色，每种颜色都有不同的属性！
贝茜一想到这个就感到头疼：
```
如果格子是红色的，则无法进入。
如果格子是粉色的，则可以正常通行。
如果格子是橙色的，则可以正常通行，但是进入此类格子会使贝茜闻起来像橙子。
如果格子是蓝色的，则里面包含食人鱼，只有贝茜闻起来像橙子时，她方可进入。
如果格子是紫色的，则贝茜沿某方向移动到紫色格子后，会沿着该方向滑动至下一个格子中（除非她无法进入下一个格子）。
如果滑动至紫色格子，则继续滑动，直至进入非紫色格子或撞到无法进入的格子为止。进入紫色格子会使得自身气味消失。
（如果你对紫色格子感到困惑，样例将说明其具体用法。）
```
每从一个格子移动或滑动至另一个格子，算作一次移动。
请帮助贝茜在尽可能减少移动次数的情况下，到达出口。
## 输入格式
第一行包含两个整数 N 和 M。
接下来 N 行每行包含 M 个整数，表示迷宫：
0 表示红色格子
1 表示粉色格子
2 表示橙色格子
3 表示蓝色格子
4 表示紫色格子
左上角和右下角的数字一定是 1。
## 输出格式
输出贝茜到达出口所需的最少移动次数。
如果无法到达出口，则输出 −1。
## 数据范围
1≤N,M≤1000
### 思路
迷宫问题，用最短路可以解，这里用BFS（好吧我得承认三四次才AC）
每个状态有4个元素：坐标（其实是两个整型）、方向（进入该格子的方向）、是否有橘子气息、是否强制停止（即在滑行过程中被迫停止）
==详细见注释==
### 代码
```c
#include <bits/stdc++.h>
using namespace std;
const int N = 1010;
int maze[N][N], n, m, s[N][N][4][2];//记录迷宫和对应步数
enum col {red, pin, ora, blu, pur}; //对应格子颜色
enum dir {U, D, L, R}; //对应移动方向
int dx[] = {-1, 1, 0, 0}, dy[] = {0, 0, -1, 1};//移动方向
class Node
{
    public:
        int x, y, d;
        bool o, stop;
};
queue<Node> q;//搜索队列
int bfs()
{
    memset(s, -1, sizeof s);
    s[1][1][R][0] = s[1][1][D][0] = 0;//从1,1触达只有R和D两个方向
    q.push(Node({1, 1, R, 0})), q.push(Node({1, 1, D, 0}));
    while(!q.empty())
    {
        auto t = q.front();
        q.pop();
        for(int i = 0; i < 4; i ++)
        {
            int x = t.x + dx[i], y = t.y + dy[i];
            if((x < 1 || y < 1 || x > n || y > m) || !t.o && maze[x][y] == blu || maze[x][y] == red)
            {
                if(maze[t.x][t.y] == pur && i == t.d && !t.stop) q.push(Node({t.x, t.y, t.d, t.o, 1}));
                //如果是滑行状态中被中断则stop置1，这里要注意如果已经stop过了就不需要重复搜索了，相当于vis
                continue;
            }
            if(maze[t.x][t.y] == pur && i != t.d && !t.stop) continue;
            //紫色格子时，方向相同或者迫停状态才继续搜索
            bool o = !(maze[x][y] == pur) && (maze[x][y] == ora || t.o);
            //这句话看不懂的可以打个表（把对应关系梳理一下就可以了）
            //也可以直接理解：紫色格子一定会消除橘子气息，橘色格子或者原来就有则会保留
            if(s[x][y][i][o] != -1) continue;//如果搜过了就可以跳过了
            s[x][y][i][o] = s[t.x][t.y][t.d][t.o] + 1;
            q.push(Node({x, y, i, o}));
            if(x == n && y == m) return s[n][m][i][o];//第一次到达出口就可以返回了
        }
    }
    return -1;//搜完了都没有就说明Bessie die定了，真惨
}
int main()
{
    cin.tie(nullptr);
    ios::sync_with_stdio(false);
    //这两句为了提升速度，但好像没有也能AC
    cin >> n >> m;
    for(int i = 1; i < n + 1; i ++)
        for(int j = 1; j < m + 1; j ++)
            cin >> maze[i][j];
    cout << bfs() << endl;
    return 0;
}
```