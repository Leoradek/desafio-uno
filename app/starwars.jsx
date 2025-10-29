"use client";

import { useEffect, useState } from "react";
import styles from "./starwars.module.css";

export default function StarWars() {
  const [personajes, setPersonajes] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [orden, setOrden] = useState("nombre");
  const [genero, setGenero] = useState("todos");
  const [especie, setEspecie] = useState("todos");
  const [pelicula, setPelicula] = useState("todos");

  useEffect(() => {
    async function fetchPersonajes() {
      const res = await fetch("https://swapi.dev/api/people/");
      const data = await res.json();
      setPersonajes(data.results);
      setFiltrados(data.results);
    }
    fetchPersonajes();
  }, []);

  useEffect(() => {
    let data = [...personajes];

    if (genero !== "todos") {
      data = data.filter(p => p.gender === genero);
    }

    if (especie === "human") {
      data = data.filter(p => p.species[0]?.includes("human") || p.species.length === 0);
    } else if (especie === "droid") {
      data = data.filter(p => p.species[0]?.includes("droid"));
    }

    if (pelicula !== "todos") {
      data = data.filter(p => p.films.includes(`https://swapi.dev/api/films/${pelicula}/`));
    }

    if (orden === "nombre") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (orden === "altura") {
      data.sort((a, b) => parseInt(a.height || 0) - parseInt(b.height || 0));
    }

    setFiltrados(data);
  }, [personajes, genero, especie, pelicula, orden]);

  return (
    <section className={styles.container}>
      <h1>Star Wars API</h1>

      <div className={styles.filtros}>
        <label>
          Ordenar:
          <select value={orden} onChange={e => setOrden(e.target.value)}>
            <option value="nombre">Nombre</option>
            <option value="altura">Altura</option>
          </select>
        </label>

        <label>
          Género:
          <select value={genero} onChange={e => setGenero(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="male">Hombre</option>
            <option value="female">Mujer</option>
          </select>
        </label>

        <label>
          Tipo:
          <select value={especie} onChange={e => setEspecie(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="human">Humano</option>
            <option value="droid">Robot</option>
          </select>
        </label>

        <label>
          Película:
          <select value={pelicula} onChange={e => setPelicula(e.target.value)}>
            <option value="todos">Todas</option>
            {[1, 2, 3, 4, 5, 6].map(n => (
              <option key={n} value={n}>Episodio {n}</option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.grid}>
        {filtrados.map(p => (
          <div key={p.name} className={styles.card}>
            <h3>{p.name}</h3>
            <p><strong>Género:</strong> {p.gender}</p>
            <p><strong>Altura:</strong> {p.height} cm</p>
            <p><strong>Peso:</strong> {p.mass} kg</p>
          </div>
        ))}
      </div>
    </section>
  );
}