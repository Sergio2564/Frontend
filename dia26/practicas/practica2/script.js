let contador = 0;
const valor = document.getElementById("valor");
document.getElementById("btnMas").onclick = () => valor.textContent = ++contador;
document.getElementById("btnMenos").onclick = () => valor.textContent = --contador;
document.getElementById("btnReset").onclick = () => valor.textContent = (contador = 0);
