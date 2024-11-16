import { useEffect, useState, useRef } from "react";
import style from '../styles/top.css';

export default function TopMovies() {
  const [movies, setMovies] = useState([]);
  const carouselRef = useRef(null);
  const isScrolling = useRef(false); 

  const SCROLL_STEP = 300; 

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('/api/top');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchMovies();

    const handleScroll = (event) => {
      if (carouselRef.current && !isScrolling.current) {
        event.preventDefault(); 

        isScrolling.current = true;

        const scrollAmount = event.deltaY > 0 ? SCROLL_STEP : -SCROLL_STEP;

        carouselRef.current.scrollBy({
          left: scrollAmount,
          behavior: 'smooth',
        });

        setTimeout(() => {
          isScrolling.current = false;
        }, 500); 
      }
    };

    const disableVerticalScroll = (event) => {
      if (carouselRef.current) {
        event.preventDefault(); 
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('wheel', handleScroll, { passive: false });

      carousel.addEventListener('mouseenter', () => {
        document.body.style.overflow = 'hidden'; 
      });

      carousel.addEventListener('mouseleave', () => {
        document.body.style.overflow = ''; 
      });
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('wheel', handleScroll);
        carousel.removeEventListener('mouseenter', () => {
          document.body.style.overflow = 'hidden';
        });
        carousel.removeEventListener('mouseleave', () => {
          document.body.style.overflow = '';
        });
      }
    };
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

  return (
    <div className="upcoming-container">
      <h1>Meilleurs Films</h1>
      <div className="carousel-wrapper">
        <button className="scroll-button left" onClick={scrollLeft}>←</button>
        <div className="carousel" ref={carouselRef}>
          {movies.map((movie) => (
            <div className="carousel-item" key={movie.id}>
                <img draggable="false"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                />
                <h3>{movie.genres && movie.genres.length > 0 ? movie.genres[0].name : 'Unknown Genre'}</h3>
            </div>
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>→</button>
      </div>
    </div>
  );
}