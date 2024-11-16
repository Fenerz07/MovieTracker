import { useEffect, useState, useRef } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NowMovies from "@/components/NowMovies";
import UpcomingMovies from "@/components/UpcomingMovies";
import TopMovies from "@/components/TopMovies";

require("dotenv").config();

export default function Home() {
  const [isDragging, setIsDragging] = useState(false); 
  const [startY, setStartY] = useState(0); 
  const [scrollTop, setScrollTop] = useState(0); 

  const lastScrollY = useRef(0); 
  const animationFrame = useRef(null); 

  useEffect(() => {
    const handleMouseDown = (event) => {
      setIsDragging(true);
      setStartY(event.clientY); 
      setScrollTop(window.scrollY); 
      lastScrollY.current = window.scrollY; 
    };

    const handleMouseMove = (event) => {
      if (isDragging) {
        const distance = event.clientY - startY; 
        cancelAnimationFrame(animationFrame.current); 
        animationFrame.current = requestAnimationFrame(() => {
          window.scrollTo(0, lastScrollY.current - distance);
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false); 
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrame.current); 
    };
  }, [isDragging, startY, scrollTop]);

  return (
    <div style={{ height: "200vh", userSelect: "none" }}>
      <Header />
      <TopMovies />
      <NowMovies />
      <UpcomingMovies />
      <Footer />
    </div>
  );
}
