import React, { useEffect, useState } from "react";
import naruto from "../images/naruto.jpg";
import axios from "axios";
import { Oval } from "react-loader-spinner";
import Pagination from "./Pagination";

function Movies() {
  const [Movies, setMovies] = useState([]);
  const [Hover, setHover] = useState();
  let [PageNumber, setPage] = useState(1);
  const [favourites, setFavourites] = useState([]);
  function Goahead() {
    setPage(PageNumber + 1);
  }
  function Gobehind() {
    if (PageNumber > 1) {
      setPage(PageNumber - 1);
    }
  }
  useEffect(
    function () {
      axios
        .get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=838997e0004903074e8e659e122cac7f&page=${PageNumber}`
        )
        .then((res) => {
          setMovies(res.data.results);
          let oldFav = localStorage.getItem("imbd");
          oldFav = JSON.parse(oldFav) || [];
          setFavourites([...oldFav]);
        });
    },
    [PageNumber]
  );

  let add = (movie) => {
    let newArray = [...favourites, movie];
    setFavourites([...newArray]);
    
    localStorage.setItem("imbd", JSON.stringify(newArray));
  };
  let del=(movie)=>{
    let newArray=favourites.filter((m)=>
      m.id!==movie.id
    )
    setFavourites([...newArray]);
    localStorage.setItem("imbd",JSON.stringify(newArray));
  }
  return (
    <div className="mb-8">
      <div className="md:mb-8 mb-4 mt-4  text-bold flex text-md md:text-2xl font-sans justify-center ">
        Trending Shows And Movies
      </div>
      {Movies.length === 0 ? (
        <div className="flex justify-center">
          <Oval
            height="100"
            width="100"
            radius="9"
            color="grey"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {Movies.map((movie) => (
            <div
              className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] relative m-4 h-[25vh] w-[150px] md:m-4 md:h-[35vh] md:w-[250px] hover:scale-110 ease-out duration-300 rounded-xl bg-center bg-cover flex items-end justify-center`}
              onMouseEnter={() => setHover(movie.id)}
              onMouseLeave={() => setHover()}
            >
              {Hover === movie.id && (
                <>
                  {favourites.find((m) => m.id === movie.id) ? (
                    <div
                      className="absolute top-2 right-2 hover:scale-x-120 ease-out duration-300"
                      onClick={() => del(movie)}
                    >
                      ❌
                    </div>
                  ) : (
                    <div
                      className="absolute top-2 right-2 hover:scale-x-120 ease-out duration-300"
                      onClick={() => add(movie)}
                    >
                      😍
                    </div>
                  )}
                </>
              )}
              <div className="md:p-4 p-2 text-white w-full flex justify-center bg-gray-900 bg-opacity-50 text-sm">
                {movie.title}
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
        <Pagination
          PageProp={PageNumber}
          Goahead={Goahead}
          Gobehind={Gobehind}
        />
      </div>
    </div>
  );
}

export default Movies;
