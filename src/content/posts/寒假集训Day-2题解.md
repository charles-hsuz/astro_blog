---
title: 寒假集训Day-2题解
tags: 'ACM,集训'
categories: 刷题笔记
slug: a721148
date: 2023-01-03 17:04:28
cover: 'https://picbed-1304952903.cos.ap-beijing.myqcloud.com/pic/blog202302091658477.png'
---
# 寒假集训Day-2题解
今天的笔记还没发，主要是我甚至连昨天的都还没写完😢

## A - Registration System
啥都不说了这题（其实应该可以写字典树）
{% hideBlock 题解 %}
```c
#include <bits/stdc++.h>
using namespace std;
int n;
unordered_map<string, int> names;

int main()
{
    cin >> n;
    while(n--)
    {
        string s;
        cin>>s;
        names[s]++;
        if(names[s]==1)
            cout<<"OK"<<endl;
        else
            cout<<s<<names[s]-1<<endl;
    }
    return 0;
}
```
{% endhideBlock %}

## B - Tom Riddle's Diary
这跟第一题不能说是一模一样，~~只能说是毫无区别~~

{% hideBlock 题解 %}
```c
#include<bits/stdc++.h>
using namespace std;
const int N = 1e6+10;
unordered_map<string, int> names;
int n;

int main()
{
	cin >> n;
    while(n--)
    {
        string s;
        cin>>s;
        names[s]++;
        if(names[s] != 1)
            cout<<"YES"<<endl;
        else
            cout<<"NO"<<endl;
    }
    return 0;
} 

```
{% endhideBlock %}

## C - Boxes Packing
**题意：** 给定n个箱子，每个箱子都有自己的边长，小箱子可以装进大箱子里，但是只能装一个，问最后能看见多少箱子。
**思路：** 就是能组成多少个俄罗斯套娃，先贪心一下，从最小的箱子开始，外面套次小的，以此类推，直到没有更大的，这是一个，然后从剩下的箱子里继续找最小的……
这样写就能过，但是还有另一种做法，假设一共套了x个娃，则易证：剩下的单独的箱子一定都是相同大小的（假设为y），并且每个套娃都必然包含一个大小为y的箱子，所以实际上只要找出现次数最多的数字就行了

{% hideBlock 题解 %}
```c
#include <bits/stdc++.h>
using namespace std;

int n, i;
unordered_map<int, int> box;

int main()
{
	cin >> n;
	while(n --)
	{
		cin >> i;
		box[i] ++;
	}
	int ans = 0;
	for(auto x : box) ans = max(ans, x.second);
	cout << ans << endl;
}
```
{% endhideBlock %}

## D - Indian Summer
跟AB一模一样
{% hideBlock 题解 %}
```c
#include <bits/stdc++.h>
using namespace std;
int n, ans;
set<string> l;

int main()
{
    cin >> n;
    getchar();
    while(n--)
    {
    	string s;
        getline(cin, s);
        l.insert(s);
    }
    cout << l.size() << endl;
    return 0;
}
```
{% endhideBlock %}

## E - New Year and Counting Cards
**题意：** 有n张卡牌，每张卡牌上有一个数字和一个字母，但是你只能看到其中一者，你可以选择翻开卡牌来看另一者是什么，现在有规则：元音字母所对数字必然为偶数。问最少翻开多少张卡牌可以确定该牌组满足/不满足规则。
**思路：** 元音字母所对数字必然为偶数 等价于 奇数所对字母必然为辅音字母 只要判断这两个条件就好了。所以数一数奇数和元音字母的个数

{% hideBlock 题解 %}
所以这题为啥会出在 `STL` 里
```c
#include <bits/stdc++.h>
using namespace std;
int ans;
string a;

int main(){
	cin>>a;
	for(auto &c:a)
	{
	    if(c=='1'||c=='3'||c=='5'||c=='7'||c=='9')
			ans ++;
		else if(c=='a'||c=='e'||c=='i'||c=='o'||c=='u')
			ans ++;
	}
	cout << ans << endl;
	return 0;
} 
```
{% endhideBlock %}

## F - Right-Left Cipher
**题意：** 给定一个字符串，对其进行加密，加密方式为：先写下第一个字母，然后在其右边写下第二个，左边第三个……现在给你密文，要求你解密
**思路：** 观察规律就好了
{% hideBlock 题解 %}
```c
#include<bits/stdc++.h>
using namespace std;
string s;
int l, r, len;
int main(){
	cin >> s;
	len = s.size();
	l = len/2 - !(len & 1);
	r = len - l - !(len & 1);
	while(l > -1) { 
		cout << s[l--];
		if(r < len) cout << s[r++];
	}
	cout << endl;
	return 0;
}

```
{% endhideBlock %}

## G - Travel Cards
**题意：** n次出行，每次的花费为a，若上一次终点与本次起点相同，则花费为b，可以购买k张旅行卡，每张花费为f，旅行卡可绑定两个地点，在这两个地点之间的直接通行不需要额外花费
**思路：** 因为旅行卡的花费不考虑方向，所以可以先把所有需要经过的路径的总花费求出来，然后从最大的开始用旅行卡抵消就可以了
{% hideBlock 题解 %}
```c
#include <bits/stdc++.h>
using namespace std;
#define cat(a, b) (a > b ? b + a : a + b)
// 不考虑顺序
unordered_map<string, int> mp;

string pre, cur;
int n, a, b, k, f, ans;

int main()
{
    cin >> n >> a >> b >> k >> f;
    for(int i = 0; i < n; i ++){
        cin >> pre;
        if(pre == cur){
            cin >> cur;
            mp[cat(pre, cur)] += b;
            ans += b;
        }
        else{
            cin >> cur;
            mp[cat(pre, cur)] += a;
            ans += a;

        }
    }
    vector<pair<string, int>> cpy(mp.begin(), mp.end());
    //无法直接对map排序，所有需要一个拷贝
    
    sort(cpy.begin(), cpy.end(), [](const auto &x, const auto &y){
		return x.second > y.second;
	});
    for(auto x = cpy.begin(); x != cpy.end(); x ++){
        if(x->second < f || !(k--)) break;
        ans -= x->second - f;
    }
    cout << ans << endl;
}
```
{% endhideBlock %}

## H - Anton and Lines
**题意：** 给定n条直线（斜截式），求某一开区间内是否存在交点
**分析：** 简单画图可知，某一区间内两条线段有交点（开区间）的充要条件是，左右端点顺序不同（比如 $y_{1左} < y_{2左}\,\,且\,\,y_{1右} > y_{2右}$）
所以提前处理处所有直线被区间所截线段的左右端点的 y 值，再按左端点 y 排序，看右端点 y 是否也满足非严格递增/递减即可
{% hideBlock 题解 %}
```c
#include <bits/stdc++.h>
using namespace std;
vector<pair<long long, long long>> p;
long long n, k, b;
long long l, r;
int main()
{
	scanf("%lld%lld%lld", &n, &l, &r);
	while(n --)
	{
		scanf("%lld%lld", &k, &b);
		p.push_back(make_pair(k * l + b, k * r + b));
	}
	sort(p.begin(), p.end());
	for(auto x = p.begin() + 1; x != p.end(); x ++)
	{
		if(x->second < (x - 1)->second)
		{
			printf("YES\n");
			return 0;
		}
	}
	printf("NO\n");
	return 0;
}
```
{% endhideBlock %}

## I - Block Towers
**题意：** 有n个塔，每个塔有一定数量的方块，你只能从高的塔上拿一个方块放到较矮的塔上，问不限次操作后，第一个塔上最多有多少方块

**思路：** 很简单，每次找到大于第一座塔的最小值，然后全挪过来即可($a_1 = \left \lceil \frac{a_1 + a_i}{2} \right \rceil $)

{% hideBlock 题解 %}
```c
#include <bits/stdc++.h>
using namespace std;
const int N = 2e5 + 10;
int t, n;
int a[N];

int main()
{
	scanf("%d", &t);
	while(t --)
	{
		scanf("%d", &n);
		for(int i = 1; i <= n; i ++) scanf("%d", &a[i]);
		sort(a + 2, a + n + 1);
		for(int i = 2; i <= n; i ++) 
			if(a[i] > a[1])
				a[1] = int(ceil((a[1] + a[i])/2.0));
		printf("%d\n", a[1]);
	}
}
```
{% endhideBlock %}

## J - Database
AB翻版

{% hideBlock 题解 %}
```c
#include <bits/stdc++.h>
using namespace std;
int T, N, R, I, C;
unordered_map<string, int> mp;

int main()
{
	scanf("%d", &T);
	for(int j = 1; j <= T; j ++)
	{
		bool flag = false;
		mp.clear();
		scanf("%d%d", &N, &R);
		for(int i = 0; i < R; i ++)
		{
			scanf("%d%d", &I, &C);
			mp[to_string(I) + to_string(C)] ++;
			if(mp[to_string(I) + to_string(C)] > 1) flag = true;			
		}
		if(flag) printf("Scenario #%d: impossible\n", j);
		else printf("Scenario #%d: possible\n", j);
	}
}
```
{% endhideBlock %}

## K - SOLVEIT
**题意：** 这个题我真的读了好几遍才读懂😢，就是给你一个数组，每次对其中的某一位置进行标记，或者对某一位置进行询问，询问就是找到下标大于等于给定值的有标记的最小下标
**思路：** 就硬写，每次标记向前遍历到上一个标记位置，全部指向此标记下标即可

{% hideBlock 题解 %}
```c
#include <bits/stdc++.h>
using namespace std;

const int N = 1e6 + 10;
int n, q;
bool b[N];
int a[N];
int t, k;

int main()
{
	memset(a, -1, sizeof a);
	scanf("%d%d", &n, &q);
	for(int i = 1; i <= q; i ++)
	{
		scanf("%d%d", &t, &k);
		if(t == 1)
		{
			for(int j = k; j >= 1 && !b[j]; j --) a[j] = k;
			b[k] = true;
		}
		else printf("%d\n", a[k]);
	}
}

```
{% endhideBlock %}

## L - Ada and List
这个就不用说题意了吧，就是模拟链表
但是时间卡的太死了（也可能是我菜）`vector`和`dequeue`都tle了，最后只好动用终极杀器 `rope`

{% hideBlock 题解 %}
```c
#include <bits/stdc++.h>
#include <ext/rope>
using namespace std;
using namespace __gnu_cxx;
rope<int> r;
int n, m, a;
int op, k, x;

void read(int &x){
	x = 0;
	char c = getchar();
	while(c > '9' || c < '0') c = getchar();
	while(c <= '9' && c >= '0'){
		x = 10 * x + c - '0';
		c = getchar();
	}
	return;
}

int main(){
	read(n),read(m);
	for(int i = 0; i < n; i ++){
		read(a);
		r.push_back(a);
	}
	while(m --){
		read(op), read(k);
		if(op == 1){
			read(x);
			r.insert(k - 1, x);
		}
		else if(op == 2){
			r.erase(k - 1, 1);
		}
		else if(op == 3){
			printf("%d\n", r[k - 1]);
		}
	}
}
```
{% endhideBlock %}

## M - Reduce the array
**题意(合并果子)：** 有n堆果子，每一次可以合并两堆果子，消耗的体力等于两堆果子的重量之和。可以看出，所有的果子经过n-1次合并之后，就只剩下一堆了。求最少消耗。
**思路：** 贪心即可，如果每一步所消耗的力气最少，那么n-1步后，所消耗的总力气就是最小的。也就是说每次合并后的都要进行排序，直接使用优先队列，以重量为优先级。

{% hideBlock 题解 %}
```c
#include <bits/stdc++.h>
using namespace std;
const int N = 1e6 + 10;
int T, n;

int main()
{
	scanf("%d", &T);
	while(T --)
	{
		scanf("%d", &n);
		priority_queue<int, vector<int>, greater<int>> p;
		for(int i = 0; i < n; i ++)
		{
			int x;
			scanf("%d", &x);
			p.push(x);
		}
		long long sum = 0, xx = 0;
		while(p.size() > 1)
		{
			xx = p.top();
			p.pop();
			xx += p.top();
			p.pop();
			sum += xx;
			p.push(xx);
		}
		printf("%lld\n", sum);
	}
	return 0;
}
```
{% endhideBlock %}