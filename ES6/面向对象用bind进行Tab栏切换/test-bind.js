"use strict";
let m = 1;
class Tab {
    constructor(id) {
        this.main = document.querySelector(id);
        this.tabadd = this.main.querySelector('.tabadd');
        // 设置li和section的父类
        this.ul = this.main.querySelector('.tabtop ul:first-child');
        this.sectionFather = this.main.querySelector('.tabdown');
        this.init();
    }
    init() {
        // 初始化操作让相关元素绑定事件
        this.uploadTab();
        this.tabadd.onclick = this.addTab.bind(this.tabadd, this);
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab.bind(this.lis[i], this);
            this.spans[i].onclick = this.removeTab.bind(this.spans[i], this);
            this.liSpans[i].ondblclick = this.changeTab;
            this.sections[i].ondblclick = this.changeTab;
        }
    };

    // 切换功能
    toggleTab(that) {
        that.clearClass();
        this.className = 'licurrent';
        that.sections[this.index].className = 'sectionSee';
    }

    // 获取动态的新增元素
    uploadTab() {
        // 获取所有li和section、span
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.spans = this.main.querySelectorAll('.icon');
        this.liSpans = this.main.querySelectorAll('.tabtop li span:first-child');
    }

    // 添加功能
    addTab(that) {
        that.clearClass();
        window.getSelection ? window.getSelection().removeAllRanges() : document.section.empty();
        let li = '<li class="licurrent"><span>新增卡' + m + '</span><span class="icon">x</span></li>';
        let section = '<section class="sectionSee">新增卡' + m + '</section>';
        m++;
        that.ul.insertAdjacentHTML('beforeend', li);
        that.sectionFather.insertAdjacentHTML('beforeend', section);
        that.init();
    }

    // 清楚类名
    clearClass() {
        for (let j = 0; j < this.lis.length; j++) {
            this.lis[j].className = '';
            this.sections[j].className = '';
        }
    }

    // 删除功能
    removeTab(that, e) {
        e.stopPropagation(); //阻止冒泡，防止触发li的切换事件
        let index = this.parentNode.index;
        that.lis[index].remove();
        that.sections[index].remove(); // remove()方法可以直接删除指定元素
        that.init();
        if (document.querySelector('.licurrent')) return; // 判断删除的选项卡时当前选项卡有没有这个类，如果有则不执行下面的代码
        index--;
        that.lis[index] && that.lis[index].click();
    }

    // 修改功能
    changeTab() {
        let str = this.innerHTML;
        // 双击取消文字选定
        window.getSelection ? window.getSelection().removeAllRanges() : document.section.empty();
        this.innerHTML = '<input type="text"/>';
        let input = this.children[0];
        input.value = str;
        input.select();
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        }
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                this.blur();
            }
        }
    }
}
new Tab('#tab');