- 1.ctx.createGradient(x0, y0, x1, y2)
  - 这里的坐标系是参照全局的，而不是相对于填充元素
  - [渐变详解](https://www.canvasapi.cn/CanvasRenderingContext2D/createLinearGradient#&syntax)

- 2.canvas的渐变补充
  - canvas会拿最后一个渐变色来补充空白的位置

- 3.阴影
  - shadowColor：Css3格式颜色
  - shadowOffsetX：从图形或文本到阴影的水平像素偏移
  - shadowOffsetY：从图形或文本到阴影的垂直像素偏移
  - shadowBlur：一个和像素无关的值，用在高斯模糊方程之中，