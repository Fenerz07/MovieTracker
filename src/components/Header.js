import styles from '../styles/header.css';
import style from '../styles/globals.css';

export default function Header() {
  return (
    <div className='headerglobaldiv'>
        <div className='headerleftdiv'>
            <nav>
                <ul>
                    <a href="/film">Films</a>
                </ul>
            </nav>
        </div>
        <h1><a href="/">MTracker</a></h1>
        <div className='headerrightdiv'>
            <img src='../image/bxl-search.svg'></img>
        </div>
    </div>
  );
}