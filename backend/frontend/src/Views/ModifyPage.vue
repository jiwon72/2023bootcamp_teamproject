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
        <input type="text" v-model="nicknameInput" class="input-originnick" placeholder="기존 닉네임을 입력해주세요">
      </div>
      <div class="input-container">
        <input type="text" v-model="newNickname" class="input-changenick" placeholder="수정 할 닉네임을 입력해주세요">
        <button class="button1" @click="modifyNickname">수정</button>
      </div>
    </div>
    
    <div class="nickname">
      <div class="modify-title">비밀번호 수정</div>
      <div class="input-container">
        <input type="password" v-model="currentPassword" class="input-originpass" placeholder="기존 비밀번호를 입력해주세요">
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
import axios from 'axios';
export default {
  data() {
    return {
      nicknameInput: '',
      newNickname: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  },
  methods: {
    goToHomePage() {
      this.$router.push("/HomePage");
    },
    modifyNickname() {
      if (this.newNickname.trim() !== '') {
        alert(`닉네임이 변경되었습니다!\n이전 닉네임: ${this.nicknameInput}\n새로운 닉네임: ${this.newNickname}`);
      } else {
        alert("새로운 닉네임을 입력해주세요.");
      }
    },
    modifyPassword() {
      if (this.currentPassword !== '' && this.newPassword !== '' && this.confirmPassword !== '') {
        if (this.newPassword === this.confirmPassword) {
          alert(`비밀번호가 변경되었습니다!\n이전 비밀번호: ${this.currentPassword}\n새로운 비밀번호: ${this.newPassword}`);
        } else {
          alert("새로운 비밀번호와 확인용 비밀번호가 일치하지 않습니다.");
        }
      } else {
        alert("모든 필드를 채워주세요.");
      }
    },
    async modifyProfile() {
      const profileData = {
        nickname: this.newNickname,
        password: this.newPassword,
      };

      try {
        const response = await axios.post('/users/:userId/profile', profileData);
        
      
      } catch (error) {
        console.error('Error modifying profile:', error);
        alert('프로필이 성공적으로 수정되었습니다.');
      }
    }
  }
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

