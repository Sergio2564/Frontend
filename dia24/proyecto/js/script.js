// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');

    // Función para alternar el menú
    const toggleMenu = () => {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        
        // Alternamos la clase utilitaria de Tailwind
        mobileMenu.classList.toggle('hidden');
        
        // Actualizamos los atributos de accesibilidad (A11y)
        menuBtn.setAttribute('aria-expanded', !isExpanded);
    };

    // Escuchador de eventos en el botón hamburguesa
    menuBtn.addEventListener('click', toggleMenu);

    // UX: Cerrar el menú automáticamente al hacer clic en cualquier enlace interno
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMenu();
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionar los elementos clave del DOM
    const cotizadorSection = document.getElementById('cotizador');
    const totalDisplay = document.getElementById('total-cotizacion');

    // Validación defensiva por si el script se carga en una página sin el cotizador
    if (!cotizadorSection || !totalDisplay) return;

    /**
     * Calcula el presupuesto sumando los valores 'data-precio' 
     * de todos los inputs (radio/checkbox) que estén marcados.
     */
    const calcularTotal = () => {
        // Seleccionamos únicamente los inputs que el usuario checkeó dentro del cotizador
        const elementosSeleccionados = cotizadorSection.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked');

        // Si no hay ningún elemento seleccionado, restablecemos el mensaje inicial
        if (elementosSeleccionados.length === 0) {
            totalDisplay.textContent = "Seleccioná un plan para comenzar";
            return;
        }

        let total = 0;

        // Iteramos y sumamos los precios parseados de 'data-precio'
        elementosSeleccionados.forEach(input => {
            const precio = parseFloat(input.dataset.precio) || 0;
            total += precio;
        });

        // Formateamos el total utilizando el estándar de Guaraníes (puntos como miles, sin decimales)
        const totalFormateado = new Intl.NumberFormat('es-PY', {
            style: 'currency',
            currency: 'PYG',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(total);

        // Renderizamos el resultado en el contenedor correspondiente
        totalDisplay.textContent = totalFormateado;
    };

    // 2. Optimización: Delegación de eventos en el contenedor padre
    // Escucha cualquier cambio ('change') que ocurra en los inputs dentro del cotizador
    cotizadorSection.addEventListener('change', (event) => {
        if (event.target.matches('input[type="radio"], input[type="checkbox"]')) {
            calcularTotal();
        }
    });

    // 3. Inicialización: Ejecutamos una vez al cargar por si hay elementos marcados por defecto
    calcularTotal();
});


// Podés añadir este bloque dentro del mismo listener DOMContentLoaded que ya creamos
document.addEventListener('DOMContentLoaded', () => {
    
    // ... (aquí iría el código anterior del cotizador) ...

    // --- LÓGICA DEL FORMULARIO DE PRESUPUESTO ---
    const form = document.getElementById('presupuesto-form');
    const successAlert = document.getElementById('form-success');

    if (!form) return;

    // Expresión regular estándar para validar correos electrónicos
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /**
     * Helper para alternar la visibilidad de los mensajes de error
     */
    const toggleError = (inputElement, errorElement, isInvalid) => {
        if (isInvalid) {
            errorElement.classList.remove('hidden');
            inputElement.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-100');
            inputElement.classList.remove('border-gray-300', 'focus:border-indigo-600', 'focus:ring-indigo-100');
        } else {
            errorElement.classList.add('hidden');
            inputElement.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-100');
            inputElement.classList.add('border-gray-300', 'focus:border-indigo-600', 'focus:ring-indigo-100');
        }
    };

    // Escuchamos el evento de envío (submit)
    form.addEventListener('submit', (event) => {
        // Evita que la página se recargue por defecto
        event.preventDefault(); 

        // Capturamos los campos y sus respectivos contenedores de error
        const nombre = document.getElementById('nombre');
        const correo = document.getElementById('correo');
        const telefono = document.getElementById('telefono');
        const plan = document.getElementById('plan');

        const errorNombre = document.getElementById('error-nombre');
        const errorCorreo = document.getElementById('error-correo');
        const errorTelefono = document.getElementById('error-telefono');
        const errorPlan = document.getElementById('error-plan');

        // Flag de control de validación
        let isFormValid = true;

        // 1. Validar Nombre (Obligatorio, no vacío)
        if (nombre.value.trim() === '') {
            toggleError(nombre, errorNombre, true);
            isFormValid = false;
        } else {
            toggleError(nombre, errorNombre, false);
        }

        // 2. Validar Correo (Obligatorio y formato correcto)
        if (!emailRegex.test(correo.value.trim())) {
            toggleError(correo, errorCorreo, true);
            isFormValid = false;
        } else {
            toggleError(correo, errorCorreo, false);
        }

        // 3. Validar Teléfono (Obligatorio, no vacío)
        if (telefono.value.trim() === '') {
            toggleError(telefono, errorTelefono, true);
            isFormValid = false;
        } else {
            toggleError(telefono, errorTelefono, false);
        }

        // 4. Validar Plan de Interés (Obligatorio tener uno seleccionado)
        if (plan.value === '') {
            toggleError(plan, errorPlan, true);
            isFormValid = false;
        } else {
            toggleError(plan, errorPlan, false);
        }

        // Si todos los campos pasaron la validación con éxito
        if (isFormValid) {
            // Ocultamos errores previos si los hubiera
            successAlert.classList.remove('hidden');
            
            // Hacemos scroll suave hacia el mensaje de éxito para mejorar la UX
            successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Reseteamos el formulario de forma limpia
            form.reset();

            // Opcional: Ocultar el mensaje de éxito automáticamente después de 7 segundos
            setTimeout(() => {
                successAlert.classList.add('hidden');
            }, 7000);
        }
    });
});

