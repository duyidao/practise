window.addEventListener('load', function() {
    // 1.获取元素
    let bgImage = document.querySelector('.bgImage');
    let arrowL = bgImage.querySelector('.zuo');
    let arrowR = bgImage.querySelector('.you');
    let bgImageWidth = bgImage.offsetWidth;
    let flag = true;
    // 2.鼠标移动显示按钮，离开隐藏
    bgImage.addEventListener('mouseenter', function() {
        arrowL.style.display = 'block';
        arrowR.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    bgImage.addEventListener('mouseleave', function() {
        arrowL.style.display = 'none';
        arrowR.style.display = 'none';
        timer = setInterval(function() {
            arrowR.click();
        }, 1500);
    });
    // 3.动态生成小圆圈
    let ul = bgImage.querySelector('ul');
    let ol = bgImage.querySelector('ol');
    let lii = ul.querySelector('li');
    let lis = ul.children.length;
    for (let i = 0; i < lis; i++) {
        let li = document.createElement('li');
        // 自定义当前小圆圈索引号，为第五步做准备
        li.setAttribute('index', i);
        ol.appendChild(li);
        // 4.排他思想，绑定小圆圈点击事件
        li.addEventListener('click', function() {
            for (let i = 0; i < lis; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 5.点击小圆圈，移动图片
            // ul的移动距离为小圆圈索引号乘图片宽
            let index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(ul, -index * bgImageWidth);
        })
    }
    // 为第一个小圆圈加上类名
    ol.children[0].className = 'current';
    // 6.克隆第一张图片(li)放到ul后面
    let first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 7.点击右侧按钮，图片滚动一次
    let circle = 0; //控制小圆圈跟随变化
    let num = 0;
    arrowR.addEventListener('click', function() {
        if (flag) {
            flag = false; // 关闭节流阀
            // 如果走到最后一张图片,则让ul快速复原
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * bgImageWidth, function() {
                flag = true;
            });
            circle++;
            // 8.点击右侧按钮小圆圈跟随变化
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });
    // 9.点击左侧按钮,图片滚动一次
    arrowL.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // 如果走到最后一张图片,则让ul快速复原
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * bgImageWidth + 'px';
            }
            num--;
            animate(ul, -num * bgImageWidth, function() {
                flag = true;
            });
            circle--;
            // 8.点击右侧按钮小圆圈跟随变化
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    })

    function circleChange() {
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    // 10.自动播放功能
    let timer = setInterval(function() {
        arrowR.click();
    }, 1500);
})