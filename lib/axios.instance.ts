import axios from "axios";

export const popoApiUrl = "https://api.popo.poapper.club";

export const PoPoAxios = axios.create({
  baseURL: popoApiUrl,
});

export const PopoCdnAxios = axios.create({
  baseURL: "https://cdn.popo.poapper.club",
});
