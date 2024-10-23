import styles from '../styles/header.css';
import style from '../styles/globals.css';

export default function Header() {
  return (
    <div className='headerglobaldiv'>
        <div className='headerleftdiv'>
            <h1>MTracker</h1>
            <nav>
                <ul>
                    <a href="/">Accueil</a>
                    <a href="/film">Films</a>
                    <a href="/serie">Séries</a>
                </ul>
            </nav>
        </div>
        <div className='headerrightdiv'>
            <img src='../image/bxl-search.svg'></img>
        </div>
    </div>
  );
}