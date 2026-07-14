import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import React, { useState, useEffect } from 'react';

function App() {
  // Estados principales
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para el formulario (Creación / Edición)
  const [formData, setFormData] = useState({ id: null, name: '', email: '', phone: '', website: '' });
  const [editando, setEditando] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Estado para modal de confirmación de eliminación
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);

  // URL de la API
  const API_URL = 'https://jsonplaceholder.typicode.com/users';

  // ==========================================
  // READ: Obtener usuarios (useEffect)
  // ==========================================
  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Error al conectar con el servidor.');
        return res.json();
      })
      .then((data) => {
        setUsuarios(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ==========================================
  // CREATE & UPDATE: Enviar formulario
  // ==========================================
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Nombre y Email son campos obligatorios.');
      return;
    }

    setSubmitting(true);

    if (editando) {
      // UPDATE (PUT)
      fetch(`${API_URL}/${formData.id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
        .then((res) => {
          if (!res.ok) throw new Error('No se pudo actualizar el usuario.');
          return res.json();
        })
        .then((data) => {
          // Actualizamos el estado local con los datos devueltos por la API
          setUsuarios(usuarios.map((u) => (u.id === formData.id ? { ...u, ...formData } : u)));
          resetForm();
        })
        .catch((err) => alert(err.message))
        .finally(() => setSubmitting(false));
    } else {
      // CREATE (POST)
      const nuevoIdTemp = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
      
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
        .then((res) => {
          if (!res.ok) throw new Error('No se pudo guardar el usuario.');
          return res.json();
        })
        .then((data) => {
          // Añadimos al estado local de React
          const nuevoUsuario = { ...formData, id: nuevoIdTemp };
          setUsuarios([nuevoUsuario, ...usuarios]);
          resetForm();
        })
        .catch((err) => alert(err.message))
        .finally(() => setSubmitting(false));
    }
  };

  // Preparar formulario para edición
  const seleccionarParaEditar = (u) => {
    setFormData({ id: u.id, name: u.name, email: u.email, phone: u.phone || '', website: u.website || '' });
    setEditando(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Limpiar formulario
  const resetForm = () => {
    setFormData({ id: null, name: '', email: '', phone: '', website: '' });
    setEditando(false);
  };

  // ==========================================
  // DELETE: Eliminar registro
  // ==========================================
  const confirmarEliminacion = () => {
    if (!usuarioAEliminar) return;

    fetch(`${API_URL}/${usuarioAEliminar.id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al intentar eliminar.');
        // Filtramos del estado de React
        setUsuarios(usuarios.filter((u) => u.id !== usuarioAEliminar.id));
        setUsuarioAEliminar(null);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans pb-12">
      {/* HEADER */}
      <header className="bg-slate-900 text-white py-6 shadow-md mb-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 text-2xl font-black">⚙️</span>
            <h1 className="text-xl font-black tracking-tight">Panel de Control General</h1>
          </div>
          <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
            React CRUD API
          </span>
        </div>
      </header>

      <main className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMNA 1: FORMULARIO (CREATE / UPDATE) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                {editando ? '📝 Editar Usuario' : '➕ Registrar Nuevo Usuario'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                    placeholder="Ej. Juan Pérez"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Teléfono</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                    placeholder="Ej. +595 981 123456"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Sitio Web</label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
                    placeholder="Ej. mipagina.com"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white py-2 px-4 rounded-lg text-sm font-bold transition-all"
                  >
                    {submitting ? 'Guardando...' : editando ? 'Actualizar' : 'Crear Usuario'}
                  </button>
                  {editando && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-600 py-2 px-3 rounded-lg text-sm font-semibold transition-all"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* COLUMNA 2: LISTADO DE USUARIOS (READ / DELETE) */}
          <div className="lg:col-span-2">
            
            {/* ESTADO DE CARGA */}
            {loading && (
              <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center shadow-sm">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                <p className="text-slate-500 font-medium">Obteniendo listado de usuarios de la API...</p>
              </div>
            )}

            {/* ESTADO DE ERROR */}
            {error && !loading && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center shadow-sm">
                <span className="text-3xl">⚠️</span>
                <h3 className="text-rose-800 font-bold mt-2">Error de conexión</h3>
                <p className="text-rose-600 text-sm mt-1">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors"
                >
                  Reintentar
                </button>
              </div>
            )}

            {/* LISTADO DE DATOS */}
            {!loading && !error && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-bold text-slate-900">Usuarios Registrados</h3>
                  <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {usuarios.length} activos
                  </span>
                </div>

                {usuarios.length === 0 ? (
                  <div className="p-12 text-center text-slate-400">
                    No hay registros cargados. Probá creando uno en el panel lateral.
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {usuarios.map((u) => (
                      <div key={u.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50/40 transition-colors">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <h4 className="font-bold text-slate-900 text-base truncate">{u.name}</h4>
                            <span className="text-xs text-slate-400">#{u.id}</span>
                          </div>
                          <div className="mt-1 space-y-0.5 text-xs text-slate-500">
                            <p className="flex items-center gap-1.5">
                              <span>📧</span> <span className="truncate">{u.email}</span>
                            </p>
                            {u.phone && (
                              <p className="flex items-center gap-1.5">
                                <span>📞</span> <span>{u.phone}</span>
                              </p>
                            )}
                            {u.website && (
                              <p className="flex items-center gap-1.5">
                                <span>🌐</span> <span className="text-emerald-600 font-medium">{u.website}</span>
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Acciones */}
                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-0 pt-3 sm:pt-0">
                          <button
                            onClick={() => seleccionarParaEditar(u)}
                            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => setUsuarioAEliminar(u)}
                            className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
      {usuarioAEliminar && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-100 animate-in fade-in zoom-in duration-150">
            <div className="text-center">
              <span className="text-4xl">🗑️</span>
              <h3 className="text-lg font-bold text-slate-900 mt-3">¿Confirmar eliminación?</h3>
              <p className="text-slate-500 text-sm mt-2">
                Estás a punto de eliminar permanentemente a <strong className="text-slate-800">{usuarioAEliminar.name}</strong>. Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={confirmarEliminacion}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded-xl text-sm font-bold transition-all active:scale-[0.98]"
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => setUsuarioAEliminar(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-2 px-4 rounded-xl text-sm font-bold transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App