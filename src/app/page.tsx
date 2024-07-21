'use client';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { PokemonItem } from '@/types/pokemon';
import { getPokemonList } from '@/services/apiService';
import { addPokemon, removePokemon } from '@/redux/partySlice';
import { Thumbnail } from '@/components/thumbnail';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const party = useAppSelector((state) => state.party);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const data = await getPokemonList();
        setPokemonList(data.results);
      } catch (error) {
        setError('Failed to fetch Pokémon list');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  const handleButtonClick = (id: string, inParty: boolean) => {
    if (inParty) {
      dispatch(removePokemon(id));
    } else {
      dispatch(addPokemon(id));
    }
  };

  const handleThumbnailClick = (id: string) => {
    console.log(`PAGE: Clicked on ${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className='prose'>
      {/* Heading */}
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>Pokédex</h1>
      <p className='text-sm text-muted-foreground'>by @jorge_codes</p>
      {/* Search bar */}
      <section className='flex w-full max-w-sm items-center space-x-2 mb-8 mt-6'>
        <Input type='text' placeholder='Search by name or number' />
        <Button type='submit'>Go</Button>
      </section>
      {/* Pokémon grid */}
      <section className='grid md:grid-cols-3 sm:grid-cols-2 gap-4 pr-4 pl-4'>
        {pokemonList.map((pokemon, index) => (
          <Thumbnail
            key={pokemon.name}
            id={pokemon.id}
            name={pokemon.name}
            img={pokemon.img}
            party={party.selected.includes(pokemon.id)}
            onClicked={handleThumbnailClick}
            onButtonClicked={handleButtonClick}
          />
        ))}
      </section>
    </main>
  );
}
