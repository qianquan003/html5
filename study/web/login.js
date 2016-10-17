/**
 * Created by Administrator on 2016/9/26.
 */
function login() {
    $.ajax({
        url:'http://www.nvwlm.com/?action=postuserlogin',
        type: 'post',
        async: false, //默认为true 异步
        data : {
            username:"huihui",password:"leilei123"
        },
        error: function () {
            alert('error');
        },
        success: function (data) {
            $("#login").html(data);
        }
    });
}