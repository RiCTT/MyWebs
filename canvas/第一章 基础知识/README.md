### 1、context可以理解成上下文、绘图环境等
### 2、默认的canvas大小是300*150
### 3、通过css的方式设置的画布大小，浏览器可能会产生缩放
  - 如果非要css的时候，需要同时设置元素标签width和height
### 4、canvas的属性和方法
  - 属性（height和width）
  - 方法
    - getContext
    - toDataUrl(type, quality)
    - toBlob(cb, type, args)
### 5、常用的api都是在context的2d环境上
### 6、canvas状态的保存和恢复
  > 用于保存和恢复当前canvas绘图环境的所有属性，用一个stack来保存，对应入栈和出栈
  - save()
  - restore()