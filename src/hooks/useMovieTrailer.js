import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constant";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";
const useMovieTrailer = ( movieId ) => {
   // console.log(movieId);
    const dispatch = useDispatch();
  
    const getMovieVideos = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_OPTIONS

        //   `https://api.themoviedb.org/3/movie/955916/videos?language=en-US`,
        //   API_OPTIONS
        );
        const json = await data.json();
        console.log("video:", json);
  
        // Check if 'results' is present and not undefined
        const filterData = json.results?.filter((video) => video.type === "Trailer");
  
        // Check if 'filterData' is not undefined and has length
        const trailer = filterData?.length ? filterData[0] : null;
  
        console.log("trailer:", trailer);
  
        if (trailer) {
          dispatch(addTrailerVideo(trailer));
        }
      } catch (error) {
        console.error("Error fetching movie videos:", error);
      }
    };
    useEffect(() => {
      getMovieVideos();
    }, [movieId]); // Include movieId in the dependency array to run the effect when it changes
  };
  export default useMovieTrailer;
  