var utils = require('../../util/utils.js');
var WxParse = require('../../util/wxParse/wxParse.js');
var Modal = require('../../util/modal/modal.js');

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
        this.init();
    },
    onShow:function(){
        console.log('生命周期函数--监听页面显示');
    },
    onReady:function(){
        console.log('生命周期函数--监听页面初次渲染完成');
    },
    onHide:function(){
        console.log('生命周期函数--监听页面隐藏');
    },
    onUnload:function(){
        console.log('生命周期函数--监听页面卸载');
    },
    //自定义方法
    init:function(){
        console.log('加载数据');
        const _self = this;
        wx.showLoading({
            title:'加载数据',
            mask:true,
        });
        wx.showNavigationBarLoading();
        wx.request({
            url: 'https://cnodejs.org/api/v1/topic/'+_self.data.id, //仅为示例，并非真实的接口地址
            data:{
                page:1,//当前页
                limit:10,//没页条数
            },
            complete: function(){
                wx.hideLoading();
                wx.hideNavigationBarLoading();
            },
            success: function(json) {
                // console.log(json);
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
        // console.log(data);
        WxParse.wxParse('article', 'html', data.content, this,5);
        // data.content = data.content.replace('<div','<view').replace('</div','</view');
        return data;
    },
});