/**
 * Created by Sever on 2017/5/5.
 */


function modal(bindName = 'modal',that){
    that.showModal = true;
    that[bindName] = '';
}


module.exports = {
    modal: modal,
}
