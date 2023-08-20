<template>
  <div class="container">
    <div class="header">QnA 작성</div>
    <div class="input-row">
      <input
        class="input-field"
        placeholder="아이디를 입력하세요"
        type="text"
        v-model="nickname"
      />
      <select class="rating-field input-field" v-model="rating">
        <option value="" disabled selected>카테고리를 선택해주세요</option>
        <option value="1">장르 추가</option>
        <option value="2">원하는 영화</option>
        <option value="3">영화 정보 오류</option>
        <option value="4">건의함</option>
      </select>
    </div>
    <textarea
      class="textarea-field"
      placeholder="내용을 입력해주세요"
      v-model="review"
    ></textarea>
    <br />
    <footer>
      <div class="foot" @click="submitReview">작성하기</div>
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

.header {
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
  color: rgb(65, 0, 80);
}
.input-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.input-field {
  padding: 10px;
  width: 60%;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.textarea-field {
  width: 100%;
  height: 680px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.container {
  margin: 0 15%; /* 양쪽 여백 설정 */
  flex: 1;
  display: flex;
  height: calc(100vh - 10px);
  flex-direction: column;
}
.foot {
  color: white;
  background-color: rgb(65, 0, 80);
  border: 1px solid;
  width: 80px;
  text-align: center;
  padding: 5px;
  border-radius: 30px;
  position: absolute; /* 절대 위치 지정 */
  right: 150px; /* 오른쪽 여백 */
  bottom: 50px; /* 하단 여백 */
  cursor: pointer;
}
.rating-field {
  width: 45%; /* 너비 조정 */
  margin-left: auto; /* 왼쪽 여백 자동 */
  position: relative;
  left: 22px;
}
</style>
