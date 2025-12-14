(function () {
    'use strict'; // Activa el modo estricto, evita errores silenciosos

    // Seleccionamos todos los formularios que tengan la clase 'needs-validation'
    var forms = document.querySelectorAll('.needs-validation');

    // Convertimos la NodeList en un array y recorremos cada formulario
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            // Escuchamos el evento submit de cada formulario
            form.addEventListener('submit', function (event) {
                
                // checkValidity() devuelve false si algún campo requerido no está correctamente completado
                if (!form.checkValidity()) {
                    // Evita que el formulario se envíe si hay errores con html
                    event.preventDefault();
                    // Detiene la propagación del evento
                    event.stopPropagation();
                }

                // Agrega la clase de Bootstrap para mostrar estilos de validación
                // (bordes rojos, mensajes de error)
                form.classList.add('was-validated');
            }, false);
        });
})();

const form = document.querySelector('form');

// un segundo listener para enviar el formulario con fetch
form.addEventListener('submit', async (e) => {
  // Evita el envío tradicional del formulario (recarga de página)
  e.preventDefault();

  // Creamos un objeto FormData con todos los campos del formulario
  const data = new FormData(form);
  
  // Enviamos los datos usando fetch a la URL definida en 'action' del formulario
  const response = await fetch(form.action, {
    method: form.method, // Usamos el método definido en el formulario (POST)
    body: data,           // Cuerpo de la petición con los datos del formulario
    headers: { 'Accept': 'application/json' } // Esperamos respuesta en JSON
  });

});
