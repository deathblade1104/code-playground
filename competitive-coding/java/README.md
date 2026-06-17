# Competitive Coding — Java

Self-contained Java setup. **Is folder ko VS Code mein kholo** (`File → Open Folder → java`), phir `Cmd+Shift+B`.

## Build task (`.vscode/tasks.json`)

| Task | Kya karta hai |
|------|----------------|
| **Java: build & run** — *default* | `javac -Xlint:all Main.java && java -ea Main < inputf.in > outputf.in`. `-Xlint:all` se compile warnings dikhte hain, `-ea` se assertions on. Exceptions/stack-traces khud `stderr` → terminal pe aate hain. `timeout 10` se infinite loop pakda jaata hai. |

## I/O

Java `System.in` se padhta hai aur `System.out` pe likhta hai, isliye task `< inputf.in > outputf.in` redirect karta hai (cwd = yeh folder). Input `inputf.in` mein daalo, output `outputf.in` mein milega. **Dono files gitignored hain** (local-only test data).

## Files

- `Main.java` — main solution + template (FastScanner, Solution, utility classes ek hi file mein).
- `Main2.java` — scratch / alternate.
