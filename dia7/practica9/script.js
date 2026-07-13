var TELEFONO = '595972247058';
var productos = document.querySelectorAll('.producto');

productos.forEach(function(producto) {
    producto.addEventListener('click', function() {
        var nombre = producto.getAttribute('data-nombre');
        // Añadido un espacio después de los dos puntos para mayor claridad
        var mensaje = 'Hola, me interesa: ' + nombre; 
        var url = 'https://wa.me/' + TELEFONO + '?text=' + encodeURIComponent(mensaje);
        window.open(url, '_blank');
    }); // <-- Aquí faltaba cerrar el paréntesis del addEventListener
});