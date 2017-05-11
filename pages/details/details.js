import utils  from '../../lib/utils.js';
import WxParse from '../../lib/wxParse/wxParse.js';
import Modal from '../../lib/modal/modal.js';

Page({
    data: {
        msg: '首页',
        img_mode:'aspectFit',
        id:'',
        tagEnums:{
            ask:'问答',
            share:'分享',
            job:'招聘',
            good:'精华',
        },
        json_data:{},
    },
    onLoad:function(options){
        console.log('生命周期函数--监听页面加载');
        this.setData({
            id: options.id,
            // 测试参数
            // id:'59140743d371b6372a8af7f9',
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
        var _self = this;
        data.create_at = data.create_at.split("T")[0];
        WxParse.wxParse('article', 'html', data.content, _self,5);

        for(var i = 0;i<data.replies.length; i++){
            WxParse.wxParse('reply' + i, 'html', data.replies[i].content, this);
            if (i === data.replies.length - 1) {
                WxParse.wxParseTemArray("replyTemArray",'reply', data.replies.length, this)
            }
        }



        // data.content = data.content.replace('<div','<view').replace('</div','</view');
        return data;
    },

    //a标签点击事件
    //TODO 【坑】 - 外链的尴尬-小程序不允许跳转到外链的
    wxParseTagATap:function(e){
        // console.log(e.currentTarget.dataset.src);
        var modal = new Modal(this);
        modal.m_alert({
            title:'复制链接在浏览器打开：',
            content:e.currentTarget.dataset.src,
        },function(){
            console.log('关闭成功');
        });
        modal.open();

    }
});