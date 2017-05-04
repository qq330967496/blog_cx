var utils = require('../../util/utils.js');
var WxParse = require('../../util/wxParse/wxParse.js');

Page({
    data: {
        msg: '首页',
        img_mode:'aspectFit',
        id:'',
        json_data:{},
    },
    onLoad:function(options){
        console.log('生命周期函数--监听页面加载');
        this.setData({
            id: options.id
        });
    },
    onReady:function(){
        console.log('生命周期函数--监听页面初次渲染完成');
        this.init();
    },
    onShow:function(){
        console.log('生命周期函数--监听页面显示');
    },
    onHide:function(){
        console.log('生命周期函数--监听页面隐藏');

    },
    onUnload:function(){
        console.log('生命周期函数--监听页面卸载');
    },
    //自定义方法
    init:function(){
        console.log('初始化');
        const _self = this;
        wx.request({
            url: 'https://cnodejs.org/api/v1/topic/'+_self.data.id, //仅为示例，并非真实的接口地址
            data:{
                page:1,//当前页
                limit:10,//没页条数
            },
            success: function(json) {
                console.log(json);
                if(json.statusCode == 200){
                    _self.setData({
                        json_data : _self.data_filter(json.data.data),
                    });
                }
            },
            fail:function(error){

            }
        });

    },
    //数据过滤
    data_filter:function(data){
        console.log(data);
        WxParse.wxParse('article', 'html', data.content, this,5);
        // data.content = data.content.replace('<div','<view').replace('</div','</view');
        return data;
    },
});