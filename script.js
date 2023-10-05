let productos = [
    { id: 1, nombre: "ARGENTINA 1986", categoria: "remera", stock: 2, precio: (35000), rutaImagen: "argentina-1986.jpg"},
    { id: 2, nombre: "BRASIL 1970", categoria: "remera", stock: 5, precio: (25000), rutaImagen: "brasil-1970.jpg"},
    { id: 3, nombre: "ALEMANIA 1972", categoria: "remera", stock: 1, precio: (25000), rutaImagen: "deutschland-1972.jpg"},
    { id: 4, nombre: "HOLANDA 1978", categoria: "remera", stock: 4, precio: (25000), rutaImagen: "nederland-1978.jpg"},
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

    productosEnCarrito.forEach(producto => {
        let tarjetaProductoCarrito = document.createElement("div")
        tarjetaProductoCarrito.innerHTML= `
        <p>${producto.nombre}</p>
        <img src="./assets/img/${producto.rutaImagen}" />
        <p>Precio: $${producto.precioUnitario}</p>
        <p>Unidades: ${producto.unidades}</p>
        <p>Subtotal: $${producto.subtotal}</p>
        `

        divCarrito.appendChild(tarjetaProductoCarrito)
    })
}

let botonVerOcultar = document.getElementById("verOcultar")
botonVerOcultar.addEventListener("click", verOcultarCarrito)

function verOcultarCarrito() {
    let carrito = document.getElementById("carrito")
    let contenedorProductos = document.getElementById("contenedorProductos")

    carrito.classList.toggle("oculta")
    contenedorProductos.classList.toggle("oculta")
}

