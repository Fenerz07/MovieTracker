import styles from '../styles/footer.css';
import style from '../styles/globals.css';
export default function Footer() {
  return (
    <footer>
        <div className='footerglobaldiv'>
            <div>
                <p>Made by Fenerz</p>
                <p>2024</p>
                <p>For himself and exercice JS</p>
            </div>
            <div>
                <p>Follow me on:</p>
                <a href="https://www.linkedin.com/hugomatyla"><img src='../image/bxl-linkedin-square.svg' rel='linkedin'></img></a>
                <a href="https://www.github.com/Fenerz07"><img src='../image/bxl-github.svg' rel='github'></img></a>
            </div>
            <div>
                <p>Mentions légales</p>
                <p>CGU</p>
                <p>CGV</p>
            </div>
        </div>
    </footer>
  );
}