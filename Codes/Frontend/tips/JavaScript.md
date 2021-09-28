- `beforeunload`：页面后退、刷新、关闭时触发事件

  - 需要触发弹窗时，需要做额外操作

    ```javascript
    window.addEventListener('beforeunload', (event) => {
      // 显示确认对话框
      event.preventDefault();
      // 为了兼容处理，Chrome需要设置returnValue
      event.returnValue = '';
    });
    ```

  - 在页面没有产生交互时，不弹出对话框

