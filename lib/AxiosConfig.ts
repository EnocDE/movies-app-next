import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_URL,
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
    'accept': 'application/json'
  }
})