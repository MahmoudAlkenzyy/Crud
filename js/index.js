let title = document.getElementById('title');
let price = document.getElementById('price');
let ads = document.getElementById('ads');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let deleteAll = document.getElementById('deleteAll');
let sideBar = document.getElementById('offcanvasExample');
let goUp = document.getElementById('goUp');
let searchInput = document.getElementById('search');
let mood = 'create';
let searchMood = 'title';
let scrollPosition = scrollY;
let index;
/////////// get total
function getTotal() {
    if (price.value != '') {
        let result =
            Number(price.value) +
            Number(taxes.value) +
            Number(ads.value) -
            Number(discount.value);
        total.innerHTML = result;
        total.classList.replace('bg-danger', 'bg-success');
    } else {
        total.classList.replace('bg-success', 'bg-danger');
        total.innerHTML = '';
    }
}
/////////// Create Product

let productData;
if (localStorage.product != null) {
    productData = JSON.parse(localStorage.product);
} else {
    productData = [];
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
    };

    if (mood === 'create') {
        if (newProduct.count > 1) {
            for (let i = 0; newProduct.count > i; i++) {
                productData.push(newProduct);
            }
        } else {
            productData.push(newProduct);
        }
    } else {
        productData[index] = newProduct;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display = 'block';
    }
    localStorage.setItem('product', JSON.stringify(productData));
    clearData();
    ReadData();
};
/////////// cleare input
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.valxue = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
///////////Read data
function ReadData() {
    let table = '';
    for (let i = 0; i < productData.length; i++) {
        table += ` <tr>
        <td>${i}</td>
            <td>${productData[i].title}</td>
            <td>${productData[i].price}</td>
            <td>${productData[i].taxes}</td>
            <td>${productData[i].ads}</td>
            <td>${productData[i].discount}</td>
            <td>${productData[i].total}</td>
            <td>${productData[i].category}</td>
            
            <td>
                <button onClick="updateData(${i})"  
                 data-bs-toggle="offcanvas"
                 data-bs-target="#offcanvasExample"
                 aria-controls="offcanvasExample" class="btn">
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                    </button>
                    </td>
                    <td>
                    <button class="btn">
                    <i onClick={DeleteProduct(${i})} class="fa-regular fa-trash-can bg-danger delete-btn"></i>
                    </button>
                    </td>
                    </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    productData.length > 0
        ? (deleteAll.innerHTML = ` <button class="btn delete-all-btn delete-btn w-50 mb-3 bg-danger text-white rounded-4" onclick="deletAll()"> Delete All (${productData.length}) </button>`)
        : 'deleteAll.innerHTML =""';
}
ReadData();

/////////// Delete Product

function DeleteProduct(i) {
    productData.splice(i, 1);
    localStorage.product = JSON.stringify(productData);
    ReadData();
    console.log('kkkk', i);
}

/////////// Make table scrollable
document.addEventListener('DOMContentLoaded', function () {
    const ele = document.getElementById('tableScroll');
    ele.style.cursor = 'grab';

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function (e) {
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';

        pos = {
            left: ele.scrollLeft,
            top: ele.scrollTop,
            /////////// Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
        /////////// How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        /////////// Scroll the element
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function () {
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    /////////// Attach the handler
    ele.addEventListener('mousedown', mouseDownHandler);
});
/////////// delete All
function deletAll() {
    productData.splice(0);

    ReadData();
}
///////////update Data
function updateData(i) {
    title.value = productData[i].title;
    price.value = productData[i].price;
    ads.value = productData[i].ads;
    taxes.value = productData[i].taxes;
    discount.value = productData[i].discount;
    category.value = productData[i].category;
    console.log(productData[i]);
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mood = 'update';
    index = i;
    scroll({ top: 0, behavior: 'smooth' });
}

// Go Up Botton
window.addEventListener('scroll', (e) => {
    goUp.style.display = window.scrollY < 100 ? 'none' : 'block';
});
goUp.onclick = function () {
    scroll({ top: 0, behavior: 'smooth' });
};

// Search By (Title , Category)
function search(id) {
    if (id === 'searchByTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    searchInput.placeholder = `Search By ${searchMood}`;

    searchInput.focus();
    searchInput.value = '';
    ReadData();
}

function searchData(value) {
    let table = '';
    for (i = 0; i < productData.length; i++) {
        switch (searchMood) {
            case 'title':
                if (
                    productData[i].title
                        .toLowerCase()
                        .includes(value.toLowerCase())
                ) {
                    table += ` <tr>
        <td>${i}</td>
            <td>${productData[i].title}</td>
            <td>${productData[i].price}</td>
            <td>${productData[i].taxes}</td>
            <td>${productData[i].ads}</td>
            <td>${productData[i].discount}</td>
            <td>${productData[i].total}</td>
            <td>${productData[i].category}</td>

            <td>
                <button onClick="updateData(${i})"
                 data-bs-toggle="offcanvas"
                 data-bs-target="#offcanvasExample"
                 aria-controls="offcanvasExample" class="btn">
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                    </button>
                    </td>
                    <td>
                    <button class="btn">
                    <i onClick={DeleteProduct(${i})} class="fa-regular fa-trash-can bg-danger delete-btn"></i>
                    </button>
                    </td>
                    </tr>`;
                }

                break;
            case 'category':
                if (
                    productData[i].category
                        .toLowerCase()
                        .includes(value.toLowerCase())
                ) {
                    table += ` <tr>
        <td>${i}</td>
            <td>${productData[i].title}</td>
            <td>${productData[i].price}</td>
            <td>${productData[i].taxes}</td>
            <td>${productData[i].ads}</td>
            <td>${productData[i].discount}</td>
            <td>${productData[i].total}</td>
            <td>${productData[i].category}</td>

            <td>
                <button onClick="updateData(${i})"
                 data-bs-toggle="offcanvas"
                 data-bs-target="#offcanvasExample"
                 aria-controls="offcanvasExample" class="btn">
                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                    </button>
                    </td>
                    <td>
                    <button class="btn">
                    <i onClick={DeleteProduct(${i})} class="fa-regular fa-trash-can bg-danger delete-btn"></i>
                    </button>
                    </td>
                    </tr>`;
                }

                break;
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
