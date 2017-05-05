var utils = require('../../util/utils.js');

Page({
    data: {
        msg: '首页',
        img_mode:'aspectFit',
        page:1,
        json_data:[],
    },
    onLoad:function(){
        console.log('生命周期函数--监听页面加载');

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
    //下拉加载
    onPullDownRefresh:function(){
        console.log( "下拉刷新...." );
        this.setData({
            page: 1,
            json_data:[],
        });
        this.init(function(){
            wx.stopPullDownRefresh();
        });
    },
    //上拉到底部
    onReachBottom:function(){
        console.log('底部加载更多...');
        const _self = this;
        this.setData({
            page: _self.data.page+1,
            // json_data:[],
        });
        this.init();
    },

    //自定义方法
    init:function(cb){
        console.log('加载数据');
        wx.showLoading({
            title:'加载数据',
            mask:true,
        });
        wx.showNavigationBarLoading();
        const _self = this;
        wx.request({
            url: 'https://cnodejs.org/api/v1/topics', //仅为示例，并非真实的接口地址
            data:{
                page:_self.data.page,//当前页
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
                        json_data : _self.data.json_data.concat(_self.data_filter(json.data.data)),
                    });
                    cb?cb():'';
                }
            },
            fail:function(error){

            }
        });
    },
    //数据过滤
    data_filter:function(arr){
        const result = [];
        for(var i=0; i<arr.length; i++){
            arr[i].create_at = arr[i].create_at.split("T")[0];
            result.push(arr[i]);
        }
        return result;
    },
    to_details:function(event){
        // console.log(event.currentTarget.dataset.id);
    },
});