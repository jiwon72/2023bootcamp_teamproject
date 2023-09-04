<template>
  <div>
    <header>
      <div class="mine-title-with-icon">
        <div class="mine-left-icons">
          <font-awesome-icon :icon="['fas', 'star']" class="mine-user-star" />
          <h2 class="mine-custom-h2">내 보관함</h2>
        </div>
        <div class="mine-right-icons">
          <font-awesome-icon
            icon="home"
            class="mine-user-mine"
            @click="goToHomePage"
          />
        </div>
      </div>
    </header>
    <div class="mine-dropdown">
      <div class="mine-dropdown-button" @click="toggleDropdown">
        {{ this.sortOrderText }}▼
      </div>
      <div class="mine-dropdown-menu" v-show="showDropdown">
        <div class="mine-dropdown-item" @click="setSortOrder('recent')">
          최근 찜한순
        </div>
        <div class="mine-dropdown-item" @click="setSortOrder('alphabet')">
          ㄱㄴㄷ순
        </div>
        <div class="mine-dropdown-item" @click="setSortOrder('year')">
          개봉년도순
        </div>
      </div>
    </div>
    <div class="mine-movies">
      <div v-if="isLoading">로딩 중...</div>
      <!-- 로딩 상태를 표시 -->
      <div
        v-else
        v-for="movie in sortedFavoriteMovies"
        :key="movie.id"
        class="mine-poster"
      >
        <div class="mine-card" style="width: 18rem">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            class="mine-movieposter"
            alt="movieposter"
            @click="goToMoviePage(movie.id)"
          />
          <h5 class="mine-card-title" @click="goToMoviePage(movie.id)">
            {{ movie.title }}
          </h5>
          <div class="mine-card-body">
            <button
              @click="removeFromFavorites(movie.id)"
              class="mine-remove-button"
            >
              보관함 삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faHome } from "@fortawesome/free-solid-svg-icons";

export default {
  name: "MovieHeader",
  components: {
    FontAwesomeIcon,
  },
  created() {
    library.add(faStar, faHome);
    this.loadFavoriteMovies();
  },
  data() {
    return {
      favoriteMovies: [],
      showDropdown: false,
      isLoading: true,
      sortOrder: "recent", // 추가: 정렬 순서
      sortOrderText: "최근 찜한순",
    };
  },
  computed: {
    sortedFavoriteMovies() {
      let result = this.favoriteMovies;
      // 추가: computed 속성
      if (this.sortOrder === "recent") {
        result = [...this.favoriteMovies].reverse();
      }
      if (this.sortOrder === "alphabet") {
        result = [...this.favoriteMovies].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      }
      if (this.sortOrder === "year") {
        result = [...this.favoriteMovies].sort((a, b) =>
          a.release_date.localeCompare(b.release_date)
        );
      }
      return result;
    },
  },
  methods: {
    setSortOrder(order) {
      this.sortOrder = order;
      if (order === "recent") {
        this.sortOrderText = "최근 찜한순";
      } else if (order === "alphabet") {
        this.sortOrderText = "ㄱㄴㄷ순";
      } else if (order === "year") {
        this.sortOrderText = "개봉년도순";
      }
      this.showDropdown = false; // 드롭다운 닫기
    },
    goToMoviePage(movieId) {
      this.$router.push({
        name: "MovieinformationPage",
        params: { id: movieId },
      });
    },
    goToHomePage() {
      this.$router.push("/HomePage");
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    async loadFavoriteMovies() {
      this.isLoading = true;
      // 보관함 목록을 가져오는 API 요청 함수 호출
      await fetch("http://localhost:3000/users/favorites", {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          this.favoriteMovies = data.favorites || [];
        })
        .catch((error) => {
          console.error("보관함 목록 불러오기 오류:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    addToFavorites(movieId) {
      // 보관함 추가 API 요청 함수 호출
      fetch("http://localhost:3000/users/addfavorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.favorites) {
            this.favoriteMovies = data.favorites;
            alert(data.message || "보관함에 추가되었습니다.");
          } else {
            alert(data.message || "보관함 추가에 실패하였습니다.");
          }
        })
        .catch((error) => {
          console.error("보관함 추가 오류:", error);
          alert("보관함 추가 중 오류가 발생했습니다.");
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    async removeFromFavorites(movieId) {
      this.isLoading = true;
      // 보관함 삭제 API 요청 함수 호출
      fetch("http://localhost:3000/users/removefavorites", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          if (data.favorites) {
            await this.loadFavoriteMovies();
            console.log("after del",this.favoriteMovies);
            alert(data.message || "보관함에서 삭제되었습니다.");
          } else {
            alert(data.message || "보관함 삭제에 실패하였습니다.");
          }
        })
        .catch((error) => {
          console.error("보관함 삭제 오류:", error);
          alert("보관함 삭제 중 오류가 발생했습니다.");
        })
        .finally(()=>{
          this.isLoading = false
        }
        );
    },
  },
};
window.addEventListener("load", function () {
  resizePosters();

  window.addEventListener("resize", function () {
    resizePosters();
  });
});
function resizePosters() {
  var posters = document.querySelectorAll(".movies .poster");
  var posterWidth = window.innerWidth * 0.2 - 20;

  posters.forEach(function (poster) {
    poster.style.width = posterWidth + "px";
  });
}
</script>

<style scoped>
.mine-custom-h2 {
  margin-left: 10px;
  margin-bottom: 5px;
  margin-top: 20px;
  font-family: "Arial", sans-serif;
  font-weight: bold;
  font-size: 32px;
  color: rgb(65, 0, 80);
  line-height: 1;
}

.mine-title-with-icon {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mine-left-icons {
  display: flex;
  align-items: center;
}

.mine-right-icons {
  display: flex;
  align-items: center;
}

.mine-user-star {
  font-size: 30px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 13px;
  color: rgb(65, 0, 80);
}
.mine-user-mine {
  margin-right: 20px;
  font-size: 30px;
  color: rgb(65, 0, 80);
}
.mine-dropdown {
  position: relative;
}
.mine-dropdown-button {
  position: relative;
  margin: 20px;
  cursor: pointer;
  padding: 4px;
  width: fit-content;
  height: fit-content;
  font-size: 13px;
  background-color: none;
  border-radius: 4px;
  border: 2px solid rgb(65, 0, 80);
  margin-bottom: 5px;
  margin-left: 60px;
}
.mine-dropdown-menu {
  position: absolute;
  top: 100%;
  margin-left: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  font-size: 11px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
  min-width: 120px;
}

.mine-dropdown-item {
  padding: 8px;
  cursor: pointer;
}

.mine-dropdown-item:hover {
  background-color: #f1f1f1;
}
.mine-remove-button {
  padding: 5px 10px;
  font-size: 12px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 10px;
}

.mine-remove-button:hover {
  background-color: #c82333;
}
.mine-movies {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 50px;
}

.mine-movies .mine-poster {
  flex-basis: calc(20% - 20px);
  max-width: calc(20% - 20px);
}
.mine-movieposter {
  width: 50%;
  height: auto;
  margin-left: 10px;
}
.mine-card-title {
  margin-left: 55px;
  margin-top: 3px;
  margin-bottom: 10px;
}
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";
</style>
