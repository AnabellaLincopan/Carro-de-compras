
const containerCart = document.querySelector('#list-cart');
const listProducts = document.querySelector('#list-products');
const cart = document.querySelector('#cart');
const deleteAllItems = document.querySelector('#delete-cart');
let productCart = [];

document.addEventListener('DOMContentLoaded', () => {
    getProducts();
})

// Se llama a la lista de productos usando fetch
const getProducts = async () => {
    try {
        const res = await fetch('https://corebiz-test.herokuapp.com/api/v1/products');
        const data = await res.json();
        showProducts(data)
    } catch(error) {
        console.log(error)
    }
}

// Se muestran los productos en pantalla
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

// Función para añadir productos al carro al momento de hacer click en botón de comprar
const addProducts = e => {
    e.preventDefault();
    if(e.target.classList.contains('btn-dark')) {
        const item = e.target.parentElement.parentElement;
        readProducts(item);
    }
}

listProducts.addEventListener('click', addProducts);

// Se leen los datos de cada producto y se suman al carro cada vez que se hace click a botón comprar
const readProducts = data => {
    const infoProducts = {  
        img: data.querySelector('img').src,
        title: data.querySelector('h5').textContent,
        price: data.querySelector('span').textContent,
        id: data.querySelector('button').getAttribute('data-id'),
        quantity: 1
    }

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

   showCart();
}

// Función para poder eliminar un producto del carro
const deleteProduct = e => {
    e.preventDefault();
    if(e.target.classList.contains('delete-product') ) {
        const productId = e.target.getAttribute('data-id')
        productCart = productCart.filter(item => item.id !== productId);

        showCart();
   }
}

cart.addEventListener('click', deleteProduct);

// Se muestran los productos agregados al carro con sus respectivos atributos
const showCart = () => {
    deleteAll();

    productCart.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
             <td>  
                  <img src="${product.img}" width=60>
             </td>
             <td>${product.title}</td>
             <td>${product.price}</td>
             <td>${product.quantity} </td>
             <td>
                  <a href="#" class="delete-product" data-id="${product.id}">x</a>
             </td>
        `;
        containerCart.appendChild(row);
   });
}

// Función para vaciar el carro por completo
const deleteAll = () => {
    while(containerCart.firstChild) {
        containerCart.removeChild(containerCart.firstChild);
    }
}

deleteAllItems.addEventListener('click', deleteAll);
