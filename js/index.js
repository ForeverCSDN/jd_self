
window.onload = function () {

    searchBox();

    sliderImg();

    downTime();
};

/*header透明度的改变*/
function searchBox() {
    //轮播图
    var sliderBox = document.querySelector(".jd-slider");
    //搜索
    var searchBox = document.querySelector(".jd-header");

    var slider_height = sliderBox.offsetHeight;
    var opacity = 0;
    window.onscroll = function () {
        var scroll_top = document.body.scrollTop;
        if(scroll_top < slider_height){
            opacity = scroll_top / slider_height * 0.85;
        }else{
            opacity = 0.85;
        }
        searchBox.style.background = "rgba(201,21,35,"+opacity+")";
    };

}
/*slider轮播图*/
function sliderImg() {

    var sliderBox = document.querySelector(".jd-slider");
    var img_width = sliderBox.offsetWidth;
    var imgBox = sliderBox.querySelector("ul:first-child");

    var pointBox = sliderBox.querySelector("ul:last-child");
    var points = pointBox.querySelectorAll("li");

    //清除过渡
    var removeTransition = function () {
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";
    };
    //设置过渡
    var setTransition = function () {
        imgBox.style.transition = "all 0.3s";
        imgBox.style.webkitTransition = "all 0.3s";
    };
    //设置当前位置
    var setTranslateX = function (translateX) {
        imgBox.style.transform = "translateX("+translateX+"px)";
        imgBox.style.webkitTransform = "translateX("+translateX+"px)";
    };

    //用于当前图片的索引值
    var index = 1;
    //设置定时器无缝滚动
    var timer = setInterval(function () {
        index++;
        setTransition();
        setTranslateX(-index*img_width);
    },3000);

    //过渡效果执行完之后再执行该事件
    jd_project.addTransitionEnd(imgBox, function () {
        if(index >= 9){
            index = 1;
            //清除过渡
            removeTransition();
            setTranslateX(-index*img_width);
        }
        if(index <= 0){
            index = 8;
            //清除过渡
            removeTransition();
            setTranslateX(-index*img_width);
        }
        setPoint();
    });

    //对应小圆点样式的改变
    var setPoint = function () {
        for(var i = 0;i < points.length;i++){
            points[i].className = "";
        }
        points[index - 1].className = "current";
    };
    //定义坐标值
    var startX = 0;
    var moveX = 0;
    var distance = 0;
    //判断是否移动
    var isMove = false;
    //手指接触屏幕
    imgBox.addEventListener("touchstart", function (e) {
        //清除定时器
        clearInterval(timer);
        //触点的当前坐标值
        startX = e.touches[0].clientX;

    });
    //手指移动
    imgBox.addEventListener("touchmove", function (e) {
        moveX = e.touches[0].clientX;
        distance = moveX - startX;

        //记录当前的位置以及图片与手指同步滑动
        //清除过渡
        removeTransition();

        //同步移动
        setTranslateX(-index*img_width + distance);
        isMove = true;
    });
    //手指离开屏幕
    imgBox.addEventListener("touchend", function (e) {
        //判断移动的距离及手势方向
        if(isMove){
            if(Math.abs(distance) < img_width/3){
                //吸附
                //设置过渡
                setTransition();

                setTranslateX(-index*img_width);
            }else{
                //移动到上一张或下一张
                if(distance > 0){
                    //向右
                    index--;
                }else{
                    //向左
                    index++;
                }
                //设置过渡
                setTransition();

                setTranslateX(-index*img_width);
            }
        }
        clearInterval(timer);
        //重置定时器和参数
        timer = setInterval(function () {
            index++;
            //设置过渡
            setTransition();

            setTranslateX(-index*img_width);
        },1000);

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