const shows = []

async function cargarShows() {
    try {
        const res = await fetch('../dataShows.json')
        const data = await res.json()
        shows.push(...data)
    } catch (error) {
        console.error("Error al cargar los datos:", error)
    }
}

function renderizarDetalleShow() {
    const contenedorShow = document.getElementById("detalle-show")
    if (!contenedorShow) return

    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")

    const show = shows.find(s => s.id == id)

    if (show) {
        document.title = `${show.autor} - ${show.titulo}`
        contenedorShow.innerHTML = `
      <h1>${show.titulo}</h1>
      <img src="${show.imagen}" alt="${show.titulo}">
      <p><strong>Fecha:</strong> ${show.dia} ${show.diaSemana} - ${show.horario}</p>
      <p>${show.descripcion || ""}</p>
      <button onclick="location.href='compra.html?id=${show.id}'">Comprar</button>
    `
    } else {
        document.title = "Show no encontrado"
        contenedorShow.innerHTML = `<p>Show no encontrado</p>`
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    await cargarShows()
    renderizarDetalleShow()
})
