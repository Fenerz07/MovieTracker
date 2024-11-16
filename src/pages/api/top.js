import axios from 'axios';

export default async function handler(req, res) {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3/movie/top_rated?language=fr-FR';

  try {
    let allMovies = [];
    let currentPage = 1;
    let totalPages = 1;
    const MAX_PAGES = 20;

    while (currentPage <= totalPages && currentPage <= MAX_PAGES) {
      const response = await axios.get(`${BASE_URL}`, {
        params: {
          api_key: API_KEY,
          page: currentPage,
        },
      });

      allMovies = allMovies.concat(response.data.results);

      totalPages = response.data.total_pages;
      
      currentPage += 1;
    }

    res.status(200).json(allMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des prochains films' });
  }
}
