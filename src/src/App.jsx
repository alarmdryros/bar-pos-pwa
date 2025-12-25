import React, { useState } from 'react';

export default function App() {
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  
  // Ahora el pedido es un OBJETO donde cada llave es el número de mesa
  // Ejemplo: { 1: [cerveza, bravas], 2: [vino] }
  const [pedidosPorMesa, setPedidosPorMesa] = useState({
    1: [], 2: [], 3: [], 4: [], 5: [], 6: []
  });

  const menu = [
    { id: 1, nombre: 'Cerveza Caña', precio: 2.5, zona: 'barra' },
    { id: 2, nombre: 'Ración Bravas', precio: 6.5, zona: 'cocina' },
    { id: 3, nombre: 'Hamburguesa', precio: 12.0, zona: 'cocina' },
    { id: 4, nombre: 'Copa de Vino', precio: 3.5, zona: 'barra' }
  ];

  // Función para añadir productos a una mesa específica
  const añadirItem = (producto) => {
    setPedidosPorMesa({
      ...pedidosPorMesa,
      [mesaSeleccionada]: [...pedidosPorMesa[mesaSeleccionada], producto]
    });
  };

  const enviarComandaCocina = () => {
    const pedidoActual = pedidosPorMesa[mesaSeleccionada];
    const soloCocina = pedidoActual.filter(p => p.zona === 'cocina');
    
    if (soloCocina.length === 0) return alert("No hay platos de cocina.");
    
    alert(`🔥 IMPRESORA COCINA (Mesa ${mesaSeleccionada}):\n${soloCocina.map(p => p.nombre).join('\n')}`);
  };

  const imprimirCuentaBarra = () => {
    const pedidoActual = pedidosPorMesa[mesaSeleccionada];
    const total = pedidoActual.reduce((acc, p) => acc + p.precio, 0);

    if (total === 0) return alert("La mesa está vacía.");

    alert(`🧾 CUENTA MESA ${mesaSeleccionada}\n------------------\nTOTAL: ${total.toFixed(2)}€\n\nCobrar con TPV físico.`);
    
    // Limpiamos SOLO el pedido de esta mesa
    setPedidosPorMesa({
      ...pedidosPorMesa,
      [mesaSeleccionada]: []
    });
    setMesaSeleccionada(null);
  };

  // Función para saber si una mesa tiene algo pedido (para pintarla de otro color)
  const tienePedido = (id) => pedidosPorMesa[id].length > 0;

  return (
    <div style={{ padding: '15px', fontFamily: 'sans-serif', maxWidth: '500px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '1.4rem' }}>🍻 Bar POS Pro</h1>
      <hr />

      {!mesaSeleccionada ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <button 
              key={n} 
              onClick={() => setMesaSeleccionada(n)} 
              style={{ 
                padding: '25px', 
                fontSize: '1.2rem', 
                borderRadius: '8px', 
                backgroundColor: tienePedido(n) ? '#ffeaa7' : '#fff',
                border: tienePedido(n) ? '2px solid #fdcb6e' : '1px solid #ccc'
              }}>
              Mesa {n} {tienePedido(n) ? '⏳' : ''}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setMesaSeleccionada(null)} style={{ marginBottom: '15px', padding: '10px' }}>⬅ Ver todas las mesas</button>
          <h2 style={{margin: '0 0 10px 0'}}>Mesa {mesaSeleccionada}</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {menu.map(item => (
              <button key={item.id} onClick={() => añadirItem(item)} style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ddd' }}>
                {item.nombre} <br/> <b>{item.precio}€</b>
              </button>
            ))}
          </div>

          <div style={{ marginTop: '20px', borderTop: '2px solid #eee', paddingTop: '10px' }}>
            <h4>Pedido actual ({pedidosPorMesa[mesaSeleccionada].length} ítems):</h4>
            <ul style={{fontSize: '0.9rem'}}>
              {pedidosPorMesa[mesaSeleccionada].map((p, i) => <li key={i}>{p.nombre} - {p.precio}€</li>)}
            </ul>
            <h3 style={{color: '#2d3436'}}>Total: {pedidosPorMesa[mesaSeleccionada].reduce((a, b) => a + b.precio, 0).toFixed(2)}€</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={enviarComandaCocina} style={{ padding: '18px', backgroundColor: '#d63031', color: 'white', fontWeight: 'bold', borderRadius: '8px', border: 'none' }}>
                🔥 ENVIAR A COCINA
              </button>
              <button onClick={imprimirCuentaBarra} style={{ padding: '18px', backgroundColor: '#00b894', color: 'white', fontWeight: 'bold', borderRadius: '8px', border: 'none' }}>
                🧾 TICKET Y COBRAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
