const contenedorCards = document.getElementById('contenedor-cards')
const contenedorCompra = document.getElementById('contenedor-compra')
const tituloShow = document.querySelector('.titulo-show')
const selectorSectores = document.getElementById('selector-sectores')
const selectorEntradas = document.getElementById('selector-entradas')
const textoEntradas = document.getElementById('texto-entradas')
const textoSectores = document.getElementById('texto-sectores')
const iconoSectores = document.getElementById('iconoSectores')
const iconoPago = document.getElementById('iconoPago')
const resumen = document.getElementById('resumen-compra')
const botonComprar = document.getElementById('boton-confirmar')
const precioEntradas = document.getElementById('precio-entradas')

let showSeleccionado = []
let entradasSeleccionadas
let sectorSeleccionado

/* const shows = [
    {
        id: 1, autor: "Dani La Chepi", titulo: "Vivila como queres", fecha: "01-08-2025", dia: "Viernes", horario: "21:00hs", diaSemana: "01", mes: "Agosto",
        entradasSectorA: 6, entradasSectorB: 11, entradasSectorC: 6, entradasSectorD: 3, precio: 22000, imagen: "./images/Chepi-FEED.jpg"
    },
    {
        id: 2, autor: "Hector Rossi", titulo: "Transnoche paranormal", fecha: "02-08-2025", dia: "Sabado", horario: "20:00hs", diaSemana: "02", mes: "Agosto",
        entradasSectorA: 3, entradasSectorB: 9, entradasSectorC: 5, entradasSectorD: 2, precio: 19000, imagen: "./images/Rossi-FEED.jpg"
    },
    {
        id: 3, autor: "Sole Macchi", titulo: "Mentime que me gusta", fecha: "07-08-2025", dia: "Jueves", horario: "21:30hs", diaSemana: "07", mes: "Agosto",
        entradasSectorA: 2, entradasSectorB: 5, entradasSectorC: 4, entradasSectorD: 8, precio: 25000, imagen: "./images/Sole-FEED.jpg"
    },
    {
        id: 4, autor: "Juan Barraza", titulo: "En un confuso episodio", fecha: "09-08-2025", dia: "Sabado", horario: "21:00hs", diaSemana: "09", mes: "Agosto",
        entradasSectorA: 6, entradasSectorB: 8, entradasSectorC: 2, entradasSectorD: 4, precio: 20000, imagen: "./images/Barraza-FEED.jpg"
    },
    {
        id: 5, autor: "Lucas Upstein", titulo: "Angel Caido", fecha: "16-08-2025", dia: "Sabado", horario: "21:30hs", diaSemana: "16", mes: "Agosto",
        entradasSectorA: 2, entradasSectorB: 1, entradasSectorC: 4, entradasSectorD: 3, precio: 22000, imagen: "./images/Epstein-FEED.jpg"
    },
    {
        id: 6, autor: "Ezequiel Campa", titulo: "Si pero NO", fecha: "17-08-2025", dia: "Domingo", horario: "20:00hs", diaSemana: "17", mes: "Agosto",
        entradasSectorA: 1, entradasSectorB: 3, entradasSectorC: 4, entradasSectorD: 1, precio: 15000, imagen: "./images/Campa-FEED.jpg"
    },
    {
        id: 7, autor: "Sauda", titulo: "Intimo", fecha: "28-08-2025", dia: "Jueves", horario: "21:00hs", diaSemana: "28", mes: "Agosto",
        entradasSectorA: 1, entradasSectorB: 3, entradasSectorC: 4, entradasSectorD: 1, precio: 15000, imagen: "./images/Sauda-FEED.jpg"
    },
    {
        id: 8, autor: "Nicolas D Tracy", titulo: "Crónico", fecha: "29-08-2025", dia: "Viernes", horario: "21:00hs", diaSemana: "29", mes: "Agosto",
        entradasSectorA: 1, entradasSectorB: 3, entradasSectorC: 4, entradasSectorD: 1, precio: 15000, imagen: "./images/DeTracy-FEED.png"
    },
] */

const shows = []


function resetearRadios() {
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
}

function renderizarResumen() {

    resumen.innerHTML = `
                <h2>Resumen de Compra</h2>
  
                <p><strong>${showSeleccionado[0].autor} – ${showSeleccionado[0].titulo}</strong> </p>
  
                <p>
                    <strong>Fecha:</strong> 
                    ${showSeleccionado[0].dia} (${showSeleccionado[0].diaSemana}) de ${showSeleccionado[0].mes} – ${showSeleccionado[0].horario}
                </p>
  
                <p> <strong>Cantidad de entradas:</strong> ${entradasSeleccionadas}  </p>
                <p> <strong>Precio por entrada:</strong> $${showSeleccionado[0].precio} </p>
  
                <p> <strong>Sector:</strong> ${sectorSeleccionado}</p>
  
                <p class="total">
                    <strong>Total:</strong> $${entradasSeleccionadas * showSeleccionado[0].precio}
                </p>
  
                <button id="boton-confirmar">Comprar</button>
                `;

    const botonComprar = document.getElementById('boton-confirmar');

    botonComprar.addEventListener('click', () => {

        showSeleccionado = []
        textoEntradas.innerText = `Entradas`
        textoEntradas.classList.remove('selecionado')
        textoSectores.innerText = `Sectores`
        textoSectores.classList.remove('selecionado')
        iconoPago.classList.remove('iconoActivo')
        iconoSectores.classList.remove('iconoActivo')
        contenedorCards.classList.remove('ocultar');
        contenedorCompra.classList.add('ocultar');
        selectorSectores.classList.add('ocultar')
        resumen.classList.add('ocultar');
        selectorEntradas.classList.remove('ocultar')

    })

    seleccionDeShow()

}

function seleccionSector() {
    const seleccionSector = document.querySelectorAll('input[name="sector"]')

    seleccionSector.forEach(radio => {
        radio.addEventListener('change', () => {
            sectorSeleccionado = radio.value

            textoSectores.innerText = `Sector ${sectorSeleccionado}`
            textoSectores.classList.add('selecionado')

            selectorSectores.classList.add('ocultar')
            resumen.classList.remove('ocultar')

            iconoPago.classList.add('iconoActivo');
            renderizarResumen()
            resetearRadios()
        })
    })

}

function seleccionEntradas() {


    precioEntradas.innerHTML = `Valor entrada: $${showSeleccionado[0].precio}`
    const seleccionEntradas = document.querySelectorAll('input[name="entradas"]')

    seleccionEntradas.forEach(radio => {
        radio.addEventListener('change', () => {
            entradasSeleccionadas = radio.value

            textoEntradas.innerText = `${entradasSeleccionadas} Entradas`
            textoEntradas.classList.add('selecionado')

            selectorSectores.classList.remove('ocultar')
            selectorEntradas.classList.add('ocultar')

            iconoSectores.classList.add('iconoActivo');
            resetearRadios()
        });
    });

    seleccionSector()

}

function agregarTituloShow() {
    tituloShow.innerText = `${showSeleccionado[0].autor} - ${showSeleccionado[0].titulo} `

    seleccionEntradas()
}

function seleccionDeShow() {

    const cards = document.querySelectorAll('.contenedor-card')

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.id
            window.location.href = `./pages/show.html?id=${id}`
        });
    });
}

function renderizarCards() {

    shows.forEach((show) => {
        contenedorCards.innerHTML += `
            <div class='contenedor-card' id="${show.id}">
                <div class="contenedor-card__imagen">
                    <img src="./images/${show.imagen}" alt="${show.autor}">
                </div>
                <div class="contenedor-card__texto">
                    <div class="contenedor-card__texto-nombre">${show.autor}</div>
                    <div class="contenedor-card__texto-fecha">
                        <div class="contenedor-card__texto-fecha-contenido">
                            <span>${show.dia}</span>
                            <span class="contenedor-card__texto-numero">${show.diaSemana}</span>
                            <span>${show.horario}</span>
                        </div>
                    </div>
                </div>
            </div>`
    })

    seleccionDeShow()
}

async function cargarShows() {

    try {
        let res = await fetch('./dataShows.json')
        let data = await res.json()

        shows.push(...data)

    } catch (error) {
        console.error("Error al cargar los datos: ", error)
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await cargarShows()
    renderizarCards()
})





