### `path` 模块

---
#### `path`模块的方法
- `path.join([path1][, path2][,path3])`：用于连接路径，连接的路径会匹配当前系统的路径分隔符号，windows为`/`， linux为`\`

  ```
    path.join(__dirname, /src/)
  ```