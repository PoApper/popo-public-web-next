import axios from 'axios';

const next_env = process.env.NEXT_PUBLIC_ENV;

export const popoApiUrl =
  next_env === 'prod'
    ? 'https://api.popo.poapper.club'
    : next_env === 'dev'
      ? 'https://api.popo-dev.poapper.club'
      : next_env === 'local'
        ? 'https://localhost:4000'
        : new Error('NEXT_PUBLIC_ENV is not set or invalid');

export const PoPoAxios = axios.create({
  baseURL: popoApiUrl as string,
});

export const PopoCdnAxios = axios.create({
  baseURL: 'https://cdn.popo.poapper.club',
});

export const InPoStackAxios = axios.create({
  baseURL: 'https://api.inpostack.poapper.club',
});
