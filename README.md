# blog_cx
> [博客-微信小程序（爬坑专用）](https://github.com/qq330967496/blog_cx)

## 入坑准备
- 微信小程序的与众不同
    - .wxml：微信html文件
    - .wxss：微信css文件
    - 响应像素单位-rpx（responsive pixel），类似rem：1rpx = 屏幕宽度/750
- M-V-VM模式
    - M（model）：data模型
    - V（view）：UI
    - VM（view model）：通过双向绑定连接view和model
    - C（controller）：MVC模式的C，处理请求响应，将model更新view
- 小程序的跟vue的设计相似：双向绑定，生命周期
- 项目结构
    - /assets：静态资源
    - /pages：各种页面
    - /util：工具
    - app.js：全局变量，方法
    - app.json: 全局配置
    - app.wxss：全局样式
    
    


## 坑与爬坑
- window对象在哪
    - 爬坑：微信小程序用wx对象    
- 外链的尴尬-小程序不允许跳转到外链的
    - 爬坑：我使用了自定义模态框的方式弹窗，提供用户复制链接在浏览器打开
    - 原因：自带的模态框是无法复制文本的，自定义模态框用<text>实现，设置为可复制
- 无法对dom进行操作，事件也只能操作当前对象，无法操作父级
    - 爬坑-自定义模板：
        - 编辑模板js，用于数据处理
        - 编辑模板wxml，wxss，处理数据绑定
        - 指定页面的js中引入模板js，把当前对象传递给模板js
        - 指定页面的wxml中引入模板wxml，传递参数给模板
        - 注意：这个步骤相比dom操作复杂，数据的传递和引入模板比较容易出错
- 图片默认固定宽度和高度，320px 240px
    - 爬坑：在app.wxss定义默认的宽度100%和高度为0，在具体标签样式中定义图片大小
- 无法使用HTML标签
    - 爬坑：用第三方工具进行转化，wxParse是一个第三方的工具，可以转换一般的标签，自定义模态框是参考这个开发的，使用步骤也类似
- 双向绑定出错
    - 爬坑：this.data.tab = '' 这种更改方式不会触发双向绑定，必须通过this.setData({})才能触发双向绑定



## app.json说明
> （附加坑：注释写在这里因为app.json文件不允许注释）

> [官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html)

- pages：注册页面，值是页面所在路径，不带后缀
- window：窗口设置。（具体页面的json中，只能配置窗口设置，不能配置其他）
    - navigationBarBackgroundColor：导航栏背景颜色
    - navigationBarTitleText：导航栏标题文本
    - backgroundColor：背景颜色
- networkTimeout：网络请求超时，单位：ms
    - request：请求超时时间
    - downloadFile：文件下载超时时间
- tabBar：底部栏
    - color：文字颜色
    - selectedColor：选中的文字颜色
    - list：底部列表数组
        - pagePath：跳转的页面路径
        - text：文案
        - iconPath：图片路径
        - selectedIconPath：选中的图片路径
- debug：是否使用调试模式。调试模式除了在模拟器中出现调试信息，还能让手机在预览模式下打开控制台























