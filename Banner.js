import React  from 'react'
import naruto from '../images/naruto.jpg'
import axios from 'axios';
import { useEffect, useState } from 'react'
import Pagination from './Pagination';

function Banner() {
  const [Movies, setMovies] = useState([]);
  let[PageNumber,setPage]=useState(1);
    function Goahead(){
        setPage(PageNumber+1);
    }
    function Gobehind(){
        if(PageNumber>1){
            setPage(PageNumber-1);
        }
    }
  useEffect(function () {
    axios
      .get(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=838997e0004903074e8e659e122cac7f"
      )
      .then((res) => {
        setMovies(res.data.results[0]);
      });
  },[PageNumber]);

  return (
    <div className={`bg-[url(https://image.tmdb.org/t/p/original/${Movies.backdrop_path})] h-[40vh] md:h-[70vh] bg-center bg-cover flex items-end justify-center`}>
        <div className='p-2 md:p-4 text-white w-full flex justify-center bg-gray-900 bg-opacity-50 text-md md:text-3xl'>
            {Movies.title}
        </div>
        
    </div>
  )
}

export default Banner