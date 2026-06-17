import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;

public class Main2 {
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

  void printIntArray(int[] a) {
    for (int ele : a) {
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
}
