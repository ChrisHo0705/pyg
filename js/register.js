$(function () {
    Eventlisten()
    function Eventlisten() {
        //获取验证码
        $('.btn_vcode').on('tap',function(){
            var mobile = $('[name="mobile"]').val().trim()
            if(!$.checkPhone(mobile)){
                mui.toast("请输入正确的手机号") 
            }else{
                //发送请求
                $.post("users/get_reg_code", {mobile:mobile},
                    function (res) {
                        console.log(res);
                        if(res.meta.status==200){
                            //成功
                            $('.btn_vcode').attr('disabled','disabled')
                            var time = 60
                            var timeId = setInterval(function(){
                                if(time>0){
                                    $('.btn_vcode').text(time+"秒后请重试")
                                    time--
                                    //发送请求获取验证码
                                }else{
                                    $('.btn_vcode').text("获取验证码")
                                    $('.btn_vcode').removeAttr('disabled')
                                    clearInterval(timeId)
                                }
                            },1000)

                        }else{
                            //失败
                        }
                    }
                );
               
               
            }
        })
        //点击注册按钮
        $('#register').on('tap', function () {
            //获取表单中数据，进行验证
            var mobile = $('[name="mobile"]').val().trim()
            var code = $('[name="code"]').val().trim()
            var email = $('[name="email"]').val().trim()
            var pwd = $('[name="pwd"]').val().trim()
            var pwd2 = $('[name="pwd2"]').val().trim()
            var gender = $('[name="gender"]:checked').val()
            // console.log(gender);
            //对表单数据进行验证
            if(!$.checkPhone(mobile)){
                mui.toast("请输入正确的手机号")
                return
            }
            if(code.length!=4){
                mui.toast("请输入正确验证码")
                return
            }
            if(!$.checkEmail(email)){
                mui.toast("请输入正确的邮箱")
                return
            }
            if(pwd<6){
                mui.toast("请输入正确的密码")
                return
            }
            if(pwd!=pwd2){
                mui.toast("两次密码需一致")
                return
            }
            var registerObj={
                mobile:mobile,
                code:code,
                email:email,
                pwd:pwd,
                gender:gender
            }
            console.log(registerObj);
            
            $.post("users/reg", registerObj,
                function (res) {
                    // console.log(res);
                    if(res.meta.status==200){
                        // console.log(res);
                        mui.toast("注册成功")
                        location.href="./login.html"
                        
                    }else{
                        //失败
                        mui.toast(res.meta.msg)
                    }
                }
            );
            
        })
    }
    


})