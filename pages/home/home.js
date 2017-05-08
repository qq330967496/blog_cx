var utils = require('../../util/utils.js');
var Modal = require('../../util/modal/modal.js');

Page({
    data: {
        msg: '首页',
        img_mode:'aspectFit',
        page:1,
        tagEnums:{
            ask:'问答',
            share:'分享',
            job:'招聘',
            good:'精华',
        },
        tab:"",
        json_data:[],
    },
    onLoad:function(){
        console.log('生命周期函数--监听页面加载');
        this.init();
    },
    onShow:function(){
        console.log('生命周期函数--监听页面显示');
    },
    onReady:function(){
        console.log('生命周期函数--监听页面初次渲染完成');

        var modal = new Modal(this);
        modal.m_alert({
            title:'警告框',
            content:'警告内容警告内容警告内容警告内容警告内容警告内容警告内容警告内容警告内容警告内容警告内容警告内容',
        },function(){
            console.log('关闭成功');
        });
        modal.open();
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
            console.log('收起下拉');
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
                tab:_self.data.tab,
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

    //类型选择
    select_type:function(e){
        const val = e.currentTarget.dataset.val;
        // this.data.tab = val; //TODO 【坑】-这种更改方式不会产生双向绑定，必须通过setData
        this.setData({
            tab:val,
            page: 1,
            json_data:[],
        });
        this.init(function(){
            wx.stopPullDownRefresh();
        });
    }
});