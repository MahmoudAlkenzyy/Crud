let title = document.getElementById('title')
let price = document.getElementById('price')
let ads = document.getElementById('ads')
let taxes = document.getElementById('taxes')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

// get total
function getTotal() {
    if (price.value != '') {
        let result =
            Number(price.value) +
            Number(taxes.value) +
            Number(ads.value) -
            Number(discount.value)
        total.innerHTML = result
        total.classList.replace('bg-danger', 'bg-success')
    } else {
        total.classList.replace('bg-success', 'bg-danger')
        total.innerHTML = ''
    }
}
// Create Product

let productDate
if (localStorage.product != null) {
    productDate = JSON.parse(localStorage.product)
} else {
    productDate = []
}
submit.onclick = function () {
    let newProduct = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    productDate.push(newProduct)
    localStorage.setItem('product', JSON.stringify(productDate))
    clearData()
}
// cleare input
function clearData() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.valxue = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
}
