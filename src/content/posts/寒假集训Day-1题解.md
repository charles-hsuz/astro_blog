---
title: 寒假集训Day-1题解
categories: 刷题笔记
slug: 3b9a0bd5
date: 2023-1-2 14:06:34
updated: 2023-1-2 14:21:39
cover: 'https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202302091658477.png'
---
# 寒假集训Day-1题解
截至目前为止我只做完了A~H，至于I......只能等大佬了......
21:39：I 终于做出来了，临时学的主席树，但是已经有大佬拿掉了一血
至于原题好像都是cf上的？
{% btn 'https://vjudge.net/contest/536618#problem',原题通道-viudge,,pink %}
## A - Everyone Loves to Sleep
先把所有时间换算成按分钟来计算时间，进行比较，得到一个最小的差值即可。为了考虑跨过零点的情况，对一天的分钟数取余即可。
{% hideBlock 题解 %}
```c
#include <bits/stdc++.h>
using namespace std;

const int N = 24*60;

int t, n, h, m, H, M;

int f(const int &x, const int &y)
{
    int res = x*60 + y + N - H*60 - M;
    res %= N;
    return res >= 0 ? res : N + 1;
}

int main()
{
    cin >> t;
    while(t --)
    {
        int x, y, ans = N + 1;
        cin >> n >> H >> M;
        for(int i = 0; i < n ; i ++)
        {
            cin >> x >> y;
            ans = min(ans, f(x, y));
        }
        cout << ans/60 << " " << ans%60 << endl;
    }
}
```
{% endhideBlock %}

## B - Another String Minimization Problem
**题意：**有一串长度为m，元素全是B的字符串s，通过n次操作，获得字典序最小的字符串。
对每次操作，有一个操作数a，要么 `s[a]` 变成A或者 `s[m+1-a]` 变A。
**思路：**为了保证字典序最小，每次只要取`min(a,m+1-a)`进行操作即可，若已经转变为A了，再转换较大的数
{% hideBlock 题解 %}
```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 55;
int t, n, m, a;
char b[N];
int main()
{
	scanf("%d", &t);
	while(t --)
	{
		memset(b, 'B', sizeof b);
		bool vis[N] = {false};
		scanf("%d%d", &n, &m);
		for(int i = 1; i <= n ; i ++)
		{
			scanf("%d", &a);
			a = min(a, m + 1 - a);
			if(!vis[a])
			{
				vis[a] = true;
				b[a] = 'A';
			}
			else
			{
				vis[m + 1 - a] = true;
				b[m + 1 - a] = 'A';
			}
		}
		printf("%-*.*s\n", m, m, b + 1);
	}
}
```
其实 `vis[]` 没啥必要
{% endhideBlock %}

## C - 2-3 Moves

**题意：** 每次可以移动2或3个单位长度，从原点到n最少要移动多少次

**思路：** ~~易证：~~ $当|n|\ge 4时,ans = \left \lceil \frac{|n|}{3} \right \rceil $

{% hideBlock 题解 %}
```cpp
#include <bits/stdc++.h>
using namespace std;
int T, n;

int main()
{
	cin >> T;
	while(T --)
	{
		cin >> n;
		if(n == 1) cout << 2 << endl;
		else if(n == 2) cout << 1 << endl;
		else if(n == 3) cout << 1 << endl;
		else cout << int(ceil(n / 3.0)) << endl;
	}
}

```
{% endhideBlock %}

## D - Crossmarket
**题意：**现有两人P，Q，P要从左下角走到右上角，Q要从左上角走到右下角，P每走一格会在当前格制作一个传送门，当某一人在一个有传送门的格子时，可以传送到另一个具有传送门的格子，每走一格需要一个单位的能量，问两人最少一共需要多少能量
**思路：**显然，P需要的能量是固定的`m + n - 2`(曼哈顿距离)，而Q因为有P的传送，所以只要选择行列中较小的一个一直走，外加一次传送，即`min(m, n)`
{% hideBlock 题解 %}
```cpp
#include <bits/stdc++.h>
using namespace std;

int n, m, t;
int main()
{
	cin >> t;
	while(t --)
	{
		cin >> n >> m;
		if(m == 1 && n == 1) cout << 0 << endl;
		else cout << n + m - 2 + min(n , m) << endl;
	}
}
```
{% endhideBlock %}

## E - Also Try Minecraft
**题意：** 给定长度为n的数组，求特定区间内的总上升行程/下降行程长度
**思路：** 前缀和+后缀和
{% hideBlock 题解 %}
```cpp
#include<bits/stdc++.h>
using namespace std;
using LL = long long;
const int N = 2e5+10;
int a[N];
LL up[N], down[N];

int main()
{
    int n, m;
    scanf("%d%d", &n, &m);
    for(int i = 1; i <= n; i ++) scanf("%d", &a[i]);
    for(int i = 2; i <= n; i ++) up[i] = up[i - 1] + max(0, a[i - 1] - a[i]);
    for(int i = n - 1; i >= 1; i --) down[i] = down[i + 1] + max(0, a[i + 1] - a[i]);
    while(m --){
        int l,r;
        scanf("%d%d", &l, &r);
        if(l > r) printf("%lld\n",down[r] - down[l]);
        else printf("%lld\n",up[r] - up[l]);
    }
}
```
经某佬提醒，发现其实不用求后缀和，但是已经AC了就没写
{% endhideBlock %}

## F - Madoka and Formal Statement
**题意：** 给定一个数组a和数组b，每次操作为：如果`a[i] <= a[(i + 1) % n]` 那么 `a[i] ++` ，请问能否经过若干次操作使得a数组和b数组相等。
**思路：** 显然只要存在 `a[i] > b[i]` 就不成立，而我们要使 `a[i] == b[i]` 就要 `a[i]` 自增 `b[i] - a[i]` 次，所以只要判断 `b[i] <= b[i + 1] + 1`即可
{% hideBlock 题解 %}
```cpp
#include<bits/stdc++.h>
using LL = long long;
using namespace std;
const int N = 2e5 + 10;
LL T,n,M;
LL a[N],b[N]; 
signed main(){
    scanf("%lld",&T);
    while(T --){
        M = 0;
		bool ans = true;
        scanf("%lld",&n);
        for(int i = 1; i <= n; i ++) scanf("%lld",&a[i]);
        for(int i = 1; i <= n; i ++) scanf("%lld",&b[i]);
        a[n + 1] = a[1], b[n + 1] = b[1];
        for(int i=1;i<=n;i++){
            if(a[i] == b[i]) continue;
            if(a[i] > b[i] || b[i] > b[i+1] + 1){
            	ans = false;
				break;
			}
        }
        if(ans) puts("YES");
        else puts("NO");
    }
    return 0;
}
```
{% endhideBlock %}

## G - Emotes
**题意：** 给出n个表情，每个表情有一定的快乐值，求用m个表情，每个表情连续不超过k次的前提下，最大的欢乐值
**思路：** 贪心即可：一直选现在能选的快乐值最大的，也就是 `最大的 * k + 次大的 * 1` 无限循环
{% hideBlock 题解 %}
```cpp
#include <bits/stdc++.h>
using namespace std;
using LL = long long;
const int N = 1e6 + 100;
LL a[N];
int main()
{
	LL n, m, k;
	scanf("%lld%lld%lld", &n, &m, &k);
	for (long long i = 0; i < n; i++) scanf("%lld", &a[i]);
	sort(a, a + n, [](int a, int b){return a > b;});
	LL x = m / (k + 1), y = m % (k + 1);
	LL sum = (k * a[0] + a[1]) * x + y * a[0];
	printf("%lld\n", sum);
	return 0;
}
```
{% endhideBlock %}

## H - Magical Array
**题意：** 给定n个初始值相同的数组，共有两种操作：
- `选择一对(i,j),a[i-1]++,a[i]--,a[j]--,a[j+1]++`
- `选择一对(i,j),a[i-1]++,a[i]--,a[j]--,a[j+2]++`
只有一个数组被执行了若干次2 22操作，问哪个数组被执行了操作2 22，操作了多少次
**思路：** 其实是 ~~物理题~~，把数组理解为一个条状物，每个元素就是这个条状物上的一段单位长度，则根据质心守恒，操作一无法改变系统质心，操作二会使质心右偏，但是我们不用真的求出质心，只要比较相对大小就可以了

{% hideBlock 题解 %}
```cpp
#include<bits/stdc++.h>
using namespace std;
using pii = pair<int, int>;
using LL = long long;
int n,m;

int main()
{
    int t;
    scanf("%d", &t);
    while(t--)
    {
        scanf("%d%d", &n, &m);
        LL minn = 9e17, maxn = 0;
        int id = -1;
        for(int i = 0; i < n; i ++)
        {
            LL sum=0;
            for(int j = 0; j < m; j ++)
            {
                LL x;
                scanf("%lld", &x);
                sum += x * j;
            }
            minn = min(sum, minn);
            maxn = max(sum, maxn);
            if(maxn == sum) id = i + 1;
        }
        printf("%d %lld\n", id, maxn - minn);
    }
    return 0;
}
```
{% endhideBlock %}

## I - Katya and Segments Sets
最难得一题
**题意：** `k` 条线段，每条线段有一个颜色，颜色编号为 `1~n`，有 `m` 次询问 `a b x y`:
是否对任意 `[a,b]`，都有对应颜色的线段被 `[x,y]` 覆盖
**思路：**
首先只考虑一个集合，（我押中题了哈哈哈，只考虑一个集合的情况我前几天才做过，虽然没啥用），用 `f[x]` 表示 大于等于 `x` 的最小右端点，则只需判断 `f[x] ≤ y` 或者反过来也可以（比如我写的就是反过来的）
然后对于多个集合我们只要分别判断就可以了
刚好可以写一颗 **最大值线段树**，但是对每次询问都建一棵树不现实，所以考虑用 **主席树** 存储

{% hideBlock 题解 %}
```cpp
#include <bits/stdc++.h>
using namespace std;
const int N = 3e5 + 10;
vector<int> Hash;
//经典离散化，我习惯用vector
//但用int[]也可以
int idx, root[N];
//存储不同拷贝
int n, m, k;
int a, b, x, y;

inline int read()
{
    int s = 0;
    char c = getchar();
    while(c < '0' || c > '9') c = getchar();
    while(c >= '0' && 0 <= '9'){
    	s = s*10 + c - '0';
    	c = getchar();
	}
    return s;
}
//经典快读

struct node{
    int l, r, color;
}tree[N * 22], ori[N];
//ori[]是初始输入 tree[]是主席树本体 
//其实这里的变量名有误，
//对于ori来说是color，但对于tree来说应该是val(最小值)

void update(int l, int r, int &cur, int pre, int pos, int val){
    cur = ++ idx;
    tree[cur] = tree[pre];
    if(l == r){
        tree[cur].color = max(tree[cur].color, val);
        return;
    }
    int mid = (l + r) >> 1;
    if(pos <= mid) update(l, mid, tree[cur].l, tree[pre].l, pos, val);
    else update(mid + 1, r, tree[cur].r, tree[pre].r, pos, val);
    tree[cur].color = min(tree[tree[cur].l].color, tree[tree[cur].r].color);
}
//主席树模板，以颜色编号为位置

int query(int rt, int l, int r, int L, int R){
    if(L <= l && r <= R) return tree[rt].color;
	//覆盖即可返回
    int res = 0x3f3f3f3f;
    int mid = (l + r) >> 1;
    if(L <= mid) res = min(res, query(tree[rt].l, l, mid, L, R));
    if(R >= mid + 1) res = min(res, query(tree[rt].r, mid + 1, r, L, R));
    return res;
}
//每次询问对应版本

int main()
{
    n = read(), m = read(), k = read();
    for(int i = 1; i <= k; i ++){
        ori[i].l = read(), Hash.push_back(ori[i].r = read()), ori[i].color = read();
    }
    Hash.erase(unique(Hash.begin(), Hash.end()), Hash.end());//去重
    sort(Hash.begin(), Hash.end());
    sort(ori + 1, ori + 1 + k, [](const node &a, const node &b){return a.r < b.r;});
    //排序，这样生成的主席树才可减
    
	for(int i = 1; i <= k; i ++)
        update(1, n, root[i], root[i - 1], ori[i].color, ori[i].l);
    
    while(m --){
        a = read(), b = read(), x = read(), y = read();
		//这里的 upper_bound(Hash.begin(), Hash.end(), y) - Hash.begin()
		//就是离散化，因为我们只关注大小，不关注具体的值
		//所以用排序后的序号表示原来的数
        if(query(root[upper_bound(Hash.begin(), Hash.end(), y) - Hash.begin()], 1, n, a, b) >= x) puts("yes");
        else puts("no");
        //在线的，我这个改了几遍才发现，笑死
        fflush(stdout);
    }
}
```
{% endhideBlock %}

全部完成之后会得到一个 `Happy New Year!` 乐