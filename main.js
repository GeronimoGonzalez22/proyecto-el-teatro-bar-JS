const contenedorCards = document.getElementById('contenedor-cards')
const contenedorCompra = document.getElementById('contenedor-compra')
const tituloShow = document.querySelector('.titulo-show')
const selectorSectores = document.getElementById('selector-sectores')
const selectorEntradas = document.getElementById('selector-entradas')
const textoEntradas = document.getElementById('texto-entradas')
const textoSectores = document.getElementById('texto-sectores')
const iconoSectores = document.querySelectorAll('#iconoSectores rect')
const iconoPago = document.querySelectorAll('#iconoPago rect')
const resumen = document.getElementById('resumen-compra')
const botonComprar = document.getElementById('boton-confirmar')

let showSeleccionado = []
let entradasSeleccionadas
let sectorSeleccionado

const shows = [
    {
        id: 1, autor: "Dani La Chepi", titulo: "Vivila como queres", fecha: "19-07-2025", dia: "Sabado", horario: "21:00hs", diaSemana: "19", mes: "Julio",
        entradasSectorA: 6, entradasSectorB: 11, entradasSectorC: 6, entradasSectorD: 3, precio: 22000, imagen: "./images/Chepi-FEED.jpg"
    },
    {
        id: 2, autor: "Hector Rossi", titulo: "Transnoche paranormal", fecha: "20-07-2025", dia: "Domingo", horario: "20:00hs", diaSemana: "20", mes: "Julio",
        entradasSectorA: 3, entradasSectorB: 9, entradasSectorC: 5, entradasSectorD: 2, precio: 19000, imagen: "./images/Rossi-FEED.jpg"
    },
    {
        id: 3, autor: "Sole Macchi", titulo: "Mentime que me gusta", fecha: "25-07-2025", dia: "Viernes", horario: "21:00hs", diaSemana: "25", mes: "Julio",
        entradasSectorA: 2, entradasSectorB: 5, entradasSectorC: 4, entradasSectorD: 8, precio: 25000, imagen: "./images/Sole-FEED.jpg"
    },
    {
        id: 4, autor: "Juan Barraza", titulo: "En un confuso episodio", fecha: "26-07-2025", dia: "Sabado", horario: "21:00hs", diaSemana: "26", mes: "Julio",
        entradasSectorA: 6, entradasSectorB: 8, entradasSectorC: 2, entradasSectorD: 4, precio: 20000, imagen: "./images/Barraza-FEED.jpg"
    },
    {
        id: 5, autor: "Lucas Upstein", titulo: "Angel Caido", fecha: "01-08-2025", dia: "Viernes", horario: "21:00hs", diaSemana: "01", mes: "Agosto",
        entradasSectorA: 2, entradasSectorB: 1, entradasSectorC: 4, entradasSectorD: 3, precio: 22000, imagen: "./images/Epstein-FEED.jpg"
    },
    {
        id: 6, autor: "Ezequiel Campa", titulo: "Si pero NO", fecha: "02-08-2025", dia: "Sabado", horario: "21:00hs", diaSemana: "02", mes: "Agosto",
        entradasSectorA: 1, entradasSectorB: 3, entradasSectorC: 4, entradasSectorD: 1, precio: 15000, imagen: "./images/Campa-FEED.jpg"
    },
    {
        id: 7, autor: "Sauda", titulo: "Intimo", fecha: "02-08-2025", dia: "Sabado", horario: "21:00hs", diaSemana: "02", mes: "Agosto",
        entradasSectorA: 1, entradasSectorB: 3, entradasSectorC: 4, entradasSectorD: 1, precio: 15000, imagen: "./images/Sauda-FEED.jpg"
    },
    {
        id: 8, autor: "Nicolas D Tracy", titulo: "Crónico", fecha: "02-08-2025", dia: "Sabado", horario: "21:00hs", diaSemana: "02", mes: "Agosto",
        entradasSectorA: 1, entradasSectorB: 3, entradasSectorC: 4, entradasSectorD: 1, precio: 15000, imagen: "./images/DeTracy-FEED.png"
    },
]

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
            console.log("Sector selecionado:", sectorSeleccionado)


            textoSectores.innerText = `Sector ${sectorSeleccionado}`
            textoSectores.classList.add('selecionado')
            selectorSectores.classList.add('ocultar')
            resumen.classList.remove('ocultar')

            renderizarResumen()
            cambioColorIconoPago()
        })
    })
}

function cambioColorIconoSectores() {
    iconoSectores.forEach(rect => {
        rect.setAttribute('stroke', '#A80000');
    });
}
function cambioColorIconoPago() {
    iconoPago.forEach(rect => {
        rect.setAttribute('stroke', '#A80000');
    });
}

function seleccionEntradas() {

    const seleccionEntradas = document.querySelectorAll('input[name="entradas"]')

    seleccionEntradas.forEach(radio => {
        radio.addEventListener('change', () => {
            entradasSeleccionadas = radio.value
            console.log("Entradas elegidas:", entradasSeleccionadas)

            textoEntradas.innerText = `${entradasSeleccionadas} Entradas`
            textoEntradas.classList.add('selecionado')
            selectorSectores.classList.remove('ocultar')
            selectorEntradas.classList.add('ocultar')

            cambioColorIconoSectores()
        });
    });

    seleccionSector()

}

function seleccionDeShow() {
    const showCard = document.querySelectorAll('.contenedor-card')
    const arrayShowCards = Array.from(showCard)

    arrayShowCards.forEach((card) => {
        card.addEventListener('click', (evento) => {
            let id = evento.target.parentNode.parentNode.id
            let show = shows.find((elemento) => elemento.id == id)

            showSeleccionado.push({ ...show })

            agregarTituloShow()
        })
    })
}

function agregarTituloShow() {
    tituloShow.innerText = `${showSeleccionado[0].autor} - ${showSeleccionado[0].titulo} `

    seleccionEntradas()
}

function renderizarCards() {
    shows.forEach((show) => {
        contenedorCards.innerHTML += `
            <div class='contenedor-card' id="${show.id}">
                
                <div class="contenedor-card__imagen">
                    <img src=${show.imagen} alt=${show.autor}">
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
                
            </div>
        `
    })

    seleccionDeShow()
}


document.addEventListener('DOMContentLoaded', () => {
    renderizarCards()
})

contenedorCards.addEventListener('click', () => {

    contenedorCards.classList.add('ocultar');

    contenedorCompra.classList.remove('ocultar');

})





