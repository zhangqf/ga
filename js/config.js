// var httpReQuRL = 'http://211.149.248.47:8080/risun_vote';
// var url = '/ashx/redirect.ashx?_url=' + httpReQuRL;
if(!window.Utils) Utils = {}
function isDefined(param) {
    if ((param == null) || (param == "") || (param == "undefined") || (param == undefined)) {
        return true;
    } else {
        return false;
    }
}
function isString(str){ 
    return (typeof str=='string')&&str.constructor==String; 
} 
var DEBUG = false;
var request = function (params) {
    console.log(params.url,params.data);
    //    console.log(params.data);
    !DEBUG && $.post(params.url, params.data, function (data) {
        $('#submit').removeClass('btn-disabled');
        if(isString(data)){
            data = JSON.parse(data)
        }
        data = data.msg;
        if(data.state==1){
            if (params.callback) params.callback(data.cont);
        }else{
            alert(data.desc);
        }        
    });
}
var formSubmitByAjax = function (params) {
    var that = params.btn || $('#submit');
    var _flag = 1;
    $('.J-validate').each(function (index, item) {
        item = $(item);
        if ($.trim(item.val()).length) {
            _flag = _flag & 1;
        } else {
            _flag = _flag & 0;
            alert(item.attr('placeholder'));
        }
    });
    if (_flag) {
        if (that.hasClass('btn-disabled')) return;
        that.addClass('btn-disabled');
        $('.J-request').length && $('.J-request').each(function (index, item) {
            item = $(item);
            var key = item.attr('name');
            params.data[key] = $.trim(item.val());
        });
        request(params);
    }
}
//图片上传
//图片上传
Utils._imgUpload = {
    maxLength:2,
    current:null,
    currentElement:null,
    defaultImg:'wgtRes/addImg.png',
    isUpload:true,
    uploadUrl:'http://125.75.128.241:3000/img/upload',
    createDom:function(){
        var that = this;
        this.elements.each(function(){
            var element = $(this);
            var _tpl = '<form class="uploadForm" enctype="multipart/form-data" method="post" target="uploadImg"  >'
                    +  '<div class="ub-img uwh-bg  umar-r-ect J-action" >'        
                            +'<img src="'+that.defaultImg+'" height="100%" width="100%" class="J-imgUpload-img">'
                            +'<input type="file" accept="image/jpg,image/jpeg,image/png,image/gif" class="J-imgUpload-file" name="filename" id="filename">'
                        +'</div>'
                    +'</form>'
                    +'<iframe class="uploadImg" name="uploadImg" src="about:blank" frameborder="0" style="display:none;"></iframe>';
            element.append(_tpl);
            element.delegate('.upload_delete','click',function(){
                that.currentElement = $(this).parents('.J-img').parent();
                $(this).parents('.J-img').remove();
                that.changeUploadBtn();
                that.current=null;
            });
        });           
    },
    getValue:function(){
        var _path = [];
        this.elements.find('.J-img img').each(function(){
            _path.push($(this).attr('src'));
        });
        return _path.join(';');
    },
    changeUploadBtn:function(){
        var action = this.currentElement.find('.J-action');
        if (this.currentElement.find('.J-img').length == this.maxLength) {
            action.hide();
        } else {
            action.show();
        }
    },
    createImgPreview:function(_className,src){
        _className = _className || '';
        src = src || 'wgtRes/upimg_loading.gif'
        var _str = '<div class="ub-img uwh-bg  umar-r-ect J-img '+_className+'">'
        +'<a href="javascript:void(0);" class="upload_delete" title="删除">X</a>'
        +'<img src="'+src+'" height="100%" width="100%" class="J-imgUpload-img">'
        +'</div>';
        current = $(_str);
        if(this.currentElement.find('.uploadForm').length){
            this.currentElement.find('.uploadForm').prepend(current);
        }else{
            this.currentElement.append(_str);
        }
        
        this.current = current;
        this.changeUploadBtn();
    },
    callback:function(data){
        if(data.state==1){
            data = data.imgUrl;
            console.log('currentElement',this.currentElement[0]);
            this.currentElement && this.currentElement.find('.J-img img').first().attr('src',data);
        }else{
            alert('图片上传失败');
        }
    },
    init:function(){
        var that = this;
        this.currentElement =  this.elements;
        if(that.defaultImg && that.isUpload) {
            that.createDom();
        }else{
            var arr = that.defaultImg.split(';');
            for(var i=0;i<arr.length;i++){
                that.createImgPreview('',arr[i]);
            }
        }
    }
};
//图片上传
Utils.imgUpload = function(params){
    params = params || {};
    params.elements = params.elements  || $('.J-upload');
    for(var i in params){
        Utils._imgUpload[i] = params[i];
    }
    var arr = window.location.href.split('/');
    arr.pop();
    arr.push('rediect.html');
    var _url = arr.join('/')
    Utils._imgUpload.init();
    $('.J-imgUpload-file').change(function(){
        Utils._imgUpload.currentElement = $(this).parents('.uploadForm').parent();
        Utils._imgUpload.createImgPreview();
        Utils._imgUpload.currentElement.find('.uploadForm').attr('action',Utils._imgUpload.uploadUrl+'?url='+_url);
        Utils._imgUpload.currentElement.find('.uploadForm').submit();
    });
        
}