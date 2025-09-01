const contenedorCompra = document.getElementById('contenedor-compra')
const precioEntradas = document.getElementById('precio-entradas')
const textoEntradas = document.getElementById('texto-entradas')
const textoSectores = document.getElementById('texto-sectores')
const tituloShow = document.querySelector('.titulo-show')
const selectorEntradas = document.getElementById('selector-entradas')
const OpcionSelectorEntradas = document.getElementById('contenedor-selecciones__entradas')
const iconoSectores = document.getElementById('iconoSectores')
const OpcionSelectorSectores = document.getElementById('contenedor-selecciones__sectores')

const params = new URLSearchParams(window.location.search)
const id = params.get("id")

const shows = []
let show
let entradasSeleccionadas



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
    }
}

OpcionSelectorEntradas.addEventListener('click', () => {
    selectorEntradas.classList.add('moverCentro')
    selectorEntradas.classList.remove('moverIzq')
    selectorEntradas.classList.remove('moverCentro')
    iconoSectores.classList.remove('iconoActivo')
    OpcionSelectorSectores.classList.remove('paso-activo')
    textoEntradas.innerText = `Entradas`
    textoEntradas.classList.remove('selecionado')
    seleccionEntradas()
    resetearRadios()
})


function seleccionEntradas() {

    precioEntradas.innerHTML = `Valor entrada: $${show.precio}`
    const seleccionEntradas = document.querySelectorAll('input[name="entradas"]')

    seleccionEntradas.forEach(radio => {
        radio.addEventListener('change', () => {
            entradasSeleccionadas = radio.value

            textoEntradas.innerText = `${entradasSeleccionadas} Entradas`
            textoEntradas.classList.add('selecionado')

            selectorEntradas.classList.add('moverIzq')

            iconoSectores.classList.add('iconoActivo');
            OpcionSelectorSectores.classList.add('paso-activo')
            resetearRadios()
        });
    });


    seleccionSector()

}

function resetearRadios() {
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await cargarShows()
    renderizarTituloShow()
})