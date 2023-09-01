<template>
  <header>
    <div class="info-top-bar">
      <div class="info-icons">
        <font-awesome-icon :icon="['fas', 'bars']" />
        <img @click="goToHomePage"
            src="/images/logo2.1.png"
            class="logo"
            alt="logo"
          />
      </div>
      <div class="info-search-box-centered">
        <div class="info-search-box-container">
          <input class="info-search-box" type="text" placeholder="영화 검색"/>
          <button class="info-search-button" type="submit" @click="handleSearch">
            <font-awesome-icon :icon="['fas', 'search']" />
          </button>
        </div>
      </div>
      <div class="info-user-icons" @click="toggleUserDropdown">
        <font-awesome-icon :icon="['fas', 'star']" class="info-user-star" @click="goToMinePage"/>
        <font-awesome-icon :icon="['fas', 'user']" class="info-user-icon" @click="toggleUserDropdown"/>
        <div class="info-user-dropdown" :class="{ active: showUserDropdown }">
          <div @click="goToModifyPage" class="info-user-dropdown-item">프로필 관리</div>
          <div @click="goToQnaPage" class="info-user-dropdown-item">고객센터</div>
          <div @click="goToLoginPage" class="info-user-dropdown-item">로그아웃</div>
        </div>
      </div>
    </div>
  </header>
<div class="info-container">
  <div class="info-left_list">
    <div class="info-select-genre" @mouseenter="toggleGenreMenu">장르 선택</div>
    <div class="info-genre-menu" v-show="showGenre" @mouseleave="hideMenus">
      <div @click="goToSelectRomance" class="info-genre-item">로맨스</div>
      <div @click="goToSelectComedy" class="info-genre-item">코미디</div>
      <div @click="goToSelectHorror" class="info-genre-item">공포</div>
      <div @click="goToSelectThriller" class="info-genre-item">스릴러</div>
      <div @click="goToSelectAnimation" class="info-genre-item">애니메이션</div>
      <div @click="goToSelectDrama" class="info-genre-item">드라마</div>
      <div @click="goToSelectFantasy" class="info-genre-item">판타지</div>
      <div @click="goToSelectSF" class="info-genre-item">SF</div>
      <div @click="goToSelectMystery" class="info-genre-item">추리</div>
      <div @click="goToSelectCrime" class="info-genre-item">범죄</div>
      <div @click="goToSelectMusic" class="info-genre-item">음악</div>
      <div @click="goToSelectAction" class="info-genre-item">액션</div>
      <div @click="goToSelectHistory" class="info-genre-item">역사</div>
      <div @click="goToSelectFamily" class="info-genre-item">가족</div>
      <div @click="goToSelectWar" class="info-genre-item">전쟁</div>
      <div @click="goToSelectWestern" class="info-genre-item">서부</div>
      <div @click="goToSelectAdventure" class="info-genre-item">모험</div>
    </div>
    <div class="info-select-platform" @mouseenter="togglePlatformMenu">플랫폼 선택</div>
    <div class="info-platform-menu" v-show="showPlatform" @mouseleave="hideMenus">
      <div @click="goToSelectNetflix" class="info-platform-item">넷플릭스</div>
      <div @click="goToSelectDisneyplus" class="info-platform-item">디즈니플러스</div>
      <div @click="goToSelectWavve" class="info-platform-item">웨이브</div>
      <div @click="goToSelectAppleTV" class="info-platform-item">AppleTV</div>
      <div @click="goToSelectWatcha" class="info-platform-item">왓차</div>
    </div>
  </div>

<div class="info-movie-info">
  <div class="info-ott-header">
    <h2 class="info-ott-title-left">영화 정보</h2>
    <h2 class="info-ott-title-right">시청가능한 ott</h2>
  </div>
  <div class="info-movie-list">
<div class="info-movie-item">
  <div class="info-movie-poster">
    <img src="영화포스터이미지파일경로.jpg" alt="영화 포스터">
  </div>
  <div class="info-movie-details">
    <div class="info-movie-detail-line">
      <ul><h3 class="info-movie-title">곡성</h3></ul>
    </div>
    <table class="info-movie-details">
      <tr class="info-movie-detail-line">
        <td><h4>감독</h4></td>
        <td><span>나홍진</span></td>
        <td><h4>언어</h4></td>
        <td><span>한국어</span></td>
        <td><h4>배급</h4></td>
        <td><span>ABC 영화사</span></td>
      </tr>

      <tr class="info-movie-detail-line">
        <td><h4>제작 연도</h4></td>
        <td><span>2015년</span></td>
        <td><h4>장르</h4></td>
        <td><span>공포, 스릴러</span></td>
        <td><h4>등급</h4></td>
        <td><span>15세 이상 관람 가능</span></td>
      </tr>
  <!-- 여기에 추가 행을 계속 넣을 수 있습니다. -->
</table>
<br>
<br>
        <div class="info-movie-summary">
          <h4>줄거리</h4>
          <p>낯선 외지인이 나타난 후 벌어지는 의문의 연쇄 사건들로 마을이 발칵 뒤집힌다. 경찰은 집단 야생 버섯 중독으로 잠정적 결론을 내리지만 모든 사건의 원인이 그 외지인 때문이라는 소문과 의심이 걷잡을 수 없이 퍼져 나간다. 경찰 ‘종구’(곽도원)는 현장을 목격했다는 여인 ‘무명’(천우희)을 만나면서 외지인에 대한 소문을 확신하기 시작한다. 딸 ‘효진’이 피해자들과 비슷한 증상으로 아파오기 시작하자 다급해진 ‘종구’. 외지인을 찾아 난동을 부리고, 무속인 ‘일광’(황정민)을 불러 들이는데... </p>
        </div>
        <div class="info-movie-reviews">
          <br>
          <h4>리뷰 및 평점</h4>
          <button @click="goToGoReviewPage" class="goreview"> 더 많은 리뷰 보기</button>
          <ul>
            <li>
              <span>Juni0****</span>
              <span>평점: 9/10</span>
              <p> 인상 깊은 연기에 몰입감 있는 스토리와 한번쯤 생각해 볼만한 내용</p>
            </li>
            <br>
            <li>
              <span>HIhi2****</span>
              <span>평점: 8/10</span>
              <p>극장에서 보는데 마지막10분은 아 진짜 살벌했음. 나도 모르게 아 소리나옴 여지껏 본 공      포영화 중에서 걸작이라 봅니다</p>
            </li>
          </ul>
        </div>
      </div>
      <p class="netflix">넷플릭스</p>
    </div>
  </div>
    <div class="info-write-review">
      <button @click="goToReviewPage" id="write-review-btn" class="info-write-review-button">리뷰 쓰기</button>
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
    goToMinePage() {
      this.$router.push("/MinePage");
    },
    goToModifyPage() {
      this.$router.push("/ModifyPage");
    },
    goToLoginPage() {
      this.$router.push("/LoginPage");
    },
    goToQnaPage() {
      this.$router.push("/QnaPage");
    },
    goToReviewPage() {
      this.$router.push("/ReviewPage");
    },
    goToGoReviewPage() {
      this.$router.push("/GoReviewPage");
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
    goToSelectAppleTV() {
      this.$router.push('/SelectAppleTV');
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
}
</script>


<style scoped>
.info-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top:5px
}

.info-icons {
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

.info-search-box-container {
  display: flex;
  align-items: center;
  position: relative;
}

.info-search-box {
  width: 500px;
  border: 2px solid rgb(65, 0, 80);
  padding: 10px 12px;
  font-size: 13px;
  outline: none;
  border-radius: 20px;
}

.info-search-button {
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

.info-search-box-container {
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 20px; 
  background-color: rgba(65, 0, 80, 0.1); 
  padding: 2px; 
}

.info-user-icons {
  display: flex;
  align-items: center;
}

.info-user-star {
  color: rgb(65, 0, 80);
  font-size: 25px;
  cursor: pointer;
}

.info-user-icon {
  font-size: 25px;
  margin-left: 10px;
  margin-right: 10px;
  color: rgb(65, 0, 80);
  cursor: pointer;
}

.info-user-dropdown {
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

.info-user-dropdown.active {
  display: flex;
}

.info-user-dropdown-item {
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.info-user-dropdown-item:hover {
  background-color: rgba(65, 0, 80, 0.1);
}

.info-left_list {
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding: 15px;
  background-color: white; 
  width: calc(100vw / 6); 
  min-height: 85vh; 
  overflow-y: auto;
  position: relative; 
  border-right: 2px solid rgb(65, 0, 80);
  flex: 1;
}

.info-select-genre,
.info-select-platform {
  font-weight: bold;
  margin-bottom: 20px;
}

.info-genre-item,
.info-platform-item {
    padding: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .info-genre-item:hover,
  .info-platform-item:hover {
    background-color: rgba(65, 0, 80, 0.2);
  }

.info-movie-info {
  flex: 5;
  padding: 20px;
  background-color: #f9f9f9;
}

.info-movie-list {
  display: flex;
  flex-direction: column;
}

.info-movie-item {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.info-movie-item h3 {
  margin: 0;
  font-size: 24px;
  color: rgb(65, 0, 80);
}

.info-movie-item p {
  margin: 0;
  font-size: 14px;
  color: #888888;
}

.info-container {
  display: flex;
  justify-content: space-between;
}

.info-ott-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  background: rgb(65, 0, 80);
  border-radius: 10px;
}

.info-ott-header h2 {
  font-size: 18px;
  color:white;
  background: rgb(65, 0, 80);
}

.info-ott-title-left {
  margin-right: auto;
}

.info-ott-title-right {
  margin-left: auto;
}

@media screen and (max-width: 768px) {
  .info-container {
    flex-direction: column;
  }

  .info-left_list,
  .info-movie-info {
    flex: 1;
  }
}

.info-movie-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  position: relative; /* Add this line */
}

.netflix {
  font-size: 14px; 
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;

}

.info-movie-poster {
  width: 120px; 
  height: 160px; 
  background-color: #f0f0f0; 
  margin-right: 20px; 
}

.info-movie-poster img {
  width: 100%;
  height: 100%;
}

.info-movie-details {
  width: 90%;
  table-layout: fixed;
  font-family: Arial, sans-serif;
}

.info-movie-detail-line h4,
.info-movie-detail-line span {
  margin: 0;
  padding: 5px;
}
.info-movie-title{
  right:30px;
  position: relative;
}
.info-movie-details td {
  border: 1px solid #ddd;
  text-align: left;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 부분 숨김 처리 */
  text-overflow: ellipsis; 
}

.info-movie-details tr:nth-child(even) {
  background-color: #f2f2f2;
}

.info-movie-details h4 {
  font-size: 18px; /* 원하는 크기로 조정 */
}
.goreview{
  font-size: 10px;
  align-content: right ;
}


.info-movie-details span {
  font-size: 14px; /* 원하는 크기로 조정 */
}

.info-write-review-button {
  background-color: rgb(65, 0, 80);
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.info-ott-title-left{
  width: 200px; /* 박스의 너비를 설정합니다. */
  height: 35px; /* 박스의 높이를 설정합니다. */
  padding: 10px; /* 내부 패딩을 설정합니다. */
  margin: 5px; /* 외부 마진을 설정합니다. */
  border-radius: 10px;
}

.info-ott-title-right{
  width: 140px; /* 박스의 너비를 설정합니다. */
  height: 35px; /* 박스의 높이를 설정합니다. */
  padding: 10px; /* 내부 패딩을 설정합니다. */
  margin: 5px; /* 외부 마진을 설정합니다. */
  position: relative;
}

.netplix {
  font-size: 14px; /* Adjust font size as needed */
  position: absolute;
  bottom: 0;
  right: 0;
}


@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";
</style>