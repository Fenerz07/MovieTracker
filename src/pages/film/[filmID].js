import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "@/styles/film/ID.css";

export default function FilmDetails() {
  const router = useRouter();
  const { filmID } = router.query;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (filmID) {
      async function fetchMovieDetails() {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${filmID}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=fr`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setMovie(data);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      }

      fetchMovieDetails();
    }
  }, [filmID]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  function ScoreRound(score){
    if (score === 0) {
      return "-";
    }
    return Math.round(score*10);
  }

  function minuteToHours(minutes){
    if (minutes === 0) {
      return "-";
    }
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    return `${hours}h${remainingMinutes}`;
  }

  function formatDate(date) {
    let newdate = new Date(date);
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return newdate.toLocaleDateString('fr-FR', options);
  }

  return (
    <div>
      <Header />
      <div className="movie-details">
        <div className="left-screen">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title}
          />
        </div>
        <div className="middle-screen">
          <h1>{movie.title}</h1>
          <p>Genres : {movie.genres.map((genre) => genre.name).join(', ')}</p>
          <p>Durée : {minuteToHours(movie.runtime)} minutes</p>
          <p>Date de sortie : {formatDate(movie.release_date)}</p>
          <p>Score : {ScoreRound(movie.vote_average)} / 100</p>
          <h3>Résumé : </h3>
          <p>{movie.overview}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}