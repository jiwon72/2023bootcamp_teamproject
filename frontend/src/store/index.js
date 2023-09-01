import { createStore } from 'vuex';

export default createStore({
  state: {
    movies: [],
    selectedMovieId: null
  },
  mutations: {
    SET_MOVIES(state, movies) {
      console.log('Before updating movies:', state.movies); // 로그 추가
      state.movies = movies;
      console.log('Updated movies:', state.movies); // 로그 추가
    },
    SET_SELECTED_MOVIE_ID(state, movieId) {
      state.selectedMovieId = movieId;
    }
  },
  actions: {
    setMovies({ commit }, movies) {
      commit('SET_MOVIES', movies);
    },
    setSelectedMovieId({ commit }, movieId) {
      commit('SET_SELECTED_MOVIE_ID', movieId);
    }
  }
});
