import { Routes, Route } from "react-router-dom"
import MoviesList from "./components/MoviesList"
import FavoriteMovies from "./components/FavoriteMovies"
import './App.css'
import { useState } from "react"

const App = () => {
  const [isSortedByRating, setIsSortedByRating] = useState(false)
  return (
    <>
      <Routes>
        <Route exact path="/" element={<MoviesList isSortedByRating={isSortedByRating} setIsSortedByRating={setIsSortedByRating} />} />
        <Route exact path="/favorite-movies" element={<FavoriteMovies isSortedByRating={isSortedByRating} setIsSortedByRating={setIsSortedByRating} />} />
      </Routes>
    </>
  )
}

export default App