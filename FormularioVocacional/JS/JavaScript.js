const preguntas = document.querySelectorAll('.pregunta');
const siguientePregunta = document.querySelectorAll('.botonSig');
const resultadoFin = document.querySelector('.resultado');
const insertarParrafo = document.querySelector('.insertar');

let preguntaActual = 0;

// Objeto para almacenar la puntuación de cada área vocacional
let perfil = {
    artes: 0,
    ecologista: 0,
    sociedad: 0,
    medicina: 0,
    programador: 0,
    analista: 0,
    editor: 0,
    profesor: 0,
};

// Mensajes finales basados en perfil
const mensajes = {
    artes: "Sos creativo/a. Podés explorar diseño gráfico, artes visuales, música, cine o moda.",
    ecologista: "Tu vocación está relacionada con el medio ambiente, sustentabilidad, biología o veterinaria.",
    sociedad: "Te importa la justicia y el bienestar común. Podrías estudiar derecho, ciencias políticas, relaciones internacionales o trabajo social.",
    medicina: "Podrías destacarte en áreas como medicina, enfermería, psicología o cuidado de animales.",
    programador: "Tenés perfil digital. Podés destacarte en programación, robótica, análisis de datos o IA.",
    analista: "Sos estratega y te gusta el análisis. Administración, recursos humanos, logística o roles de análisis de datos pueden ser tu camino.",
    editor: "Tenés facilidad para expresarte y crear contenido. Carreras como periodismo, comunicación, publicidad, diseño o producción de medios pueden ser lo tuyo.",
    profesor: "Te gusta ayudar y enseñar. Carreras como docencia, psicopedagogía o mentoría son ideales.",
    default: "Explora tus intereses y talentos, el mundo laboral tiene muchas oportunidades esperando por vos." // Added a default message for safety
};

// Oculta y muestra las preguntas
function mostrarPregunta(i){
    preguntas.forEach((pregunta, index) => {
        if (index === i) {
            pregunta.style.display = 'block'; 
        }
        else {
            pregunta.style.display = 'none'; 
        }
    });
}
// Despliega el resultado final acumulando resultados
function mostrarResultado() {
    let mayorArea = 'default';
    let maxValor = -1;

    for (let area in perfil) {
        if (perfil.hasOwnProperty(area)) {
            if (perfil[area] > maxValor) {
                maxValor = perfil[area];
                mayorArea = area;
            }
        }
    }

    if (maxValor <= 0) {
        mayorArea = 'default';
    }

    preguntas.forEach(pregunta => pregunta.style.display = 'none');
    resultadoFin.style.display = 'block';
    insertarParrafo.innerHTML = `<p>${mensajes[mayorArea]}</p>`;
}
// Agrega funcionalidad click a las divs de las opciones
document.querySelectorAll('.opciones').forEach(opcionDiv => {
    opcionDiv.addEventListener('click', () => {
        const checkbox = opcionDiv.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.checked = !checkbox.checked;
            opcionDiv.classList.toggle('seleccionada', checkbox.checked);
        }
    });
});

// Agrega funcional cheked a la opcion seleccionada
siguientePregunta.forEach(button => {
    button.addEventListener('click', () => {
        const checks = preguntas[preguntaActual].querySelectorAll('input[type="checkbox"]:checked');
        checks.forEach(input => {
            const valor = input.value;
            if (perfil.hasOwnProperty(valor)) {
                perfil[valor]++;
            }
        });
        
        if (preguntaActual === preguntas.length - 1) {
            mostrarResultado();
        } else {
            preguntaActual++;
            mostrarPregunta(preguntaActual);
        }
    });
});