<template>
  <div class="login-container">
    <h2 class="login-custom-h2">
      <img
            src="/images/logo2.2.png"
            class="logo"
            alt="logo"
          />
      Movie Finder</h2>
    <div id="loginForm">
      <form @submit.prevent="login">
        <div class="login-input-container">
          <div class="login-id_field">
            <label class="login-id_label" for="input_id">ID :</label>
            <input class="login-id_input" name="input_id" placeholder="아이디를 입력해주세요" v-model="formData.userID">
          </div>
        </div>
        <div class="login-input-container">
          <div class="login-id_field">
            <label class="login-id_label" for="input_password">Password :</label>
            <input class="login-id_input" name="input_password" placeholder="비밀번호를 입력해주세요" v-model="formData.password" type="password">
          </div>
        </div>
        <div>
          <button @click="goToHomePage" type="submit" class="login-button_loginsubmit">로그인</button>
        </div>
        <div>
          <span @click="goToJoinPage" class="login-button_join">회원가입</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        userID: "",
        password: "",
      },
      error: "",
      message: "",
    };
  },
  methods: {
    goToJoinPage() {
      this.$router.push('/JoinPage');
    },

    login() {
      console.log("formData",this.formData)
      if (this.formData.userID === '') {
        alert('ID를 입력하세요.');
        return;
      }
      if (this.formData.password === '') {
        alert('비밀번호를 입력하세요.');
        return;
      }
      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formData),
        credentials: "include",
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.isLoggedIn) { // 서버에서 받은 응답에 따라 수정
          this.message = "로그인 성공";
          this.error = "";
          this.$router.push('/HomePage'); // 로그인 성공 시에만 페이지 전환
        } else {
          this.error = data.message || "유효하지 않은 사용자 이름 또는 비밀번호";
          this.message = "";
          alert(this.error); // 오류 메시지를 경고창으로 표시
        }
      })
        .catch((error) => {
          console.error("오류:", error);
          this.error = "로그인 중 오류 발생";
          this.message = "";
          alert(this.error); // 오류 메시지를 경고창으로 표시
        });
      },
    // 로그아웃 메서드
    logout() {
      // 로그아웃 API 엔드포인트에 POST 요청을 보냄
      fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 요청에 쿠키를 포함시킴
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Logout successful") {
            // 로그아웃 성공 시 처리 (예: 로그인 페이지로 리다이렉트)
            this.message = "로그아웃 성공";
            this.error = "";
            this.isLoggedIn = false; // 로그아웃 성공 시 isLoggedIn을 false로 설정
          } else {
            this.error = "로그아웃 실패";
            this.message = "";
            this.isLoggedIn = true; // 로그아웃 실패 시 isLoggedIn을 true로 설정
          }
        })
        .catch((error) => {
          console.error("오류:", error);
          this.error = "로그아웃 중 오류 발생";
          this.message = "";
          this.isLoggedIn = true; // 로그아웃 실패 시 isLoggedIn을 true로 설정
        });
    },
  },
};
</script>

<style scoped>
html, body, .login-container {
  margin: 0;
  padding: 0;
  overflow: hidden; /* 스크롤 비활성화 */
}
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin-top: 100px;
}

.login-custom-h2 {
  text-align: center;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 32px;
  color: rgb(65, 0, 80);
  margin-bottom: 20px; 
  margin-top:70px;
}
.logo{
  width: 60px;
}
.login-input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

.login-id_field {
  display: flex;
  align-items: center;
  width: 400px; 
}

.login-id_label {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 15px;
  color: rgb(65, 0, 80);
  width: 100px;
  margin-right: 10px;
}

.login-id_input {
  flex: 1;
  padding: 10px;
  border: 2px solid rgb(65, 0, 80);
  border-radius: 5px;
  box-sizing: border-box;
}

.login-button_loginsubmit {
  width: 400px;
  padding: 12px;
  font-size: 16px;
  color: white;
  background-color: rgb(65, 0, 80);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.login-button_join {
  padding: 7px;
  font-size: 12px;
  font-weight: bold;
  color: rgb(65, 0, 80);
  background-color: transparent;
  border: 2px solid rgb(65, 0, 80);
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  margin-left: 337px;
  text-decoration: none;
}

.login-button_join:hover {
  background-color: rgb(95, 30, 110);
  color:white;
}

@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";
</style>
