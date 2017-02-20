window.jd_project = {};
jd_project.addTransitionEnd = function (dom,callback) {
    dom.addEventListener("transitionEnd", function () {
        callback&&callback();
    });
    dom.addEventListener("webkitTransitionEnd", function () {
        callback&&callback();
    });
};