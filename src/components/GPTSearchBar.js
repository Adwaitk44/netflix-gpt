import React from 'react';
import lang from "../utils/LangConst";
import { useSelector } from 'react-redux';

const GPTSearchBar = () => {
    const langkey=useSelector((store)=>store.config.lang)
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-11/12 max-w-xl bg-black grid grid-cols-12 gap-4 p-4 rounded-md shadow-lg">
        <input
          type="text"
          className="col-span-9 p-4 bg-gray-800 text-white rounded-md placeholder-gray-400 focus:outline-none focus:ring focus:border-blue-300"
          placeholder={lang[langkey].gptSearchPlaceholder}
        />
        <button
          type="submit"
          className="col-span-3 py-3 px-4 bg-red-700 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          {lang[langkey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
