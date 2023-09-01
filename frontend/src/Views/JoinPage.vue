<template>
  <div>
    <header>
    <h2 class="join-custom-h2">
      <img
            src="/images/logo2.2.png"
            class="logo"
            alt="logo"
          />
      Movie Finder</h2>
    </header>
    <div class="join-container">
      <form @submit.prevent="submitForm">
        <div class="join-input-container">
          <div class="join-field">
            <input type="checkbox" v-model="agreed" @change="toggleAgreed">
            <span class="join-agree-message">개인정보 수집에 동의하십니까?</span>
          </div>
        </div>
        <p class="join-required-message">
          필수 입력 사항입니다.
        </p>
        <div class="join-input-container">
          <div class="join-field">
            <label class="join-label" for="input_name">이름 :</label>
            <input class="join-input" name="input_name" placeholder="이름을 입력해주세요" v-model="username">
          </div>
        </div>
        <div class="join-input-container">
          <div class="join-field">
            <label class="join-label" for="input_birthday">생년월일 :</label>
            <input class="join-input" name="input_birthday" placeholder="0000년/00월/00일 순서로 숫자만 입력하세요" v-model="user_birthday">
          </div>
        </div>
        <div class="join-input-container">
          <div class="join-field">
            <label class="join-label" for="input_nickname">닉네임 :</label>
            <input class="join-input" name="input_nickname" placeholder="닉네임을 입력해주세요" v-model="user_nickname">
            <button class="join-duplicate-check-button" @click="checkDuplicateNickname">중복확인</button>
          </div>
        </div>
        <div class="join-input-container">
          <div class="join-field">
            <label class="join-label" for="input_id">ID :</label>
            <input class="join-input" name="input_id" placeholder="아이디를 입력해주세요" v-model="user_id">
            <button class="join-duplicate-check-button">중복확인</button>
          </div>
        </div>
        <div class="join-input-container">
          <div class="join-field">
            <label class="join-label" for="input_password">Password :</label>
            <input class="join-input" name="input_password" placeholder="비밀번호를 입력해주세요" v-model="user_pw" type="password">
          </div>
        </div>
        <p class="join-password-hint">
              비밀번호는 특수문자 포함 8글자 이어야 합니다.
            </p>
        <div class="join-input-container">
          <div class="join-field">
            <label class="join-label" for="input_confirm_password">비밀번호 확인 :</label>
            <input class="join-input" name="input_confirm_password" placeholder="비밀번호를 다시 입력해주세요" v-model="confirm_pw" type="password">
            <p v-if="confirm_pw !== '' && confirm_pw !== user_pw" class="join-password-mismatch-hint">
              비밀번호가 일치하지 않습니다.
            </p>
          </div>
        </div>
          <p class="join-required-message">
            선택 입력 사항입니다. (중복선택 가능)
          </p>
          <h3 class="join-select-title">OTT 서비스 선택</h3>
            <div class="join-select-options">
              <div class="join-select-item">
                <input type="checkbox" v-model="Netflix">
                넷플릭스
              </div>
              <div class="join-select-item">
                <input type="checkbox" v-model="Disneyplus">
                디즈니플러스
              </div>
              <div class="join-select-item">
                <input type="checkbox" v-model="Tving">
                티빙
              </div>
              <div class="join-select-item">
                <input type="checkbox" v-model="Watcha">
                왓차
              </div>
              <div class="join-select-item">
                <input type="checkbox" v-model="Wavve">
                웨이브
              </div>
            </div>
          <p class="join-required-message">
              선택 입력 사항입니다. (중복선택 가능)
              </p>
          <h3 class="join-select-title">관심있는 장르</h3>
            <div class="join-select-options">
              <div class="join-select-item">
                <input type="checkbox" v-model="romance">
                로맨스
              </div>
              <div class="join-select-item">
                <input type="checkbox" v-model="comedy">
                코미디
              </div>
              <div class="join-select-item">
                <input type="checkbox" v-model="horror">
                공포
              </div>
              <div class="join-select-item">
                <input type="checkbox" v-model="sf">
                SF
              </div>
              <div class="join-select-item">
                <input type="checkbox" v-model="animation">
                애니메이션
              </div>
              <div class="join-select-item">
                <input type="checkbox" v-model="drama">
                드라마
              </div>
              <div class="join-select-item">
                <input type="checkbox" v-model="fantasy">
                판타지
              </div>
              <div class="join-select-item">
                <input type="checkbox" v-model="mystery">
                추리
              </div>
              <div class="join-select-item">
                <input type="checkbox" v-model="crime">
                범죄
              </div>
              <div class="join-select-item">
                <input type="checkbox" v-model="grow">
                성장
              </div>
              <div class="join-select-item">
                <input type="checkbox" v-model="action">
                액션
              </div>
              <div class="join-select-item">
                <input type="checkbox" v-model="ect">
                기타
              </div>
            </div>
          <button @click="goToLoginPage" class="join-button_submit" type="submit">회원가입</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      user_birthday: '',
      user_nickname: '',
      user_id: '',
      user_pw: '',
      confirm_pw: '',
      agreed: false,
      Netflex: false,
      Disneyplus: false,
      Tving: false,
      Watcha: false,
      Wavve: false,
      romance: false,
      comedy: false,
      horror: false,
      sf: false,
      animation: false,
      drama: false,
      fantasy: false,
      mystery: false,
      crime: false,
      grow: false,
      action: false,
      ect: false,
    };
  },
  methods: {
    toggleAgreed() {
      if (!this.agreed) {
        alert('개인정보 수집에 동의한 후 이용 가능합니다.');
      }
    },
    submitForm() {
      if (!this.agreed) {
        alert('개인정보 수집에 동의한 후 이용 가능합니다.');
        return;
      }
      if (
        this.username === '' ||
        this.user_birthday === '' ||
        this.user_nickname === '' ||
        this.user_id === '' ||
        this.user_pw === '' ||
        this.confirm_pw === ''
      ) {
        alert('필수 입력 사항을 입력해주세요.');
        return;
      }
      if (!/^\d{4}(\/|-)?\d{2}(\/|-)?\d{2}$/.test(this.user_birthday)) {
        alert('생년월일 입력칸에는 "0000년/00월/00일" 순서로 숫자만 입력 가능합니다.');
        return;
      }
      // if (this.user_pw.length < 8 || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]+/.test(this.user_pw)) {
      //   alert('비밀번호는 특수문자 포함 8글자 이상이어야 합니다.');
      //   return;
      // }

      if (this.confirm_pw !== this.user_pw) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      const registrationData = {
        userID: this.user_id,
        password: this.user_pw,
        username: this.username,
        birthdate: this.user_birthday,
        nickname: this.user_nickname,
        likeOTTs: [
          this.Netflix && '넷플릭스',
          this.Disneyplus && '디즈니플러스',
          this.Tving && '티빙',
          this.Watcha && '왓차',
          this.Wavve && '웨이브',
        ].filter(Boolean),
        likeGenres: [
          this.romance && '로맨스',
          this.comedy && '코미디',
          this.horror && '공포',
          this.sf && 'SF',
          this.animation && '애니메이션',
          this.drama && '드라마',
          this.fantasy && '판타지',
          this.mystery && '추리',
          this.crime && '범죄',
          this.grow && '성장',
          this.action && '액션',
          this.ect && '기타',
        ].filter(Boolean),
      };
      console.log(registrationData)
      fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.isRegistered) {
          alert(data.message );
          this.$router.push('/LoginPage'); // 회원가입 성공 시 로그인 페이지로 이동
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("오류:", error);
        alert("회원가입 중 오류가 발생했습니다.");
      });
    },
  },
};
</script>


<style scoped>
.join-custom-h2 {
  margin-left:50px;
  margin-bottom: 40px;
  margin-top:15px;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 32px;
  color: rgb(65, 0, 80);
}
.logo {
  width: 60px;
  margin-left: 15px;
  cursor: pointer;
}
.join-agree-message {
  font-size: 13px;
}
.join-input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
}

.join-field {
  display: flex;
  align-items: center;
  width: 600px;
  margin-left: 60px;
}
.join-label {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 14px;
  color: rgb(65, 0, 80);
  width: 100px; 
  margin-left: 10px;
}

.join-input {
  flex: 1; 
  padding: 10px;
  border: 2px solid rgb(65, 0, 80);
  border-radius: 5px;
  box-sizing: border-box;
  margin-right: 10px;
}
.join-input::placeholder {
  font-size: 12px; 
}
.join-required-message {
  margin-top:30px;
  margin-left:60px;
  color: red;
  font-size: 9px;
}
.join-password-hint {
  margin-left:165px;
  font-size: 9px;
}
/* .join-ott-service-title {
  margin-left:60px;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 18px;
  color: rgb(65, 0, 80);
} */
.join-select-title {
  margin-left:60px;
  margin-bottom: 20px;
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 18px;
  color: rgb(65, 0, 80);
}
.join-select-options {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 60px;
}
.join-select-item {
  margin-right: 10px;
}
.join-button_submit {
  width: 400px;
  padding: 12px;
  font-size: 16px;
  color: white;
  background-color: rgb(65, 0, 80);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
  margin: 50px;

}
.join-duplicate-check-button{
  padding: 7px;
  font-size: 12px;
  font-weight: bold;
  color: rgb(65, 0, 80);
  background-color: transparent;
  border: 2px solid rgb(65, 0, 80);
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  text-decoration: none;
  margin-left: 5px;
}

@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";
</style>