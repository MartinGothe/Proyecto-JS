let nombre = "Juan Gomez"
let contraseña1 = "Talleres1"

console.log (nombre)

let usuario
let contraseña
let contador = 0
let inicioSecion = false

do{
    usuario = prompt("Ingrese su usuario")
    contraseña = prompt("Ingrese su contraseña")
    contador ++
    if (usuario === nombre && contraseña === contraseña1) {
        alert("Bienvenido " + usuario)
        inicioSecion = true
        break
    } else {
        alert("Usuario y/o contraseña incorrecto/s")
    }
} while (contador < 3)
    if (contador === 3 && !inicioSecion) {
        alert("Agotó su número de intentos posibles")
    }


function Mayusculas(texto) {
        return texto.toUpperCase()
}
let usuarioMayuscula = Mayusculas(usuario)
console.log(usuarioMayuscula)

let edad = prompt("Ingrese su edad")
if (edad >= 18) {
    alert("Tiene edad para ingresar al sitio")
}
else {
    alert("No tiene edad para ingresar al sitio")
}


let carrito = []

while (true) {
    let opcionCompra = prompt("Ingrese un número: '1' para comprar Entradas de Infante (0-5 años), '2' para entradas de Adolescente (6-21 años), '3' para entrada de adulto +21")

    switch (opcionCompra) {
        case "1":
            alert("Infante")
            carrito.push({ tipo: "Infante", precio: 5 })
            break
        case "2":
            alert("Adolescente")
            carrito.push({ tipo: "Adolescente", precio: 10 })
            break
        case "3":
            alert("Adulto")
            carrito.push({ tipo: "Adulto", precio: 15 })
            break
        default:
            alert("Opción incorrecta")
            continue;
    }

    let cantidad = Number(prompt("Ingrese la cantidad que desea comprar:"))
    carrito[carrito.length - 1].cantidad = cantidad

    let continuar = prompt("¿Desea agregar otro objeto? (Sí: '1', No: '0')").toLowerCase()
    if (continuar !== '1') {
        let total = 0

        //alert("Resumen de la compra:")//
    for (const item of carrito) {
      console.log(`${item.cantidad}x Entrada ${item.tipo} - $${item.precio * item.cantidad}`)
      total += item.precio * item.cantidad
    }

    alert(`Total: $${total}`)
    break
    }
}
function verificarLongitud(numero, longitudEsperada) {
    return numero.length === longitudEsperada
}

let numeroTarjeta = prompt("Por favor ingresa un número de tarjeta:")
let numeroCodigo = prompt("Por favor ingresa el código de seguridad de la tarjeta:")
let longitudEsperadaTarjeta = 16
let longitudEsperadaCodigo = 3

if ((verificarLongitud(numeroTarjeta, longitudEsperadaTarjeta)) && (verificarLongitud(numeroCodigo, longitudEsperadaCodigo))) {
    alert("Su compra ha sido efectuada." )
    
} else {
    alert("El número de tarjeta y/o su código de seguridad son incorrectos.")
}