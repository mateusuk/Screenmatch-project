// import React from 'react';
// import './CardGrid.css'; // Estilos do Grid

// const CardGrid = ({ movies }) => {
//   return (
//     <div className="grid-container">
//       {movies.slice(0, 20).map((movie, index) => (
//         <div className="grid-card" key={index}>
//           <img
//             src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//             alt={movie.title || 'Image unavailable'}
//             className="grid-card-image"
//           />
//           <p className="grid-card-title">{movie.title || 'No Title'}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CardGrid;

// import React, { useState } from 'react';
// import './CardGrid.css'; // Certifique-se de ter estilos atualizados

// const CardGrid = ({ movies }) => {
//   const [favorites, setFavorites] = useState([]);

//   const toggleFavorite = (movie) => {
//     if (favorites.some((fav) => fav.id === movie.id)) {
//       setFavorites(favorites.filter((fav) => fav.id !== movie.id)); // Remove dos favoritos
//     } else {
//       setFavorites([...favorites, movie]); // Adiciona aos favoritos
//     }
//   };

//   return (
//     <div>
//       <div className="grid-container">
//         {movies.slice(0, 20).map((movie, index) => (
//           <div className="grid-card" key={index}>
//             <img
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title || 'Image unavailable'}
//               className="grid-card-image"
//             />
//             <p className="grid-card-title">{movie.title || 'No Title'}</p>
//             <div
//               className="favorite-icon"
//               onClick={() => toggleFavorite(movie)}
//               title="Adicionar aos favoritos"
//             >
//               {favorites.some((fav) => fav.id === movie.id) ? '❤️' : '🤍'}
//             </div>
//           </div>
//         ))}
//       </div>

//       {favorites.length > 0 && (
//         <div className="favorites-container">
//           <h2>Filmes Favoritos</h2>
//           <div className="grid-container">
//             {favorites.map((fav, index) => (
//               <div className="grid-card" key={index}>
//                 <img
//                   src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`}
//                   alt={fav.title || 'Image unavailable'}
//                   className="grid-card-image"
//                 />
//                 <p className="grid-card-title">{fav.title || 'No Title'}</p>
//                 <div
//                   className="favorite-icon"
//                   onClick={() => toggleFavorite(fav)}
//                   title="Remover dos favoritos"
//                 >
//                   ❤️
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardGrid;

import React, { useState } from 'react';
import './CardGrid.css'; // Certifique-se de ter estilos atualizados

const CardGrid = ({ movies }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id)); // Remove dos favoritos
    } else {
      setFavorites([...favorites, movie]); // Adiciona aos favoritos
    }
  };

  return (
    <div >
        <div style={{ marginTop: '25px' }} className="grid-container"> {/* Adicionado margin-top para garantir que fique abaixo da Navbar */}
          {movies.slice(0, 20).map((movie, index) => (
            <div className="grid-card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || 'Image unavailable'}
                className="grid-card-image"
              />
              <p className="grid-card-title">{movie.title || 'No Title'}</p>
              <div
                className="favorite-icon"
                onClick={() => toggleFavorite(movie)}
                title="Adicionar aos favoritos"
              >
                {favorites.some((fav) => fav.id === movie.id) ? '❤️' : '🤍'}
              </div>
            </div>
          ))}
        </div>

      {favorites.length > 0 && (
        <div className="favorites-container">
          <h2>Favorite Movies</h2>
          <div className="grid-container">
            {favorites.map((fav, index) => (
              <div className="grid-card" key={index}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`}
                  alt={fav.title || 'Image unavailable'}
                  className="grid-card-image"
                />
                <p className="grid-card-title">{fav.title || 'No Title'}</p>
                <div
                  className="favorite-icon"
                  onClick={() => toggleFavorite(fav)}
                  title="Remover dos favoritos"
                >
                  ❤️
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardGrid;