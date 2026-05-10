
/* Created by Shahbaz Hasan Raja [deathblade1104] */

/*
 * Ordered Set equivalents (C++ set ↔ Java TreeSet)
 *
 * C++: lower_bound(x)  → first element >= x
 * Java: set.ceiling(x)
 *
 * C++: upper_bound(x)  → first element > x
 * Java: set.higher(x)
 *
 * Java-only helpers:
 * set.floor(x)  → largest element <= x
 * set.lower(x)  → largest element < x
 *
 * All operations are O(log n) (Red-Black Tree).
 *
 * Common CF pattern (finding segment around x):
 *
 * Integer right = set.ceiling(x); // >= x
 * Integer left  = set.lower(x);   // < x
 *
 * If no such element exists → methods return null.
 */

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Queue;
import java.util.Stack;
import java.util.TreeMap;

public class Main {
  private static void setupIO() {
    try {
      if (new java.io.File("inputf.in").exists()) {
        System.setIn(new java.io.FileInputStream("inputf.in"));
      }
      if (new java.io.File("outputf.in").getParentFile() == null
          || new java.io.File("outputf.in").getParentFile().exists()) {
        System.setOut(new java.io.PrintStream(new java.io.FileOutputStream("outputf.in")));
      }
    } catch (Exception e) {
      System.err.println("I/O setup error: " + e);
    }
  }

  public static void main(String[] args) throws Exception {
    setupIO();
    Solution sol = new Solution();
    sol.main();
  }
}

/* ------------------ FastScanner Class ------------------ */
class FastScanner {
  private final static int BUFFER_SIZE = 1 << 16; // 64 KB
  private final byte[] buffer = new byte[BUFFER_SIZE];
  private int bufferPointer = 0, bytesRead = 0;
  private final BufferedInputStream in;

  public FastScanner() {
    in = new BufferedInputStream(System.in, BUFFER_SIZE);
  }

  public FastScanner(String file) {
    BufferedInputStream temp;
    try {
      temp = new BufferedInputStream(new FileInputStream(file), BUFFER_SIZE);
    } catch (Exception e) {
      temp = new BufferedInputStream(System.in, BUFFER_SIZE);
    }
    in = temp;
  }

  private byte read() {
    if (bufferPointer == bytesRead) {
      try {
        bytesRead = in.read(buffer);
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
      if (bytesRead == -1)
        return -1; // EOF
      bufferPointer = 0;
    }
    return buffer[bufferPointer++];
  }

  public String next() {
    StringBuilder sb = new StringBuilder();
    byte c = skipBlanks();
    while (c > ' ') { // while not space or newline
      sb.append((char) c);
      c = read();
    }
    return sb.toString();
  }

  public String nextLine() {
    StringBuilder sb = new StringBuilder();
    byte c = read();
    while (c != -1 && c != '\n') {
      sb.append((char) c);
      c = read();
    }
    return sb.toString();
  }

  public int nextInt() {
    return (int) nextLong();
  }

  public long nextLong() {
    byte c = skipBlanks();
    boolean neg = (c == '-');
    if (neg)
      c = read();

    long val = 0;
    while (c >= '0' && c <= '9') {
      val = val * 10 + (c - '0');
      c = read();
    }
    return neg ? -val : val;
  }

  public double nextDouble() {
    return Double.parseDouble(next());
  }

  /* ---------- Array Helpers ---------- */
  public int[] nextInts(int n) {
    int[] arr = new int[n];
    for (int i = 0; i < n; i++)
      arr[i] = nextInt();
    return arr;
  }

  public long[] nextLongs(int n) {
    long[] arr = new long[n];
    for (int i = 0; i < n; i++)
      arr[i] = nextLong();
    return arr;
  }

  /* ---------- Optional Convenience ---------- */
  public boolean hasNext() {
    byte c;
    while ((c = read()) != -1) {
      if (c > ' ') {
        bufferPointer--; // unread one byte
        return true;
      }
    }
    return false;
  }

  /* ---------- Internal Helper ---------- */
  private byte skipBlanks() {
    byte c = read();
    while (c <= ' ' && c != -1)
      c = read();
    return c;
  }
}

class Solution {
  private static final FastScanner in = new FastScanner();
  private static final PrintWriter out = new PrintWriter(System.out);
  private static final CustomUtils util = new CustomUtils();
  private static final int[] dir = { 1, 0, -1, 0, 1 };

  public void main() {
    int t = 1;
    while (t-- > 0)
      solve();
    out.close();
  }

  private void solve() {
    int N = in.nextInt();
    final long maxVal = (long) (1e9);

    String[] pows = new String[30];
    for (int i = 0; i < 30; i++) {
      pows[i] = String.valueOf(1 << i);
    }

    HashSet<Long> seen = new HashSet<>();
    List<Long> list = new ArrayList<>();
    Queue<String> queue = new ArrayDeque<>();
    queue.offer("");

    while (!queue.isEmpty()) {
      String curr = queue.poll();
      for (String p : pows) {
        String nxt = curr + p;
        if (nxt.length() > 10)
          continue;

        long valLong = Long.parseLong(nxt);
        if (valLong <= maxVal) {
          if (!seen.contains(valLong)) {
            seen.add(valLong);
            list.add(valLong);
            queue.add(nxt);
          }
        }
      }
    }

    Collections.sort(list);
    out.println(list.get(N - 1));

  }
}

class MergeSortSegmentTree {

  private static final CustomUtils utils = new CustomUtils();

  int n;
  ArrayList<Integer>[] tree;

  @SuppressWarnings("unchecked")
  MergeSortSegmentTree(int n) {
    this.n = n;
    this.tree = new ArrayList[4 * n];
    for (int i = 0; i < 4 * n; i++) {
      tree[i] = new ArrayList<>();
    }
  }

  void build(int[] arr) {
    build(0, 0, n - 1, arr);
    return;
  }

  private int getMid(int start, int end) {
    return (start + (end - start) / 2);
  }

  private void build(int curr, int start, int end, int[] arr) {
    if (start > end) {
      return;
    }

    if (start == end) {
      tree[curr].clear();
      tree[curr].add(arr[start]);
      return;
    }

    int mid = getMid(start, end);
    build(curr * 2 + 1, start, mid, arr);
    build(curr * 2 + 2, mid + 1, end, arr);
    tree[curr] = utils.mergeInSortedOrder(tree[curr * 2 + 1], tree[curr * 2 + 2]);
    return;
  }

  public void update(int index, int value) {
    update(0, 0, n - 1, index, value);
    return;
  }

  private void update(int curr, int start, int end, int index, int value) {
    if (start > end || index < start || index > end) {
      return;
    }

    if (start == end) {
      tree[curr].clear();
      tree[curr].add(value);
      return;
    }

    int mid = getMid(start, end);

    if (index <= mid) {
      update(curr * 2 + 1, start, mid, index, value);
    } else {
      update(curr * 2 + 2, mid + 1, end, index, value);
    }
    tree[curr] = utils.mergeInSortedOrder(tree[curr * 2 + 1], tree[curr * 2 + 2]);
    return;
  }

  public int query(int left, int right, int val) {
    return query(0, 0, n - 1, left, right, val);
  }

  private int query(int curr, int start, int end, int left, int right, int val) {
    if (start > end || left > end || right < start) {
      return 0;
    }

    if (left <= start && end <= right) {
      return utils.lowerBound(tree[curr], val);
    }

    int mid = getMid(start, end);
    int leftResult = query(curr * 2 + 1, start, mid, left, right, val);
    int rightResult = query(curr * 2 + 2, mid + 1, end, left, right, val);
    return leftResult + rightResult;
  }
}

class CustomTreeMap<T> {
  private final TreeMap<T, Integer> map = new TreeMap<T, Integer>();
  private int nonUniqueSize = 0;

  public void add(T x) {
    map.put(x, map.getOrDefault(x, 0) + 1);
    nonUniqueSize++;
  }

  public void remove(T x) {
    int currVal = map.getOrDefault(x, 0);

    // No entry in map do nothing
    if (currVal == 0)
      return;

    nonUniqueSize--;
    if (currVal <= 1) {
      map.remove(x);
      return;
    }
    map.put(x, currVal - 1);
  }

  public int get(T x) {
    return map.getOrDefault(x, 0);
  }

  public boolean containsKey(T x) {
    return map.containsKey(x);
  }

  public int size() {
    return map.size();
  }

  public T firstKey() {
    return map.firstKey();
  }

  public T lastKey() {
    return map.lastKey();
  }

  public int nonUniqueSize() {
    return nonUniqueSize;
  }

  public void print(PrintWriter out) {
    out.println(this.map);
  }
}

class CustomHashMap<T> {
  private final HashMap<T, Integer> map = new HashMap<T, Integer>();
  private int nonUniqueSize = 0;

  public void add(T x) {
    map.put(x, map.getOrDefault(x, 0) + 1);
    nonUniqueSize++;
  }

  public void remove(T x) {
    int currVal = map.getOrDefault(x, 0);

    // No entry in map do nothing
    if (currVal == 0)
      return;

    nonUniqueSize--;
    if (currVal <= 1) {
      map.remove(x);
      return;
    }
    map.put(x, currVal - 1);
  }

  public void removeAll(T x) {
    map.remove(x);
  }

  public int get(T x) {
    return map.getOrDefault(x, 0);
  }

  public boolean containsKey(T x) {
    return map.containsKey(x);
  }

  public int size() {
    return map.size();
  }

  public int nonUniqueSize() {
    return nonUniqueSize;
  }

  public void invert(Map<Integer, Integer> freq) {
    for (T k : map.keySet()) {
      int val = map.get(k);
      freq.put(val, freq.getOrDefault(val, 0) + 1);
    }
  }
}

class Pair<T1, T2> {
  public T1 first;
  public T2 second;

  Pair(T1 f, T2 s) {
    this.first = f;
    this.second = s;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (!(o instanceof Pair<?, ?>))
      return false;
    Pair<?, ?> pair = (Pair<?, ?>) o;
    return Objects.equals(first, pair.first) &&
        Objects.equals(second, pair.second);
  }

  @Override
  public int hashCode() {
    return Objects.hash(first, second);
  }
}

class MathUtils {

  private static final long MOD = 1000000007L;

  long modPow(long base, long exp) {
    long result = 1;
    base %= MOD;
    while (exp > 0) {
      if ((exp & 1) == 1)
        result = (result * base) % MOD;
      base = (base * base) % MOD;
      exp >>= 1;
    }
    return result;
  }

  long modInverse(long x) {
    return modPow(x, MOD - 2);
  }

  long fractionMod(long P, long Q) {
    P %= MOD;
    Q %= MOD;
    long invQ = modInverse(Q);
    return (P * invQ) % MOD;
  }
}

class StackUtils {
  private final Stack<Integer> st = new Stack<>();

  int[] previousSmaller(long[] arr, int N) {
    st.clear();
    int[] ans = new int[N];

    for (int i = 0; i < N; i++) {

      while (!st.isEmpty() && arr[st.peek()] >= arr[i])
        st.pop();

      ans[i] = st.isEmpty() ? -1 : st.peek();

      st.push(i);
    }

    return ans;
  }

  int[] nextSmaller(long[] arr, int N) {
    st.clear();
    int[] ans = new int[N];
    ans[N - 1] = N;
    st.push(N - 1);

    for (int i = N - 2; i >= 0; i--) {

      while (!st.isEmpty() && arr[st.peek()] >= arr[i])
        st.pop();

      ans[i] = st.isEmpty() ? N : st.peek();

      st.push(i);
    }

    return ans;
  }

  int[] previousGreater(long[] arr, int N) {
    st.clear();
    int[] ans = new int[N];

    for (int i = 0; i < N; i++) {

      while (!st.isEmpty() && arr[st.peek()] <= arr[i])
        st.pop();

      ans[i] = st.isEmpty() ? -1 : st.peek();

      st.push(i);
    }

    return ans;
  }

  int[] nextGreater(long[] arr, int N) {
    st.clear();
    int[] ans = new int[N];
    ans[N - 1] = N;
    st.push(N - 1);

    for (int i = N - 2; i >= 0; i--) {

      while (!st.isEmpty() && arr[st.peek()] <= arr[i])
        st.pop();

      ans[i] = st.isEmpty() ? N : st.peek();

      st.push(i);
    }

    return ans;
  }

}

class CustomUtils {

  void swapInIntArray(int[] a, int x, int y) {
    int temp = a[x];
    a[x] = a[y];
    a[y] = temp;
    return;
  }

  <T> void swapInList(ArrayList<T> a, int x, int y) {
    T temp = a.get(x);
    a.set(x, a.get(y));
    a.set(y, temp);
    return;
  }

  void reverseInIntArray(int[] a, int l, int h) {
    while (l < h) {
      swapInIntArray(a, l++, h--);
    }
  }

  <T> void reverseInList(ArrayList<T> a, int l, int h) {
    while (l < h) {
      swapInList(a, l++, h--);
    }
  }

  void printArray(int[] a) {
    for (int ele : a) {
      System.out.print(ele + " ");
    }
    System.out.println();
  }

  void printArray(long[] a) {
    for (long ele : a) {
      System.out.print(ele + " ");
    }
    System.out.println();
  }

  void printArray(double[] a) {
    for (double ele : a) {
      System.out.print(ele + " ");
    }
    System.out.println();
  }

  void printArray(Object[] a) {
    for (Object ele : a) {
      System.out.print(ele + " ");
    }
    System.out.println();
  }

  <T> void printArrayList(ArrayList<T> a) {
    for (T ele : a) {
      System.out.print(ele + " ");
    }
    System.out.println();
  }

  <T extends Comparable<T>> boolean nextPermutation(ArrayList<T> arr) {
    int n = arr.size(), pivot = -1;
    for (int i = n - 2; i >= 0; i--) {
      if (arr.get(i).compareTo(arr.get(i + 1)) < 0) {
        pivot = i;
        break;
      }
    }

    if (pivot == -1) {
      return false;
    }

    int swapIndex = -1;
    for (int i = n - 1; i >= 0; i--) {
      if (arr.get(pivot).compareTo(arr.get(i)) < 0) {
        swapIndex = i;
        break;
      }
    }

    swapInList(arr, swapIndex, pivot);
    reverseInList(arr, pivot + 1, n - 1);
    return true;
  }

  ArrayList<Integer> mergeInSortedOrder(ArrayList<Integer> arr1, ArrayList<Integer> arr2) {
    int i = 0, j = 0;
    int totalSize = arr1.size() + arr2.size();
    ArrayList<Integer> result = new ArrayList<>(totalSize);
    while (i < arr1.size() && j < arr2.size()) {
      if (arr1.get(i) < arr2.get(j)) {
        result.add(arr1.get(i++));
      } else {
        result.add(arr2.get(j++));
      }
    }

    while (i < arr1.size()) {
      result.add(arr1.get(i++));
    }

    while (j < arr2.size()) {
      result.add(arr2.get(j++));
    }

    return result;
  }

  int lowerBound(ArrayList<Integer> arr, int val) {
    int l = 0, r = arr.size() - 1, ans = -2;
    while (l <= r) {
      int mid = l + (r - l) / 2;
      if (arr.get(mid) <= val) {
        ans = mid;
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    return ans;
  }

  /*
   * Lower Bound -> (arr, x) :
   * 1. first element >=x
   * 2. Index of largest element <x
   * Default : length of arr
   */
  int lowerBound(long[] arr, int x) {
    int lo = 0, hi = arr.length - 1;
    int ans = -1;
    while (lo <= hi) {
      int mid = lo + (hi - lo) / 2;
      if (arr[mid] >= x) {
        ans = mid;
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    }
    return ans;
  }

  /*
   * Upper Bound -> (arr, x) :
   * 1. first element >x
   * 2. Index of largest element <x
   * Default : length of arr
   */
  int upperBound(long[] arr, int x) {
    int lo = 0, hi = arr.length - 1;
    int ans = -1;
    while (lo <= hi) {
      int mid = lo + (hi - lo) / 2;
      if (arr[mid] > x) {
        ans = mid;
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    }
    return ans;
  }

}

class DisjointSet {
  int n;
  int[] par, rank, size;

  DisjointSet(int n) {

    par = new int[n + 1];
    rank = new int[n + 1];
    size = new int[n + 1];

    for (int i = 0; i <= n; i++) {
      par[i] = i;
      rank[i] = 0;
      size[i] = 1;
    }
  }

  int findPar(int p) {
    if (par[p] == p)
      return p;

    return par[p] = findPar(par[p]);
  }

  boolean union(int u, int v) {

    int p1 = findPar(u), p2 = findPar(v);

    if (p1 == p2)
      return false;

    if (rank[p1] < rank[p2]) {
      return union(v, u);
    }

    par[p2] = p1;
    size[p1] += size[p2];
    if (rank[p1] == rank[p2]) {
      rank[p1]++;
    }

    return true;
  }

  int getParent(int u) {
    return findPar(u);
  }

  int getSize(int u) {
    return size[findPar(u)];
  }

  boolean isConnected(int u, int v) {
    return findPar(u) == findPar(v);
  }

}

class DisjointSet2D {
  int n, m, sz;
  int[] par, rank, size;

  DisjointSet2D(int n, int m) {
    this.n = n;
    this.m = m;
    this.sz = n * m;

    par = new int[sz];
    rank = new int[sz];
    size = new int[sz];

    for (int i = 0; i < sz; i++) {
      par[i] = i;
      rank[i] = 0;
      size[i] = 1;
    }
  }

  private int findPar(int p) {
    if (par[p] == p)
      return p;
    return par[p] = findPar(par[p]);
  }

  private int getIndex(int r, int c) {
    return (r * m) + c;
  }

  void union(int r1, int c1, int r2, int c2) {
    int u = getIndex(r1, c1), v = getIndex(r2, c2);
    int p1 = findPar(u), p2 = findPar(v);

    if (p1 == p2)
      return;

    if (rank[p1] > rank[p2]) {
      par[p2] = p1;
      size[p1] += size[p2];
    } else if (rank[p1] < rank[p2]) {
      par[p1] = p2;
      size[p2] += size[p1];
    } else {
      par[p2] = p1;
      size[p1] += size[p2];
      rank[p1]++;
    }
  }

  int getParent(int r, int c) {
    return findPar(getIndex(r, c));
  }

  int getSize(int r, int c) {
    return size[getParent(r, c)];
  }

  boolean isConnected(int r1, int c1, int r2, int c2) {
    return getParent(r1, c1) == getParent(r2, c2);
  }
}
