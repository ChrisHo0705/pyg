$(function(){
    $.get("goods/detail", {goods_id:getQueryString('id')},
        function (res) {
            console.log(res);
            var html = template('goodDetailTemp',res.data)
            // console.log(html);
            $('.pyg_view').html(html)
            //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
        });
            
        },
    );

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
})