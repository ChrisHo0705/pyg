$(function(){
    var Categories;
    var myScroll;
    randerCategories();
    Eventlisten();
    
    //发送请求前先看一下有没有缓存数据
function randerCategories(){
    if(sessionStorage.getItem('CategoriesData')){
        var data =$.parseJSON(sessionStorage.getItem('CategoriesData'))
        console.log(data)
        Categories = data.data
        // getCategories();
        randerLeft()
        randerRight(0)

        
    }else{
        getCategories();
    }
}


    function getCategories (){
        
        $.get("categories", function (res) {
            if (res.meta.status == 200) {
                Categories=res.data;
                randerLeft();
                 randerRight(0)
                 var objStr ={
                     data:res.data,
                     time:Date.now()
                 }
                 //把数据存进本地
                 var dataStr = JSON.stringify(objStr)
                //  console.log(objStr)
                 sessionStorage.setItem('CategoriesData',dataStr)
            } else { 

            }
        })
    } 
    function randerRight(CategoriesIndex){
        //渲染右边图片
        var rightHtml = template('categoryPicTemp',{data:Categories[CategoriesIndex].children})
        // console.log(rightHtml)
        $('.pyg_right').html(rightHtml)
        //设置滚动条
        var times=$('.pyg_right .rightlist img').size()
        // console.log(times);
        $('.pyg_right .rightlist img').on('load',function(){
            times--;
            if(times==0){
              var  RightScroll = new IScroll('.pyg_right');
            }
            
            
        })
    }
    function randerLeft(){
        //渲染左边导航栏
        var html = template('categorylistTemp', {
            data: Categories
        })
        $('.pyg_left').html(html)
        myScroll = new IScroll('.pyg_left');
    }

        //绑定一堆事件
    function Eventlisten(){
        //事件委托注册点击事件
        $('.pyg_left').on('click','ul li',function(){
            // console.log(123);
            $(this).addClass('active').siblings().removeClass();
            //点击按钮时往上置顶
            myScroll.scrollToElement(this)
           var CategoriesIndex=$(this).index()
            randerRight(CategoriesIndex)
            
            
        })
    }
})