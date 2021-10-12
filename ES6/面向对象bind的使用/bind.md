# 面向对象 `bind` 的使用

> ==功能介绍：==
>
> 1. *点击按钮后变为不可使用的状态*
> 2. *点击等待两秒后恢复按钮的使用状态*

## 思路

1. 获取按钮元素，为按钮元素设置一个点击事件。
2. 触发点击事件后禁用按钮，并启动定时器。
3. 定时器结束后启用按钮，关闭定时器。

## 代码

`HTML`

```html
    <button>点击</button>
```

## 操作

根据思路，先获取元素并绑定点击事件，点击后禁用按钮，启动定时器，2秒后启用按钮。

```js
    let btn = document.querySelector('button');
    btn.addEventListener('click', function() {
        this.disabled = true;
        setTimeout(function() {
            this.disabled = false;
            console.log('运行完成');
        }, 2000)
    })
```

在定时器内添加一个 `log` 语句，方便查看结果。

![没用bind](https://i.loli.net/2021/10/12/7pworBGtnxyuWez.png)

发现定时器已启用，但是按钮并没有恢复可用状态。

通过翻阅笔记我们可以看到，普通事件的 `this` 指向其本身，而定时器的 `this` 指向 `window` 。第一个 `this` 指向按钮 `btn` ，第二个 `this` 指向 `window` ，而 `window` 没有 `disable` 这个属性。把 `this` 改为 `btn` 试试看。

```js
    let btn = document.querySelector('button');
    btn.addEventListener('click', function() {
        this.disabled = true;
        setTimeout(function() {
            btn.disabled = false;
            console.log('改为btn看看');
        }, 2000)
    })
```

查看结果。

![改为btn](https://i.loli.net/2021/10/12/ipjwvSM8e9c3qtr.png)

按钮成功启用，证明确实是 `this` 指向的问题，可如果事件元素 `btn` 的名字更改时，定时器内的事件名称也要随之更改，创建一个新的变量存储按钮 `btn` 的 `this` 指向又需要额外开辟一个新的空间，这个时候可用 `bind` 改变 `this` 指向。

```js
    let btn = document.querySelector('button');
    btn.addEventListener('click', function() {
        this.disabled = true;
        setTimeout(function() {
            btn.disabled = false;
            console.log('运用bind改变this指向');
        }.bind(this), 2000)
    })
```

查看效果，成功运行。

![用了bind](https://i.loli.net/2021/10/12/xyqofJbCv2ARODH.png)

## 答疑解惑

问题：为什么用 `bind` 而不用 `call` 或者 `apply` ？

因为 `call` 或 `apply` 调用之后会立即执行，而 `bind` 不会立即调用。