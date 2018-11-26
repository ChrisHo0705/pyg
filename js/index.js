$(function () {
     //获取轮播图数据
    getSwiperdata();
    // 获取分类列表
    getCatitems();
    // 获取商品数据
    getGoodslist();
    function init() { //图片轮播初始化
        //获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
    }

    function getSwiperdata() {
        $.get("home/swiperdata", function (res) {
            if (res.meta.status == 200) {
                var html = template('lbtTemp', {
                    data: res.data
                })
                $('.pyg_lbt').html(html)
                init();

            } else {

            }
        })
    }
    function getCatitems(){
        $.get("home/catitems", function (res) {
            if (res.meta.status == 200) {
                var html = template('listTemp', {
                    data: res.data
                })
                $('.pyg_list').html(html)

            } else {

            }
        })
    }
    function getGoodslist(){
        $.get("home/goodslist", function (res) {
            if (res.meta.status == 200) {
                var html = template('goodsTemp', {
                    data: res.data
                })
                $('.pyg_goods').html(html)

            } else {

            }
        })
    }
})