import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';



const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTAxNjkxODgyOTk1ZTI3MTg1MjhhOGNjN2M0MjI0ZCIsIm5iZiI6MTczNzMwMjA5My44OTQsInN1YiI6IjY3OGQyMDRkNDJmMjdjNzU0YzY1MWMzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PCRgrul81SW42YnCffPDmtSPYEPZMh09movI3o4Bd1c",
    },
  };

  // Função para mover o carrossel automaticamente
  const autoScroll = () => {
    if (cardsRef.current) {
      const scrollWidth = cardsRef.current.scrollWidth;
      const clientWidth = cardsRef.current.clientWidth;

      // Se chegou ao final, reinicia o scroll
      if (cardsRef.current.scrollLeft + clientWidth >= scrollWidth) {
        cardsRef.current.scrollLeft = 0;
      } else {
        cardsRef.current.scrollLeft += 1; // Incrementa o scroll
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(autoScroll, 85); // Ajuste a velocidade com base no intervalo

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
  }, []);

  // Função para adicionar rolagem manual com o mouse
  const handleWheel = (event) => {
    if (cardsRef.current) {
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    // Busca os dados da API
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "popular"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (res && res.results) {
          setApiData(res.results);
        } else {
          console.error("Dados inválidos recebidos da API:", res);
        }
      })
      .catch((err) => console.error("Erro ao buscar dados:", err));

    // Adiciona o evento de rolagem manual
    const ref = cardsRef.current;
    if (ref) {
      ref.addEventListener("wheel", handleWheel);
    }

    // Remove o evento ao desmontar o componente
    return () => {
      if (ref) {
        ref.removeEventListener("wheel", handleWheel);
      }
    };
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.length > 0 ? (
          apiData.map((card, index) => (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`}
                alt={card.title || "Image unavailable"}
              />
              <p>{card.title || "Títle not found"}</p>
            </Link>
          ))
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );

  
}

export default TitleCards