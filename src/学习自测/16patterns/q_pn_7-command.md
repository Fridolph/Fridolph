# 写一个支持撤销/重做的编辑器，用什么设计模式？

## 核心回答

用**命令模式**。将每次编辑操作封装为 Command 对象（包含 execute 和 undo 方法），通过命令栈实现撤销/重做。

```ts
interface Command {
  execute(): void
  undo(): void
}

class InsertCommand implements Command {
  constructor(private doc: Doc, private pos: number, private text: string) {}
  execute() { this.doc.insert(this.pos, this.text) }
  undo() { this.doc.delete(this.pos, this.text.length) }
}

// 命令历史管理
class CommandHistory {
  private undoStack: Command[] = []
  private redoStack: Command[] = []

  exec(cmd: Command) {
    cmd.execute()
    this.undoStack.push(cmd)
    this.redoStack = [] // 新操作清空 redo
  }
  undo() {
    const cmd = this.undoStack.pop()
    if (cmd) { cmd.undo(); this.redoStack.push(cmd) }
  }
  redo() {
    const cmd = this.redoStack.pop()
    if (cmd) { cmd.execute(); this.undoStack.push(cmd) }
  }
}
```

**为什么是命令模式**：
- 操作被封装为对象，天然可入栈存储
- undo/redo 只需按相反顺序调用
- 可轻松扩展为**宏命令**（批处理）、**操作日志**、**协同冲突解决**

**面试延伸**：可以说"命令对象还可以序列化存到服务端，实现协同编辑的冲突回放"。

> 来源：[JavaScript Design Patterns — Command](https://www.patterns.dev/vanilla/command-pattern)
