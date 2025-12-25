import React, { useState } from 'react';

export default function App() {
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [categoriaActual, setCategoriaActual] = useState('bebidas'); // Categoría por defecto
  const [pedidosPorMesa, setPedidosPorMesa] = useState({
    1: [], 2: [], 3: [], 4: [], 5: [], 6: []
  });

  // MENÚ ORGANIZADO POR CATEGORÍAS
  const menu = {
    bebidas: [
      { id: 1, nombre: 'Caña', precio: 2.5, zona: 'barra' },
      { id: 2, nombre: 'Refresco', precio: 2.8, zona: 'barra' },
      { id: 3, nombre: 'Vino', precio: 3.5, zona: 'barra' },
      { id: 4, nombre: 'Agua', precio: 2.0, zona: 'barra' }
    ],
    comida: [
      { id: 5, nombre: 'Bravas', precio: 6.5, zona: 'cocina' },
      { id: 6, nombre: 'Hamburguesa', precio: 12.0, zona: 'cocina' },
      { id: 7, nombre: 'Calamares', precio: 9.0, zona: 'cocina' },
      { id: 8, nombre: 'Croquetas', precio: 8.0, zona: 'cocina' }
    ],
    copas: [
      { id: 9, nombre: 'Gin Tonic', precio: 8.0, zona: 'barra' },
      { id: 10, nombre: 'Ron Cola', precio: 8.0, zona: 'barra' },
      { id: 11, nombre: 'Café', precio: 1.5, zona: 'barra' }
    ]
  };

  const añadirItem = (producto) => {
    setPedidosPorMesa(prev => ({
      ...prev,
      [mesaSeleccionada]: [...prev[mesaSeleccionada], { ...producto, instanceId: Date.now() }]
    }));
  };

  const eliminarUltimo = () => {
    setPedidosPorMesa(prev => {
      const nuevo = [...prev[mesaSeleccionada]];
      nuevo.pop();
      return { ...prev, [mesaSeleccionada]: nuevo };
    });
  };

  const enviarCocina = () => {
    const soloCocina = pedidosPorMesa[mesaSeleccionada].filter(p => p.zona === 'cocina');
    if (soloCocina.length === 0) return alert("Nada para cocina");
    alert(`🔥 COMANDA COCINA MESA ${mesaSeleccionada}:\n${soloCocina.map(p => p.nombre).join('\n')}`);
  };

  const cobrarMesa = () => {
    const pedido = pedidosPorMesa[mesaSeleccionada];
    const total = pedido.reduce((a, b) => a + b.precio, 0);
    if (total === 0) return;
    alert(`🧾 TICKET MESA ${mesaSeleccionada}\nTOTAL: ${total.toFixed(2)}€`);
    setPedidosPorMesa(prev => ({ ...prev, [mesaSeleccionada]: [] }));
    setMesaSeleccionada(null);
  };

  return (
    <div style={{ padding: '10px', fontFamily: 'sans-serif', maxWidth: '500px', margin: 'auto', backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', fontSize: '1.4rem', color: '#333' }}>🍻 Bar TPV Pro</h1>

      {!mesaSeleccionada ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '20px' }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
            <button key={n} onClick={() => setMesaSeleccionada(n)} style={{
              padding: '25px 5px', borderRadius: '10px', border: 'none', fontWeight: 'bold',
              backgroundColor: pedidosPorMesa[n]?.length > 0 ? '#ffca28' : '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Mesa {n} {pedidosPorMesa[n]?.length > 0 && '⏳'}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setMesaSeleccionada(null)} style={{ marginBottom: '10px', padding: '10px', width: '100%' }}>⬅ Volver al Plano</button>
          
          {/* BOTONES DE CATEGORÍAS */}
          <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
            {['bebidas', 'comida', 'copas'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setCategoriaActual(cat)}
                style={{
                  flex: 1, padding: '12px 5px', borderRadius: '5px', border: 'none', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.7rem',
                  backgroundColor: categoriaActual === cat ? '#333' : '#ddd',
                  color: categoriaActual === cat ? '#fff' : '#333'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* PRODUCTOS DE LA CATEGORÍA */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {menu[categoriaActual].map(item => (
              <button key={item.id} onClick={() => añadirItem(item)} style={{ padding: '15px 5px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
                {item.nombre}<br/><b>{item.precio}€</b>
              </button>
            ))}
          </div>

          {/* RESUMEN Y ACCIONES */}
          <div style={{ marginTop: '20px', backgroundColor: '#fff', padding: '15px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <b>Pedido Mesa {mesaSeleccionada}</b>
              <button onClick={eliminarUltimo} style={{ color: 'red', border: 'none', background: 'none' }}>✖ Borrar último</button>
            </div>
            <div style={{ height: '80px', overflowY: 'auto', fontSize: '0.9rem', margin: '10px 0' }}>
              {pedidosPorMesa[mesaSeleccionada].map((p, i) => <span key={i}>{p.nombre}, </span>)}
            </div>
            <h3 style={{ textAlign: 'right' }}>Total: {pedidosPorMesa[mesaSeleccionada].reduce((a, b) => a + b.precio, 0).toFixed(2)}€</h3>
            
            <button onClick={enviarCocina} style={{ width: '100%', padding: '15px', backgroundColor: '#e74c3c', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', marginBottom: '10px' }}>ENVIAR A COCINA</button>
            <button onClick={cobrarMesa} style={{ width: '100%', padding: '15px', backgroundColor: '#2ecc71', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>COBRAR TICKET</button>
          </div>
        </div>
      )}
    </div>
  );
}

  const enviarCocina = () => {
    const pedidoActual = pedidosPorMesa[mesaSeleccionada];
    const soloCocina = pedidoActual.filter(p => p.zona === 'cocina');
    if (soloCocina.length === 0) return alert("Nada para la cocina.");
    alert(`🔥 STAR COCINA (IP .100) - MESA ${mesaSeleccionada}:\n${soloCocina.map(p => p.nombre).join('\n')}`);
  };

  const cobrarMesa = () => {
    const pedidoActual = pedidosPorMesa[mesaSeleccionada];
    const total = pedidoActual.reduce((acc, p) => acc + p.precio, 0);
    if (total === 0) return alert("Mesa vacía.");

    alert(`🧾 STAR BARRA (IP .101) - MESA ${mesaSeleccionada}\nTOTAL: ${total.toFixed(2)}€\nCerrando mesa...`);
    
    setPedidosPorMesa(prev => ({ ...prev, [mesaSeleccionada]: [] }));
    setMesaSeleccionada(null);
  };

  // 5. RENDERIZADO (INTERFAZ)
  return (
    <div style={{ padding: '15px', fontFamily: 'sans-serif', maxWidth: '500px', margin: 'auto', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#2d3436', fontSize: '1.6rem' }}>🚀 TPV VERSION 2.0</h1>
      <p style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '-10px' }}>Control de Mesas Individual</p>
      <hr />

      {!mesaSeleccionada ? (
        /* VISTA DE TODAS LAS MESAS */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
          {[1, 2, 3, 4, 5, 6].map(n => {
            const ocupada = pedidosPorMesa[n].length > 0;
            return (
              <button 
                key={n} 
                onClick={() => setMesaSeleccionada(n)} 
                style={{ 
                  padding: '30px 10px', 
                  fontSize: '1.3rem', 
                  borderRadius: '12px', 
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  backgroundColor: ocupada ? '#fdcb6e' : '#ffffff',
                  color: '#2d3436',
                  fontWeight: 'bold'
                }}>
                Mesa {n} {ocupada ? '⏳' : ''}
              </button>
            );
          })}
        </div>
      ) : (
        /* VISTA DE UNA MESA ESPECÍFICA */
        <div>
          <button onClick={() => setMesaSeleccionada(null)} style={{ padding: '8px 15px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }}>
            ⬅ Volver al Plano
          </button>
          
          <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h2 style={{ margin: '0 0 15px 0' }}>Mesa {mesaSeleccionada}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {menu.map(item => (
                <button 
                  key={item.id} 
                  onClick={() => añadirItem(item)} 
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #dfe6e9', backgroundColor: '#f1f2f6' }}>
                  {item.nombre} <br/> <b>{item.precio}€</b>
                </button>
              ))}
            </div>

            <div style={{ marginTop: '20px', borderTop: '2px solid #f1f2f6', paddingTop: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4>Pedido Actual:</h4>
                <button onClick={eliminarUltimo} style={{ padding: '5px', fontSize: '0.7rem', backgroundColor: '#fab1a0', border: 'none', borderRadius: '4px' }}>Borrar Último</button>
              </div>
              
              <ul style={{ maxHeight: '150px', overflowY: 'auto', paddingLeft: '20px' }}>
                {pedidosPorMesa[mesaSeleccionada].map((p, i) => (
                  <li key={i} style={{ marginBottom: '5px' }}>{p.nombre} - {p.precio}€</li>
                ))}
              </ul>
              
              <h3 style={{ textAlign: 'right', color: '#2d3436' }}>
                Total: {pedidosPorMesa[mesaSeleccionada].reduce((a, b) => a + b.precio, 0).toFixed(2)}€
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
                <button onClick={enviarCocina} style={{ padding: '18px', backgroundColor: '#d63031', color: 'white', fontWeight: 'bold', borderRadius: '10px', border: 'none', fontSize: '1rem' }}>
                  🔥 ENVIAR A COCINA
                </button>
                <button onClick={cobrarMesa} style={{ padding: '18px', backgroundColor: '#00b894', color: 'white', fontWeight: 'bold', borderRadius: '10px', border: 'none', fontSize: '1rem' }}>
                  🧾 TICKET Y COBRAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
