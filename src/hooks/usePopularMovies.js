import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";
import { addPopularMovies } from "../utils/movieSlice";
const usePopularMovies=()=>{
     //fetch data from tmbd api and update store
  const dispatch=useDispatch();
  const getPopularMovies=async()=>{
    const data=await fetch('https://api.themoviedb.org/3/movie/popular', API_OPTIONS);
    const json=await data.json();
    dispatch(addPopularMovies(json.results));
  };

  useEffect(()=>{
    getPopularMovies();
  },[]);
}
export default usePopularMovies;

