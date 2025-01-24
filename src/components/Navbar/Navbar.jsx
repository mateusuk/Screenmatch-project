import React, { useEffect, useRef,useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import SearchBar from '../SearchBar/SearchBar';
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { logout } from '../../firebase'

const Navbar = () => {
  

  const navRef = useRef();
  const [hideNavbarLeft, setHideNavbarLeft] = useState(false);

  useEffect(()=>{
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = async (query) => {
    if (typeof query !== 'string') {
      console.error('Expected query to be a string, but received:', typeof query);
      return; // Se query não for uma string, não faz a busca.
    }
    
    const trimmedQuery = query.trim(); // Aqui, agora é seguro chamar .trim()
    
    if (!trimmedQuery) {
      alert('Please enter a search term.');
      return; // Evita busca com query vazia.
    } // Evita busca com query vazia
    try {
      // Exemplo de busca com API externa (API de Filmes)
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer SEU_TOKEN_AQUI', // Substitua pelo token real da API
          },
        }
      );
      const data = await response.json();

      if (response.ok && data.results) {
        console.log(data.results); 
        setHideNavbarLeft(true);// Exibe os resultados no console
        // Aqui você pode armazenar os resultados no estado ou passar para outro componente
      } else {
        alert('No results found.');
        setHideNavbarLeft(false);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setHideNavbarLeft(false);
    }
  };

  // const handleSearch = async (query) => {
  //   const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
  //   const results = await response.json();
  //   console.log(results);
  // };
  
  
  //   window.addEventListener('scroll',()=>{
  //     if(window.scrollY >=80){
  //       navRef.current.classList.add('nav-dark')
  //     }else{
  //       navRef.current.classList.remove('nav-dark')
  //     }
  //   })
  // })

  return (
    <div ref={navRef} className={`navbar ${hideNavbarLeft ? 'navbar-hide-left' : ''}`}>
      <div className={`navbar-left ${hideNavbarLeft ? 'hidden' : ''}`}>
        <img src={logo} alt="" />
        <ul>
          <li>Home</li>
          <li>Tv Shows</li>
          <li>Movies</li>
          {/* <li>New & Popular</li> */}
          <li>My List</li>
          {/* <li>Browse by Languages</li> */}
          
        </ul>
      </div>
      <div className="navbar-right">
        <SearchBar onSearch={handleSearch} />
        {/* <img src={search_icon} alt="" className='icons'/> */}
        <p>Children</p>
        <img src={bell_icon} alt="" className='icons'/>
        <div className='navbar-profile'>
          <img src={profile_img} alt="" className='profile' />
          <img src={caret_icon} alt=""  />
          <div className='dropdown'>
            <p onClick={()=>{logout()}}>Sign out</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar

//////////////////////////////////////////////////////////////////
