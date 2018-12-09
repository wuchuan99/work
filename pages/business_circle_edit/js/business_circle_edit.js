$(function(){
    $('.back').on('click', function(){
        history.go(-1);
    })

    $('.fileer').on('change', function(){
        var file = this.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            console.log(this.result);
            $('#img').attr('src', this.result);
        }    
    })

    $('.btn').on('click', function(){
        var name = $('.name').text();
        var bond = $('.bond').text();
        var file = $('.fileer')[0].files[0];
        var formData = new FormData();
        formData.append("myfile", file);
        formData.append("name", name);
        formData.append("bond", bond);
        $.ajax({
            type: 'post',
            url: './03-uploadFile.php',
            data: formData,
            contentType: false,
            processData: false,
            success: function(res){
                console.log(res);
            }
        })
    })
})