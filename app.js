// probando api local
const btnCart = document.getElementById('btnCart')
const btnVaciarCarrito = document.getElementById('btnVaciarCarrito');

let carritoDeCompras = [];

// carga el dom y ejecuta el fetch para obtener los datos de la api local
window.addEventListener('DOMContentLoaded', () => {
    console.log('dom cargado')
    fetch('api.json')
    .then(response => response.json())
    .then(products => {
        console.log(products)
        console.log("todos los cards llenos desde el json")

        renderProductos(products)
        
    })

    .catch( er => console.log(er))
})

// renderiza el stock y los muestraen el DOM
function renderProductos(products) {
    products.forEach(({img, nombre, aviso, precio, id}) => {
        
        const prodHTML = `
            <div class="col-12 col-md-4 mt-5 d-flex justify-content-center">
                <div class="card text-dark" style="width: 18rem;">
                    <img src="${img}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${nombre}</h5>
                        <p class="card-text">${aviso}</p>
                        <p class="card-text">$ ${precio}</p>
                        <a href="#" class="btn btn-primary" id="btnAgregar${id}">Comprar</a>
                        <a href="#" class="btn btn-primary" id="btnQuitar${id}">Quitar</a>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('productos').innerHTML += prodHTML;
        // console.log(id)
    })

    // tipos para incluir botones en el navbar
    const tiposProductos = [
        'Vacunos',
        'Aves',
        'Cerdo',
        'Embutido',
        'Achuras',
        'Todos'
    ]

    tiposProductos.forEach(categoria => {

        const btn = document.createElement('buton');
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
                            <div class="col-12 col-md-4 mt-5 d-flex justify-content-center">
                                <div class="card text-dark" style="width: 18rem;">
                                    <img src="${img}" class="card-img-top">
                                    <div class="card-body">
                                        <h5 class="card-title">${nombre}</h5>
                                        <p class="card-text">${aviso}</p>
                                        <p class="card-text">${precio}</p>
                                        <a href="#" class="btn btn-primary" id="btnAgregar${id}">Comprar</a>
                                        <a href="#" class="btn btn-primary" id="btnQuitar${id}">Quitar</a>
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
                const productosFiltrados = products.filter(prod => prod.tipo === categoria);
                console.log(productosFiltrados);
                
                document.querySelector('#productos').innerHTML = "";
                
                productosFiltrados.forEach(prod => {
                    const prodHTML = `
                            <div class="col-12 col-md-4 mt-5 d-flex justify-content-center">
                                <div class="card text-dark" style="width: 18rem;">
                                    <img src="${prod.img}" class="card-img-top">
                                    <div class="card-body">
                                        <h5 class="card-title">${prod.nombre}</h5>
                                        <p class="card-text">${prod.aviso}</p>
                                        <p class="card-text">${prod.precio}</p>
                                        <a href="#" class="btn btn-primary" id="btnAgregar${prod.id}">Comprar</a>
                                        <a href="#" class="btn btn-primary id="btnQuitar${prod.id}">Quitar</a>
                                    </div>
                                </div>
                            </div>
                        `;
                        document.getElementById('productos').innerHTML += prodHTML
                        console.log(prod.id)
                })
            }
        })
        document.querySelector('#categoria').insertAdjacentElement("beforeend", btn);
    })

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
    console.log('carrito vacio')
    // actualizarCarrito()
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

// agregar al carrito, asociar id al boton agregar en cada producto y armar el boton de quitar del carrito
function agregarAlCarrito(id) {
    let agregarProducto = stockProductosAves.find(item => item.id === id);
    carritoDeCompras.push(agregarProducto);
    mostrarCarrito(agregarProducto);
    actualizarCarrito();

    almacenarCarrito();
    
    console.log(carritoDeCompras)
}

// alerta momentanea
// Swal.fire({
//     title: 'Aviso',
//     text: 'Hola usuario, esta pagina sigue en construccion! Solo podras navegar y ver nuestros productos pero no podras realizar compras desde este sitio, podras dirigrte a nuestras sucursales o hacer pedido por tlf! Gracias por ser paciente!',
//     icon: 'info',
//     confirmButtonText: 'Seguir navegando'
// })