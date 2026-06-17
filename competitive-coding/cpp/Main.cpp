#pragma GCC optimize("O3,unroll-loops")
#if defined(__x86_64__) || defined(__i386__)
#pragma GCC target("avx2,bmi,bmi2,lzcnt,popcnt")
#endif

/* Created by Shahbaz Hasan Raja [deathblade1104] */

#include <iostream>
#include <vector>
#include <string>
#include <queue>
#include <set>
#include <unordered_set>
#include <map>
#include <unordered_map>
#include <stack>
#include <algorithm>
#include <cmath>

using namespace std;

/* ------------------ FastScanner Class ------------------ */
class FastScanner
{
public:
  string next()
  {
    string s;
    cin >> s;
    return s;
  }

  int nextInt()
  {
    int n;
    cin >> n;
    return n;
  }

  long long nextLong()
  {
    long long n;
    cin >> n;
    return n;
  }

  double nextDouble()
  {
    double d;
    cin >> d;
    return d;
  }

  vector<int> nextInts(int n)
  {
    vector<int> arr(n);
    for (int i = 0; i < n; i++)
      cin >> arr[i];
    return arr;
  }

  vector<long long> nextLongs(int n)
  {
    vector<long long> arr(n);
    for (int i = 0; i < n; i++)
      cin >> arr[i];
    return arr;
  }

  char nextChar()
  {
    char ch;
    cin >> ch;
    return ch;
  }
};

/* ------------------ Utility Classes ------------------ */
class CustomUtils
{
public:
  template <typename T>
  void printArray(const vector<T> &a)
  {
    for (const T &ele : a)
      cout << ele << " ";
    cout << "\n";
  }
};

class MathUtils
{
private:
  const long long MOD = 1000000007LL;

public:
  long long modPow(long long base, long long exp)
  {
    long long result = 1;
    base %= MOD;
    while (exp > 0)
    {
      if ((exp & 1) == 1)
        result = (result * base) % MOD;
      base = (base * base) % MOD;
      exp >>= 1;
    }
    return result;
  }

  long long modInverse(long long x)
  {
    return modPow(x, MOD - 2);
  }

  long long fractionMod(long long P, long long Q)
  {
    P %= MOD;
    Q %= MOD;
    long long invQ = modInverse(Q);
    return (P * invQ) % MOD;
  }
};

class StackUtils
{
private:
  stack<int> st;

public:
  vector<int> previousSmaller(const vector<long long> &arr, int N)
  {
    while (!st.empty())
      st.pop();
    vector<int> ans(N);

    for (int i = 0; i < N; i++)
    {
      while (!st.empty() && arr[st.top()] >= arr[i])
        st.pop();
      ans[i] = st.empty() ? -1 : st.top();
      st.push(i);
    }
    return ans;
  }

  vector<int> nextSmaller(const vector<long long> &arr, int N)
  {
    while (!st.empty())
      st.pop();
    vector<int> ans(N);
    ans[N - 1] = N;
    st.push(N - 1);

    for (int i = N - 2; i >= 0; i--)
    {
      while (!st.empty() && arr[st.top()] >= arr[i])
        st.pop();
      ans[i] = st.empty() ? N : st.top();
      st.push(i);
    }
    return ans;
  }
};

class DisjointSet
{
private:
  int n;
  vector<int> par, rank, size;

public:
  DisjointSet(int n)
  {
    this->n = n;
    par.resize(n + 1);
    rank.assign(n + 1, 0);
    size.assign(n + 1, 1);
    for (int i = 0; i <= n; i++)
      par[i] = i;
  }

  int findPar(int p)
  {
    if (par[p] == p)
      return p;
    return par[p] = findPar(par[p]); // Path compression
  }

  bool unite(int u, int v)
  {
    int p1 = findPar(u), p2 = findPar(v);
    if (p1 == p2)
      return false;

    if (rank[p1] < rank[p2])
      swap(p1, p2);

    par[p2] = p1;
    size[p1] += size[p2];
    if (rank[p1] == rank[p2])
      rank[p1]++;

    return true;
  }

  int getSize(int u) { return size[findPar(u)]; }
  bool isConnected(int u, int v) { return findPar(u) == findPar(v); }
};

class MergeSortSegmentTree
{
private:
  int n;
  vector<vector<int>> tree;

  int getMid(int start, int end) { return start + (end - start) / 2; }

  void build(int curr, int start, int end, const vector<int> &arr)
  {
    if (start > end)
      return;
    if (start == end)
    {
      tree[curr] = {arr[start]};
      return;
    }

    int mid = getMid(start, end);
    build(curr * 2 + 1, start, mid, arr);
    build(curr * 2 + 2, mid + 1, end, arr);

    // Fix 1: Pure C++ STL Merge (Fast & Bug-Free)
    tree[curr].resize(tree[curr * 2 + 1].size() + tree[curr * 2 + 2].size());
    merge(tree[curr * 2 + 1].begin(), tree[curr * 2 + 1].end(),
          tree[curr * 2 + 2].begin(), tree[curr * 2 + 2].end(),
          tree[curr].begin());
  }

  int query(int curr, int start, int end, int left, int right, int val)
  {
    if (start > end || left > end || right < start)
      return 0;

    if (left <= start && end <= right)
    {
      // Fix 2: C++ native upper_bound directly counts elements <= val
      return distance(tree[curr].begin(), upper_bound(tree[curr].begin(), tree[curr].end(), val));
    }

    int mid = getMid(start, end);
    return query(curr * 2 + 1, start, mid, left, right, val) +
           query(curr * 2 + 2, mid + 1, end, left, right, val);
  }

public:
  MergeSortSegmentTree(int n) : n(n)
  {
    tree.resize(4 * n);
  }

  void build(const vector<int> &arr) { build(0, 0, n - 1, arr); }
  int query(int left, int right, int val) { return query(0, 0, n - 1, left, right, val); }
};


/* ------------------ Main Solution ------------------ */
class Solution
{
private:
  // Object instantiates fresh on every run.
  FastScanner in;
  CustomUtils util;

  void solve()
  {
    int n = in.nextInt(), q = in.nextInt();
    int maxKg = (2 * (int)(1e5)) + 1;
    vector<int> kidsRating(n + 1), kidsToKg(n + 1);
    vector<multiset<int>> mp(maxKg);

    for (int i = 1; i <= n; i++)
    {
      int rating = in.nextInt(), kg = in.nextInt();
      kidsRating[i] = rating;
      kidsToKg[i] = kg;
      mp[kg].insert(rating);
    }

    multiset<int> maximaSt;

    for (int i = 1; i < maxKg; i++)
    {
      if (mp[i].size() == 0)
        continue;

      maximaSt.insert(*mp[i].rbegin());
    }

    while (q--)
    {
      int kidsIdx = in.nextInt(), newKg = in.nextInt();
      int currKg = kidsToKg[kidsIdx], currKidRating = kidsRating[kidsIdx];

      if (currKg == newKg)
        continue;

      // Delete 'from' KG maxima from allMaxima
      maximaSt.erase(maximaSt.find(*mp[currKg].rbegin()));

      // Delete 'to' KG maxima from allMaxima, if newOne is not empty
      if (mp[newKg].size() > 0)
      {
        maximaSt.erase(maximaSt.find(*mp[newKg].rbegin()));
      }

      // Delete Kid from old KG multiset
      mp[currKg].erase(mp[currKg].find(currKidRating));

      // Add Kid to new KG multiset
      mp[newKg].insert(currKidRating);
      // Change kidToKgMapping
      kidsToKg[kidsIdx] = newKg;

      // Update maximaSet from new KG
      maximaSt.insert(*mp[newKg].rbegin());

      // Update maximaSet from old KG if old KG is not empty
      if (mp[currKg].size())
      {
        maximaSt.insert(*mp[currKg].rbegin());
      }

      cout << *maximaSt.begin() << endl;
    }
  }

public:
  void main()
  {
    int t = 1;
    // t = in.nextInt(); // Uncomment for multiple test cases
    while (t-- > 0)
    {
      solve();
    }
  }
};

/* ------------------ IO Setup ------------------ */
void setupIO()
{
// 2. Automatic Local File I/O (skipped on online judges)
#ifndef ONLINE_JUDGE
  if (freopen("inputf.in", "r", stdin) == NULL)
  {
    cerr << "Warning: inputf.in not found!" << endl;
  }
  freopen("outputf.in", "w", stdout);
#endif
}

int main()
{

  // 1. Fast IO Setup
  ios_base::sync_with_stdio(false);
  cin.tie(NULL);
  setupIO();
  Solution sol;
  sol.main();
  return 0;
}