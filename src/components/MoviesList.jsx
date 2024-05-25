import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addMovies, sortMoviesById, sortMoviesByRating, toggleFavorite } from "../store/movies/movieSlice";
import { Link } from "react-router-dom";

export default function MoviesList({isSortedByRating, setIsSortedByRating}) {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  useEffect(() => {
    if(movies.length>0) return;
    const fetchMovies = async () => {
      const url = import.meta.env.VITE_API_KEY;
      console.log(url);
      try {
        const response = await fetch(url);
        const data = await response.json();
        dispatch(addMovies(data));
      } catch (error) {
        console.log(error?.message);
      }
    };
    fetchMovies();
  }, [dispatch]);
  return (
    <div>
      <div className="p-5 px-10 flex items-center justify-between text-white">
        <button className=" border p-4 px-5 rounded-sm" onClick={()=> {
          setIsSortedByRating(prev=>!prev)
          isSortedByRating ? dispatch(sortMoviesById()) : dispatch(sortMoviesByRating()
          )
        }}>{isSortedByRating ? "Original" : "Sort"}</button>
        <Link to={"/favorite-movies"}>
        <button className="border rounded-xl p-4 px-5 hover:bg-purple-600 hover:text-white">Go to Favorite Movies List</button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {
          movies.map((item) => {
            return (


              <div className="ag-courses_item" key={item.id}>
                <div className="ag-courses-item_link">
                  <div className="ag-courses-item_bg"></div>

                  <a href={item.imdb_url} target="_blank" className="ag-courses-item_title h-[180px] flex items-center">
                    <span className="flex flex-col gap-2">
                      {item.movie}

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                      </svg>
                    </span>
                  </a>

                  <div className="ag-courses-item_date-box">
                    Rating:
                    <span className="ag-courses-item_date">
                      ={item.rating}
                    </span>
                  </div>
                  <div>
                    <svg onClick={() => dispatch(toggleFavorite(item.id))} xmlns="http://www.w3.org/2000/svg" fill={item.favorite ? 'red' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6 absolute bottom-4 cursor-pointer right-4 scale-125 z-[999]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </div>
                  <p className="text-white mt-2">Click the title to go to website</p>
                </div>
              </div>
            )
          })
        }
        {"hello"}
      </div>
    </div>
  )
}