import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: [],
  reducers: {
    addMovies: (state, action) => {
      const data = action.payload;
      const newData = data.map((item) => ({ ...item, favorite: false }));
      return newData; // Return the new state
    },
    toggleFavorite: (state, action) => {
      const movie = state.find((movie) => movie.id === action.payload);
      if (movie) {
        movie.favorite = !movie.favorite;
      }
    },
    sortMoviesByRating: (state) => {
      return state.slice().sort((a, b) => b.rating - a.rating); // Sort in descending order
    },
    sortMoviesById: (state) => {
      return state.slice().sort((a, b) => a.id - b.id); // Sort in ascending order
    }
  }
});

export const { addMovies, toggleFavorite, sortMoviesByRating, sortMoviesById } = moviesSlice.actions;
export default moviesSlice.reducer;
