/* ==========================================
ELEMENTOS
========================================== */

const pantallas = Array.from(
document.querySelectorAll('.pantalla')
);

const puntos = Array.from(
document.querySelectorAll('.punto')
);

const musica = document.getElementById('musica');
const musicBtn = document.getElementById('musicBtn');
const comenzarBtn = document.getElementById('comenzarBtn');
const whatsappBtn = document.getElementById('whatsappBtn');

/* ==========================================
WHATSAPP
CAMBIA ESTE NÚMERO
========================================== */

const NUMERO_WHATSAPP = '521XXXXXXXXXX';

/* ==========================================
CAMBIAR DE PANTALLA
========================================== */

function irA(id) {

const destino = document.getElementById(id);

if (!destino) {
console.error('No existe la pantalla:', id);
return;
}

pantallas.forEach(pantalla => {
pantalla.classList.remove('activa');
});

destino.classList.add('activa');

const indice = pantallas.indexOf(destino);

puntos.forEach((punto, i) => {
punto.classList.toggle(
'activo',
i === indice
);
});

/* Reiniciar animaciones */
destino.querySelectorAll('.reveal').forEach(elemento => {

```
elemento.style.animation = 'none';

void elemento.offsetWidth;

elemento.style.animation = '';
```

});

}

/* ==========================================
BOTONES DE NAVEGACIÓN
========================================== */

document.querySelectorAll('[data-ir]').forEach(boton => {

boton.addEventListener('click', () => {

```
const destino = boton.getAttribute('data-ir');

irA(destino);
```

});

});

/* ==========================================
INICIAR MÚSICA AL ABRIR INVITACIÓN
========================================== */

async function iniciarMusica() {

try {

```
await musica.play();

musicBtn.classList.add('playing');

musicBtn.textContent = '♫';

musicBtn.setAttribute(
  'aria-label',
  'Pausar música'
);
```

} catch (error) {

```
console.log(
  'El navegador bloqueó la reproducción automática.',
  error
);
```

}

}

/* ==========================================
BOTÓN "ABRIR INVITACIÓN"
========================================== */

comenzarBtn.addEventListener('click', async () => {

/*
Primero iniciamos la música porque este
clic sí cuenta como interacción del usuario.
*/

await iniciarMusica();

/* Después cambiamos de pantalla */

irA('mensaje');

});

/* ==========================================
BOTÓN DE MÚSICA
========================================== */

musicBtn.addEventListener('click', async () => {

if (musica.paused) {

```
try {

  await musica.play();

  musicBtn.classList.add('playing');

  musicBtn.textContent = '♫';

  musicBtn.setAttribute(
    'aria-label',
    'Pausar música'
  );

} catch (error) {

  alert(
    'No se pudo reproducir la música. Verifica que el archivo esté en assets/musica.mp3'
  );

}
```

} else {

```
musica.pause();

musicBtn.classList.remove('playing');

musicBtn.textContent = '♪';

musicBtn.setAttribute(
  'aria-label',
  'Reproducir música'
);
```

}

});

/* ==========================================
WHATSAPP
========================================== */

if (NUMERO_WHATSAPP !== '521XXXXXXXXXX') {

const mensaje = encodeURIComponent(
'Hola, confirmo mi asistencia al Bautizo y Primer Año de Miranda Reyes Chávez. 💕'
);

whatsappBtn.href =
`https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`;

} else {

whatsappBtn.addEventListener('click', event => {

```
event.preventDefault();

alert(
  'Para activar este botón, cambia NUMERO_WHATSAPP en script.js por el número real de confirmación.'
);
```

});

}

/* ==========================================
TECLADO
========================================== */

document.addEventListener('keydown', event => {

if (
event.key !== 'ArrowRight' &&
event.key !== 'ArrowLeft'
) {
return;
}

const actual = pantallas.findIndex(
pantalla =>
pantalla.classList.contains('activa')
);

const siguiente =
event.key === 'ArrowRight'
? actual + 1
: actual - 1;

if (
siguiente >= 0 &&
siguiente < pantallas.length
) {

```
irA(
  pantallas[siguiente].id
);
```

}

});

/* ==========================================
ESTADO INICIAL
========================================== */

irA('inicio');
