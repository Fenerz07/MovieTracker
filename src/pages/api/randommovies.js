import axios from 'axios';

export default async function handler(req, res) {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3/discover/movie?language=fr-FR&sort_by=popularity.desc';

  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        api_key: API_KEY,
        page: Math.floor(Math.random() * 500) + 1,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des films aléatoires' });
  }
}