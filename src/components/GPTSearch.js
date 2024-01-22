import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTMovieSuggestions from './GPTMovieSuggestions'
import { Bg_URL } from '../utils/constant'

const GPTSearch = () => {
  return (
    <div>
        <div className="absolute -z-10">
    <img 
     src={Bg_URL}
     alt="logo"
     />
    </div>
     <GPTSearchBar/>
     <GPTMovieSuggestions/>
    </div>
  )
}

export default GPTSearch
