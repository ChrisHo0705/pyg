$(function(){
    EventListen()
    function EventListen(){
        $('#login').on('tap',function(){
            //验证表单，获取数据
            var username = $('[name="mobile"]').val().trim()
            var password = $('[name="pwd"]').val().trim()
            if(!$.checkPhone(username)){
                mui.toast("请输入正确的手机号")
                return
            }
            if(password<6){
                mui.toast("请输入正确的密码")
                return
            }
            //发送请求
            var loginInfo = {
                username:username,
                password:password
            }
            //因为要传token，所以要AJAX
            $.ajax({
                type: "post",
                url: "login",
                data: loginInfo,
                dataType: "json",
                success: function (res) {
                    if(res.meta.status==200){
                        //把得到的数据存进会话存储
                        // console.log(res);
                        sessionStorage.setItem("data",JSON.stringify(res.data))
                        if(sessionStorage.getItem("goodHref")){
                            location.href=sessionStorage.getItem("goodHref")
                        }else{
                            location.href="../index.html"
                        }
                    }else{
                        //失败
                        mui.toast(res.meta.msg)
                    }
                    
                }
            });
        })
    }
})