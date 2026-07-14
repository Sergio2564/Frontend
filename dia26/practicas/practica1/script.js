const filas = document.querySelectorAll("tbody tr");
filas.forEach(fila => {
    fila.addEventListener("click", () => {
        fila.classList.toggle("resaltada");
    });
});
