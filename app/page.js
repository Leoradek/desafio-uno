'use client';

import { useState, useEffect } from 'react';
import Card from './card';
import Contador from './contador';
import Pokemones from './pokemones';
import StarWars from './starwars';
import styles from './page.module.css';
import Cookies from "js-cookie";

// datos iniciales (tus compañeros)
const iniciales = [
  { id: 1, nombre: 'Leonardo Condori', edad: 20, profesion: 'Scrum Master' },
  { id: 2, nombre: 'Cesar Condori', edad: 21, profesion: 'Técnico en Redes' },
  { id: 3, nombre: 'Cristian Gonzales', edad: 20, profesion: 'Desarrollador Junior' },
  { id: 4, nombre: 'Alex Rosales', edad: 21, profesion: 'Analista de Datos' },
  { id: 5, nombre: 'Julieta Rocha', edad: 20, profesion: 'Diseñadora Gráfica' },
  { id: 6, nombre: 'Brayan muñoz', edad: 21, profesion: 'Soporte TI' }
];

const profesiones = ['Desarrollador', 'Diseñador', 'Analista', 'Tester', 'DevOps', 'Soporte'];
const nombres = ['Lucía', 'Carlos', 'María', 'Javier', 'Valeria', 'Fernando'];

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export default function Home() {
  const [personas, setPersonas] = useState(iniciales);
  const [nextId, setNextId] = useState(7);

  useEffect(() => {
    Cookies.set("hola", "UAB2", { expires: 7, path: "/" });
    sessionStorage.setItem("holaSession", "UAB2");
    localStorage.setItem("holaLocal", "UAB3");
  }, []);

  const agregarCard = () => {
    const nueva = {
      id: nextId,
      nombre: `${randomItem(nombres)} ${randomItem(['Rojas', 'Pérez', 'Gómez', 'Luna'])}`,
      edad: Math.random() < 0.5 ? 20 : 21,
      profesion: randomItem(profesiones)
    };
    setPersonas([...personas, nueva]);
    setNextId(nextId + 1);
  };

  const removerUltimo = () => {
    if (personas.length > 0) setPersonas(personas.slice(0, -1));
  };

  return (
    <main className={styles.main}>
      <h1>Hola UAB</h1>

      <Contador />

      <div style={{ margin: '2rem 0' }}>
        <button onClick={agregarCard} style={{ marginRight: '.5rem' }}>
          Agregar Card
        </button>
        <button onClick={removerUltimo}>
          Remover último
        </button>
      </div>

      <div className={styles.grid}>
        {personas.map(p => (
          <Card key={p.id} nombre={p.nombre} edad={p.edad} profesion={p.profesion} />
        ))}
      </div>

      <Pokemones />
      <StarWars />
    </main>
  );
}