display = document.getElementById("display");
valorDisplay = 0;
op = "";

function escribir(Event){
    display.values += Event.target.textContent;
}

function operador(){
    op = Event.target.textContent;
    valorDisplay = parseFloat(display.value);
    display.value = "";
}

function calcular(){
    if(op === "+"){
        display.value = valorDisplay + parseFloat(display.value);
    }else if(op === "-"){
        display.value = valorDisplay - parseFloat(display.value);
    }else if(op === "x"){
        display.value = valorDisplay * parseFloat(display.value);
    }else if(op === "/"){
        display.value = valorDisplay / parseFloat(display.value);
    }else{
        display.value = "Error";
    }
}

boton1 = document.getElementById("b1");
boton1.addEventListener("click", escribir);

boton2 = document.getElementById("b2");
boton2.addEventListener("click", escribir);

boton3 = document.getElementById("b3");
boton3.addEventListener("click", escribir);

boton4 = document.getElementById("b4");
boton4.addEventListener("click", escribir);

botonSuma = document.getElementById("bs");
botonSuma.addEventListener("click", operador);

botonResultado = document.getElementById("bres");
botonResultado.addEventListener("click", calcular);
