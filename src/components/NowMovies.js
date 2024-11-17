import { useEffect, useState, useRef } from "react";
import style from '../styles/popular.css';

export default function NowMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('/api/popular');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
    
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  function PourcentageRate(rate) {
    return Math.round(rate * 10);
  }

  function scoreColor(rate) {
    if (rate > 80) {
      return "green";
    } else if (rate >= 60) {
      return "orange";
    } else {
      return "red";
    }
  }

  return (
    <div className="upcoming-container">
      <h1>Films du moment</h1>
      {loading ? (
        <div className="loading-spinner"></div> 
      ) : (
      <div className="carousel-wrapper">
        <button className="scroll-button left" onClick={scrollLeft}>←</button>
        <div className="carousel" ref={carouselRef}>
          {movies.map((movie) => (
            <div className="carousel-item" key={movie.id}>
                <img draggable="false"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                />
                <h4 style={{ backgroundColor: scoreColor(PourcentageRate(movie.vote_average)) }}>
                  {PourcentageRate(movie.vote_average)}
                </h4>
            </div>
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>→</button>
      </div>
      )}
    </div>
  );
}
