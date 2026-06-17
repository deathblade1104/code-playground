# Competitive Coding — C++

Self-contained C++ setup. **Is folder ko VS Code mein kholo** (`File → Open Folder → cpp`), phir `Main.cpp` focus karke `Cmd+Shift+B`.

## Build tasks (`.vscode/tasks.json`)

| Task | Kya karta hai |
|------|----------------|
| **C++: build & run (debug checks)** — *default* | `g++-15 -std=c++17 -g -O1 -D_GLIBCXX_DEBUG -D_GLIBCXX_ASSERTIONS` → out-of-bounds `vector[]`, bad-iterator, `erase(end())` jaise runtime errors **terminal pe clear message ke saath** aate hain. `timeout 10` se infinite loop bhi pakda jaata hai. |
| **C++: build & run (fast -O2)** | `g++-15 -std=c++17 -O2` — bina debug-checks, speed / large-input testing ke liye. (`Cmd+Shift+P → Tasks: Run Task`) |

## I/O

`Main.cpp` `setupIO()` mein `freopen("inputf.in", ...)` / `freopen("outputf.in", ...)` use karta hai (cwd = yeh folder). Input `inputf.in` mein daalo, output `outputf.in` mein milega. **Dono files gitignored hain** (local-only test data).

## Compiler

`g++-15` (Homebrew GCC). Apple clang use nahi karte kyunki usme `<bits/stdc++.h>` nahi hota. Sanitizers (`-fsanitize=address/undefined`) iss Mac pe g++ ke saath link nahi hote, isliye runtime checks ke liye libstdc++ debug mode use kiya hai.
