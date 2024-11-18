import { useEffect, useState, useRef } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NowMovies from "@/components/NowMovies";
import UpcomingMovies from "@/components/UpcomingMovies";
import TopMovies from "@/components/TopMovies";

require("dotenv").config();

export default function Home() {

  return (
    <div style={{ height: "200vh", userSelect: "none" }}>
      <Header />
      <div style={{paddingTop:"6rem"}}>
        <TopMovies />
        <NowMovies />
        <UpcomingMovies />
      </div>
      <Footer />
    </div>
  );
}
