let indice = 0;
let puntajeTotal = 0;
const preguntas = document.querySelectorAll('.pregunta');
const respuestas = [];

function seleccionarOpcion(boton) {
    const opciones = boton.parentElement.querySelectorAll('.opcion');
    opciones.forEach(op => op.classList.remove('seleccionada'));
    boton.classList.add('seleccionada');
    respuestas[indice] = boton.textContent;

    // Asignar puntaje según la opción elegida (orden: 1ra = 3, 2da = 2, 3ra = 1)
    const botones = Array.from(opciones);
    const puntaje = 3 - botones.indexOf(boton);
    puntajeTotal += puntaje;
}

const botonSiguiente = document.querySelector('.boton'); // Agregar al principio

function siguientePregunta() {
    const seleccionada = preguntas[indice].querySelector('.opcion.seleccionada');
    if (!seleccionada) {
        alert("Por favor selecciona una opción antes de continuar.");
        return;
    }
    preguntas[indice].classList.remove('activa');
    indice++;
    if (indice < preguntas.length) {
        preguntas[indice].classList.add('activa');
    } else {
        botonSiguiente.style.display = 'none'; // Ocultar botón
        mostrarResultado();
    }
}

function mostrarResultado() {
    let mensaje = "";

    if (puntajeTotal <= 15) {
        mensaje = `
                    <h2>¡Eres un Trabajador Responsable!</h2>
                    <p>Tiendes a mantener el equilibrio, actuar con cautela y asegurar que todo funcione de manera ordenada. 
                    Tu enfoque sereno es una base confiable para cualquier equipo,
                    Este Test esta diseñado para que puedas aprender y mejorar 
                    tus habilidades en una entrevista de trabajo trabajo
                    Mucha Suerte!.</p>
                `;
    } else if (puntajeTotal <= 30) {
        mensaje = `
                    <h2>¡Eres un Trabajador Esforzado!</h2>
                    <p>Tienes un espíritu de superación constante y te adaptas con inteligencia a los desafíos. 
                    Tu manera de avanzar inspira a otros sin necesidad de grandes gestos,
                    Este Test esta diseñado para que puedas aprender y mejorar 
                    tus habilidades en una entrevista de trabajo trabajo
                    Mucha Suerte!.</p>
                `;
    } else {
        mensaje = `
                    <h2>¡Eres un Trabajador Líder!</h2>
                    <p>Tu visión, iniciativa y presencia impactan al grupo. 
                    A menudo tomas decisiones clave, incluso sin darte cuenta. 
                    Tu influencia se siente, aunque no siempre sea visible.
                    Este Test esta diseñado para que puedas aprender y mejorar 
                    tus habilidades en una entrevista de trabajo trabajo
                    Mucha Suerte!.</p>
                `;
    }

    const resultado = document.createElement('div');
    resultado.innerHTML = `
                <div style="padding: 20px; margin-top: 20px; border: 2px solid #444; border-radius: 10px; background: #f9f9f9;">
                    <h2>Tu puntaje final es: ${puntajeTotal}</h2>
                    ${mensaje}
                    <button onclick="reiniciarCuestionario()" style="display: block; margin: 30px auto 0 auto; padding: 12px 24px; font-size: 1em; font-weight: bold; color: white; background: linear-gradient(135deg, #ED6A5A, #36C9C6); border: none; border-radius: 12px; cursor: pointer; transition: background 0.3s ease;">Reiniciar Cuestionario</button>
                </div>
            `;
    document.body.appendChild(resultado);
}

function reiniciarCuestionario() {
    indice = 0;
    puntajeTotal = 0;

    preguntas.forEach(p => {
        p.classList.remove('activa');
        const opciones = p.querySelectorAll('.opcion');
        opciones.forEach(op => op.classList.remove('seleccionada'));
    });

    preguntas[0].classList.add('activa');

    const resultado = document.querySelector('body > div:last-child');
    if (resultado) resultado.remove();

    botonSiguiente.style.display = 'block'; // Volver a mostrar el botón
}