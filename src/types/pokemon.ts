// Types related to the Pokemon API

export interface PokemonItem {
  name: string;
  url: string;
  id: string;
  img: string;
}

export interface PokemonList {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonItem[];
}
