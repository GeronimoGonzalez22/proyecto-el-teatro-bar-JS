const contenedorCards = document.getElementById('contenedor-cards')

const shows = []

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





