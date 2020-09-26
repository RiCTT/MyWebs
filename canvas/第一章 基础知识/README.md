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
### 7、关于求x点和y点的坐标
  > 最后Math.cos(x) x是一个弧度的值
  - x = radius * cos(angle)
  - y = radius * sin(angle)
### 8、关于canvas的元素大小和绘制表面大小
  - 绘制表面大小会自动根据canvas元素大小进行适配
    - 比如元素大小600 * 300，绘制表面大小300 * 150
    - 这个时候绘制的元素都会被放大，宽放大2倍，高也是2倍
  - 默认在元素上设置的是canvas的元素和绘制表面大小
  - css中设置的是元素的大小
### 9、canvas中涉及脏数据的跨域
  - 如果canvas中涉及其他orgin等数据，比如baidu.com域名的图片，而且跟当前的域名不一致，那此时的canvas就是一个脏数据
  - 脏数据不允许getImageData
  - 不允许toDataUrl等接口
### 10、处理脏数据的导出等
  - 设置image的crossOrigin属性
  - 保持资源同域