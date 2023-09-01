<template>
  <header>
    <div class="home-top-bar">
      <div class="home-icon-title">
        <font-awesome-icon :icon="['fas', 'bars']" />
        <img
            src="/images/logo2.1.png"
            class="logo"
            alt="logo"
          />
      </div>
      <div class="home-search-box-centered">
        <div class="home-search-box-container">
          <input v-model="query" class="home-search-box" type="text" placeholder="영화 검색" />
          <button @click="goToMenuPage" class="home-search-button" type="button">
          <font-awesome-icon :icon="['fas', 'search']"/>
          </button>
        </div>
      </div>
      <div class="home-user-icons">
        <font-awesome-icon :icon="['fas', 'star']" class="home-user-star" @click="goToMinePage"/>
        <font-awesome-icon :icon="['fas', 'user']" class="home-user-icon" @click="toggleUserDropdown"/>
        <div class="home-user-dropdown" :class="{ active: showUserDropdown }">
          <div @click="goToModifyPage" class="home-user-dropdown-item">프로필 관리</div>
          <div @click="goToQnaPage" class="home-user-dropdown-item">고객센터</div>
          <div @click="goToLoginPage" class="home-user-dropdown-item">로그아웃</div>
        </div>
      </div>
    </div>
  </header>
  <div class="home-content-container">
    <div class="home-left_list">
      <div class="home-select-genre" @mouseenter="toggleGenreMenu">장르 선택</div>
      <div class="home-genre-menu" v-show="showGenre" @mouseleave="hideMenus">
        <div @click="goToSelectRomance" class="home-genre-item">로맨스</div>
        <div @click="goToSelectComedy" class="home-genre-item">코미디</div>
        <div @click="goToSelectHorror" class="home-genre-item">공포</div>
        <div @click="goToSelectThriller" class="home-genre-item">스릴러</div>
        <div @click="goToSelectAnimation" class="home-genre-item">애니메이션</div>
        <div @click="goToSelectDrama" class="home-genre-item">드라마</div>
        <div @click="goToSelectFantasy" class="home-genre-item">판타지</div>
        <div @click="goToSelectSF" class="home-genre-item">SF</div>
        <div @click="goToSelectMystery" class="home-genre-item">추리</div>
        <div @click="goToSelectCrime" class="home-genre-item">범죄</div>
        <div @click="goToSelectMusic" class="home-genre-item">음악</div>
        <div @click="goToSelectAction" class="home-genre-item">액션</div>
        <div @click="goToSelectHistory" class="home-genre-item">역사</div>
        <div @click="goToSelectFamily" class="home-genre-item">가족</div>
        <div @click="goToSelectWar" class="home-genre-item">전쟁</div>
        <div @click="goToSelectWestern" class="home-genre-item">서부</div>
        <div @click="goToSelectAdventure" class="home-genre-item">모험</div>
      </div>
      <div class="home-select-platform" @mouseenter="togglePlatformMenu">
        플랫폼 선택
      </div>
      <div class="home-platform-menu" v-show="showPlatform" @mouseleave="hideMenus">
        <div @click="goToSelectNetflix" class="home-platform-item">넷플릭스</div>
        <div @click="goToSelectDisneyplus" class="home-platform-item">디즈니플러스</div>
        <div @click="goToSelectWavve" class="home-platform-item">웨이브</div>
        <div @click="goToSelectAppleTV" class="home-platform-item">AppleTV</div>
        <div @click="goToSelectWatcha" class="home-platform-item">왓차</div>
      </div>
    </div>
    <div class="home-right-content">
      <div class="home-top-10-and-sort">
        <div class="home-top-10" @click="fetchMovies">TOP10</div>
        <div class="home-dropdown" @click="toggleDropdown">
          정렬순 ▼
          <div class="home-dropdown-menu" v-show="showDropdown" @mouseleave="hideDropdown">
            <div class="home-dropdown-item" @click="fetchMovies">현재 상영중인 영화</div>
            <div class="home-dropdown-item" @click="fetchpopular">OTT 인기영화</div>
          </div>
        </div>
      </div>
      <div class="home-movies">
          <div class="home-poster" v-for="movie in displayedMovies" :key="movie.id">
            <div @click="goToMovieinformationPage(movie)" class="home-card" style="width: 18rem">
              <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="home-movieposter" alt="movieposter" />
              <div class="home-card-body">
                <h5 class="home-card-title">{{ movie.title }}</h5>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */ import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faStar,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

export default {
  name: "MovieHeader",
  components: {
    FontAwesomeIcon,
  },
  created() {
    library.add(faBars, faStar, faUser, faSearch);
  },
  data() {
    return {
      showGenre: false,
      showPlatform: false,
      showUserDropdown: false,
      showDropdown: false,
      movies: [],
      query: '', // 검색 쿼리를 저장할 변수
      displayedMovies: [], // 실제로 화면에 표시할 영화 목록
      currentPage: 1,      // 현재 페이지 번호
    };
  },
  methods: {
    async fetchMovies() {
      await axios.get('http://localhost:3000/movies/latest').then(response => {
      this.movies = response.data; // Store the fetched movies
      this.displayPage(1);
      });
    },
    displayPage(page) {
      const pageSize = 10; // 한 페이지당 표시할 영화 수
      this.currentPage = page;
      this.displayedMovies = this.movies.slice((page - 1) * pageSize, page * pageSize);
    },
    async fetchpopular() {
      await axios.get('http://localhost:3000/movies/popular').then(response => {
      this.movies = response.data; 
      this.displayPage(1);
      });
    },
    displayPage2(page) {
      const pageSize = 10; // 한 페이지당 표시할 영화 수
      this.currentPage = page;
      this.displayedMovies = this.movies.slice((page - 1) * pageSize, page * pageSize);
    },
    async fetchSearch(query) {
      await axios.get(`http://localhost:3000/search/movie?query=${query}&page=1`).then(response => {
        this.movies = response.data;
        this.$store.dispatch('setMovies', response.data)
      })
      .catch(error => {
      console.error("API 호출 중 에러 발생:", error);
    });
    },
    async fetchMovieid() {
      await axios.get(`http://localhost:3000/movies/${movieId}`).then(response => {
      this.movies = response.data;
    });
  },
    async searchMovies() {
      await this.fetchSearch(this.query);
      this.$router.push;
    },
    async selectMovie(movie) {
      await this.$store.dispatch('setSelectedMovieId', movie.id);
    },
    async goToMenuPage() {
      await this.fetchSearch(this.query);
      this.$store.dispatch('setMovies', this.movies);
      this.$router.push({ path: '/MenuPage', query: { query: this.query } });
    },
    goToMinePage() {
      this.$router.push('/MinePage');
    },
    goToModifyPage() {
      this.$router.push('/ModifyPage');
    },
    goToQnaPage() {
      this.$router.push('/QnaPage');
    },
    goToLoginPage() {
      this.$router.push('/LoginPage');
    },
    goToSelectRomance() {
      this.$router.push('/SelectRomance');
    },
    goToSelectComedy() {
      this.$router.push('/SelectComedy');
    },
    goToSelectHorror() {
      this.$router.push('/SelectHorror');
    },
    goToSelectThriller() {
      this.$router.push('/SelectThriller');
    },
    goToSelectAnimation() {
      this.$router.push('/SelectAnimation');
    },
    goToSelectDrama() {
      this.$router.push('/SelectDrama');
    },
    goToSelectFantasy() {
      this.$router.push('/SelectFantasy');
    },
    goToSelectSF() {
      this.$router.push('/SelectSF');
    },
    goToSelectMystery() {
      this.$router.push('/SelectMystery');
    },
    goToSelectCrime() {
      this.$router.push('/SelectCrime');
    },
    goToSelectMusic() {
      this.$router.push('/SelectMusic');
    },
    goToSelectAction() {
      this.$router.push('/SelectAction');
    },
    goToSelectHistory() {
      this.$router.push('/SelectHistory');
    },
    goToSelectFamily() {
      this.$router.push('/SelectFamily');
    },
    goToSelectWar() {
      this.$router.push('/SelectWar');
    },
    goToSelectWestern() {
      this.$router.push('/SelectWestern');
    },
    goToSelectAdventure() {
      this.$router.push('/SelectAdventure');
    },
    goToSelectNetflix() {
      this.$router.push('/SelectNetflix');
    },
    goToSelectDisneyplus() {
      this.$router.push('/SelectDisneyplus');
    },
    goToSelectWavve() {
      this.$router.push('/SelectWavve');
    },
    goToSelectTving() {
      this.$router.push('/SelectTving');
    },
    goToSelectWatcha() {
      this.$router.push('/SelectWatcha');
    },
    goToMovieinformationPage(movie) {
      this.$router.push({ name: 'MovieinformationPage', params: { id: movie.id } });
    },
    toggleGenreMenu: function () {
      this.showGenre = !this.showGenre;
      this.showPlatform = false;
      this.showDropdown = false;
    },
    togglePlatformMenu: function () {
      this.showGenre = false;
      this.showPlatform = !this.showPlatform;
      this.showDropdown = false;
    },
    hideMenus: function () {
      this.showGenre = false;
      this.showPlatform = false;
      this.showDropdown = false;
    },
    toggleUserDropdown() {
      this.showUserDropdown = !this.showUserDropdown;
      this.showDropdown = false;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    hideDropdown() {
      this.showDropdown = false;
    },
  },

  mounted() {
  this.fetchMovies();
  }
};
window.addEventListener("load", function() {
    resizePosters();

    window.addEventListener("resize", function() {
      resizePosters();
    });
  });

  function resizePosters() {
    var posters = document.querySelectorAll(".movies .poster");
    var posterWidth = (window.innerWidth * 0.2) - 20;

    posters.forEach(function(poster) {
      poster.style.width = posterWidth + "px";
    });
  }
</script>

<style scoped>
.home-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top:5px
}

.home-icon-title {
  display: flex;
  align-items: center;
  font-size: 25px;
  color: rgb(65, 0, 80);
  margin-right: 10px;
  margin-left:10px;
}

.logo {
  width: 190px;
  margin-left: 15px;
  cursor: pointer;
}
.home-search-box-container {
  display: flex;
  align-items: center;
  position: relative;
}

.home-search-box {
  width: 500px;
  border: 2px solid rgb(65, 0, 80);
  padding: 10px 12px;
  font-size: 13px;
  outline: none;
  border-radius: 20px;
}
.home-search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 0;
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: 2px solid rgb(65, 0, 80);
  cursor: pointer;
  border-radius: 20px;
  margin-right: 4px;
}
.home-search-box-container {
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 20px; 
  background-color: rgba(65, 0, 80, 0.1); 
  padding: 2px;
}
.home-user-icons {
  display: flex;
  align-items: center;
}

.home-user-star {
  color: rgb(65, 0, 80);
  font-size: 25px;
  cursor: pointer;
}

.home-user-icon {
  font-size: 25px;
  margin-left: 10px;
  margin-right: 10px;
  color: rgb(65, 0, 80);
  cursor: pointer;
}
.home-user-dropdown {
  position: absolute;
  top: 45px;
  right: 0;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  padding: 5px;
  font-size: 14px;
  display: none;
  visibility: visible;
  z-index: 1;
}
.home-user-dropdown.active {
  display: flex;
}

.home-user-dropdown-item {
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.home-user-dropdown-item:hover {
  background-color: rgba(65, 0, 80, 0.1);
}


.home-content-container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}
.home-left_list {
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 15px;
  background-color: none;
  height: 85vh;
  width: calc(100vw / 6);
  position: relative;
  border-right: 2px solid rgb(65, 0, 80);
}
.home-select-genre,
.home-select-platform {
  font-weight: bold;
  margin-bottom: 20px;
  cursor: pointer;
}
.home-genre-item,
.home-platform-item {
  padding: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.home-genre-item:hover,
.home-platform-item:hover {
  background-color: rgba(65, 0, 80, 0.2);
}
.home-right-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: none;
}
.home-top-10-and-sort {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.home-top-10 {
  font-size: 20px;
  font-weight: bold;
  color: rgb(65, 0, 80);
  margin-right: 10px;
  margin-bottom: 5px; 
}
.home-dropdown {
  position: relative;
  margin-left: 10px;
  cursor: pointer;
  padding: 4px;
  width: fit-content;
  height: fit-content;
  font-size: 13px;
  background-color: none;
  border-radius: 4px;
  border: 2px solid rgb(65, 0, 80);
  margin-bottom: 5px; 
}

.home-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  font-size: 11px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
  min-width: 120px;
}

.home-dropdown-item {
  padding: 8px;
  cursor: pointer;
}

.home-dropdown-item:hover {
  background-color: #f1f1f1;
}
.home-movies {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}

.home-movies .home-poster {
  flex-basis: calc(20% - 20px);
  max-width: calc(20% - 20px);
}
.home-movieposter {
  width: 50%; 
  height: auto;
  margin-left: 10px;
}
.home-card-title {
  margin-left:55px; 
  margin-top:3px;
  margin-bottom: 10px;
  font-family: "Arial", sans-serif;
  text-align: left;
  font-size: 20px;
  margin-top: 10px;  
  margin-bottom: 10px; 
}
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";

</style>
