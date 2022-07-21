// probando api local
const btnCart = document.getElementById('btnCart')
const btnVaciarCarrito = document.getElementById('btnVaciarCarrito');

let contadorCarrito = document.getElementById('contadorCarrito');


const productos = document.getElementById('productos');

let btnContac = document.querySelector('.contacPage')

let carritoDeCompras = [];

// carga el dom y ejecuta el fetch para obtener los datos de la api local
window.addEventListener('DOMContentLoaded', () => {
    console.log('dom cargado')
    fetch('api.json')
    .then(response => response.json())
    .then(products => {
        // console.log(products)
        console.log("todos los cards llenos desde el json")

        renderProductos(products)
        
    })

    .catch( er => console.log(er))
})

// renderiza el stock y los muestraen el DOM
function renderProductos(products) {
    products.forEach(({img, nombre, aviso, precio, id}) => {
        
        const prodHTML = `
            <div class="col-12 col-md-4 mt-3 mb-3 d-flex justify-content-center">
                <div class="card text-dark" style="width: 18rem;">
                    <img src="${img}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>
                        <p class="card-text">${aviso}</p>
                        <p class="card-text precio">$ ${precio}</p>
                        <button class="btn btn-primary btn--card btnComprar" dataset=${id} id="btnAgregar${id}">Comprar</button>
                        
                    </div>
                </div>
            </div>
        `;
        document.getElementById('productos').innerHTML += prodHTML;
        // console.log(id)
    })

    // tipos para incluir botones en el navbar
    const tiposProductos = [
        'Todos',
        'Vacunos',
        'Aves',
        'Cerdo',
        'Embutido',
        'Achuras'
    ]

    // filtrado y render de botones por categoria de productos
    tiposProductos.forEach(categoria => {

        const btn = document.createElement('button');
        // console.log(btn);
        btn.innerHTML = categoria;
        btn.classList.add('btn', 'btn-primary', 'm-2', 'btn--navbar');

        btn.addEventListener('click', () => {
            if (categoria === 'Todos') {

                document.getElementById('productos').innerHTML = "";
                fetch('api.json')
                .then(response => response.json())
                .then(products => {

                    products.forEach(({img, nombre, aviso, precio, id}) => {

                        const prodHTML = `
                            <div class="col-12 col-md-4 mt-3 mb-3 d-flex justify-content-center">
                                <div class="card text-dark" style="width: 18rem;">
                                    <img src="${img}" class="card-img-top">
                                    <div class="card-body">
                                        <h5 class="card-title">${nombre}</h5>
                                        <p class="card-text">${aviso}</p>
                                        <p class="card-text precio">${precio}</p>
                                        <button class="btn btn-primary btn--card btnComprar" dataset=${id} id="btnAgregar${id}">Comprar</button>
                                        
                                    </div>
                                </div>
                            </div>
                        `;
                        document.getElementById('productos').innerHTML += prodHTML
                        console.log(id)
                    })
                })
                .catch(er => console.log(er))
                .finally(() => console.log("todas las categorias cargadas"))
            } else {
    // filtrador por carategoria
               const productosFiltrados = products.filter(prod => prod.tipo === categoria);
                console.log(productosFiltrados);
                
                document.querySelector('#productos').innerHTML = "";
                
                productosFiltrados.forEach(({img, nombre, aviso, precio, id}) => {
                    const prodHTML = `
                            <div class="col-12 col-md-4 mt-2 mt-3 mb-3 d-flex justify-content-center">
                                <div class="card text-dark" style="width: 18rem;">
                                    <img src="${img}" class="card-img-top">
                                    <div class="card-body">
                                        <h5 class="card-title">${nombre}</h5>
                                        <p class="card-text">${aviso}</p>
                                        <p class="card-text precio">${precio}</p>
                                        <button class="btn btn-primary btn--card btnComprar" dataset=${id} id="btnAgregar${id}">Comprar</button>
                                        
                                    </div>
                                </div>
                            </div>
                        `;
                        document.getElementById('productos').innerHTML += prodHTML
                        console.log(id)
                })
            }
        })
        // document.querySelector('#categoria').insertAdjacentElement("beforeend", btn);
        document.querySelector('#categoria').appendChild(btn);
        
    })

    // ir a contactos
    btnContac.addEventListener('click', () => {
        location.href = './pages/contactos.html'
    })

    // captura los click del contenedor de productos
    productos.addEventListener('click', e => {
        addCarrito(e)
    
    })

// fin de la funcion renderProductos
}


// muestra el elemento del click btn comprar de cada card
const addCarrito = e => {
    console.log(e.target)
	console.log(e.target.classList.contains('btnComprar'))
    
	if(e.target.classList.contains('btnComprar')) {
        
        // revisar aqui
        carritoDeCompras.push(e.target.value)
        contadorCarrito.innerText = carritoDeCompras.length
        // actualizarCarrito()
        almacenarCarrito()
	}
	e.stopPropagation()
}

function actualizarCarrito() {
    contadorCarrito.innerText = 1;
    // let total = carritoDeCompras.reduce((acc, item) => acc + item.precio, 0);
    // console.log(`El valor del carrito es: $${total}`)
}

// previene el refresh del boton carrito 
btnCart.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('btn carrito presionado')
})

// vaciar carrito
btnVaciarCarrito.addEventListener('click', (e) => {
    e.preventDefault();
    const vaciarCarro = (carritoDeCompras.length === 0) ? sweetAlertVaciar() : carritoDeCompras.length = 0;
    contadorCarrito.length = 0;
    // actualizarCarrito()

    // eliminamos los datos del storage
    localStorage.removeItem('productosAlmacenados')
    console.log('carrito vacio')
    console.log('storage vacio')
})

// alarma de carrito vacio
const sweetAlertVaciar = () => {
    Swal.fire({
        title: 'Aviso!',
        text: 'El carrito esta vacio!',
        icon: 'info',
        confirmButtonText: 'continuar'
    })
}

// localStorage
// almacenar carrito 
const almacenarCarrito = () => {
    localStorage.setItem('productosAlmacenados', JSON.stringify('carritoDeCompras'))
}

// recuperar carrito 
window.onload = function () {

    const recuperar = JSON.parse(localStorage.getItem('productosAlmacenados'))

    if(recuperar != null || recuperar != undefined) {
        let recuperado = carritoDeCompras.length
        contadorCarrito.innerText = recuperado
    } else {
        console.log('storage vacio')
    }
}

// agregar al carrito, asociar id al boton agregar en cada producto y armar el boton de quitar del carrito
// function agregarAlCarrito(id) {
//     let agregarProducto = stockProductosAves.find(item => item.id === id);
//     carritoDeCompras.push(agregarProducto);
//     actualizarCarrito()

//     console.log(carritoDeCompras)
// }
