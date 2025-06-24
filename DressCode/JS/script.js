// ----- INICIALIZACIÓN DEL ESTADO -----
let estado = {
    top_camisa: false,
    top_remera: false,
    mid_pantalon: false,
    mid_pijama: false,
    bottom_zapato: false,
    bottom_zapatilla: false
};

// ----- SELECCIÓN DE ELEMENTOS DEL DOM -----
const prendas = document.querySelectorAll('.ropa');
const zonas = document.querySelectorAll('.dropzone');
const mensaje = document.getElementById('mensaje');
const barra = document.getElementById('barra-progreso');

// ----- CONFIGURACIÓN DE DRAGSTART -----
prendas.forEach(prenda => {
    prenda.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', prenda.dataset.prenda);
    });
});

// ----- CONFIGURACIÓN DE DROP -----
zonas.forEach(zona => {
    zona.addEventListener('dragover', e => e.preventDefault());

    zona.addEventListener('drop', e => {
        e.preventDefault();
        const prenda = e.dataTransfer.getData('text/plain');
        const permitidas = zona.dataset.prenda.split(',');

        // Reinicia el estado de esas prendas y limpia la zona
        permitidas.forEach(p => estado[p] = false);
        zona.innerHTML = '';

        // Si la prenda es permitida
        if (permitidas.includes(prenda)) {
            const imagen = document.querySelector(`.ropa[data-prenda="${prenda}"]`).cloneNode(true);
            imagen.style.width = '100%';
            imagen.style.height = '100%';
            imagen.style.objectFit = 'contain';
            zona.appendChild(imagen);
            estado[prenda] = true;
            mensaje.textContent = '';
        } else {
            mensaje.textContent = '❌ ¡Esa prenda no va ahí!';
        }

        verificarLookCompleto();
    });
});

// ----- FUNCIÓN DE VERIFICACIÓN DE LOOK -----
function verificarLookCompleto() {
    // Look correcto
    if (estado.top_camisa && estado.mid_pantalon && estado.bottom_zapato) {
        mensaje.textContent = "✅ ¡Look completo y correcto!";
        barra.style.width = "100%";
        barra.style.backgroundColor = "#4CAF50";
        return;
    }

    // Combinaciones incorrectas conocidas
    const combinacionesIncorrectas = [
        ['top_remera', 'mid_pijama', 'bottom_zapatilla'],
        ['top_camisa', 'mid_pijama', 'bottom_zapatilla'],
        ['top_remera', 'mid_pantalon', 'bottom_zapato'],
        ['top_camisa', 'mid_pantalon', 'bottom_zapatilla'],
        ['top_remera', 'mid_pijama', 'bottom_zapato'],
        ['top_remera', 'mid_pantalon', 'bottom_zapatilla'],
        ['top_camisa', 'mid_pijama', 'bottom_zapato']
    ];

    const esIncorrecto = combinacionesIncorrectas.some(comb =>
        comb.every(prenda => estado[prenda])
    );

    // Calcular porcentaje de aciertos
    let correctas = 0;
    if (estado.top_camisa) correctas++;
    if (estado.mid_pantalon) correctas++;
    if (estado.bottom_zapato) correctas++;

    const porcentaje = Math.round((correctas / 3) * 100);
    barra.style.width = `${porcentaje}%`;
    barra.style.backgroundColor = porcentaje === 100 ? "#4CAF50" :
        porcentaje >= 66 ? "#ff9800" :
            porcentaje > 0 ? "#f44336" : "#ddd";

    if (esIncorrecto) {
        mensaje.textContent = `❌ ¡Look completo e incorrecto! (${porcentaje}% correcto)`;
        return;
    }

    if (
        (estado.top_camisa || estado.top_remera) &&
        (estado.mid_pantalon || estado.mid_pijama) &&
        (estado.bottom_zapato || estado.bottom_zapatilla)
    ) {
        mensaje.textContent = `❌ ¡Look armado pero no válido! (${porcentaje}% correcto)`;
    } else if (correctas > 0) {
        mensaje.textContent = `🧩 ${porcentaje}% del look es correcto`;
    } else {
        mensaje.textContent = "❌ ¡Aún te faltan prendas para completar el look!";
    }
}

// ----- BOTÓN DE REINICIO -----
document.getElementById('reiniciar').addEventListener('click', () => {
    document.getElementById('zona-top').innerHTML = '';
    document.getElementById('zona-mid').innerHTML = '';
    document.getElementById('zona-bottom').innerHTML = '';

    estado.top_camisa = false;
    estado.top_remera = false;
    estado.mid_pantalon = false;
    estado.mid_pijama = false;
    estado.bottom_zapato = false;
    estado.bottom_zapatilla = false;

    mensaje.textContent = '';
    barra.style.width = '0%';
    barra.style.backgroundColor = '#ddd';
});
