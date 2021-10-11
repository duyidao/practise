// 获取相应元素
let tbody = document.querySelector('tbody');
let search_price = document.querySelector('.search-price');
let start = document.querySelector('.start');
let end = document.querySelector('.end');
let product = document.querySelector('.product');
let shop_name = document.querySelector('.search-pro');
setData(data);
// 把数据渲染到页面中
function setData(mydata) {
    tbody.innerHTML = '';
    mydata.forEach(function(value) {
        let tr = document.createElement('tr');
        tr.innerHTML = '<td>' + value.id + '</td><td>' + value.shopName + '</td><td>' + value.price + '</td>'
        tbody.appendChild(tr);
    })
}
// 根据价格查询商品
search_price.addEventListener('click', function() {
    let newData = data.filter(function(value) {
        return value.price >= start.value && value.price <= end.value;
    })
    console.log(newData);
    setData(newData);
});
// 根据商品名称查找商品
shop_name.addEventListener('click', function() {
    // 这里用some是因为some查到元素就直接退出循环，效率很高 
    let arr = [];
    data.some(function(value) {
        if (product.value === value.shopName) {
            arr.push(value);
            return true;
        }
    });
    // 把拿到的数据渲染到页面上
    setData(arr);
})