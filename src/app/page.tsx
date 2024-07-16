'use client';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from '@/components/ui/card';

import { PokemonItem } from '@/types/pokemon';
import { getPokemonList } from '@/services/apiService';
import { ButtonIcon, PlusIcon } from '@radix-ui/react-icons';

export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
      <section className='grid grid-cols-3 gap-4'>
        {pokemonList.map((pokemon, index) => (
          <Card key={pokemon.name}>
            <CardHeader>
              <CardTitle>{pokemon.name}</CardTitle>
              <CardDescription>#{(index + 1).toString().padStart(3, '0')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div>image here</div>
            </CardContent>
            <CardFooter>
              <Button className='float-right clear-both mt-2 mr-2' variant='outline' size='icon'>
                <PlusIcon />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
}
