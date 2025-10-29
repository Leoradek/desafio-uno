"use client";

import { useState, useEffect } from "react";
import styles from "./pokemones.module.css";

export default function Pokemones() {
  const [pokemones, setPokemones] = useState([]);

  useEffect(() => {
    async function obtenerPokemones() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5");
      const data = await res.json();

      const lista = await Promise.all(
        data.results.map(async (p) => {
          const detalleRes = await fetch(p.url);
          const detalle = await detalleRes.json();
          return {
            id: detalle.id,
            nombre: detalle.name,
            imagen: detalle.sprites.front_default,
          };
        })
      );

      setPokemones(lista);
    }

    obtenerPokemones();
  }, []);

  return (
    <section className={styles.grid}>
      <h1>Pokémon API</h1>
      <div className={styles.cards}>
        {pokemones.map((p) => (
          <div key={p.id} className={styles.card}>
            <img src={p.imagen} alt={p.nombre} />
            <p>{p.nombre}</p>
          </div>
        ))}
      </div>
    </section>
  );
}