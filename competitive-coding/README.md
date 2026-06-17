# Competitive Coding

Per-language self-contained workspaces. Jis language mein code karna ho, **uske subfolder ko VS Code mein kholo** — `Cmd+Shift+B` seedha build + run karega (I/O ka cwd wahi folder hota hai).

```
competitive-coding/
├── cpp/    →  Main.cpp   + g++-15 tasks   (see cpp/README.md)
└── java/   →  Main.java  + javac/java task (see java/README.md)
```

Har folder mein apna `.vscode/tasks.json` aur `inputf.in` / `outputf.in` hai. Test I/O files (`inputf.in`, `outputf.in`) aur build artifacts (`*.class`, `Main_cpp`, `*.dSYM`) gitignored hain.
