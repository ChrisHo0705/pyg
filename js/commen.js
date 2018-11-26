$(function(){
    var baseUrl = 'http://api.pyg.ak48.xyz/'
    if(window.template){
        template.defaults.imports.baseUrl = baseUrl;
    }
    
    $.ajaxSettings.beforeSend = function(xhr,ajaxObj){
        // $('body').addClass('loadding');
        // console.log(ajaxObj);
        
       
        ajaxObj.url=baseUrl+"api/public/v1/"+ajaxObj.url
        // console.log(ajaxObj);
        
    }
    $.ajaxSettings.complete=function(){
        // $('body').removeClass('loadding');
    }

    //zepto的扩展
    $.extend($, {
        checkPhone: function (phone) {
            if (!(/^1[34578]\d{9}$/.test(phone))) {
                return false;
            } else {
                return true;
            }
        },
        checkEmail:function (myemail) {　　
            var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
            if (myReg.test(myemail)) {　　　　
                return true;　　
            } else {　　　　
                return false;
            }
        }
      });
})