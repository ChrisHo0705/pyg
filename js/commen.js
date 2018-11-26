$(function(){
    $.ajaxSettings.beforeSend = function(xhr,ajaxObj){
        $('body').addClass('loadding');
        // console.log(ajaxObj);
        ajaxObj.url="http://api.pyg.ak48.xyz/api/public/v1/"+ajaxObj.url
        // console.log(ajaxObj);
        
    }
    $.ajaxSettings.complete=function(){
        $('body').removeClass('loadding');
    }
})