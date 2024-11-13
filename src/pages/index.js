import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NowMovies from "@/components/NowMovies";
import UpcomingMovies from "@/components/UpcomingMovies";

require('dotenv').config();

export default function Home() {
  return (
    <div>
      <Header />
      <NowMovies />
      <UpcomingMovies />
      <Footer />
    </div>
  );
}