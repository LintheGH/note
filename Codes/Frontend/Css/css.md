---
title: css 奇技淫巧
categories: 
- Code
- Frontend
- Css
tags: 
- css
- css3
---

- 自动换行
  - word-break: 
    - normal：使用浏览器默认的换行行为
    - break-all：允许在单词内换行
    - keep-all：只能在半角空格或连字符处换行
  - word-wrap: 
    -  normal: 只允许在断字点换行（保持浏览器默认换行行为）
    - break-word：在长单词或URL地址内部进行换行


- `background-size`实现四角边框
  - `background-size`属性：
    - 语法：  `background-size: length|percentage|cover|contain;`
      | 值 | 描述 |
      | :------ | :------ | 
      | length | 设置背景图片高度和宽度。第一个值设置宽度，第二个值设置的高度。如果只给出一个值，第二个是设置为 `auto`(自动) |
      | percentage | 将计算相对于背景定位区域的百分比。第一个值设置宽度，第二个值设置的高度。如果只给出一个值，第二个是设置为`auto`(自动) |
      | cover | 此时会保持图像的纵横比并将图像缩放成将完全覆盖背景定位区域的最小大小。 |
      | contain | 此时会保持图像的纵横比并将图像缩放成将适合背景定位区域的最大大小。 |

  - 实现四角边框

    通过多重背景的每个宽高设置四角边框

    HTML
    ```HTML
    <div class="content">内容<div>
    ```
    css
    ```css
    .content {
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      /*多重背景*/
      /*需要设置linear-gradient，因backgr-size是设置图片大小*/
      background: linear-gradient(to left, rgba(51, 51, 51, 1), rgba(51, 51, 51, 1)) right bottom no-repeat,
      linear-gradient(to left, rgba(51, 51, 51, 1), rgba(51, 51, 51, 1)) right bottom no-repeat,
      linear-gradient(to left, rgba(51, 51, 51, 1), rgba(51, 51, 51, 1)) left bottom no-repeat,
      linear-gradient(to left, rgba(51, 51, 51, 1), rgba(51, 51, 51, 1)) left bottom no-repeat,
      linear-gradient(to left, rgba(51, 51, 51, 1), rgba(51, 51, 51, 1)) right top no-repeat,
      linear-gradient(to left, rgba(51, 51, 51, 1), rgba(51, 51, 51, 1)) right top no-repeat,
      linear-gradient(to left, rgba(51, 51, 51, 1), rgba(51, 51, 51, 1)) left top no-repeat,
      linear-gradient(to left, rgba(51, 51, 51, 1), rgba(51, 51, 51, 1)) left top no-repeat;
      /*设置大小*/
      /*可以省略相同的，会自动循环应用到每个背景图上*/
      background-size: 1px 30px, 30px 1px, 1px 30px, 30px 1px;
    }
    ```
    效果：

    ![image](https://raw.githubusercontent.com/LintheGH/images/master/note/multiplebackground.png)


- `vw`、`vh` 和 `height: 100%` `width: 100%`的区别

  vw计算的是整个视口的宽度，包括滚动条。百分比计算宽度的后会不包括滚动条。同理`vh`和`·height: 100%`也一样