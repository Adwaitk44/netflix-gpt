import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";
import { addTrendingMovies } from "../utils/movieSlice";
const useTrendingMovies=()=>{
     //fetch data from tmbd api and update store
  const dispatch=useDispatch();

  const getTrendingMovies=async()=>{
    const data=await fetch('https://api.themoviedb.org/3/trending/movie/day', API_OPTIONS);
    const json=await data.json();
    dispatch(addTrendingMovies(json.results));
  };

  useEffect(()=>{
    getTrendingMovies();
  },[]);
}
export default useTrendingMovies;

