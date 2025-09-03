const contenedorCompra = document.getElementById('contenedor-compra')
const precioEntradas = document.getElementById('precio-entradas')
const textoEntradas = document.getElementById('texto-entradas')
const textoSectores = document.getElementById('texto-sectores')
const iconoPago = document.getElementById('iconoPago')
const tituloShow = document.querySelector('.titulo-show')
const pasosCompra = document.querySelector('.pasos-compra')
const selectorEntradas = document.getElementById('selector-entradas')
const OpcionSelectorEntradas = document.getElementById('contenedor-selecciones__entradas')
const iconoSectores = document.getElementById('iconoSectores')
const OpcionSelectorSectores = document.getElementById('contenedor-selecciones__sectores')
const OpcionSelectorPago = document.getElementById('contenedor-selecciones__pago')
const contenedorPasos = document.getElementById('contenedor-pasos')
const formularioMetodopago = document.getElementById("formulario-metodo-pago")

const params = new URLSearchParams(window.location.search)
const id = params.get("id")

const shows = []
let show
let entradasSeleccionadas
let sectorSeleccionado
let pasoActual = 0

async function cargarShows() {
    try {
        const res = await fetch('../dataShows.json')
        const data = await res.json()
        shows.push(...data)

        show = shows.find(s => s.id == id)
    } catch (error) {
        console.error("Error al cargar los datos:", error)
    }
}

function renderizarTituloShow() {

    if (show) {
        document.title = `Compra - ${show.autor} - ${show.titulo} | El Teatro Bar - La Plata`
        tituloShow.innerText = `${show.autor} - ${show.titulo} `
        seleccionEntradas()
    } else {
        document.title = "Show no encontrado"
        contenedorCompra.innerHTML = `<div class="container my-5">
                                        <div class="text-center">
                                            <div class="alert p-4 rounded-4 shadow" style="background-color: white; color: #343a40;" role="alert">
                                                <h4 class="alert-heading mb-4">Show no encontrado</h4>
                                                <i class="bi bi-exclamation-circle-fill text-danger fs-1"></i>
                                                <p class="mb-4">El show que estás buscando no está disponible en este momento.</p>
                                                <botton onclick="location.href='../index.html'" class="boton-volver container">Volver al inicio</botton>
                                            </div>
                                        </div>
                                    </div>`

        pasosCompra.classList.add('ocultar')
    }
}

function opcionTarjetaDebito() {
    Swal.fire({
        title: "Resumen de Compra",
        html: `
                            <p style="color: #252525; font-size: 20px;"><strong>${show.autor} – ${show.titulo}</strong></p>
                            <p><strong>Fecha:</strong> ${show.dia} (${show.diaSemana}) de ${show.mes} – ${show.horario}</p>
                            <p><strong>Cantidad de entradas:</strong> ${entradasSeleccionadas}</p>
                            <p><strong>Precio por entrada:</strong> $${show.precio}</p>
                            <p><strong>Sector:</strong> ${sectorSeleccionado}</p>
                            <p style="color: #252525; font-size: 20px;"><strong>Total:</strong> $${entradasSeleccionadas * show.precio}</strong></p>
                        `,
        showCancelButton: true,
        confirmButtonText: "IR A COMPRAR",
        cancelButtonText: "CANCELAR",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Ingrese los datos de su tarjeta y su correo',
                html: `
                            <input type="text" id="cardNumber" class="swal2-input" placeholder="Número de tarjeta (16 dígitos)">
                            <input type="text" id="cardName" class="swal2-input" placeholder="Nombre en la tarjeta">
                            <input type="text" id="cardExp" class="swal2-input" placeholder="MM/AA">
                            <input type="text" id="cardCvv" class="swal2-input" placeholder="CVV">
                            <p style="margin-top: 20px; font-size: 16px;">Ingrese su correo electrónico donde serán enviadas las entradas:</p>
                            <input type="email" id="email" class="swal2-input" placeholder="Correo electrónico">
                        `,
                confirmButtonText: 'PAGAR',
                cancelButtonText: 'CANCELAR',
                showCancelButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
                preConfirm: () => {
                    const number = Swal.getPopup().querySelector('#cardNumber').value
                    const name = Swal.getPopup().querySelector('#cardName').value
                    const exp = Swal.getPopup().querySelector('#cardExp').value
                    const cvv = Swal.getPopup().querySelector('#cardCvv').value
                    const email = Swal.getPopup().querySelector('#email').value

                    // Validaciones
                    if (!number || !name || !exp || !cvv || !email) {
                        Swal.showValidationMessage('Todos los campos son obligatorios')
                        return false;
                    }
                    if (!/^\d{16}$/.test(number)) {
                        Swal.showValidationMessage('Número de tarjeta inválido')
                        return false;
                    }
                    if (!/^\d{2}\/\d{2}$/.test(exp)) {
                        Swal.showValidationMessage('Fecha de expiración inválida')
                        return false;
                    }
                    if (!/^\d{3,4}$/.test(cvv)) {
                        Swal.showValidationMessage('CVV inválido')
                        return false;
                    }
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    if (!emailRegex.test(email)) {
                        Swal.showValidationMessage('Ingrese un correo válido')
                        return false;
                    }
                    return { number, name, exp, cvv, email };
                }
            }).then((resultadoPago) => {
                if (resultadoPago.isConfirmed) {
                    //simulando procesamiento
                    Swal.fire({
                        title: 'Procesando pago...',
                        html: 'Por favor, espere un momento.',
                        timer: 3000,
                        didOpen: () => Swal.showLoading(),
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        showConfirmButton: false
                    }).then(() => {
                        // Modal éxito
                        Swal.fire({
                            title: "¡Pago realizado!",
                            html: `Se enviarán las entradas a <strong>${resultadoPago.value.email}</strong>`,
                            icon: "success",
                            showCancelButton: true,
                            confirmButtonText: "DESCARGAR ENTRADAS",
                            cancelButtonText: "SEGUIR NAVEGANDO",
                            reverseButtons: true,
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        }).then((finalResult) => {
                            if (finalResult.isConfirmed) {
                                Swal.fire({
                                    title: "Descarga iniciada",
                                    text: "Tus entradas se están descargando.",
                                    icon: "info",
                                    confirmButtonText: "SEGUIR NAVEGANDO",
                                    allowOutsideClick: false,
                                    allowEscapeKey: false
                                }).then(() => {
                                    window.location.href = "../index.html"
                                })
                            } else if (finalResult.dismiss === Swal.DismissReason.cancel) {
                                Swal.fire({
                                    title: "Continuar navegando",
                                    text: "Podés seguir explorando el sitio.",
                                    icon: "info",
                                    confirmButtonText: "SEGUIR NAVEGANDO",
                                    allowOutsideClick: false,
                                    allowEscapeKey: false
                                }).then(() => {
                                    window.location.href = "../index.html"
                                })
                            }
                        })
                    })
                }
            })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // cancelacion TARJETA
        }

        resetearRadios()
    })
}

function opcionMercadoPago() {
    Swal.fire({
        title: "Resumen de Compra",
        html: `
                            <p style="color: #252525; font-size: 20px;"><strong>${show.autor} – ${show.titulo}</strong></p>
                            <p><strong>Fecha:</strong> ${show.dia} (${show.diaSemana}) de ${show.mes} – ${show.horario}</p>
                            <p><strong>Cantidad de entradas:</strong> ${entradasSeleccionadas}</p>
                            <p><strong>Precio por entrada:</strong> $${show.precio}</p>
                            <p><strong>Sector:</strong> ${sectorSeleccionado}</p>
                            <p style="color: #252525; font-size: 20px;"><strong>Total:</strong> $${entradasSeleccionadas * show.precio}</strong></p>
                            <p style="margin-top: 20px; font-size: 16px;">Ingrese su correo electrónico donde serán enviadas las entradas:</p>
                        `,
        input: 'email',
        inputPlaceholder: 'ejemplo@correo.com',
        inputAttributes: {
            'aria-label': 'Correo electrónico'
        },
        showCancelButton: true,
        confirmButtonText: "IR A MERCADOPAGO",
        cancelButtonText: "CANCELAR",
        inputValidator: (valor) => {
            if (!valor) {
                return 'Por favor, ingrese un correo';
            }
            const emailFormato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailFormato.test(valor)) {
                return 'Ingrese un correo válido';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const emailIngresado = result.value
            Swal.fire({
                title: 'Redirigiendo a Mercado Pago...',
                html: 'Por favor, espere un momento.',
                timer: 3000,
                didOpen: () => {
                    Swal.showLoading()
                },
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false
            }).then(() => {
                // Posible espacio para redirigir a MP window.location.href = "https://www.mercadopago.com.ar/checkout"
                Swal.fire({
                    title: "¡Compra realizada!",
                    html: `Se enviarán las entradas a <strong>${emailIngresado}</strong>`,
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonText: "DESCARGAR ENTRADAS",
                    cancelButtonText: "SEGUIR NAVEGANDO",
                    reverseButtons: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        // descarga las entradas
                        Swal.fire({
                            title: "Descarga iniciada",
                            text: "Tus entradas se están descargando.",
                            icon: "info",
                            confirmButtonText: "SEGUIR NAVEGANDO",
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        }).then(() => {
                            window.location.href = "../index.html"
                        })
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        Swal.fire({
                            title: "Continuar navegando",
                            text: "Podés seguir explorando el sitio.",
                            icon: "info",
                            confirmButtonText: "SEGUIR NAVEGANDO",
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        }).then(() => {
                            window.location.href = "../index.html"
                        })
                    }
                })
            })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // cancelacion MP
        }

        resetearRadios()
    })
}

function seleccionMetodoPago() {
    formularioMetodopago.addEventListener("submit", manejarPago)
}

function manejarPago(e) {
    e.preventDefault()

    let metodoSeleccionado = document.querySelector('input[name="pago"]:checked')

    if (metodoSeleccionado) {
        if (metodoSeleccionado.value === "debito") {
            opcionTarjetaDebito()
        } else if (metodoSeleccionado.value === "mercadopago") {
            opcionMercadoPago()
        }
    } else {
        Swal.fire({
            icon: "warning",
            title: "Para continuar...",
            text: "Por favor selecciona un método de pago",
            confirmButtonText: "ACEPTAR"
        })
    }
}

function sectoresQuePuedenCubrirCantidad(cantidad) {
    return Object.keys(show)
        .filter(clave => clave.startsWith("entradasSector") && show[clave] >= cantidad)
        .map(clave => clave.replace("entradasSector", ""))
}

function seleccionSector(sectoresValidos) {
    const seleccionSector = document.querySelectorAll('input[name="sector"]')

    seleccionSector.forEach(radio => {

        radio.disabled = !sectoresValidos.includes(radio.value)

        radio.addEventListener('change', () => {
            sectorSeleccionado = radio.value

            textoSectores.innerText = `Sector ${sectorSeleccionado}`
            textoSectores.classList.add('selecionado')

            iconoPago.classList.add('iconoActivo')


            OpcionSelectorPago.classList.add('paso-activo-final')
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "info",
                title: `Seleccionaste el Sector ${sectorSeleccionado}`,
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            })
            irAlPaso(2)
        })
    })
}

function seleccionEntradas() {
    irAlPaso(0)

    precioEntradas.innerHTML = `Valor entrada: $${show.precio}`
    const seleccionEntradas = document.querySelectorAll('input[name="entradas"]')

    seleccionEntradas.forEach(radio => {
        radio.addEventListener('change', () => {
            entradasSeleccionadas = Number(radio.value)

            const sectoresValidos = sectoresQuePuedenCubrirCantidad(entradasSeleccionadas)

            if (sectoresValidos.length === 0) {
                Swal.fire({
                    icon: "error",
                    title: "Cantidad no disponible",
                    text: "No hay ningún sector que tenga tantas entradas. Por favor, reduce la cantidad.",
                    confirmButtonText: "ACEPTAR"
                })

                textoEntradas.innerText = `Entradas`
                textoEntradas.classList.remove('selecionado')
                resetearRadios()
            } else {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "info",
                    title: `Seleccionaste ${entradasSeleccionadas} entradas`,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                })

                textoEntradas.innerText = `${entradasSeleccionadas} Entradas`
                textoEntradas.classList.add('selecionado')

                iconoSectores.classList.add('iconoActivo')
                OpcionSelectorSectores.classList.add('paso-activo')
                irAlPaso(1)

                seleccionSector(sectoresValidos)
            }
        })
    })
}

//Volver a seleccion entradas
OpcionSelectorEntradas.addEventListener('click', () => {

    if (pasoActual >= 1) {
        resetearRadios()
        textoEntradas.innerText = `Entradas`
        textoEntradas.classList.remove('selecionado')
        iconoSectores.classList.remove('iconoActivo')
        OpcionSelectorSectores.classList.remove('paso-activo')
        textoSectores.innerText = `Sectores`
        OpcionSelectorPago.classList.remove('paso-activo-final')
        textoSectores.classList.remove('selecionado')
        iconoPago.classList.remove('iconoActivo')
        seleccionEntradas()
    }

})

//Volver a seleccion sectores
OpcionSelectorSectores.addEventListener('click', () => {

    if (pasoActual >= 2) {
        resetearRadios()
        OpcionSelectorSectores.classList.add('paso-activo')
        textoSectores.innerText = `Sectores`
        OpcionSelectorPago.classList.remove('paso-activo-final')
        textoSectores.classList.remove('selecionado')
        iconoPago.classList.remove('iconoActivo')
        irAlPaso(1)
    }

})

function resetearRadios() {
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false
    })
}

function irAlPaso(n) {
    pasoActual = n
    contenedorPasos.style.transform = `translateX(-${n * 100}%)`
}

document.addEventListener("DOMContentLoaded", async () => {
    await cargarShows()
    renderizarTituloShow()
    seleccionMetodoPago()
})