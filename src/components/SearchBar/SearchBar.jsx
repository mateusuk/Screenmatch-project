import React, { useState,useEffect } from 'react';
import search_icon from '../../assets/search_icon.svg';
import CardGrid from '../pages/CardGrid/CardGrid'
import './SearchBar.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [showGrid, setShowGrid] = useState(false); // Armazena os resultados da busca

  // Função para buscar os resultados da API
  const fetchSearchResults = async (query) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTAxNjkxODgyOTk1ZTI3MTg1MjhhOGNjN2M0MjI0ZCIsIm5iZiI6MTczNzMwMjA5My44OTQsInN1YiI6IjY3OGQyMDRkNDJmMjdjNzU0YzY1MWMzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PCRgrul81SW42YnCffPDmtSPYEPZMh09movI3o4Bd1c',
      },
    };

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
        options
      );
      const data = await response.json();

      if (response.ok && data.results) {
        setMovies(data.results); // Armazena os resultados no estado local
        setShowGrid(true)
      } else {
        alert('No results found.');
        setMovies([]); // Limpa os resultados
        setShowGrid(false); // Esconde o grid
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      alert('An error occurred while fetching data.');
      setMovies([]); // Limpa os resultados em caso de erro
      setShowGrid(false); // Esconde o grid
    }
  };

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      alert('Please enter a search term.');
      setMovies([]); // Limpa os resultados se o campo estiver vazio
      setShowGrid(false);
      return;
    }

    fetchSearchResults(trimmedQuery); // Chama a busca na API
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Busca ao pressionar Enter
    }
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setMovies([]); // Limpa os filmes
      setShowGrid(false); // Esconde o grid
    }
  }, [searchQuery]);

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <img
          src={search_icon}
          alt="Search Icon"
          className="search-icon"
          onClick={handleSearch}
        />
      </div>
      {showGrid && <CardGrid movies={movies} />}
      
    </div>
  );
};

export default SearchBar;
