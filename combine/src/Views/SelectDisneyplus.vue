<template>
  <div>
    <header>
      <div class="title-with-icon">
        <div class="title">
          <h2 class="custom-h2">DisneyPlus</h2>
        </div>
        <div class="right-icons">
          <font-awesome-icon :icon="['fas', 'home']" @click="goToHomePage" class="user-home" />
        </div>
      </div>
    </header>
    <div class="dropdown">
    <div class="dropdown-button" @click="toggleDropdown">
      정렬순 ▼
    </div>
    <div class="dropdown-menu" v-show="showDropdown">
      <div class="dropdown-item">인기순</div>
      <div class="dropdown-item">최근개봉순</div>
    </div>
  </div>
    <div class="movies">
      <div class="poster">
        <div class="card" style="width: 18rem">
          <img
            src="/images/lalalandposter.jpeg"
            class="movieposter"
            alt="movieposter"
          />
          <div class="card-body">
            <h5 class="card-title">영화명</h5>
          </div>
        </div>
      </div>
      <div class="poster">
        <div class="card" style="width: 18rem">
          <img
            src="/images/lalalandposter.jpeg"
            class="movieposter"
            alt="movieposter"
          />
          <div class="card-body">
            <h5 class="card-title">영화명</h5>
          </div>
        </div>
      </div>
      <div class="poster">
        <div class="card" style="width: 18rem">
          <img
            src="/images/lalalandposter.jpeg"
            class="movieposter"
            alt="movieposter"
          />
          <div class="card-body">
            <h5 class="card-title">영화명</h5>
          </div>
        </div>
      </div>
      <div class="poster">
        <div class="card" style="width: 18rem">
          <img
            src="/images/lalalandposter.jpeg"
            class="movieposter"
            alt="movieposter"
          />
          <div class="card-body">
            <h5 class="card-title">영화명</h5>
          </div>
        </div>
      </div>
      <div class="poster">
        <div class="card" style="width: 18rem">
          <img
            src="/images/lalalandposter.jpeg"
            class="movieposter"
            alt="movieposter"
          />
          <div class="card-body">
            <h5 class="card-title">영화명</h5>
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
  faStar, faHome
} from "@fortawesome/free-solid-svg-icons";

export default {
  name: "MovieHeader",
  components: {
    FontAwesomeIcon,
  },
  created() {
    library.add(faStar, faHome);
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
  },
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
.custom-h2 {
  margin-left: 10px; 
  margin-bottom: 5px;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 32px;
  color: rgb(65, 0, 80);
  line-height: 1;
}

.title-with-icon {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  display: flex;
  align-items: center;
}

.right-icons {
  display: flex;
  align-items: center;
}

.user-home{
  margin-right:20px;
  font-size: 30px;
  color: rgb(65, 0, 80);
}
.dropdown {
  position: relative;
}
.dropdown-button {
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

}.dropdown-menu {
  position: absolute;
  top: 100%;
  margin-left:20px;
  background-color: #fff;
  border: 1px solid #ccc;
  font-size: 11px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
  min-width: 120px;
}

.dropdown-item {
  padding: 8px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}
.movies {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}

.movies .poster {
  flex-basis: calc(20% - 20px);
  max-width: calc(20% - 20px);
}
.movieposter {
  width: 50%; 
  height: auto;
  margin-bottom: -22px;
  margin-left: 10px;
}
.card-title {
  margin-left:60px; 
}
</style>
