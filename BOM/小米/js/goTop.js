window.addEventListener('load', function() {
    // 1.获取元素
    let gu = document.querySelector('.gu');
    let nav = document.querySelector('.b');
    let shop = document.querySelector('.shop');
    let goTop = document.querySelector('.goTop');
    let shopTop = shop.offsetTop;
    let navTop = nav.offsetTop;
    document.addEventListener('scroll', function() {
        if (window.pageYOffset >= navTop) {
            gu.style.display = 'block';
        } else {
            gu.style.display = 'none';
        }
        if (window.pageYOffset >= shopTop) {
            goTop.style.display = 'block';
        } else {
            goTop.style.display = 'none';
        }
    });
    // 4.点击返回顶部则返回顶部
    goTop.addEventListener('click', function() {
        // window.scroll(0, 0);  没有用到动画
        animate(window, 0)
    })

    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            var step = (target - window.pageYOffset) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (window.pageYOffset == target) {
                clearInterval(obj.timer);
                // 回调函数写在定时器结束里面
                if (callback) {
                    // 如果有回调函数，则调用该函数
                    callback();
                }
            }
            window.scroll(0, window.pageYOffset + step);
        }, 15);
    }
})