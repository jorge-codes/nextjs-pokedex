'use client';

import { useEffect, useState } from 'react';
import { PokemonItem } from '@/types/pokemon';
import { getPokemonList } from '@/services/apiService';

export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      console.log('fetchPokemonList');
      try {
        const data = await getPokemonList(5000);
        console.log(data);
        setPokemonList(data.results);
        // setPokemonList(data);
      } catch (error) {
        setError('Failed to fetch Pokémon list');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  console.log(`API Base URL: `, process.env.NEXT_PUBLIC_API_BASE_URL);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className='prose'>
      <h1>It works!</h1>
      <p>List of the first 151 Pokémons</p>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={pokemon.name}>
            {(index + 1).toString().padStart(3, '0')}- {pokemon.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
