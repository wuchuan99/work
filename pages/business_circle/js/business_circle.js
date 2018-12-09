$(function(){
    var server = {
        myDistrictList: 'user/myDistrictList'
    }
    
    // var params = {};
    // reqAjaxAsync(server.myDistrictList, JSON.stringify(params)).done(function(res){
    //     console.log(res)
    // })

    $('.list').on('click', 'li', function(){
        var shopName = $(this).find('span').eq(0).text();
        location.href = `../business/shop_list.html?shopName=${shopName}`;
    })

    
    
})