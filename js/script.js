var c_slider = -100;
var tmp_src = null;
loadGallery();
$(document).ready ( function () {
    $('.map_img').maphilight();

    wow = new WOW(
        {
            mobile: false,
            boxClass:     'wow',      // default
            animateClass: 'animated', // default
            offset:       200,          // default
        }
    )
    wow.init();

    $('.hamburger_menu').click(function(e){
        e.preventDefault();
        $(this).toggleClass('open');
        $("nav").toggleClass('disabled');
    });

    $('a[data-target^="anchor"]').bind('click.smoothscroll', function(){
        var target = $(this).attr('href'),
            bl_top = $(target).offset().top - 40;
        $('body, html').animate({scrollTop: bl_top}, 700);
        return false;
    });
    //Slider
        $(".left").on("click", sliderLeft);
        $(".right").on("click", sliderRight);
    //
    //Tabs
        $(".tabs .tabs_b").eq(0).css("display", "block");
        $(".tabs_img").eq(0).css("display", "block");
        $(".tabs .tabs_h").on("click", tabsChange);
    //
    //Map
        $("#mapq area").on("mouseover", hoverMap);
    //
    //Map Video
        $("#mapq area").on("click", openVideo);
        $(".map_video").on('click', function () {
            $(this).children(".video_youtube").attr("src", "");
            $(this).css("display", "none");
        });
    //
    //Acordion
        $(".acc .acc_header").on("click", function(){
            $(".acc .acc_header").not(this).next().slideUp(500);
            $(this).next().slideToggle(500);
            $(".acc .acc_header").removeClass("active");
            $(this).addClass("active");
        });
    //
    //Gallery
        $("img.gallery_img").on("click", function () {
            $(".big_img").css("display", "block");
            $(".big_img img").attr("src", $(this).attr("src"));
        });
        $(".big_img").on("click", function () {
            $(".big_img").css("display", "none");
        });
    //
    //Call back
        $(".btn_callback").on('click', sendFourAjax);
    //
    //FORM
        $('form').on('submit', sendMess);
        $('#username, #email, #phone').on('keyup', checkInputs);
    //
});
function openImg() {
    $(".big_img").css("display", "block");
}

function hoverMap() {
    $(".out").css("display","block");
    $('.out').html("<i class='fa fa-play-circle-o' aria-hidden='true'></i>"+$(this).attr("title"));
    $(this).mouseout(function(){$(".out").css("display","none")});

}
function openVideo() {
    var tmp = $(this).index();
    $.getJSON("js/youtube.json", function(data){
        for (var key in data){
            var b = data[key];
            if(b.id == tmp){
                $(".map_video").children(".video_youtube").attr("src", b.src);
            }
        }
    });
    $(".map_video").css("display", "block");
}

function tabsChange(){
    var a = $(".tabs .tabs_h").index(this);
    $(".tabs_img").css("display", "none");
    $(".tabs_img").eq(a).css("display", "block");
    $(".tabs .tabs_b").css("display", "none");
    $(".tabs .tabs_b").eq(a).css("display", "block");
    $(".tabs .tabs_h").removeClass("active");
    $(this).addClass("active");
}

function sliderLeft() {
    c_slider = c_slider + 100;
    if(c_slider > 0){
        $("#slider .slider_line").css("left", "0");
        c_slider = 0;
    }
    else{
        $("#slider .slider_line").css("left", c_slider+"%");
        $(".slider_circle span.active").prev().addClass("active");
        $(".slider_circle span.active").next().removeClass("active");
    }
}

function sliderRight() {
    c_slider = c_slider - 100;
    if(c_slider < -200){
        $("#slider .slider_line").css("left", "-200%");
        c_slider = -200;
    }
    else{
        $("#slider .slider_line").css("left", c_slider+"%");
        $(".slider_circle span.active").next().addClass("active");
        $(".slider_circle span.active").prev().removeClass("active");
    }
}

function loadGallery(){
    $.getJSON("js/gal_img.json", function(data){
        for (var key in data){
            var b = data[key];
            $('.gallery').append('<div class="col-md-3"><img class="gallery_img" src="'+b.src+'"></div>');
        }
    });
}
function ifSuccess(data){
    $("#out").html(data);
    data = JSON.parse(data);
    console.log(data);
    console.log(data.name);
}
function sendFourAjax(){
    $.post(
        "mail.php",
        {
            "username" : $("#username").val(),
            "email" : $("#email").val(),
            "phone" : $("#phone").val(),
        },
        ifSuccess
    );
}
function sendMess() {
    event.preventDefault();
    $.get(
        "send.php",
        {
            "username" : $("#username").val(),
            "email" : $("#email").val(),
            "phone" : $("#phone").val()
        },
        function (data){
            if (data==1){
                $('#output').html('Успешно отправлено');
            }
            else {
                $('#output').html('Повторите отправку');
            }
        }
    );
}

function  checkInputs() {
    var username = $('#username').val();
    username = $.trim(username);
    var email = $('#email').val();
    email = $.trim(email);
    var phone= $('#phone').val();
    phone = $.trim(phone);

    if (email!='' && phone!='' && username!='') {
        $('form button[type="submit"]').removeAttr('disabled');
        $('.btn_callback').addClass('active');

    }
    else {
        $('form button[type="submit"]').attr('disabled', 'disabled');
        $('.btn_callback').removeClass('active');
    }
}
