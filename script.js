let productos = [
    { id: 1, nombre: "ARGENTINA 1986", categoria: "remeras", stock: 2, precio: 35000, rutaImagen: "argentina-1986.jpg" },
    { id: 2, nombre: "BRASIL 1970", categoria: "remeras", stock: 5, precio: 25000, rutaImagen: "brasil-1970.jpg" },
    { id: 3, nombre: "ALEMANIA 1972", categoria: "remeras", stock: 1, precio: 25000, rutaImagen: "deutschland-1972.jpg" },
    { id: 4, nombre: "HOLANDA 1978", categoria: "remeras", stock: 4, precio: 25000, rutaImagen: "nederland-1978.jpg" },
    { id: 5, nombre: "ADIDAS ABSOLUTE", categoria: "botines", stock: 1, precio: 35000, rutaImagen: "AdidasAbsolute.webp" },
    { id: 6, nombre: "NIKE TIEMPO", categoria: "botines", stock: 5, precio: 15000, rutaImagen: "NikeTiempo.webp" },
    { id: 7, nombre: "PUMA FUTURE", categoria: "botines", stock: 3, precio: 17000, rutaImagen: "pUMA_future.avif" },
    { id: 4, nombre: "TOTAL 90", categoria: "botines", stock: 1, precio: 40000, rutaImagen: "total90.webp" },
    { id: 4, nombre: "DINAMARCA 1972", categoria: "buzos", stock: 4, precio: 35000, rutaImagen: "danmark-1972.jpg" },
    { id: 4, nombre: "MEXICO", categoria: "buzos", stock: 4, precio: 35000, rutaImagen: "mexico-1978.jpg" },
    { id: 4, nombre: "ESCOCIA", categoria: "buzos", stock: 4, precio: 35000, rutaImagen: "scotland-1967.jpg" },
]

let carrito = []
let carritoRecuperado = localStorage.getItem("carrito")
if (carritoRecuperado) {
    carrito= JSON.parse(carritoRecuperado)
}

renderizarProductos(productos)
renderizarCarrito(carrito)

function renderizarProductos(productos) {
    let contenedor = document.getElementById("contenedorProductos")
    contenedor.innerHTML = ""

    productos.forEach(producto => {
        let tarjeta = document.createElement("div")
        tarjeta.className = "tarjeta"

        tarjeta.innerHTML = `
        <h3 class="nombreProducto">${producto.nombre}</h3>
        <img src="./assets/img/${producto.rutaImagen}" />
        <p class="precio">$${producto.precio}</p>
        <button id="${producto.id}">Agregar al carrito</button>
        `

        contenedor.appendChild(tarjeta)

        let botonAgregarAlCarrito = document.getElementById(producto.id)
        botonAgregarAlCarrito.addEventListener("click", (e) => agregarProductoAlCarrito(productos, carrito, e))
    })
}

let buscador = document.getElementById("buscador")
let botonBuscar = document.getElementById("buscar")
let resultado = document.getElementById("resultado")

botonBuscar.addEventListener("click", () => filtrarYRenderizar(productos))
buscador.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        filtrarYRenderizar(productos)
    }
})

function filtrarYRenderizar(productos){
    let textoBusqueda = buscador.value.toUpperCase()
    let productosFiltrados = productos.filter(producto => producto.nombre.toUpperCase().includes(textoBusqueda))
    renderizarProductos(productosFiltrados)

    if (productosFiltrados.length > 0) {
        renderizarProductos(productosFiltrados)
        resultado.textContent = ""
    } else {
        resultado.textContent = "El producto solicitado no existe"
    }
}

let botonesCategorias = document.getElementsByClassName("filtroCategoria")
for (const botonCategoria of botonesCategorias) {
    botonCategoria. addEventListener("click" , (e) => filtrarPorCategoria(e , productos))
}

function filtrarPorCategoria(e, productos) {
    let productosFiltrados = productos.filter(producto =>{ 
        return producto.categoria === e.target.id 
    })
    renderizarProductos(productosFiltrados)
}

function agregarProductoAlCarrito(productos, carrito, e) {
    let productoBuscado = productos.find( producto => producto.id === Number(e.target.id))
    let productoEnCarrito = carrito.find( producto => producto.id === productoBuscado.id)

    if (productoBuscado.stock > 0) {
        if (productoEnCarrito) {
            productoEnCarrito.unidades++
            productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precioUnitario
        } else {
            carrito.push({
                id: productoBuscado.id,
                nombre: productoBuscado.nombre,
                precioUnitario: productoBuscado.precio,
                unidades: 1,
                subtotal:productoBuscado.precio,
            })
        }
        productoBuscado.stock --
        localStorage.setItem("carrito", JSON.stringify(carrito))
        alert("Se agregó el producto al carrito")
        } else{
            alert("No hay stock del producto selecionado")
        }

        localStorage.setItem('carrito', JSON.stringify(carrito))

        renderizarCarrito(carrito)
    }

function renderizarCarrito(productosEnCarrito) {
    let divCarrito = document.getElementById("carrito")
    divCarrito.innerHTML= ""
        
    
    if(productosEnCarrito.length > 0) {
        
        productosEnCarrito.forEach(producto => {
            console.log (productosEnCarrito)
            let tarjetaProductoCarrito = document.createElement("div")
            tarjetaProductoCarrito.classList.add("tarjetaProductoCarrito")
            tarjetaProductoCarrito.innerHTML= `
            <p>${producto.nombre}</p>
            <img src="./assets/img/${producto.rutaImagen}" />
            <p>Precio: $${producto.precioUnitario}</p>
            <p>Unidades: ${producto.unidades}</p>
            <p>Subtotal: $${producto.subtotal}</p>
            `

            divCarrito.appendChild(tarjetaProductoCarrito)
        })
        let boton = document.createElement ("button")
        boton.innerHTML = "Finalizar compra"
        boton.addEventListener( "click" , finalizarCompra)
        divCarrito.appendChild(boton)
    }
}

let botonVerOcultar = document.getElementById("verOcultar")
botonVerOcultar.addEventListener("click", verOcultarCarrito)

function verOcultarCarrito() {
    let carrito = document.getElementById("carrito")
    let contenedorProductos = document.getElementById("contenedorProductos")

    carrito.classList.toggle("oculta")
    contenedorProductos.classList.toggle("oculta")
}

function finalizarCompra() {
    let carrito = document.getElementById("carrito")
    carrito.innerHTML = ""
    localStorage.removeItem("carrito")
}