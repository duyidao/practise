window.addEventListener('load', function() {
    let put = document.querySelector('.put');
    let ul = put.querySelector('ul');
    let find = document.querySelector('.find').querySelector('ul').querySelectorAll('li');
    for (let i = 0; i < 4; i++) {
        find[i].onmouseenter = function() {
            ul.style.zIndex = 9999;

            let newData = find_data.filter(function(value) {
                return value.id === i + 1;
            })
            console.log(newData);
            setData(newData);
        }

        function setData(mydata) {
            mydata.forEach(function(value) {
                let li = document.createElement('li');
                li.innerHTML = '<span>' + value.shopName + '</span><img src="' + value.shopImg + '"/>'
                ul.appendChild(li);
            })
        }

        find[i].onmouseleave = function() {
            ul.style.zIndex = 0;
        }
    }
})