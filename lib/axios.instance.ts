import axios from 'axios';

const next_env = process.env.NEXT_PUBLIC_ENV;

export let popoApiUrl =
  next_env === 'prod'
    ? 'https://api.popo.poapper.club'
    : 'https://api.popo-dev.poapper.club';

export const PoPoAxios = axios.create({
  baseURL: popoApiUrl,
});

export const PopoCdnAxios = axios.create({
  baseURL: 'https://cdn.popo.poapper.club',
});

export const InPoStackAxios = axios.create({
  baseURL: 'https://api.inpostack.poapper.club',
});
