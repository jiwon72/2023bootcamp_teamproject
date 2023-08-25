<template>
  <div>
    <header>
      <div class="mod-user-title">
        <img @click="goToHomePage"
            src="/images/logo2.2.png"
            class="logo"
            alt="logo"
          />
        프로필 관리</div>
    <div class="mod-user">회원 정보 수정</div>
    </header>
    <div class="nickname">
      <div class="modify-title">닉네임 수정</div>
      <div class="input-container">
        <input type="text" v-model="nicknameInput" class="input-originnick" :placeholder="nicknamePlaceholder" readonly>
      </div>
      <div class="input-container">
        <input type="text" v-model="newNickname" class="input-changenick" placeholder="수정 할 닉네임을 입력해주세요">
        <button class="button1" @click="modifyNickname">수정</button>
      </div>
    </div>
    
    <div class="nickname">
      <div class="modify-title">비밀번호 수정</div>
      <div class="input-container">
      <input type="password" v-model="currentPassword" class="input-originpass" :placeholder="passwordPlaceholder" readonly>
    </div>
    <div class="input-container">
        <input type="password" v-model="newPassword" class="input-changepass" placeholder="변경 할 비밀번호를 입력해주세요">
      </div>
      <p class="password-hint">
        비밀번호는 특수문자 포함 8글자 이어야 합니다.
      </p>
      <div class="input-container">
        <input type="password" v-model="confirmPassword" class="input-checkpass" placeholder="비밀번호를 한번 더 입력해주세요">
        <button class="button2" @click="modifyPassword">수정</button>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  data() {
    return {
      nicknameInput: '',
      newNickname: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      nicknamePlaceholder: '기존 닉네임을 입력해주세요', // 기본 플레이스홀더
      passwordPlaceholder: '기존 비밀번호를 입력해주세요', // 기본 플레이스홀더
    };
  },
  methods: {
    goToHomePage() {
      this.$router.push("/HomePage");
    },
    async fetchData() {
      try {
        const response = await fetch(`http://localhost:3000/users/profile`,  {
          credentials : "include" });
        const profileData = await response.json();

        if (profileData.NickName) {
          this.nicknameInput = profileData.NickName;
          }
          if (profileData.user_Password) {
            this.currentPassword = profileData.user_Password;
          }
        } catch (error) {
          console.error('프로필 데이터 가져오기 오류:', error);
        }
      },
      modifyNickname() {
      if (this.newNickname.trim() !== '') {
        this.nicknameInput = this.newNickname;
        this.modifyProfile();
      } else {
        alert("새로운 닉네임을 입력해주세요.");
      }
    },
    modifyPassword() {
      if (this.currentPassword !== '' && this.newPassword !== '' && this.confirmPassword !== '') {
        if (this.newPassword === this.confirmPassword) {
          this.currentPassword = this.newPassword;
          this.modifyProfile();
        } else {
          alert("새로운 비밀번호와 확인용 비밀번호가 일치하지 않습니다.");
        }
      } else {
        alert("모든 필드를 채워주세요.");
      }
    },
    async modifyProfile() {
      if (this.newNickname.trim() === '' && this.newPassword === '') {
        alert('수정할 내용을 입력해주세요.');
        return;
      }

      const profileData = {};

      if (this.newNickname.trim() !== '') {
        profileData.nickname = this.newNickname;
      }

      if (this.newPassword !== '') {
        if (this.newPassword !== this.confirmPassword) {
          alert('새로운 비밀번호와 확인용 비밀번호가 일치하지 않습니다.');
          return;
        }

        // const passwordRegex = /^(?=.*[!@#$%^&*()_+{}\[\]:";'<>,.?\/\\-])(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/;
        // if (!passwordRegex.test(this.newPassword)) {
        //   alert('비밀번호는 특수문자 포함 8글자 이상이어야 합니다.');
        //   return;
        // }

        profileData.password = this.newPassword;
      }

      try {
    const response = await fetch(`http://localhost:3000/users/userID/profile`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

        const responseData = await response.json();

        if (responseData.isupdated) {
          alert('프로필이 성공적으로 수정되었습니다!');
          // Additional actions or navigation can be performed here
        } 
      } catch (error) {
        console.error('Error modifying profile:', error);
        alert('프로필이 성공적으로 수정되었습니다!');
      }
    },
  },
  mounted() {
    this.fetchData(); // 컴포넌트가 마운트될 때 프로필 데이터를 가져옴
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
}
.input-container {
  display: block;
  align-items: center; 
  margin-bottom: 10px;
}
.logo{
  width: 60px;
  cursor: pointer;
}
.mod-user-title {
  color: rgb(65, 0, 80);
  font-size: 30px;
  font-weight: bold;
  font-style: italic;
  margin:10px;
}

.mod-user {
  color: rgb(65, 0, 80);
  font-size: 25px;
  font-weight: bold;
  font-style: italic;
  margin-left:20px;
  margin-bottom: 15px;
}

.modify-title {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  font-size: 15px;
  color: rgb(65, 0, 80);
  width: 100px;
  margin-left:25px;
  margin-bottom:5px;
  margin-top:25px;
}

.input-originnick,
.input-changenick,
.input-originpass,
.input-changepass,
.input-checkpass {
  flex: 1;
  padding: 10px;
  border: 2px solid rgb(65, 0, 80);
  border-radius: 5px;
  box-sizing: border-box;
  width: 400px; 
  height: 40PX;
  margin-left:60px;
}
.input-originnick::placeholder,
.input-changenick::placeholder,
.input-originpass::placeholder,
.input-changepass::placeholder,
.input-checkpass::placeholder {
  font-size: 11px;
}

.password-hint {
  font-size: 9px;
  color: gray;
  margin-left:65px;
}

.button1,
.button2 {
  width: 65px;
  height: 36px;
  padding: 5px;
  font-size: 12px;
  color: white;
  background-color: rgb(65, 0, 80);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}
</style>

