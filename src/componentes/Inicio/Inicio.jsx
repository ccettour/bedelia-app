import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import './Inicio.css';

export function Inicio() {
  const [noticias, setNoticias] = useState([]);
  const [tema] = useState("Tecnologia");
  const cantidadNoticias = 10;
  let pageFinal = cantidadNoticias;
  let pageInicial = 0;
  let temaActual = "Tecnologia";

  const apiKey = "27ea9984ff5c4ea6a1356c0735b386cd";

  const fetchNoticias = (categoria) => {
    fetch(
      `https://newsapi.org/v2/everything?q=${categoria}&language=es&apiKey=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => displayNoticias(data));
  };

  const displayNoticias = (data) => {
    if (pageInicial === 0) {
      setNoticias([]);
    }

    const newNoticias = [];
    for (let i = pageInicial; i < pageFinal; i++) {
      const { title, urlToImage, publishedAt, source, url } = data.articles[i];
      const date = publishedAt.split("T")[0].split("-").reverse().join("-");
      const newItem = {
        title,
        urlToImage,
        date,
        sourceName: source.name,
        url,
      };
      newNoticias.push(newItem);
    }

    setNoticias((prevNoticias) => [...prevNoticias, ...newNoticias]);
  };

  const siguiente = () => {
    pageInicial = pageFinal;
    pageFinal = pageFinal + cantidadNoticias;
    fetchNoticias(temaActual);
  };

  useEffect(() => {
    fetchNoticias(tema);
  }, [tema]);
  return (
    <>
      <div className="titulo">
        <h2>BEDELIA</h2>

      </div>

      <div className="navbar-toggle" onClick={() => {
        document.querySelector('.navbar-menu').classList.toggle('show');
      }}>

      </div>

      <div className="container-noticias">
        {noticias.map((noticia, index) => (
          <div key={index} className="item">
            <h2>{noticia.title}</h2>
            <img src={noticia.urlToImage} alt={noticia.title} className="img-noticia" />
            <div className="info_item">
              <span className="fecha">{noticia.date}</span>
              <span className="fuente">{noticia.sourceName}</span>
            </div>
            <a href={noticia.url} target="_blank" rel="noopener noreferrer">Leer más</a>
          </div>
        ))}
      </div>
      <div className="ver-mas">
        <Button variant="light" className="btn-light" id="btnSiguiente" onClick={siguiente}>
          Ver más
        </Button>
      </div>
    </>
  );
}