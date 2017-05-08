/**
 * 模态框
 * Created by Sever on 2017/5/5.
 */

var Modal = function (that){

    var _that = that;
    var _self = this;

    function insertData(obj){
        _that.setData({
            modal_obj : obj
        });
    }

    _self.open = function (){
        console.log('打开模态框');
        _that.setData({
            modal_show:true,
        });
    }

    _self.close = function(cb){
        console.log('关闭模态框');
        _that.setData({
            modal_show:false,
        });
        cb?cb():'';
    }

    //警告模态框
    _self.m_alert = function(obj,cb){
        console.log('初始化警告模态框');
        _that.setData({
            modal_type:'modal_alert'
        });
        _that.ok = function(){
            _self.close(cb);
        };
        // _that.ok = this.close;
        insertData(obj);
    }
}

module.exports = Modal;
