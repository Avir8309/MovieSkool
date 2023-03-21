import React,{useEffect, useState} from "react";
import Pagination from "./Pagination";

function Favourites() {
    const[curGenre,setcurGenre]=useState('All Genres')
    const[favourites,setFavourites]=useState([]);
    const[Genre,setGenre]=useState([])
    const[rating,setrating]=useState(0)
    const[popularity,setpopularity]=useState(0)
    const[search,setsearch]=useState('')
    const[page,setpage]=useState(1)
    const[rows,setrows]=useState(5)
    let filteredmovies=[]
    let genre={
      28: 'Action',
      12: 'Adventure',
      16: 'Animation',
      35: 'Comedy',
      80: 'Crime',
      99: 'Documentary',
      18: 'Drama',
      10751: 'Family',
      14: 'Fantasy',
      36: 'History',
      27: 'Horror',
      10402: 'Music',
      9648: 'Mystery',
      10749: 'Romance',
      878: 'Science Fiction',
      10770: 'TV Movie',
      53: 'Thriller',
      10752: 'War',
      37: 'Western'
    }
    


    useEffect(()=>{
          
          let oldfav = localStorage.getItem("imbd");
          oldfav = JSON.parse(oldfav) || [];
          setFavourites([...oldfav]);
    },[])
    useEffect(()=>{
      let temp=favourites.map((movie)=>genre[movie.genre_ids[0]]);
      temp=new Set(temp)
      
      setGenre(["All Genres",...temp])

    },[favourites])

    let add = (movie) => {
      let newArray = [...favourites, movie];
      setFavourites([...newArray]);
      console.log(newArray);
      localStorage.setItem("imbd", JSON.stringify(newArray));
    };
    let del=(movie)=>{
      let newArray=favourites.filter((m)=>
        m.id!=movie.id
      )
      setFavourites([...newArray]);
      localStorage.setItem("imbd",JSON.stringify(newArray));
    }
    filteredmovies= curGenre=="All Genres" ? favourites : favourites.filter((movie)=>genre[movie.genre_ids[0]]==curGenre)
    if(rating==1){
      filteredmovies.sort(function(objA,objB){
        return objB.vote_average-objA.vote_average
      })
    }
    else if(rating==-1){
      filteredmovies.sort(function(objA,objB){
        return objA.vote_average-objB.vote_average
      })

    }
    else if(popularity==1){
      filteredmovies.sort(function(objA,objB){
        return objB.popularity-objA.popularity
      })

    }
    else if(popularity==-1){
      filteredmovies.sort(function(objA,objB){
        return objA.popularity-objB.popularity
      })
    }
    filteredmovies=filteredmovies.filter((movie)=> movie.title.toLowerCase().includes(search.toLowerCase()));

    //pagination
    
    let maxpage=Math.ceil(filteredmovies.length/rows);
    let si=Number((page-1)*(rows));
    let ei=Number(si)+Number(rows);
    filteredmovies=filteredmovies.slice(si,ei);
    let Gobehind=()=>{
      if(page>1){
        setpage(page-1);
      }
    }
    let Goahead=()=>{
      if(page<maxpage){
        setpage(page+1)
      }

    }

  return (
    <>
    <div className="flex mt-4 px-2 justify-center flex-wrap space-x-2">
      {
      
      Genre.map((genres)=>
      <button className={
        curGenre==genres?
        "bg-blue-500 hover:bg-gray-300  text-white py-2 px-4 rounded-xl":
        "bg-gray-300 hover:bg-blue-500 text-black py-2 px-4 rounded-xl"} onClick={()=>setcurGenre(genres)}>
      
        {genres}
      </button>

      
      
      )
      }
      
      
      
    </div>
    <div className="flex justify-center mt-4">
        <input placeholder="search" type="text" value={search} onChange={(e)=>setsearch(e.target.value)} className="m-2 border border-2 text-center" ></input>
        <input placeholder="Row" type="number" value={rows} onChange={(e)=>setrows(e.target.value)} className="m-2 border border-2 text-center"></input>
    </div>
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
    <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
      <thead className="bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">
            <button className="mx-2" onClick={()=>{setrating(1) ;setpopularity(0)}}>↑</button>
            Rating
            <button className="mx-2" onClick={()=>{setrating(-1); setpopularity(0)}}>↓</button>
            
          </th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">
          <button className="mx-2" onClick={()=>{setpopularity(1) ;setrating(0)}}>↑</button>
            Popularity
            <button className="mx-2" onClick={()=>{setpopularity(-1) ;setrating(0)}}>↓</button>
            </th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900">Genre</th>
          <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
          
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 border-t border-gray-100">
        {filteredmovies.map((movie)=>(
          <tr className="hover:bg-gray-50">
  <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
    <div className="relative h-20 w-40">
      <img
        className={`md:h-[80px] md:w-[160px] object-cover`}
        src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        alt=""
      />
      <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
    </div>
    <div className="text-sm">
      <div className="font-medium text-gray-700">{movie.title}</div>
    </div>
  </th>
  <td className="px-6 py-4">
    <span
      className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
      {movie.vote_average}
    </span>
  </td>
  <td className="px-6 py-4">{movie.popularity}</td>
  <td className="px-6 py-4">
    <div className="flex gap-2">
      <span
        className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
      >
        {genre[movie.genre_ids[0]]}
      </span>
    </div>
  </td>
  <td className="px-6 py-4">
    <div className="flex justify-end gap-4">
      <button href="#" className="text-red-600 hover:text-red-900" onClick={()=>del(movie)}>
        Delete
      </button>
    </div>
  </td>
</tr>

        

        ))}
        </tbody>
        </table>
        </div>
        <Pagination PageProp={page} Goahead={Goahead} Gobehind={Gobehind}/>
   
    </>
  );
}

export default Favourites;
