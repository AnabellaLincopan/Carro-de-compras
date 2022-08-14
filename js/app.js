
const containerCart = document.querySelector('#list-cart');
const listProducts = document.querySelector('#list-products');
const cart = document.querySelector('#cart');
const deleteAllItems = document.querySelector('#delete-cart')
let productCart = [];
// const url = 'https://corebiz-test.herokuapp.com/api/v1/products';

document.addEventListener('DOMContentLoaded', () => {
    getProducts();
})


const getProducts = async () => {
    try {
        const res = await fetch('https://corebiz-test.herokuapp.com/api/v1/products');
        const data = await res.json();
        showProducts(data)
    } catch(error) {
        console.log(error)
    }
}

const showProducts = data => {
    let html = "";
    data.forEach(product => {
        console.log(product)
        html += `
        <div class="col-3 product-container">
            <div class="card product">
                <img
                    src="${product.imageUrl}"
                    class="card-img-top"
                />
                <div class="card-body p-4">
                    


                    <div class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">${product.productName}</h5>
                                    <!-- Product reviews-->
                                    <div class="d-flex justify-content-center small text-warning mb-2">
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                        <div class="bi-star-fill"></div>
                                    </div>
                                    <!-- Product price-->
                                    <span class="text-muted text-decoration">$${product.price}</span>
                                </div>
                    <button type="button" class="btn btn-dark mt-auto" data-id=${product.productId}>Comprar</button>
                </div>
            </div>
        </div>
      `;
  });

  document.getElementsByClassName('products')[0].innerHTML = html;
    
}

const addProducts = e => {
    if(e.target.classList.contains('btn-dark')) {
        const item = e.target.parentElement.parentElement;
        // Enviamos el curso seleccionado para tomar sus datos
        readProducts(item);
    }
}

listProducts.addEventListener('click', addProducts);

const readProducts = data => {
    const infoProducts = {
        
        img: data.querySelector('img').src,
        title: data.querySelector('h5').textContent,
        price: data.querySelector('span').textContent,
        id: data.querySelector('button').getAttribute('data-id'),
        quantity: 1
    }
    console.log(infoProducts)
    // data.push({quantity:1})
    // console.log(data)
// data.forEach(infoProducts => {

console.log(infoProducts)

    if( productCart.some( item => item.id === infoProducts.id ) ) { 
        const products = productCart.map( product => {
             if( product.id === infoProducts.id ) {
                  product.quantity++;
                   return product;
              } else {
                   return product;
           }
        })
        productCart = [...products];
   }  else {
    productCart = [...productCart, infoProducts];
   }
// })
   console.log(productCart)
   showCart();
}

const deleteProduct = e => {
    // e.preventDefault();
    if(e.target.classList.contains('borrar-curso') ) {
        // e.target.parentElement.parentElement.remove();
        const productId = e.target.getAttribute('data-id')
        
        // Eliminar del arreglo del carrito
        productCart = productCart.filter(item => item.id !== productId);

        showCart();
   }
}

cart.addEventListener('click', deleteProduct);

const showCart = () => {

    deleteAll();

    productCart.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
             <td>  
                  <img src="${product.img}" width=100>
             </td>
             <td>${product.title}</td>
             <td>${product.price}</td>
             <td>${product.quantity} </td>
             <td>
                  <a href="#" class="borrar-curso" data-id="${product.id}">X</a>
             </td>
        `;
        containerCart.appendChild(row);
   });
}

const deleteAll = () => {

    while(containerCart.firstChild) {
        containerCart.removeChild(containerCart.firstChild);
    }
}

deleteAllItems.addEventListener('click', deleteAll);
