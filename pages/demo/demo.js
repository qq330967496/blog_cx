import utils  from '../../lib/utils.js';
import WxParse from '../../lib/wxParse/wxParse.js';
import Modal from '../../lib/modal/modal.js';

Page({
    data: {
        msg:'',
    },
    onLoad:function(options){
        console.log('生命周期函数--监听页面加载');
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

    //TODO 【坑】 - input不能直接绑定data
    bindKeyInput:function(e){
        this.setData({
            msg:e.detail.value
        })
    },

    tap:function(){
        console.log('按下');
    }
});