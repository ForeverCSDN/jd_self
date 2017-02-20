window.onload = function () {
    setOpacity();

    changeSlider();

    downTime();
};
/*改变透明度*/
function setOpacity() {
    var jd_header = document.querySelector(".jd-header");
    var jd_slider = document.querySelector(".jd-slider");
    //获得轮播图的高度
    var slider_height = jd_slider.offsetHeight;
    var _opacity = 0;
    window.onscroll = function () {
        var scroll_top = document.body.scrollTop;
        if(scroll_top < slider_height){
            _opacity = scroll_top/slider_height*0.85;
        }else{
            _opacity = 0.85;
        }
        jd_header.style.background = "rgba(201,21,35,"+_opacity+")";
    };

}


/*轮播图*/
function changeSlider() {
    var jd_slider = document.querySelector(".jd-slider");
    //获取轮播图的宽度
    var slider_width = jd_slider.offsetWidth;
    var slider_ul = jd_slider.querySelector("ul:first-child");
    var square_ul = jd_slider.querySelector("ul:last-child");
    var points = square_ul.querySelectorAll("li")

    //清除过渡
    var removeTransition = function () {
        slider_ul.style.transition = "none";
        slider_ul.style.webkitTransition = "none";
    };
    //设置过渡
    var setTransition = function () {
        slider_ul.style.transition = "all 0.3s";
        slider_ul.style.webkitTransition = "all 0.3s";
    };
    //定位
    var setTranslateX = function (translateX) {
        slider_ul.style.transform = "translateX("+translateX+"px)";
        slider_ul.style.webkitTransform = "translateX("+translateX+"px)";
    };
    //索引值用于记录当前图片
    var _index = 1;
    //轮播图定时轮播
    var timer = setInterval(function () {
        _index++;
        var translateX = -_index*slider_width;
        //设置过渡效果
        setTransition();
        setTranslateX(translateX);
        console.log(_index);
    },2000);

    //如何监听动画结束
    jd_project.addTransitionEnd(slider_ul, function () {
        if(_index >= 9){
            _index = 1;
            var translateX = -_index*slider_width;
            //清除过渡效果
            removeTransition();
            //瞬间定位
            setTranslateX(translateX);
        }
        if(_index <= 0){
            _index = 8;
            var translateX = -_index*slider_width;
            //清除过渡效果
            removeTransition();
            //瞬间定位
            setTranslateX(translateX);
        }
        //此时_index的范围1~8
        setPoint();
    });


    //小圆点同步变化
    var setPoint = function () {
        for(var i = 0;i < points.length;i++){
            points[i].className = "";
        }
        points[_index - 1].className = "current";
    };

    //触摸改变轮播图

    var startX = 0;
    var moveX = 0;
    var distance = 0;
    var isMove = false;
    slider_ul.addEventListener("touchstart", function (e) {
        clearInterval(timer);
        console.log(e);
        startX = e.touches[0].clientX;
    });

    slider_ul.addEventListener("touchmove", function (e) {
        moveX = e.touches[0].clientX;
        distance = moveX - startX;
        //获取当前位置
        var translateX = -_index*slider_width + distance;
        //清除过渡效果
        removeTransition();
        //瞬间定位
        setTranslateX(translateX);

        isMove = true;
    });

    slider_ul.addEventListener("touchend", function (e) {
        //根据手势方向切换图片
        //当distance不超过图片的1/3，吸附回去，否者，切换图片
        if(isMove){
            if(Math.abs(distance) < slider_width/3){

                var translateX = -_index*slider_width;
                //设置过渡效果
                setTransition();
                //瞬间定位
                setTranslateX(translateX);

            }else{
                if(distance > 0){
                    //向右
                    _index--;
                }else{
                    //向左
                    _index++;
                }
                var translateX = -_index*slider_width;
                //设置过渡效果
                setTransition();
                //瞬间定位
                setTranslateX(translateX);
            }
        }

        clearInterval(timer);
        //重置定时器
        timer = setInterval(function () {
            _index++;
            var translateX = -_index*slider_width;
            //设置过渡效果
            setTransition();
            setTranslateX(translateX);
            console.log(_index);
        },2000);

        //重置坐标参数
        startX = 0;
        moveX = 0;
        distance = 0;
        isMove = false;
    });
}

function downTime() {
    var pro_time = document.querySelector(".pro-time");
    var times = pro_time.querySelectorAll("i");

    //设置总时间为4h
    var timeAll = 4*3600;

    var timer = setInterval(function () {
        timeAll--;
        var h = Math.floor(timeAll/3600);
        var m = Math.floor(timeAll%3600/60);
        var s = Math.floor(timeAll%60);

        times[0].innerHTML = Math.floor(h/10);
        times[1].innerHTML = h%10;

        times[3].innerHTML = Math.floor(m/10);
        times[4].innerHTML = m%10;

        times[6].innerHTML = Math.floor(s/10);
        times[7].innerHTML = s%10;

        if(timeAll < 0){
            clearInterval(timer);
        }
    },1000);
}