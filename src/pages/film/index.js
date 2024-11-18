import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "@/styles/film/index.css";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('/api/randommovies');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div>
      <Header />
      <div className="indexallmovies">
        <h1>Films Aléatoires</h1>
        <ul className="indexulmovies">
          {movies.map((movie) => (
            <li key={movie.id}>
                <a>
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                </a>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}