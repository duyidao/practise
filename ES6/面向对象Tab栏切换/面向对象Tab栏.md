# 面向对象 `Tab` 栏制作

> ==布局展示：==
>
> ![es6tab栏整体](https://i.loli.net/2021/10/08/gKZTwYmQVfAns3W.png)
>
> ==功能介绍：==
>
> 1. *切换功能：点击上方选项卡可实现任意切换，下方的文本也随之切换。*
> 2. *添加功能：点击右方的加号可在上方后面添加新的选项卡。*
> 3. *删除功能：点击选项卡右上方的❌号，可删除该选项卡。*
> 4. *修改功能：双击选项卡或下方文本，可生成 `input` 文本框对其内容进行修改并保存。*

## 静态代码

### `HTML` 部分

```html
    <main>
        <h3>记事本</h3>
        <div class="tab" id="tab">
            <nav class="tabtop">
                <ul>
                    <li class="licurrent"><span>测试1</span><span class="icon">x</span></li>
                    <li><span>测试2</span><span class="icon">x</span></li>
                    <li><span>测试3</span><span class="icon">x</span></li>
                </ul>
                <div class="tabadd">
                    <span>+</span>
                </div>
            </nav>
            <div class="tabdown">
                <section class="sectionSee">菜单1</section>
                <section>菜单2</section>
                <section>菜单3</section>
            </div>
        </div>
    </main>
```

### `CSS` 部分

1. 默认设置及 `tab` 栏上方部分

   ```css
   * {
       margin: 0;
       padding: 0;
       border: 0;
       box-sizing: border-box;
   }
   
   li {
       list-style: none;
   }
   
   .sectionSee {
       display: block!important;
   }
   
   input {
       width: 95%;
       height: 30px;
       text-align: center;
       font-size: 14px;
       background-color: pink;
       border-color: #fff;
   }
   
   main {
       width: 1000px;
       height: 700px;
       margin: 50px auto;
   }
   
   main h3 {
       width: 100%;
       height: 50px;
       line-height: 50px;
       font-size: 25px;
       margin: 50px 0;
       text-align: center;
       letter-spacing: 30px;
   }
   ```

2. `tab` 栏上方选项卡部分

   ```css
   main .tab {
       width: 100%;
       height: 550px;
       border: 2px solid crimson;
   }
   
   main .tab .tabtop {
       position: relative;
       width: 100%;
       height: 50px;
   }
   
   main .tab .tabtop ul {
       display: flex;
       position: absolute;
       top: 0;
       left: 0;
       width: 90%;
       height: 100%;
       background-color: rgb(253, 198, 198);
   }
   
   main .tab .tabtop ul li {
       position: relative;
       width: 80px;
       height: 100%;
       text-align: center;
       line-height: 50px;
       margin: 0 10px;
       padding: 0 5px;
       cursor: pointer;
       font-size: 14px;
   }
   
   main .tab .tabtop ul li span:first-child {
       display: block;
       width: 100%;
       height: 60%;
       line-height: 30px;
       margin-top: 10px;
   }
   
   main .tab .tabtop ul .licurrent {
       border-bottom: 3px solid crimson;
   }
   
   main .tab .tabtop ul li .icon {
       position: absolute;
       top: 0;
       right: -6px;
       width: 10px;
       height: 10px;
       line-height: 7px;
       font-size: 6px;
       color: #fff;
       background-color: crimson;
   }
   
   main .tab .tabtop .tabadd {
       position: absolute;
       top: 0;
       right: 0;
       width: 10%;
       height: 50px;
       font-size: 25px;
       text-align: center;
       background-color: pink;
   }
   
   main .tab .tabtop .tabadd span {
       display: inline-block;
       width: 25px;
       height: 25px;
       line-height: 23px;
       text-align: center;
       border: 1px solid #333;
       margin: 13px auto;
       cursor: pointer;
   }
   ```

3. `tab` 栏下方内容文本部分

   ```css
   main .tab .tabdown {
       width: 100%;
       height: 500px;
   }
   
   main .tab .tabdown section {
       display: none;
       width: 90%;
       height: 90%;
       margin: 25px 50px;
   }
   
   main .tab .tabdown section input {
       width: 100%;
       height: 100px;
       line-height: 100px;
       text-align: left;
   }
   ```

## 动态代码

### 大体模块

由 `constructor` 接受传递的参数，获取元素

```javascript
"use strict";
class Tab {
    constructor(id) {
         this.lis = this.main.querySelectorAll('li');
         this.sections = this.main.querySelectorAll('section');
		this.init();
    }
    
    // 切换功能
    toggleTab() {

    }
    
    // 添加功能
    addTab() {

    }
    
    // 删除功能
    removeTab() {

    }
    
    // 修改功能
    changeTab() {
    
    }
}
new Tab('#tab');
```

想要在页面刷新加载好前，就让相关事件提前绑定好相关事件，因此我们需要设置一个事件 `init` 进行初始化操作。

```js
    init() {
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
    }
```

### 功能模块

1. 切换功能

   点击 `li` 时触发切换功能 `toggleTab` ，当前点击的 `li` 添加样式，其余 `li` 删除样式（排他思想）。

   当点击第一个 `li` ，就让第一个 `section` 显示，其余隐藏；当点击第二个 `li` ，就让第二个 `section` 显示，其余隐藏；当点击第 `n` 个 `li` ，就让第 `n` 个 `section` 显示，其余隐藏······可以用当前 `li` 的索引号进行操作。

   ```js
       toggleTab() {
           that.clearClass();
           this.className = 'licurrent';
           this.sections[this.index].className = 'sectionSee';
       }
   ```

   用 `for` 循环进行排他思想操作，由于后面还会用到，因此为清除样式设置一个新的函数，让切换函数 `toggleTab` 调用。

   ```js
       clearClass() {
           for (let j = 0; j < this.lis.length; j++) {
               this.lis[j].className = '';
               this.sections[j].className = '';
           }
       }
   ```

   查看效果，发现报错，查看报错信息。

   ![切换功能报错信息](https://i.loli.net/2021/10/08/CIslMu4de81PGFg.png)

   `this` 是谁调用就指向谁，查看代码不难看出，`toggleTab` 这个事件是由 `lis` 来调用，而 `lis` 里面没有 `sections` 这个对象，因此报错。

   解决方法也很简单，设置一个全局变量 `that` ，赋值 `that` 等于 `constructor` 里面的 `this` 即可。

   ```js
   let that;
   class Tab {
       constructor(id) {
           that = this;
           this.main = document.querySelector(id);
           this.init();
       }
       toggleTab() {
           that.clearClass();
           this.className = 'licurrent';
           that.sections[this.index].className = 'sectionSee';
       }
   }
   ```

   > ==注意：==
   >
   > 1. *类里面的方法只能是由对象自己调用，`init` 就是对象自己在调用，所以 `init` 里面的 `this` 都是指的对象自己，而 `init` 里面通过对象 `(this)` 来为 `li` 绑定函数。*
   > 2. *这个方法里面的 `this` 指的就是这个 `li` ,在 `toggleTab` 方法中需要转换为`that` （对象自己）来调用，而不是由 `li` 来调用。*
   > 3. *函数 `clearClass` 里用 `this` 是因为该函数是由 `that` 来调用，而 ` that` 是`constructor`里的 `this` ，因此可以这么调用。*

2. 添加功能

   获取按钮的元素，为其添加点击事件（由于按钮只有一个，不需要写在循环内），接下来开始按步骤创建功能。

   > ==步骤：==
   >
   > 1. 创建新的选项卡 `li` 和新的内容 `section` 。
   > 2. 把创建的两个元素追加到对应的父元素中。

   以往父元素追加创建的子元素我们采用 `innerHTML` 赋值， `appendChild` 追加，不过该方法不支持追加字符串的子元素，这次我们可以使用 `insertAdjacentHTML` 进行操作。获取 `li` 和 `section` 的父元素，把 `li` 和 `section` 添加到父元素里面，再引用一次清除样式函数，实现新增选项卡处于选中状态，取消原选项卡的选中状态。

   网络地址：[ `[element.insertAdjacentHTML - Web API 接口参考 | MDN]` ](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML) 

   |      位置       |               含义               |
   | :-------------: | :------------------------------: |
   | `'beforebegin'` |          元素自身的前面          |
   | `'afterbegin'`  |  插入元素内部的第一个子节点之前  |
   |  `'beforeend'`  | 插入元素内部的最后一个子节点之后 |
   |  `'afterend'`   |          元素自身的后面          |

   ```js
           constructor(id) {
           that = this;
           this.main = document.querySelector(id);
           this.lis = this.main.querySelectorAll('li');
           this.sections = this.main.querySelectorAll('section');
           this.tabadd = this.main.querySelector('.tabadd');
           this.ul = this.main.querySelector('.tabtop ul:first-child');
           this.sectionFather = this.main.querySelector('.tabdown');
           this.init();
       }
           init() {
           this.tabadd.onclick = this.addTab;
           for (let i = 0; i < this.lis.length; i++) {
               this.lis[i].index = i;
               this.lis[i].onclick = this.toggleTab;
           }
       addTab() {
           that.clearClass();
           window.getSelection ? window.getSelection().removeAllRanges() : document.section.empty();
           let li = '<li class="licurrent"><span>新增卡' + m + '</span><span class="icon">x</span></li>';
           let section = '<section class="sectionSee">新增卡' + m + '</section>';
           m++;
           that.ul.insertAdjacentHTML('beforeend', li);
           that.sectionFather.insertAdjacentHTML('beforeend', section);
       }
   ```

   运行查看效果，我们发现新增的 `li` 无法取消选中的样式，而且无法使用切换功能，如下图所示。

   ![添加li](https://i.loli.net/2021/10/08/MZY9nPSIexVhNQ1.png)

   通过排查，发现是因为这些 `li` 和 `section` 是后来添加的，而一开始获取元素绑定事件的是原本的 `li` 和 `section` ，后面添加的 `li` 和 `section` 是没被获取到的，自然而没有被绑定事件。

   > ==解决方法：==
   >
   > *每次点击加号就重新获取一次 `li` 和 `section` ，再绑定一次事件。*

   根据这个思路我们可以再设置一个新的函数 `uploadTab` ，用于获取所有 `li` 和 `section` ，当初始化时就调用该函数，因此写在 `init` 函数内。而每次加号被点击，就调用一次 `init` ，获取新增的 `li` 和 `section` 并绑定事件。

   ![点击事件](https://i.loli.net/2021/10/08/NsrfdMhazIGwY1p.png)

   ```js
       constructor(id) {
           that = this;
           this.main = document.querySelector(id);
           this.tabadd = this.main.querySelector('.tabadd');
           this.ul = this.main.querySelector('.tabtop ul:first-child');
           this.sectionFather = this.main.querySelector('.tabdown');
           this.init();
       }
       init() {
           this.uploadTab();
           this.tabadd.onclick = this.addTab;
           for (let i = 0; i < this.lis.length; i++) {
               this.lis[i].index = i;
               this.lis[i].onclick = this.toggleTab;
           }
       }
       uploadTab() {
           this.lis = this.main.querySelectorAll('li');
           this.sections = this.main.querySelectorAll('section');
       }
       addTab() {
           that.clearClass();
           window.getSelection ? window.getSelection().removeAllRanges() : document.section.empty();
           // 创建元素
           let li = '<li class="licurrent"><span>新增卡' + m + '</span><span class="icon">x</span></li>';
           let section = '<section class="sectionSee">新增卡' + m + '</section>';
           m++;
           // 添加元素
           that.ul.insertAdjacentHTML('beforeend', li);
           that.sectionFather.insertAdjacentHTML('beforeend', section);
           that.init();
       }
   ```

   > ==注意：==
   >
   > 1. *添加功能 `addTab` 是由添加按钮调用，按钮无法使用排他思想，因此 `clearClass` 清除类名则需要调用 `constructor` 的 `this`。*
   > 2. *这个方法里的 `this` 指的是按钮 `<span>+</span>` ，无法调用方法 `init` 初始化 `li` 和 `section` ，因此要用 `that` ，即 `constructor` 的 `this`。*

3. 删除功能

   我们可以根据索引号进行删除，删除的❌号没有索引号，但是它的父亲 `li` 是有索引号的，点击❌号可以删除索引号对应的 `li` 和 `section` 。

   删除按钮可以添加、删除，因此在 `uploadTab` 函数内获取，为其绑定删除事件 `removeTab` 。

   ```js
       init() {
           // 初始化操作让相关元素绑定事件
           this.uploadTab();
           this.tabadd.onclick = this.addTab;
           for (let i = 0; i < this.lis.length; i++) {
               this.lis[i].index = i;
               this.lis[i].onclick = this.toggleTab;
               this.spans[i].onclick = this.removeTab;
           }
       }
       uploadTab() {
           // 获取所有li和section、span
           this.lis = this.main.querySelectorAll('li');
           this.sections = this.main.querySelectorAll('section');
           this.spans = this.main.querySelectorAll('.icon');
       }
   ```

   如果获取删除按钮语句写在 `constructor` 内而非写在 `uploadTab` 内，则会造成新增的删除按钮未被获取，数量少于 `li` ，新增的选项卡无法被删除而报错。

   ![删除按钮未获取新增的](https://i.loli.net/2021/10/08/9nPczrJ5bwiK1th.png)

   根据删除按钮的父类 `li` 的索引号进行删除，因此先获取索引号并赋值给一个局部变量 `index`，用 `remove()` 进行删除。每当执行一次删除事件，就调用一次 `init` 函数重新获取所有的 `li`、`section` 和删除按钮，保证每次执行完操作获取的元素都是最新的。

   ```js
       removeTab(e) {
           e.stopPropagation(); //阻止冒泡，防止触发li的切换事件
           let index = this.parentNode.index;
           that.lis[index].remove();
           that.sections[index].remove();
           that.init();
           if (document.querySelector('.licurrent')) return;
           index--;
           that.lis[index] && that.lis[index].click();
       }
   ```

   > ==注意：==
   >
   > 1. *当点击删除按钮时会触发冒泡，导致被迫触发切换事件，因此要先取消冒泡。*
   > 2. *当删除选定状态的 `li` 时，让它前一个 `li` 处于选定状态，可让 `index` 自减一，让该索引号的 `li` 自动调用点击事件。*
   > 3. *当选项卡被删除完毕后会报错，显示没有 `spans` 可调用点击删除事件，我们可以用到短路思想，用 `&&` 先判断有没有该索引号的 `li`。*
   > 4. *当我们删除非选中状态的选项卡，会自动跳转到被删除选项卡的前一个选项卡，用户体验不好，因此可以加个 `if` 判断，判断被删的是否为被选中状态，如果没被选中则直接 `return`，不执行下面的代码。*

4. 修改功能

   双击则修改文本内容，因此绑定双击事件 `ondblclick` ，修改文本思路为生成 `input` 文本框进行修改。由于 `li` 和 `section` 数量不断变动，因此文本也要在 `uploadTab` 函数内获取。

   ```js
       init() {
           // 初始化操作让相关元素绑定事件
           this.uploadTab();
           this.tabadd.onclick = this.addTab;
           for (let i = 0; i < this.lis.length; i++) {
               this.lis[i].index = i;
               this.lis[i].onclick = this.toggleTab;
               this.spans[i].onclick = this.removeTab;
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
   ```

   双击文字默认选定文字，需要先取消；在生成文本框时保留原先内容并选中；当失去焦点或点回车则保存退出，把文本框的值给 `span`。

   ```js
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
   ```

   > ==回顾：==
   >
   > 1. *文本框的值处于选定状态：`input.select()`。*
   >
   > 2. *文本框 `input` 为该选项卡 `li` 的第一个孩子，因此获取文本框的代码为 `let input = this.children[0];`*
   >
   >    ![input为第一个孩子](https://i.loli.net/2021/10/08/vVeH2iLKW9U5YFm.png)
   >
   > 3. *按回车触发事件可调用键盘弹起 `onkeyup` 事件，触发后手动调用失去焦点事件。*

### 整体代码

```js
"use strict";
let that;
let m = 1;
class Tab {
    constructor(id) {
        that = this;
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
        this.tabadd.onclick = this.addTab;
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.spans[i].onclick = this.removeTab;
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
    addTab() {
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
    toggleTab() {
        that.clearClass();
        this.className = 'licurrent';
        that.sections[this.index].className = 'sectionSee';
    }

    // 删除功能
    removeTab(e) {
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