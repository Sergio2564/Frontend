document.addEventListener('DOMContentLoaded', () => {
    
    // Referencias a los elementos del Simulador
    const montoRange = document.getElementById('montoRange');
    const montoLabel = document.getElementById('montoLabel');
    const plazoSelect = document.getElementById('plazoSelect');
    const cuotaCalculada = document.getElementById('cuotaCalculada');

    // Validación defensiva para evitar errores si no se encuentran los elementos
    if (!montoRange || !montoLabel || !plazoSelect || !cuotaCalculada) return;

    // Formateador regional para Guaraníes
    const formateadorPYG = new Intl.NumberFormat('es-PY', {
        style: 'currency',
        currency: 'PYG',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });

    /**
     * Calcula la cuota mensual aproximada usando interés simple para desarrollo ágil
     * Tasa de interés simulada fija anual: 10% -> 0.10 / 12 meses ≈ 0.00833 mensual
     */
    const calcularCuotaSimulada = () => {
        const monto = parseFloat(montoRange.value);
        const meses = parseInt(plazoSelect.value);
        const tasaMensual = 0.10 / 12;

        // Fórmula de amortización básica cuota fija
        const cuota = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -meses));

        // Renderiza el total de la cuota calculada
        cuotaCalculada.textContent = formateadorPYG.format(Math.round(cuota));
    };

    // Actualiza la etiqueta del monto seleccionado al mover el deslizador
    montoRange.addEventListener('input', () => {
        montoLabel.textContent = formateadorPYG.format(montoRange.value);
        calcularCuotaSimulada();
    });

    // Recalcula si cambia el plazo en meses
    plazoSelect.addEventListener('change', () => {
        calcularCuotaSimulada();
    });

    // Inicializar simulación con los valores iniciales por defecto
    calcularCuotaSimulada();
});