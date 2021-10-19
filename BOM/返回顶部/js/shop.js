window.addEventListener('load', function() {
    let ul = document.querySelector('.shop-data');
    setData(data);

    function setData(mydata) {
        mydata.forEach(function(value) {
            let li = document.createElement('li');
            li.innerHTML = '<img src="' + value.shopImg + '"/><em>' + value.shopName + '</em><span>' + value.shopIntroduce + '</span><strong>' + value.price + '</strong>'
            ul.appendChild(li);
            li.className = 'marbo';
        })
    }
})