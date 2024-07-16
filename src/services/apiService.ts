import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const DEFAULT_POKEMON_LIMIT = 151;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function showRequestConfig(config: AxiosRequestConfig): void {
  if (process.env.NODE_ENV !== 'development') return;

  console.log('REQUEST DETAILS');
  console.log('\tbaseURL:', config.baseURL);
}

function showResponseDetails(response: AxiosResponse): void {
  if (process.env.NODE_ENV !== 'development') return;

  console.log('RESPONSE DETAILS');
  console.log('\tstatus: ', response.status);
  console.log('\tdata: ', response.data);
}

// interceptors for request if necessary
api.interceptors.request.use(
  (request) => {
    showRequestConfig(request);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// interceptors for response if necessary
api.interceptors.response.use(
  (response: AxiosResponse) => {
    showResponseDetails(response);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getPokemonList = async (limit: number = DEFAULT_POKEMON_LIMIT, offset: number = 0) => {
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
