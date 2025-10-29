// app/contador.jsx
'use client' //

import { useState } from 'react' //

export default function Contador() {
  // 1. Creamos el estado:
  // 'contador' es la variable (inicia en 0)
  // 'setContador' es la función para cambiarla
  const [contador, setContador] = useState(0) //

  // 2. Creamos funciones para cambiar el estado
  const incrementar = () => setContador(contador + 1) //
  const decrementar = () => setContador(contador - 1) //
  const reiniciar = () => setContador(0) //

  // 3. Mostramos el HTML
  return ( //
    <div style={{border: '1px solid black', padding: '10px', margin: '20px 0'}}>
      <h1>Contador</h1> {/* */}
      <p>Valor actual: {contador}</p> {/* */}
      <button onClick={incrementar}>+1</button> {/* */}
      <button onClick={decrementar}>-1</button> {/* */}
      <button onClick={reiniciar}>Reiniciar</button> {/* */}
    </div>
  )
}