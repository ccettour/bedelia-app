import './footer.css';

import imgEMAIL from './img/email.png';
import imgFB from './img/facebook.png';
import imgWA from './img/whatsapp.png';
import imgIG from './img/instagram.png';
import imgYT from './img/youtube.png';

export function Footer() {

    return (
        <footer>
            <a href='mailto:bedelia.fcad@uner.edu.ar' target='_blank' rel="noreferrer">
                <img src={imgEMAIL} width='40px' />
            </a>
            <a href='https://wa.me/+3454053222' target='_blank' rel="noreferrer">
                <img src={imgWA} width='40px' />
            </a>
            <a href='https://www.instagram.com/fcad.uner/?hl=es-la' target='_blank' rel="noreferrer">
                <img src={imgIG} width='40px' />
            </a>
            <a href='https://www.youtube.com/channel/UCH07uX8PpyI1-ee24xb2iJQ' target='_blank' rel="noreferrer">
                <img src={imgYT} width='40px' />
            </a>
            <a href='https://www.facebook.com/Fac.Cs.Administracion/' target='_blank' rel="noreferrer">
                <img src={imgFB} width='40px' />
            </a>
        </footer>
    );

}