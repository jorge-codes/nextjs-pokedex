import axios from 'axios';

const POKEMON_LIMIT = 151;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO: interceptors for request if necessary using AxiosResponse
api.interceptors.request.use(
  (config) => {
    // console.log('request config', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// TODO: interceptors for response if necessary using AxiosResponse

export const getPokemonList = async (limit: number = POKEMON_LIMIT, offset: number = 0) => {
  const url = `pokemon?limit=${limit}&offset=${offset}`;
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon list', error);
    throw error;
  }
};

export const getPokémonDetails = async (id: string) => {
  const url = `pokemon/${id}`;
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for Pokémon ID: ${id}`, error);
  }
};
