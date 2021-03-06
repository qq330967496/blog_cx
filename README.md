# blog_cx
> 作者：SeverHo [330967496@qq.com](mailto:330967496@qq.com)

> [博客-微信小程序（爬坑专用）](https://github.com/qq330967496/blog_cx)

>[小程序开发文档](https://mp.weixin.qq.com/debug/wxadoc/dev/)

## 入坑准备
- js支持ES6
- 微信小程序的与众不同
    - .wxml：微信html文件
    - .wxss：微信css文件
    - 响应式像素单位-rpx（responsive pixel），比rem好用：1rpx = 屏幕宽度/750
- 小程序的跟vue的设计相似：双向绑定，生命周期，MVVM模式
- 双向绑定：更新数据的同时同步视图，更新视图的同时同步数据
- M-V-VM模式
    - M（model）：data模型
    - V（view）：UI
    - VM（view model）：通过双向绑定连接view和model
    - MVC-C（controller）：MVC模式的C，处理请求和响应，将model更新到view
- 项目结构
    - /assets：静态资源
    - /pages：各种页面
    - /lib：工具库
    - app.js：全局变量，方法（在页面js通过getApp()获取）
    - app.json: 全局配置
    - app.wxss：全局样式
    
    


## 坑与爬坑
- window对象在哪
    - 爬坑：微信小程序用wx对象
- 调试，没有热加载，如果是非一级页面，需要点击一轮才能看到效果
    - 爬坑：在app.json的页面配置中将要调试的页面放在首行，但无法传参，需要在代码里面修改参数。
    
- input，radio，checkbox都不能直接绑定data
    - 爬坑：
        - input通过bindinput属性绑定指定方法进行双向绑定
        - radio需要用到radio-group标签，通过bindchange属性绑定指定方法进行双向绑定
        - checkbox其实是select标签，需要用到checkbox-group，通过bindchange属性绑定指定方法进行双向绑定
- 外链的尴尬-小程序不允许跳转到外链的
    - 爬坑：我使用了自定义模态框的方式弹窗，提供用户复制链接在浏览器打开
    - 原因：自带的模态框是无法复制文本的，自定义模态框用<text>实现，设置为可复制
- 无法对dom进行操作，事件也只能操作当前标签，无法操作父级标签
    - 爬坑-自定义模态框：
        - 编辑模板js，用于数据处理
        - 编辑模板wxml，wxss，处理数据绑定
        - 指定页面的js中引入模板js，把当前对象传递给模板js
        - 指定页面的wxml中引入模板wxml，传递参数给模板
        - app.wxss中import模板的wxss
        - 注意：这个步骤相比dom操作复杂，数据的传递和引入模板比较容易出错
- 无法使用HTML标签
    - 爬坑：用第三方工具进行转化，wxParse是一个第三方的工具，可以转换一般的HTML标签，自定义模态框是参考这个开发的，使用步骤也类似
- 双向绑定出错
    - 爬坑：this.data.tab = '' 这种更改方式不会触发双向绑定，必须通过this.setData({})才能触发双向绑定
- wxss的:hover伪类，按下去就回不来了
    - 爬坑：在标签添加hover-class属性，值对应wxss的类


## app.json说明
> （附加坑：注释写在这里因为app.json文件不允许注释）

> [官方文档](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html)

- pages：注册页面，值是页面所在路径，不带后缀。（顺数第一个页面就是首页）
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
- debug：是否使用调试模式。（另外，开发版的小程序可以在右上角打开调试）

## 微信小程序wepy框架 - 一个小程序专用的类似vue的框架
>[官方API](https://wepyjs.github.io/wepy/#/)






















