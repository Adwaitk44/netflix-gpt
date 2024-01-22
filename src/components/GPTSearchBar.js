import React, { useRef } from 'react';
import lang from "../utils/LangConst";
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openAi';
import { API_OPTIONS } from '../utils/constant';
import { addGptMovieResult } from '../utils/gptSlice';


const GPTSearchBar = () => {
  const dispatch=useDispatch();
  const langkey=useSelector((store)=>store.config.lang)
  const searchText=useRef(null);
    

    //search each movie on tmdb through tmdb API
 const searchMovieTMDB=async(movie)=>{
  const data=await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1',
  API_OPTIONS
  );
  const json=await data.json()
  return json.results;
 }


    const handleGptSearchClick=async()=>{
      console.log(searchText.current.value);

       const gptQuery="Act as a Movie Recommendation system and suggest some movies for the query:" + searchText.current.value+"Only give me names of 5 movies, comma seperated like the example result given ahead. Example Result:Gadar,Sholay,Don,Golmaaal,Koi Mil Gaya";
      //const gptQuery=searchText.current.value;

      const gptResults=await openai.chat.completions.create({
        messages: [{ role: 'user', content: gptQuery }],
        model: 'gpt-3.5-turbo',
      });
      // if(!gptResults.choices){
      // }
     //console.log(gptResults.choices?.[0]?.message?.content);
      const gptMovies=gptResults.choices?.[0]?.message?.content.split(",");
      //console.log(gptMovies);

      //for each movie i will search tmdb api
      const promiseArray=gptMovies.map(movie=>searchMovieTMDB(movie));
      //i will get array of promises coz this is async function
      const tmdbResults= await Promise.all(promiseArray);
      console.log(tmdbResults);
      dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}));

    };
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-11/12 max-w-xl bg-black grid grid-cols-12 gap-4 p-4 rounded-md shadow-lg " 
      onSubmit={(e)=>e.preventDefault()}
      >
        <input
        ref={searchText}
          type="text"
          className="col-span-9 p-4 bg-gray-800 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
          placeholder={lang[langkey].gptSearchPlaceholder}
        />
        <button
          type="submit"
          className="col-span-3 py-3 px-4 bg-red-700 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleGptSearchClick}
        >
          {lang[langkey].search}
        </button>
      </form>
    </div>
  );
};
export default GPTSearchBar;
