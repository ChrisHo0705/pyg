$(function () {
    //获取URL中传递的参数
    var cid = getQueryString('cid')
    var totolpage
    // console.log(cid);
    var goodData_Obj = {
        query: "",
        cid: cid,
        pagenum: 1,
        pagesize: 10
    }
     //下拉刷新
     downrefresh()

    // console.log(goodData_Obj);

    // getGood_list()

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }

    function getGood_list() {
        $.get("goods/search", goodData_Obj, function (res) {
            // console.log(res);
            //计算总页数
             totolpage =Math.ceil(res.data.total/goodData_Obj.pagesize) 
            // console.log(totolpage);
            
            var html = template('goodListTemp', {
                data: res.data.goods
            })
            $('.goodlist').html(html)
            mui('.pyg_view').pullRefresh().endPulldownToRefresh();
            mui('.pyg_view').pullRefresh().refresh(true);

        })
    }
   
    function downrefresh() {
        mui.init({
            pullRefresh: {
                container: ".pyg_view",
                down: {
                    style: 'circle',
                    auto: true,
                    //根据cid动态获取数据
                    callback: function () {
                        goodData_Obj.pagenum=1
                        getGood_list() 
                    }

                },
                up: {
                    callback: function () {
                        
                        console.log(goodData_Obj.pagenum);
                        
                        if(goodData_Obj.pagenum>=totolpage){
                            // console.log(123);
                            
                            mui('.pyg_view').pullRefresh().endPullupToRefresh(true);
                        }else{
                            goodData_Obj.pagenum++
                            $.get("goods/search", goodData_Obj, function (res) {
                                // console.log(res);
                                //计算总页数
                                var totolpage =Math.ceil(res.data.total/goodData_Obj.pagesize) 
                                // console.log(totolpage);
                                
                                var html = template('goodListTemp', {
                                    data: res.data.goods
                                })
                                $('.goodlist').append(html)
                                mui('.pyg_view').pullRefresh().endPullupToRefresh(false);
                    
                            })
                        }
                        
                        
                    }
                }
            }
        });
    }
    
    
        //给A标签绑定事件
        $('.goodlist').on('tap','a',function(){
            // console.log(123);
            var href = this.href
            // console.log(href);
            location.href=href
            
            
        })
    
})