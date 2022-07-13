// probando api local


window.addEventListener('DOMContentLoaded', () => {
    console.log('dom cargado')
    fetch('/api.json')
    .then(response => response.json())
    .then(products => {
        console.log(products)

        renderProductos(products)
        
    })

    .catch( er => console.log(er))
})

function renderProductos(products) {
    products.forEach(producto => {
        
        const prodHTML = `
            <div class="col-12 col-md-4 mt-5 d-flex justify-content-center">
                <div class="card text-dark" style="width: 18rem;">
                    <img src="${producto.img}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.aviso}</p>
                        <a href="#" class="btn btn-primary">Comprar</a>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('productos').innerHTML += prodHTML;
    });
}