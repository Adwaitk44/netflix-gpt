 import { useSelector } from 'react-redux';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import GPTSearch from './GPTSearch';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useTrendingMovies from '../hooks/useTrendingMovies';
const Browse = () => {

  const showGptSearch=useSelector(store=>store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useTrendingMovies();

  return (
    <div>
      <Header/>
      {
        showGptSearch ?<GPTSearch/>:
        (
    <>
      <MainContainer/>
      <SecondaryContainer/>
    </>
        )
        
      }
      
      
    </div>
  )
}
export default Browse
