$(function(){
    var that;
    var data = "data";
    var info = "info";
    var page = 0
    $('.back').on('click', function(){
        history.go(-1);
    })
    $('#shop').on('click', function(){
        num = 0;
        $('.footer').find('i').text(num);
        page = 0;
        $('.table').html('');
        $(this).addClass('active').siblings().removeClass('active');
        mui('#pullRefresh').pullRefresh().refresh(true);
        mui('#pullRefresh').pullRefresh().scrollTo(0, 0, 100);
    })
    $('#business').on('click', function(){
        num = 0;
        $('.footer').find('i').text(num);
        page = 0;
        $('.table').html('');
        $(this).addClass('active').siblings().removeClass('active');
        mui('#pullRefresh').pullRefresh().refresh(true);
        mui('#pullRefresh').pullRefresh().scrollTo(0, 0, 100);
    })

    var num = 0
    $('.mui-table-view').on('tap', '.mui-table-view-cell', function(){
        if($(this).attr('data-checked') == 0){
            $(this).attr('data-checked', 1);
            $(this).children('img').eq(0).show();
            $(this).children('img').eq(1).hide();
            num++;
            $('.footer').find('i').text(num);
        } else {
            $(this).attr('data-checked', 0);
            $(this).children('img').eq(0).hide();
            $(this).children('img').eq(1).show();
            num--;
            $('.footer').find('i').text(num);
        }
    })


    $('.btn').on('click', function(){
        var list = [];
        $('.selected').each(function(index, item){
            if($(item).css('display') != 'none'){
                var param = $(item).parent().attr('data-param');
                list.push(JSON.parse(param));
            }
        })
        console.log(list)
        if(list.length == 0){
            mui.toast('请选择商圈')
        }
    })

    mui.init({
        pullRefresh : {
            container: '#pullRefresh',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up : {
                height:50,//可选.默认50.触发上拉加载拖动距离
                auto:true,//可选,默认false.自动上拉加载一次
                contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback : gt //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            down : {
                height:50,//可选,默认50.触发下拉刷新拖动距离,
                // auto: true,//可选,默认false.首次加载自动下拉刷新一次
                contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback : fn //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    // mui('#pullRefresh').pullRefresh().disablePullupToRefresh();

    function gt(){
        document.querySelector('.mui-pull-bottom-pocket').style.opacity = 1;        
        if(!that){
            that = this; 
        }
        if($('#shop').hasClass('active')){
            $.ajax({
                type: 'get',
                url: `../data/${data + page}.json`,
                dataType: 'json',
                success: function(res) {
                    setTimeout(function(){
                        console.log(res);
                        if(res.data.length > 0){
                            page++;
                            var html = template('temp', res);
                            $('.table').append(html);
                            that.endPullupToRefresh(false);
                        } else {
                            that.endPullupToRefresh(true);
                        }
                    }, 2000)
                }
            })
        } else {
            $.ajax({
                type: 'get',
                url: `../data/${info + page}.json`,
                dataType: 'json',
                success: function(res) {
                    console.log(res);
                    setTimeout(function(){
                        if(res.data.length > 0){
                            page++;
                            var html = template('temp', res);
                            $('.table').append(html);
                            that.endPullupToRefresh(false);
                        } else {
                            that.endPullupToRefresh(true);
                        }
                    }, 2000)
                }
            })
        }
    }

    function fn(){
        if($('#shop').hasClass('active')){
            // mui('#pullRefresh').pullRefresh().endPulldownToRefresh();
            // mui('#pullRefresh').pullRefresh().refresh(true);
            // document.querySelector('.mui-pull-bottom-pocket').style.opacity = 0;
            $.ajax({
                type: 'get',
                url: `../data/data0.json`,
                dataType: 'json',
                success: res => {
                    num = 0;
                    $('.footer').find('i').text(num);
                    page = 1;
                    console.log(res);
                    var html = template('temp', res);
                    $('.table').html(html);
                    setTimeout(function(){
                        mui('#pullRefresh').pullRefresh().endPulldownToRefresh();
                        mui('#pullRefresh').pullRefresh().refresh(true);
                        document.querySelector('.mui-pull-bottom-pocket').style.opacity = 0;
                    }, 1000)
                }
            })
        } else {
            $.ajax({
                type: 'get',
                url: `../data/info0.json`,
                dataType: 'json',
                success: res => {
                    num = 0;
                    $('.footer').find('i').text(num);
                    page = 1;
                    console.log(res);
                    var html = template('temp', res);
                    $('.table').html(html);
                    setTimeout(function(){
                        mui('#pullRefresh').pullRefresh().endPulldownToRefresh();
                        mui('#pullRefresh').pullRefresh().refresh(true);
                        document.querySelector('.mui-pull-bottom-pocket').style.opacity = 0;
                    }, 1000)
                }
            })
        }
    }
})