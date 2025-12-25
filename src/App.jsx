import React, { useState } from 'react';

export default function App() {
  const [mesa, setMesa] = useState(null);
  const [pedido, setPedido] = useState([]);

  // Configuración de productos
  const menu = [
    { id: 1, nombre: 'Cerveza Caña', precio: 2.5, zona: 'barra' },
    { id: 2, nombre: 'Ración Bravas', precio: 6.5, zona: 'cocina' },
    { id: 3, nombre: 'Hamburguesa', precio: 12.0, zona: 'cocina' },
    { id: 4, nombre: 'Copa de Vino', precio: 3.5, zona: 'barra' }
  ];

  const añadirItem = (producto) => setPedido([...pedido, producto]);

  const enviarComandaCocina = () => {
    const soloCocina = pedido.filter(p => p.zona === 'cocina');
    if (soloCocina.length === 0) return alert("No hay platos de cocina en el pedido.");
    
    // Aquí irá la conexión a la IP de la Star Cocina 192.168.1.100
    alert(`ENVIADO A COCINA:\n${soloCocina.map(p => p.nombre).join('\n')}`);
  };

  const imprimirCuentaBarra = () => {
    const total = pedido.reduce((acc, p) => acc + p.precio, 0);
    if (total === 0) return alert("El pedido está vacío.");

    // Aquí irá la conexión a la IP de la Star Barra 192.168.1.101
    alert(`IMPRIMIENDO CUENTA (Mesa ${mesa})\nTOTAL: ${total.toFixed(2)}€\nProceda al cobro con el TPV físico.`);
    
    // Limpiar mesa tras cobrar
    setPedido([]);
    setMesa(null);
  };

  return (
    <div style={{ padding: '15px', fontFamily: 'sans-serif', maxWidth: '500px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center', fontSize: '1.5rem' }}>🍻 Bar TPV</h1>
      <hr />

      {!mesa ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {[1, 2, 3, 4, 5, 6].map(n => (
            <button key={n} onClick={() => setMesa(n)} style={{ padding: '20px', fontSize: '1.2rem', borderRadius: '8px', border: '1px solid #ccc' }}>
              Mesa {n}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setMesa(null)} style={{ marginBottom: '10px' }}>⬅ Volver</button>
          <h3>Mesa {mesa} - Pedido</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
            {menu.map(item => (
              <button key={item.id} onClick={() => añadirItem(item)} style={{ padding: '10px', backgroundColor: '#f0f0f0', border: '1px solid #ddd' }}>
                {item.nombre} <br/> <b>{item.precio}€</b>
              </button>
            ))}
          </div>

          <div style={{ marginTop: '20px', borderTop: '2px solid #eee', paddingTop: '10px' }}>
            <h4>Total actual: {pedido.reduce((a, b) => a + b.precio, 0).toFixed(2)}€</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={enviarComandaCocina} style={{ padding: '15px', backgroundColor: '#ff4444', color: 'white', fontWeight: 'bold' }}>
                🔥 ENVIAR A COCINA
              </button>
              <button onClick={imprimirCuentaBarra} style={{ padding: '15px', backgroundColor: '#22cc22', color: 'white', fontWeight: 'bold' }}>
                🧾 SACAR CUENTA (BARRA)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
