<template>
  <div class="q-container">
    <div class="q-header">
      <img 
            src="/images/logo2.2.png"
            class="logo"
            alt="logo"
          />
      QnA 작성</div>
    <div class="q-input-row">
      <input
        class="q-input-field"
        placeholder="아이디를 입력하세요"
        type="text"
        v-model="nickname"
      />
      <select class="q-rating-field q-input-field" v-model="rating">
        <option value="" disabled selected>카테고리를 선택해주세요</option>
        <option value="1">장르 추가</option>
        <option value="2">원하는 영화</option>
        <option value="3">영화 정보 오류</option>
        <option value="4">건의함</option>
      </select>
    </div>
    <textarea
      class="q-textarea-field"
      placeholder="내용을 입력해주세요"
      v-model="review"
    ></textarea>
    <br />
    <footer>
      <div class="q-foot" @click="submitReview">작성하기</div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: "",
      rating: "",
      review: "",
    };
  },
  methods: {
    submitReview() {
      alert(
        "Nickname: " +
          this.nickname +
          "\\nRating: " +
          this.rating +
          "\\nReview: " +
          this.review
      );
    },
  },
};
</script>

<style>

.q-header {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
  color: rgb(65, 0, 80);
  font-family: Arial, sans-serif;
}
.logo{
  width: 60px;
  cursor: pointer;
}
.q-input-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* 세로 정렬 설정 */
  margin-bottom: 10px;
}
.q-input-field {
  padding: 10px;
  width: 48%; /* 변경된 너비 */
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
}
.q-textarea-field {
  width: 100%; /* 변경된 너비 */
  height: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
}
.q-input-field:focus,
.q-rating-field:focus,
.q-textarea-field:focus {
  border: 2px solid rgb(65, 0, 80);
}
.q-container {
  margin: 0 auto; /* 중앙 정렬 */
  max-width: 800px; /* 최대 너비 설정 */
  padding: 20px; /* 여백 추가 */
}
.q-foot {
  color: white;
  background-color: rgb(65, 0, 80);
  border: 1px solid;
  width: 80px;
  text-align: center;
  padding: 5px;
  border-radius: 30px;
  position: absolute; /* 절대 위치 지정 */
  transform: translateY(100%);
  cursor: pointer;
  margin-bottom: 10px;
}
.q-rating-field {
  width: 48%; /* 변경된 너비 */
  margin-left: auto; /* 왼쪽 여백 자동 */
  position: relative;
}
</style>
