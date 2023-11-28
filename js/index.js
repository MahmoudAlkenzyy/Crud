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
