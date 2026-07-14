// Base de datos propia: 12 Productos de Electrónica/Computación
const productos = [
    { id: 1, nombre: "Auriculares Inalámbricos Sony WH-1000XM4", categoria: "Audio", precio: 2450000, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80", descripcion: "Cancelación de ruido líder en la industria, batería de 30 horas y sonido premium de alta resolución." },
    { id: 2, nombre: "Teclado Mecánico Logitech G915 TKL", categoria: "Periféricos", precio: 1650000, img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80", descripcion: "Teclado inalámbrico de alto rendimiento para gaming con interruptores mecánicos de perfil bajo." },
    { id: 3, nombre: "Mouse Gamer Inalámbrico Logitech G502 LightSpeed", categoria: "Periféricos", precio: 780000, img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80", descripcion: "Sensor HERO 25K de máxima precisión, diseño ergonómico e iluminación LIGHTSYNC RGB ajustable." },
    { id: 4, nombre: "Monitor Curvo Gamer Samsung Odyssey G5 27\"", categoria: "Pantallas", precio: 3100000, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80", descripcion: "Resolución WQHD con tasa de refresco de 144Hz, tiempo de respuesta de 1ms y curvatura óptima de 1000R." },
    { id: 5, nombre: "Silla Gamer Corsair T3 Rush Gris", categoria: "Mobiliario", precio: 2850000, img: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&w=600&q=80", descripcion: "Tejido exterior de tela transpirable y almohadilla cervical de espuma viscoelástica para máxima comodidad." },
    { id: 6, nombre: "Notebook Asus ROG Zephyrus G14", categoria: "Computadoras", precio: 11950000, img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80", descripcion: "Procesador Ryzen 9, 16GB RAM, SSD de 1TB y tarjeta gráfica dedicada RTX de última generación." },
    { id: 7, nombre: "Cámara Web Logitech C920s Pro HD", categoria: "Video", precio: 550000, img: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=600&q=80", descripcion: "Grabación de video en Full HD 1080p a 30 fps, enfoque automático y tapa de privacidad incluida." },
    { id: 8, nombre: "Disco Sólido Kingston SSD NV2 1TB PCIe 4.0", categoria: "Componentes", precio: 620000, img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80", descripcion: "Velocidad de lectura de hasta 3500MB/s para acelerar los tiempos de carga y de inicio de tu sistema." },
    { id: 9, nombre: "Micrófono Condensador HyperX QuadCast S", categoria: "Audio", precio: 1250000, img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80", descripcion: "Micrófono USB autónomo con efectos de iluminación RGB radiantes, soporte antivibración y filtro antipop integrado." },
    { id: 10, nombre: "Consola Sony PlayStation 5 Slim 1TB", categoria: "Consolas", precio: 5400000, img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80", descripcion: "Gráficos increíbles en 4K, SSD de ultra alta velocidad para cargas instantáneas y gatillos adaptativos." },
    { id: 11, nombre: "Memoria RAM Corsair Vengeance RGB 16GB (2x8GB)", categoria: "Componentes", precio: 680000, img: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=600&q=80", descripcion: "Frecuencia de 3200MHz optimizada para plataformas Intel y AMD con iluminación dinámica RGB multizona." },
    { id: 12, nombre: "Placa de Video MSI GeForce RTX 4060 Ti 8GB", categoria: "Componentes", precio: 4350000, img: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80", descripcion: "Arquitectura Ada Lovelace con DLSS 3 por IA, trazado de rayos acelerado y refrigeración silenciosa de doble ventilador." }
];

// Estado global del Carrito (Guardado automático en LocalStorage)
let carrito = JSON.parse(localStorage.getItem('tecno_cart')) || [];

// Formateador de moneda en Guaraníes (₲)
const formatPYG = (monto) => {
    return new Intl.NumberFormat('es-PY', {
        style: 'currency',
        currency: 'PYG',
        minimumFractionDigits: 0
    }).format(monto);
};

// Renderizar Catálogo Completo
function renderizarCatalogo() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = '';

    productos.forEach(prod => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group";
        card.innerHTML = `
      <div class="cursor-pointer" onclick="mostrarDetalle(${prod.id})">
        <div class="relative overflow-hidden aspect-video bg-slate-100">
          <img src="${prod.img}" alt="${prod.nombre}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <span class="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">${prod.categoria}</span>
        </div>
        <div class="p-5">
          <h3 class="font-bold text-slate-800 line-clamp-2 group-hover:text-emerald-600 transition-colors">${prod.nombre}</h3>
          <p class="text-slate-400 text-xs mt-2 line-clamp-2">${prod.descripcion}</p>
        </div>
      </div>
      <div class="p-5 pt-0">
        <div class="flex items-center justify-between mt-2">
          <span class="font-extrabold text-slate-900 text-lg">${formatPYG(prod.precio)}</span>
          <button onclick="agregarAlCarrito(${prod.id})" class="p-2 bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white rounded-xl transition-all duration-200 shadow-sm active:scale-95">
            <i data-lucide="plus" class="w-5 h-5"></i>
          </button>
        </div>
      </div>
    `;
        grid.appendChild(card);
    });
    lucide.createIcons();
}

// Mostrar Vista de Detalle de un Producto
window.mostrarDetalle = function (id) {
    const prod = productos.find(p => p.id === id);
    if (!prod) return;

    const detailSection = document.getElementById('product-detail-section');
    const catalogSection = document.getElementById('catalog-section');
    const detailContent = document.getElementById('detail-content');

    detailContent.innerHTML = `
    <div class="rounded-2xl overflow-hidden aspect-video max-h-96 bg-slate-100">
      <img src="${prod.img}" alt="${prod.nombre}" class="w-full h-full object-cover">
    </div>
    <div class="space-y-6">
      <div>
        <span class="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">${prod.categoria}</span>
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mt-3 leading-tight">${prod.nombre}</h2>
        <p class="text-2xl font-black text-emerald-600 mt-2">${formatPYG(prod.precio)}</p>
      </div>
      <p class="text-slate-500 leading-relaxed">${prod.descripcion}</p>
      <div class="pt-4 flex flex-col sm:flex-row gap-3">
        <button onclick="agregarAlCarrito(${prod.id})" class="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md shadow-emerald-200 active:scale-[0.98]">
          <i data-lucide="shopping-cart" class="w-5 h-5"></i> Agregar al Carrito
        </button>
      </div>
    </div>
  `;

    catalogSection.classList.add('hidden');
    detailSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    lucide.createIcons();
};

// Cerrar Detalle de Producto y Volver al Catálogo
document.getElementById('back-to-catalog-btn')?.addEventListener('click', () => {
    document.getElementById('product-detail-section').classList.add('hidden');
    document.getElementById('catalog-section').classList.remove('hidden');
});

// Lógica de Agregar al Carrito
window.agregarAlCarrito = function (id) {
    const producto = productos.find(p => p.id === id);
    const itemExistente = carrito.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarYActualizar();
    abrirCarrito();
};

// Modificar Cantidades
window.cambiarCantidad = function (id, cambio) {
    const item = carrito.find(item => item.id === id);
    if (!item) return;

    item.cantidad += cambio;
    if (item.cantidad <= 0) {
        carrito = carrito.filter(item => item.id !== id);
    }

    guardarYActualizar();
};

// Quitar Producto del Carrito
window.eliminarDelCarrito = function (id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarYActualizar();
};

// Guardar en Storage y refrescar interfaz
function guardarYActualizar() {
    localStorage.setItem('tecno_cart', JSON.stringify(carrito));
    renderizarCarrito();
    actualizarBadge();
}

// Actualizar indicador flotante del carrito
function actualizarBadge() {
    const badge = document.getElementById('cart-badge');
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);

    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.classList.remove('scale-0');
        badge.classList.add('scale-100');
    } else {
        badge.classList.add('scale-0');
        badge.classList.remove('scale-100');
    }
}

// Renderizar Contenidos del Carrito Lateral
function renderizarCarrito() {
    const container = document.getElementById('cart-items-container');
    const subtotalLabel = document.getElementById('summary-subtotal');
    const totalLabel = document.getElementById('summary-total');

    if (!container) return;

    if (carrito.length === 0) {
        container.innerHTML = `
      <div class="h-64 flex flex-col items-center justify-center text-center">
        <i data-lucide="shopping-cart" class="w-12 h-12 text-slate-300 mb-3"></i>
        <p class="text-slate-500 font-semibold">Tu carrito está vacío</p>
        <p class="text-slate-400 text-xs px-8 mt-1">¡Navegá por el catálogo y agregá tus dispositivos favoritos!</p>
      </div>
    `;
        subtotalLabel.textContent = "₲ 0";
        totalLabel.textContent = "₲ 0";
        lucide.createIcons();
        return;
    }

    container.innerHTML = '';
    let subtotal = 0;

    carrito.forEach(item => {
        subtotal += item.precio * item.cantidad;
        const itemEl = document.createElement('div');
        itemEl.className = "flex gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 relative group";
        itemEl.innerHTML = `
      <div class="w-16 h-16 rounded-lg overflow-hidden bg-white shrink-0 border">
        <img src="${item.img}" alt="${item.nombre}" class="w-full h-full object-cover">
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="font-bold text-slate-800 text-sm truncate pr-6">${item.nombre}</h4>
        <p class="text-xs text-slate-400 mt-0.5">${formatPYG(item.precio)} c/u</p>
        
        <div class="flex items-center justify-between mt-2">
          <!-- Control de cantidades -->
          <div class="flex items-center border bg-white rounded-lg px-1">
            <button onclick="cambiarCantidad(${item.id}, -1)" class="p-1 text-slate-400 hover:text-slate-800"><i data-lucide="minus" class="w-3.5 h-3.5"></i></button>
            <span class="px-2.5 text-xs font-bold text-slate-700">${item.cantidad}</span>
            <button onclick="cambiarCantidad(${item.id}, 1)" class="p-1 text-slate-400 hover:text-slate-800"><i data-lucide="plus" class="w-3.5 h-3.5"></i></button>
          </div>
          <span class="font-bold text-sm text-slate-800">${formatPYG(item.precio * item.cantidad)}</span>
        </div>
      </div>
      <!-- Botón Eliminar -->
      <button onclick="eliminarDelCarrito(${item.id})" class="absolute top-3 right-3 text-slate-300 hover:text-rose-500 transition-colors">
        <i data-lucide="trash-2" class="w-4 h-4"></i>
      </button>
    `;
        container.appendChild(itemEl);
    });

    subtotalLabel.textContent = formatPYG(subtotal);
    totalLabel.textContent = formatPYG(subtotal);
    lucide.createIcons();
}

// Acciones de Visualización de la Barra de Carrito
const sidebar = document.getElementById('cart-sidebar');
const panel = document.getElementById('cart-panel');
const overlay = document.getElementById('cart-overlay');

function abrirCarrito() {
    sidebar.classList.remove('hidden');
    setTimeout(() => {
        overlay.classList.remove('opacity-0');
        overlay.classList.add('opacity-100');
        panel.classList.remove('translate-x-full');
    }, 10);
}

function cerrarCarrito() {
    overlay.classList.remove('opacity-100');
    overlay.classList.add('opacity-0');
    panel.classList.add('translate-x-full');
    setTimeout(() => {
        sidebar.classList.add('hidden');
    }, 300);
}

document.getElementById('cart-toggle-btn')?.addEventListener('click', abrirCarrito);
document.getElementById('cart-close-btn')?.addEventListener('click', cerrarCarrito);
overlay?.addEventListener('click', cerrarCarrito);

// Vaciar carrito por completo
document.getElementById('clear-cart-btn')?.addEventListener('click', () => {
    if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
        carrito = [];
        guardarYActualizar();
    }
});

// Simulación de Pago Terminado con Alerta Atractiva
document.getElementById('checkout-btn')?.addEventListener('click', () => {
    if (carrito.length === 0) return alert("Tu carrito está vacío.");
    alert(`¡Pedido Procesado con éxito!\nGracias por tu simulación de compra por un valor total de ${document.getElementById('summary-total').textContent}.`);
    carrito = [];
    guardarYActualizar();
    cerrarCarrito();
});

// Inicialización de la tienda
document.addEventListener('DOMContentLoaded', () => {
    renderizarCatalogo();
    renderizarCarrito();
    actualizarBadge();
});