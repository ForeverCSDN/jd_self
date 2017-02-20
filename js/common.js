//命名空间，保证变量不会被污染
window.jd_project = {};
jd_project.addTransitionEnd = function (dom,callback) {

    if(!dom || typeof(dom) != "object"){
        return false;
    }
    dom.addEventListener("transitionEnd", function () {
        callback&&callback();
    });
    dom.addEventListener("webkitTransitionEnd", function () {
        callback&&callback();
    });
};