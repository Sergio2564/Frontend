import { useState } from 'react'
import './App.css'
import React, { useState } from 'react';


function BotonSaludo({ onSaludar }) {
  return (
    <button
      onClick={onSaludar}
      className="px-4 py-2 rounded-lg bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700 transition">
      Saludar a la clase
    </button>
  );
}


function App() {
  const [mensaje, setMensaje] = useState('');

  function manejarSaludo() {
    setMensaje('¡Hola, futuros desarrolladores!');
  }



  return (
    <div className="space-y-3">
      <h1 className="text-lg font-semibold text-slate-800">Mi primera app en React</h1>
      <BotonSaludo onSaludar={manejarSaludo} />
      {mensaje && <p className="text-sm text-slate-600">{mensaje}</p>}
      <PanelSesion />

    </div>
  );

}

//--------------------------------------------------------------------------------------------------------------

function EtiquetaCurso() {
  return (
    <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-[11px] font-mono text-slate-500">
      Progrmación III
    </span>
  );
}

function TarjetaAlumno({ nombre }) {
  return (
    <div className="p-3 rounded-lg border border-slate-200">
      <p className="font-semibold text-slate-800">{nombre}</p>
      <EtiquetaCurso />
    </div>
  );
}

function ListaDeAlumnos() {
  return (
    <div className="space-y-2">
      <TarjetaAlumno nombre="Ana Gimenez" />
      <TarjetaAlumno nombre="Carlos Duarte" />
    </div>
  );
}

//--------------------------------------------------------------------------------------------------------------


function EncabezadoPractica() {
  return (
    <>
      <h2 className="text-lg font-semibold text-slate-800">Guía de laboratorio</h2>
      <p className="text-sm text-slate-500">Electrónica Industrial - Unidad 3</p>
    </>
  );
}

//--------------------------------------------------------------------------------------------------------------

function BarraDeProgreso() {
  const alumno = { nombre: 'Laura Benitez', progreso: 72 };

  const colorBarra = alumno.progreso >= 70 ? '#2F9E58' : '#E8A33D';

  return (
    <div className="space-y-2">
      <p className="text-sm text-slate-700">
        {alumno.nombre} — {alumno.progreso}% completado
      </p>
      <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: alumno.progreso + '%', backgroundColor: colorBarra }}
        />
      </div>
    </div>
  );
}

//--------------------------------------------------------------------------------------------------------------

function PanelSesion() {
  const [estado, setEstado] = React.useState('desconectado');

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          onClick={() => setEstado('conectado')}
          className="px-3 py-1.5 rounded-md bg-cyan-600 text-white text-xs font-medium"
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => setEstado('desconectado')}
          className="px-3 py-1.5 rounded-md bg-slate-200 text-slate-700 text-xs font-medium"        >
          Cerrar sesión
        </button>
      </div>

      {estado === 'conectado' ? (
        <p className="text-sm text-green-700">Panel del alumno visible.</p>
      ) : (
        <p className="text-sm text-slate-500">Debes iniciar sesión para continuar.</p>
      )}

      {estado === 'conectado' && (
        <p className="text-xs text-slate-400">Última conexión: hoy</p>
      )}
    </div>
  );
}

//--------------------------------------------------------------------------------------------------------------


const productosIniciales = [
  { id: 'a1', titulo: 'Arduino Uno' },
  { id: 'a2', titulo: 'Protoboard' },
  { id: 'a3', titulo: 'Sensor ultrasónico' },
];

function ListaProductos() {
  const [productos, setProductos] = React.useState(productosIniciales);
  const [seleccionado, setSeleccionado] = React.useState(null);
  const [usarIndice, setUsarIndice] = React.useState(false);

  window.__barajarListaDemo = function () {
    setProductos(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-xs text-slate-500">
        <input
          type="checkbox"
          checked={usarIndice}
          onChange={(e) => setUsarIndice(e.target.checked)}
        />
        Usar el índice del arreglo como key (práctica no recomendada)
      </label>

      <ul className="space-y-1.5">
        {productos.map((producto, indice) => (
          <li
            key={usarIndice ? indice : producto.id}
            onClick={() => setSeleccionado(producto.id)}
            className={
              'px-3 py-2 rounded-md text-sm cursor-pointer border ' +
              (seleccionado === producto.id
                ? 'bg-cyan-50 border-cyan-400 text-cyan-800'
                : 'border-slate-200 text-slate-600')
            }
          >
            {producto.titulo}
          </li>
        ))}
      </ul>
    </div>
  );
}

//--------------------------------------------------------------------------------------------------------------

function BotonContador({ etiqueta, valor, onIncrementar }) {
  return (
    <button
      onClick={onIncrementar}
      className="px-3 py-2 rounded-md border border-slate-200 text-sm font-medium hover:border-cyan-400"
    >
      {etiqueta}: {valor}
    </button>
  );
}

function PanelEquipo() {
  const [puntos, setPuntos] = React.useState(0);

  function sumarPunto() {
    setPuntos(puntos + 1);
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-500">Estado compartido en el padre: <strong>{puntos}</strong> puntos</p>
      <div className="flex gap-2">
        <BotonContador etiqueta="Marcador A" valor={puntos} onIncrementar={sumarPunto} />
        <BotonContador etiqueta="Marcador B" valor={puntos} onIncrementar={sumarPunto} />
      </div>
    </div>
  );
}




export default App;
