import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import styles from '../styles/globals.css';

require('dotenv').config();

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('/api/popular');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data.results);

        if (data.results && data.results.length > 0) {
          const firstMovieId = data.results[0].id;
          fetchMovieVideo(firstMovieId);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    async function fetchMovieVideo(movieId) {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=fr`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const videoKey = data.results[1].key;
          setVideoUrl(`https://www.youtube.com/embed/${videoKey}`);
        }
      } catch (error) {
        console.error('Error fetching movie video:', error);
      }
    }

    fetchMovies();
  }, []);

  function PourcentageRate(rate) {
    return Math.round(rate * 10);
  }

  return (
    <div>
      <Header />
      <div className="indexallmovies">
        {/*
        {videoUrl && (
          <iframe
            width="560"
            height="315"
            src={videoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            id="homemovietrailer"
          ></iframe>
        )}
        */}
        <h1>Films du moment</h1>
        <ul className="indexulmovies">
          {movies.map((movie) => (
            <li key={movie.id}>
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title}
              />
              <h2>SCORE</h2>
              <h1>{PourcentageRate(movie.vote_average)}%</h1>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}