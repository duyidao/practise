# 面向对象用 `bind` 进行 `Tab` 栏切换

前面已经实现过面向对象 `Tab` 栏切换，当时是创建一个新的变量 `that` ，赋值为 `constructor` 的 `this` ，再让下面的函数调用。

但是这样会额外消耗内存，学过 `bind` 之后，可以利用 `bind` 来改变 `this` 指向，这样就不需要额外开辟一个空间来存储。

## 实际操作

截取部分主要代码进行操作。

由于 `toggleTab` 用到了that，因此先更改 `lis` 的点击事件 `toggleTab` ，改变其 `this` 指向，而 `bind` 是最合适的选择，点击完之后在执行。

在 `toggleTab` 后面添加 `bind` ，改变 `this` 指向，此时 `toggleTab` 事件的 `this` 指向为 `constructor` 的 `this` 。运行查看结果。

```js
    constructor(id) {
        this.init();
    }

    init() {
        // 初始化操作让相关元素绑定事件
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
        }
    }

    // 切换功能
    toggleTab() {
        that.clearClass();
        this.className = 'licurrent';
        that.sections[this.index].className = 'sectionSee';
    }
```

![diyicibaocuo](https://i.loli.net/2021/10/12/R7xZsTkfeV9MyqA.png)

结果报错，查看报错信息，指该对象没有 `className` 属性。

排查后可发现， `toggleTab` 函数内有两个 `this` 指向，一个是 `toggleTab` 函数调用者 `lis[i]` 的 `this` ，一个是 `constructor` 的 `this`（这里为 `that` ），因此如果向上面这么写则改变了全部的 `this` 指向，而 `constructor` 是没有 `className` 属性的。

我们可以利用传参的形式，先确定 `toggleTab` 函数的this指向为 `lis[i]` 的 `this` ，接着把 `constructor` 的 `this` 当作形参传递给 `toggleTab` 函数， `toggleTab` 函数则用实参接收，这里为了分辨继续使用 `that` ，这样就能把两个 `this` 区分开。

```js
    constructor(id) {
        this.init();
    }
    
    init() {
        // 初始化操作让相关元素绑定事件
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab.bind(this.lis[i], this);
        }
    }

    // 切换功能
    toggleTab(that) {
        that.clearClass();
        this.className = 'licurrent';
        that.sections[this.index].className = 'sectionSee';
    }
```

![不再报错](https://i.loli.net/2021/10/12/vqCMEehB4iNJy2j.png)

运行查看结果，不再报错，证明方法可行，如法炮制对其余用到 `that` 的函数使用 `bind` 方法。

## 最终代码

```js
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

    // 切换功能
    toggleTab(that) {
        that.clearClass();
        this.className = 'licurrent';
        that.sections[this.index].className = 'sectionSee';
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
```

## 答疑解惑

1. 为什么要用 `bind` ？

   答：`bind` 不会立即执行，而是等待点击事件触发才会执行，而 `apply` 和 `call` 不具备这样的特性。

2. 为什么不修改函数的 `this` 指向？

   答：函数里的 `this` 指向（如 `toggleTab` ）有两个，一个是指向函数事件的调用者，一个指向 `constructor` ，因此要区分开来。`this.lis[i]` 指向他本身，后面 `this` 指向是调用的那个，谁调用就指向谁，类里面调用了 `init()` 。

   ![this指向](https://i.loli.net/2021/10/12/knqjOpVfaNuTM8R.png)