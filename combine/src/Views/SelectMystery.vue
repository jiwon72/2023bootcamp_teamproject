<template>
  <div>
    <header>
      <div class="sel-title-with-icon">
        <div class="sel-title">
          <h2 class="sel-custom-h2">추리</h2>
        </div>
        <div class="sel-right-icons">
          <font-awesome-icon
            icon="home"
            class="sel-user-sel"
            @click="goToHomePage"
          />
        </div>
      </div>
    </header>
    <div class="sel-dropdown">
    <div class="sel-dropdown-button" @click="toggleDropdown">
      정렬순 ▼
    </div>
    <div class="sel-dropdown-menu" v-show="showDropdown">
      <div class="sel-dropdown-item">인기순</div>
      <div class="sel-dropdown-item">최근개봉순</div>
    </div>
  </div>
    <div class="sel-movies">
      <div class="sel-poster">
        <div @click="goToMovieinformationPage" class="sel-card" style="width: 18rem">
          <img
            src="/images/lalalandposter.jpeg"
            class="sel-movieposter"
            alt="movieposter"
          />
          <div class="sel-card-body">
            <h5 class="sel-card-title">영화명</h5>
          </div>
        </div>
      </div>
      <div class="sel-poster">
        <div @click="goToMovieinformationPage" class="sel-card" style="width: 18rem">
          <img
            src="/images/lalalandposter.jpeg"
            class="sel-movieposter"
            alt="movieposter"
          />
          <div class="sel-card-body">
            <h5 class="sel-card-title">영화명</h5>
          </div>
        </div>
      </div>
      <div class="sel-poster">
        <div @click="goToMovieinformationPage" class="sel-card" style="width: 18rem">
          <img
            src="/images/lalalandposter.jpeg"
            class="sel-movieposter"
            alt="movieposter"
          />
          <div class="sel-card-body">
            <h5 class="sel-card-title">영화명</h5>
          </div>
        </div>
      </div>
      <div class="sel-poster">
        <div @click="goToMovieinformationPage" class="sel-card" style="width: 18rem">
          <img
            src="/images/lalalandposter.jpeg"
            class="sel-movieposter"
            alt="movieposter"
          />
          <div class="sel-card-body">
            <h5 class="sel-card-title">영화명</h5>
          </div>
        </div>
      </div>
      <div class="sel-poster">
        <div @click="goToMovieinformationPage" class="sel-card" style="width: 18rem">
          <img
            src="/images/lalalandposter.jpeg"
            class="sel-movieposter"
            alt="movieposter"
          />
          <div class="sel-card-body">
            <h5 class="sel-card-title">영화명</h5>
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
    goToHomePage() {
      this.$router.push('/HomePage');
    },
    goToMovieinformationPage() {
      this.$router.push('/MovieinformationPage');
    },
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
.sel-custom-h2 {
  margin-left: 30px; 
  margin-bottom: 5px;
  margin-top:20px;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 32px;
  color: rgb(65, 0, 80);
  line-height: 1;
}

.sel-title-with-icon {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sel-title {
  display: flex;
  align-items: center;
}

.sel-right-icons {
  display: flex;
  align-items: center;
}

.sel-user-sel{
  margin-right:20px;
  font-size: 30px;
  color: rgb(65, 0, 80);
}
.sel-dropdown {
  position: relative;
}
.sel-dropdown-button {
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
  margin-left: 45px;

}.sel-dropdown-menu {
  position: absolute;
  top: 100%;
  margin-left:45px;
  background-color: #fff;
  border: 1px solid #ccc;
  font-size: 11px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
  min-width: 120px;
}

.sel-dropdown-item {
  padding: 8px;
  cursor: pointer;
}

.sel-dropdown-item:hover {
  background-color: #f1f1f1;
}
.sel-movies {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  margin-left:20px;
}

.sel-movies .sel-poster {
  flex-basis: calc(20% - 20px);
  max-width: calc(20% - 20px);
}
.sel-movieposter {
  width: 50%; 
  height: auto;
  margin-left: 10px;
}
.sel-card-title {
  margin-left:55px; 
  margin-top:3px;
  margin-bottom: 10px;
}
</style>
