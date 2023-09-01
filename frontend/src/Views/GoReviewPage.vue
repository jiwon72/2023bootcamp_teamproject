<template>
  <header>
    <div class="Go-re-top-bar">
      <div class="Go-re-icon-title">
        <font-awesome-icon :icon="['fas', 'bars']" />
        <img @click="goToHomePage"
            src="/images/logo2.1.png"
            class="logo"
            alt="logo"
          />
      </div>
      <div class="Go-re-search-box-centered">
        <div class="Go-re-search-box-container">
          <input class="Go-re-search-box" type="text" placeholder="영화 검색" />
          <button @click="goToMenuPage" class="Go-re-search-button" type="submit">
            <font-awesome-icon :icon="['fas', 'search']"/>
          </button>
        </div>
      </div>
      <div class="Go-re-user-icons">
        <font-awesome-icon :icon="['fas', 'star']" class="Go-re-user-star" @click="goToMinePage"/>
        <font-awesome-icon :icon="['fas', 'user']" class="Go-re-user-icon" @click="toggleUserDropdown"/>
        <div class="Go-re-user-dropdown" :class="{ active: showUserDropdown }">
          <div @click="goToModifyPage" class="Go-re-user-dropdown-item">프로필 관리</div>
          <div @click="goToQnaPage" class="Go-re-user-dropdown-item">고객센터</div>
          <div @click="goToLoginPage" class="Go-re-user-dropdown-item">로그아웃</div>
        </div>
      </div>
    </div>
  </header>
  <div class="Go-re-content-container">
    <div class="Go-re-left_list">
      <div class="Go-re-select-genre" @mouseenter="toggleGenreMenu">장르 선택</div>
      <div class="Go-re-genre-menu" v-show="showGenre" @mouseleave="hideMenus">
        <div @click="goToSelectRomance" class="Go-re-genre-item">로맨스</div>
        <div @click="goToSelectComedy" class="Go-re-genre-item">코미디</div>
        <div @click="goToSelectHorror" class="Go-re-genre-item">공포</div>
        <div @click="goToSelectThriller" class="Go-re-genre-item">스릴러</div>
        <div @click="goToSelectAnimation" class="Go-re-genre-item">애니메이션</div>
        <div @click="goToSelectDrama" class="Go-re-genre-item">드라마</div>
        <div @click="goToSelectFantasy" class="Go-re-genre-item">판타지</div>
        <div @click="goToSelectSF" class="Go-re-genre-item">SF</div>
        <div @click="goToSelectMystery" class="Go-re-genre-item">추리</div>
        <div @click="goToSelectCrime" class="Go-re-genre-item">범죄</div>
        <div @click="goToSelectMusic" class="Go-re-genre-item">음악</div>
        <div @click="goToSelectAction" class="Go-re-genre-item">액션</div>
        <div @click="goToSelectHistory" class="Go-re-genre-item">역사</div>
        <div @click="goToSelectFamily" class="Go-re-genre-item">가족</div>
        <div @click="goToSelectWar" class="Go-re-genre-item">전쟁</div>
        <div @click="goToSelectWestern" class="Go-re-genre-item">서부</div>
        <div @click="goToSelectAdventure" class="Go-re-genre-item">모험</div>
      </div>
      <div class="Go-re-select-platform" @mouseenter="togglePlatformMenu">
        플랫폼 선택
      </div>
      <div class="Go-re-platform-menu" v-show="showPlatform" @mouseleave="hideMenus">
        <div @click="goToSelectNetflix" class="Go-re-platform-item">넷플릭스</div>
        <div @click="goToSelectDisneyplus" class="Go-re-platform-item">디즈니플러스</div>
        <div @click="goToSelectWavve" class="Go-re-platform-item">웨이브</div>
        <div @click="goToSelectTving" class="Go-re-platform-item">티빙</div>
        <div @click="goToSelectWatcha" class="Go-re-platform-item">왓차</div>
      </div>
    </div>
    <div class="Go-re-right-content">
      <div class="Go-re-top-10-and-sort">
        <div class="Go-re-top-10">TOP10</div>
        <div class="Go-re-dropdown" @click="toggleDropdown">
          정렬순 ▼
          <div class="Go-re-dropdown-menu" v-show="showDropdown" @mouseleave="hideDropdown">
            <div class="Go-re-dropdown-item">현재 상영중인 영화</div>
            <div class="Go-re-dropdown-item">OTT 인기영화</div>
          </div>
        </div>
      </div>
      <div class="Go-re-right-content">
    
          <div class="Go-re-dropdown-menu" v-show="showDropdown" @mouseleave="hideDropdown">
            <div class="Go-re-dropdown-item">현재 상영중인 영화</div>
            <div class="Go-re-dropdown-item">OTT 인기영화</div>
          </div>
      

  <div class="Go-re-container">
    <h1 class="Go-re-main">영화 리뷰</h1>
    <h2 class="Go-re-main2"> 제목 : 명탐정코난: 흑철의 어영 </h2>

    
    <div class="Go-re-movie-info">
      <p>감독: 선오쿠 모리</p>
      <p>배우: 민미, 유카리 타락키</p>
      <p>개봉일: 2023-04-14</p>
      <p>장르: 애니메이션, 미스터리</p>
    </div>

    <div class="Go-re-rating-summary">
      <div class="Go-re-left-summary">
        <p>전체 평점: {{ leftaverageRating }}/5</p>
        <p>리뷰 수: {{ reviews.length }}</p>
      </div>

    </div>

    <div class="Go-re-reviews-container">
      <div class="Go-re-left-reviews">
        <ul>
          <li v-for="review in leftReviews" :key="review.id" class="Go-re-review-box">
            <strong class="Go-re-rating">평점: {{ review.rating }}/5</strong>
            <br>
            <span>작성자: {{ review.nickname }}</span>
            <br>
            <span>작성일: {{ review.date }}</span>
            <p>{{ review.text }}</p>
          </li>
        </ul>
      </div>
      <div class="Go-re-right-reviews">
        <ul>
          <li v-for="review in rightReviews" :key="review.id" @click="goToMyReviewPage" class="Go-re-review-box">
            <strong class="Go-re-rating">평점: {{ review.rating }}/5</strong>
            <br>
            <span>작성자: {{ review.nickname }}</span>
            <br>
                <span>작성일: {{ review.date }}</span>
                <p>{{ review.text }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
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
    computed: {
      leftReviews() {
        return this.reviews.slice(0, Math.ceil(this.reviews.length / 2));
      },
      rightReviews() {
        return this.reviews.slice(Math.ceil(this.reviews.length / 2));
      }
    },
  
  data() {
    return {
      showGenre: false,
      showPlatform: false,
      showDropdown: false,
      showUserDropdown: false,
      reviews: [
        { id: 1, rating: 5, nickname: "나는천재", date: "2023-08-14", text: "정말 재미있는 영화였습니다!" },
        { id: 2, rating: 3, nickname: "영화매니아", date: "2023-08-14", text: "괜찮았지만 아쉬운 부분도 있었어요." },
        { id: 3, rating: 4, nickname: "나는바보", date: "2023-08-14" , text: "두 번 봐도 좋은 영화네요!" },
        { id: 3, rating: 4, nickname: "나는바보", date: "2023-08-14" , text: "두 번 봐도 좋은 영화네요!" },
        { id: 3, rating: 4, nickname: "나는바보", date: "2023-08-14" , text: "두 번 봐도 좋은 영화네요!" },
        { id: 2, rating: 3, nickname: "영화매니아", date: "2023-08-14", text: "괜찮았지만 아쉬운 부분도 있었어요." },
        { id: 2, rating: 3, nickname: "영화매니아", date: "2023-08-14", text: "괜찮았지만 아쉬운 부분도 있었어요." },
        { id: 1, rating: 5, nickname: "나는천재", date: "2023-08-14", text: "정말 재미있는 영화였습니다!" },
        { id: 1, rating: 5, nickname: "나는천재", date: "2023-08-14", text: "정말 재미있는 영화였습니다!" },
        { id: 1, rating: 5, nickname: "나는천재", date: "2023-08-14", text: "정말 재미있는 영화였습니다!" },
        { id: 1, rating: 5, nickname: "나는천재", date: "2023-08-14", text: "정말 재미있는 영화였습니다!" },
      ]
    };
  },
  methods: {
    goToHomePage() {
      this.$router.push('/HomePage');
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
    goToMyReviewPage() {
      this.$router.push('/MyReviewPage');
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
    goToMovieinformationPage() {
      this.$router.push('/MovieinformationPage');
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
};
  

</script>

<style scoped>
.Go-re-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top:5px
}

.Go-re-icon-title {
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
.Go-re-search-box-container {
  display: flex;
  align-items: center;
  position: relative;
}

.Go-re-search-box {
  width: 500px;
  border: 2px solid rgb(65, 0, 80);
  padding: 10px 12px;
  font-size: 13px;
  outline: none;
  border-radius: 20px;
}
.Go-re-search-button {
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
.Go-re-search-box-container {
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 20px; 
  background-color: rgba(65, 0, 80, 0.1); 
  padding: 2px;
}
.Go-re-user-icons {
  display: flex;
  align-items: center;
}

.Go-re-user-star {
  color: rgb(65, 0, 80);
  font-size: 25px;
  cursor: pointer;
}

.Go-re-user-icon {
  font-size: 25px;
  margin-left: 10px;
  margin-right: 10px;
  color: rgb(65, 0, 80);
  cursor: pointer;
}
.Go-re-user-dropdown {
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
.Go-re-user-dropdown.active {
  display: flex;
}

.Go-re-user-dropdown-item {
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.Go-re-user-dropdown-item:hover {
  background-color: rgba(65, 0, 80, 0.1);
}


.Go-re-content-container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}
.Go-re-left_list {
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 15px;
  background-color: none;
  width: calc(100vw / 6);
  min-height: 85vh; 
  position: relative;
  border-right: 2px solid rgb(65, 0, 80);
}
.Go-re-select-genre,
.Go-re-select-platform {
  font-weight: bold;
  margin-bottom: 20px;
  cursor: pointer;
}
.Go-re-genre-item,
.Go-re-platform-item {
  padding: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.Go-re-genre-item:hover,
.Go-re-platform-item:hover {
  background-color: rgba(65, 0, 80, 0.2);
}
.Go-re-right-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: none;
}
.Go-re-top-10-and-sort {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.Go-re-top-10 {
  font-size: 20px;
  font-weight: bold;
  color: rgb(65, 0, 80);
  margin-right: 10px;
  margin-bottom: 5px; 
}
.Go-re-dropdown {
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

.Go-re-dropdown-menu {
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

.Go-re-dropdown-item {
  padding: 8px;
  cursor: pointer;
}

.Go-re-dropdown-item:hover {
  background-color: #f1f1f1;
}
.Go-re-container {
    margin: 0 2%; /* 양쪽 여백 설정 */
    flex: 1;
    display: flex;
    height: calc(100vh - 10px);
    flex-direction: column;
    position: relative;
  }

      .Go-re-review-box {
    border: 1px solid #ccc; /* 테두리 */
    padding: 10px;          /* 안쪽 여백 */
    margin: 10px 0;         /* 위아래 여백 */
    border-radius: 5px;     /* 모서리 둥글게 */
    background: #f9f9f9;    /* 배경색 */
    width: 70%;
    font-size: 10px;
  }

      .Go-re-rating{
        font-size: 15px;
  }
      
      .Go-re-main{
        color: rgb(65, 0, 80);
        font-size: 20px;
        font-weight: bold;
  }

      .Go-re-main2{
        color: rgb(65, 0, 80);
        font-size: 12px;
  }

    .Go-re-movie-info {
    padding: 5px;
    background: #f0f0f0;
    margin-bottom: 5px;
    width: 87%;
    font-size: 8px;
    font-weight: bold;
    border-radius: 10px;
  }

  .Go-re-rating-summary {
    display: flex; /* flexbox 레이아웃 적용 */
    padding: 5px;
    background: #f0f0f0;
    margin-bottom: 5px;
    font-weight: bold;
    width: 87%;
    font-size: 5px;
    border-radius: 10px;
    justify-content: space-between;
  }
.Go-re-left-summary, .Go-re-right-summary {
  width: 50%; /* 각 칸의 너비를 50%로 설정 */
}

.Go-re-reviews-container {
  display: flex;
  justify-content: space-between;
}

.Go-re-left-reviews,
.Go-re-right-reviews {
  width: 70%;
}
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";

</style>
