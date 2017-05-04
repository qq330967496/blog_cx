module.exports = {
    test: function(){
        console.log('utils.test');

    },
    formatTime:function (date,isShort) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();

        if(isShort){
            return [year, month, day].map(formatNumber).join('-');
        }else{
            return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
        }
    },
};