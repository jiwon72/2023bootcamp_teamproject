<template>
  <header>
    <div class="menu-top-bar">
      <div class="menu-icons">
        <font-awesome-icon :icon="['fas', 'bars']" />
        <img @click="goToHomePage"
            src="/images/logo2.1.png"
            class="logo"
            alt="logo"
          />
      </div>
      <div class="menu-search-box-centered">
        <div class="menu-search-box-container">
          <input class="menu-search-box" type="text" placeholder="영화 검색"/>
          <button class="menu-search-button" type="submit" @click="handleSearch">
            <font-awesome-icon :icon="['fas', 'search']" />
          </button>
        </div>
      </div>
      <div class="menu-user-icons">
        <font-awesome-icon :icon="['fas', 'star']" class="menu-user-star" @click="goToMinePage"/>
        <font-awesome-icon :icon="['fas', 'user']" class="menu-user-icon" @click="toggleUserDropdown"/>
        <div class="menu-user-dropdown" :class="{ active: showUserDropdown }">
          <div @click="goToModifyPage" class="menu-user-dropdown-item">프로필 관리</div>
          <div @click="goToQnaPage" class="menu-user-dropdown-item">고객센터</div>
          <div @click="goToLoginPage" class="menu-user-dropdown-item">로그아웃</div>
        </div>
      </div>
    </div>
  </header>
<div class="menu-container">
  <div class="menu-left_list">
    <div class="menu-select-genre" @mouseenter="toggleGenreMenu">장르 선택</div>
    <div class="menu-genre-menu" v-show="showGenre" @mouseleave="hideMenus">
      <div @click="goToSelectRomance" class="menu-genre-item">로맨스</div>
      <div @click="goToSelectComedy" class="menu-genre-item">코미디</div>
      <div @click="goToSelectHorror" class="menu-genre-item">공포</div>
      <div @click="goToSelectAnimation" class="menu-genre-item">애니메이션</div>
      <div @click="goToSelectDrama" class="menu-genre-item">드라마</div>
      <div @click="goToSelectFantasy" class="menu-genre-item">판타지</div>
      <div @click="goToSelectSF" class="menu-genre-item">SF</div>
      <div @click="goToSelectMystery" class="menu-genre-item">추리</div>
      <div @click="goToSelectCrime" class="menu-genre-item">범죄</div>
      <div @click="goToSelectGrow" class="menu-genre-item">성장</div>
      <div @click="goToSelectAction" class="menu-genre-item">액션</div>
      <div @click="goToSelectEtc" class="menu-genre-item">기타</div>
    </div>
    <div class="menu-select-platform" @mouseenter="togglePlatformMenu">플랫폼 선택</div>
    <div class="menu-platform-menu" v-show="showPlatform" @mouseleave="hideMenus">
      <div @click="goToSelectNetflix" class="menu-platform-item">넷플릭스</div>
      <div @click="goToSelectDisneyplus" class="menu-platform-item">디즈니플러스</div>
      <div @click="goToSelectWavve" class="menu-platform-item">웨이브</div>
      <div @click="goToSelectTving" class="menu-platform-item">티빙</div>
      <div @click="goToSelectWatcha" class="menu-platform-item">왓차</div>
    </div>
  </div>

<div class="menu-movie-info">
  <div class="menu-ott-header">
    <h2 class="menu-ott-title-left">영화 정보</h2>
    <h2 class="menu-ott-title-right">시청가능한 ott</h2>
  </div>
  <div class="menu-movie-list">
    <div @click="goToMovieinformationPage" class="menu-movie-item">
      <div class="menu-movie-poster">
        <img src="영화포스터이미지파일경로.jpg" alt="영화 포스터">
      </div>
      <div class="menu-movie-details">
        <h3>곡성</h3>
        <div>감독: 나홍진</div>
        <div>제작 연도: 2015년</div>
        <div>러닝타임: 156분</div>
      </div>
      <p>넷플릭스</p>
    </div>
    <div class="menu-movie-item">

      <div class="menu-movie-poster">
        <img src="영화포스터이미지파일경로.jpg" alt="영화 포스터">
      </div>
      <div class="menu-movie-details">
        <h3>여곡성</h3>
        <div>감독: 이혁수</div>
        <div>제작 연도: 1986년</div>
        <div>러닝타임: 95분</div>
      </div>
      <p>웨이브</p>
    </div>
  </div>
</div>

</div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faStar, faUser, faSearch } from "@fortawesome/free-solid-svg-icons";

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
    };
  },
  methods: {
    goToHomePage() {
      this.$router.push("/HomePage");
    },
    goToMovieinformationPage() {
      this.$router.push("/MovieinformationPage");
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
    goToSelectAnimation() {
      this.$router.push('/SelectAnimation');
    },
    goToSelectDrama() {
      this.$router.push('/SelectPDrama');
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
    goToSelectGrow() {
      this.$router.push('/SelectGrow');
    },
    goToSelectAction() {
      this.$router.push('/SelectAction');
    },
    goToSelectEtc() {
      this.$router.push('/SelectEtc');
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
    toggleGenreMenu: function () {
      this.showGenre = !this.showGenre;
      this.showPlatform = false;
    },
    togglePlatformMenu: function () {
      this.showGenre = false;
      this.showPlatform = !this.showPlatform;
    },
    hideMenus: function () {
      this.showGenre = false;
      this.showPlatform = false;
    },
    toggleUserDropdown() {
      this.showUserDropdown = !this.showUserDropdown;
    },
  },
};
</script>


<style scoped>
.menu-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top:5px
}

.menu-icons {
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
.menu-search-box-container {
  display: flex;
  align-items: center;
  position: relative;
}

.menu-search-box {
  width: 500px;
  border: 2px solid rgb(65, 0, 80);
  padding: 10px 12px;
  font-size: 13px;
  outline: none;
  border-radius: 20px;
}
.menu-search-button {
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
.menu-search-box-container {
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 20px; 
  background-color: rgba(65, 0, 80, 0.1);
  padding: 2px; 
}

.menu-user-icons {
  display: flex;
  align-items: center;
}

.menu-user-star {
  color: rgb(65, 0, 80);
  font-size: 25px;
}

.menu-user-icon {
  font-size: 25px;
  margin-left: 10px;
  margin-right: 10px;
  color: rgb(65, 0, 80);
}
.menu-user-dropdown {
  position: absolute;
  top: 45px;
  right: 0;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  padding: 5px;
  display: none;
  visibility: visible;
  z-index: 1;
}
.menu-user-dropdown.active {
  display: flex;
}

.menu-user-dropdown-item {
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.menu-user-dropdown-item:hover {
  background-color: rgba(65, 0, 80, 0.1);
}
.menu-left_list {
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 15px;
  background-color: white; 
  width: calc(100vw / 6); 
  overflow-y: auto;
  height: 100vh; 
  position: relative; 
  border-right: 2px solid rgb(65, 0, 80);
  flex: 1;
}
.menu-select-genre,
.menu-select-platform {
  font-weight: bold;
  margin-bottom: 20px;
}
.menu-genre-item,
.menu-platform-item {
    padding: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.menu-genre-item:hover,
.menu-platform-item:hover {
    background-color: rgba(65, 0, 80, 0.2);
}

.menu-movie-info {
  flex: 5;
  padding: 15px;
  background-color: #f9f9f9;
}

.menu-movie-list {
  display: flex;
  flex-direction: column;
}

.menu-movie-item {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.menu-movie-item h3 {
  margin: 0;
  font-size: 24px;
  color: rgb(65, 0, 80);
}

.menu-movie-item p {
  margin: 0;
  font-size: 14px;
  color: #888888;
}

.menu-container {
  display: flex;
  justify-content: space-between;
}

.menu-ott-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  background: rgb(65, 0, 80);
  border-radius: 10px;
}

.menu-ott-header h2 {
  font-size: 18px;
  color:white;
  background: rgb(65, 0, 80);
}

.menu-ott-title-left{
  width: 200px; /* 박스의 너비를 설정합니다. */
  height: 35px; /* 박스의 높이를 설정합니다. */
  padding: 10px; /* 내부 패딩을 설정합니다. */
  margin: 5px; /* 외부 마진을 설정합니다. */
  border-radius: 10px;
}

.menu-ott-title-right{
  width: 140px; /* 박스의 너비를 설정합니다. */
  height: 35px; /* 박스의 높이를 설정합니다. */
  padding: 10px; /* 내부 패딩을 설정합니다. */
  margin: 5px; /* 외부 마진을 설정합니다. */
  position: relative;
}

.menu-ott-title-left {
  margin-right: auto;
}

.menu-ott-title-right {
  margin-left: auto;
}

@media screen and (max-width: 768px) {
  .menu-container {
    flex-direction: column;
  }

  .menu-left_list,
  .menu-movie-info {
    flex: 1;
  }
}

.menu-movie-item {
  display: flex; 
  align-items: center; 
}

.menu-movie-details {
  flex: 1; 
}

.menu-movie-poster {
  width: 80px; 
  height: 100px; 
  background-color: #f0f0f0; 
  margin-right: 20px; 
}

.menu-movie-poster img {
  width: 100%;
  height: 100%;
}

@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";
</style>