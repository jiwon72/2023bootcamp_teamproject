<template>
  <div class="rev-container">
    <div class="rev-header">
      <img @click="goToHomePage"
            src="/images/logo2.2.png"
            class="logo"
            alt="logo"
          />
      My Review
    </div>
    <div class="rev-input-row">
      <input class="rev-input-field" placeholder="닉네임을 입력하세요" type="text" v-model="nickname"/>
      <select class="rev-rating-field rev-input-field" v-model="rating">
        <option value="">평점을 입력하세요</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
    <div class="rev-textarea-footer">
      <textarea class="rev-textarea-field" placeholder="감상평을 써주세요" v-model="review"></textarea>
    </div>
    <div class="rev-footer-buttons">
      <div class="rev-edit" @click="editReview">리뷰수정</div>
      <div class="rev-back" @click="backReview">돌아가기</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: "",
      rating: "",
      review: ""
    };
  },
  methods: {
    submitReview() {
      alert('Nickname: ' + this.nickname + '\\nRating: ' + this.rating + '\\nReview: ' + this.review);
    }
  }
}
</script>

<style>
  
        body {
            font-family: Arial, sans-serif;
        }
        .rev-header {
            text-align: center;
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
        .rev-input-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start; /* 세로 정렬 설정 */
            margin-bottom: 10px;
        }
        .rev-input-field {
    padding: 10px;
    width: 48%; /* 변경된 너비 */
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
}

.rev-rating-field {
    width: 48%; /* 변경된 너비 */
    height: 44px;;
    margin-left: auto; /* 왼쪽 여백 자동 */
    position: relative;
}

.rev-textarea-field {
    width: 100%; /* 변경된 너비 */
    height: 400px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
}
        .rev-container {
            margin: 0 15%; /* 양쪽 여백 설정 */
            flex: 1;
            display: flex;
            height: calc(100vh - 10px);
            flex-direction: column;
            position: relative;
        }
        .rev-input-border {
  border: 3px solid rgb(65, 0, 80);
  border-radius: 5px;
}

.rev-input-field:focus,
.rev-rating-field:focus,
.rev-textarea-field:focus {
  border-color: rgb(65, 0, 80);
}
.rev-footer-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .rev-edit {
    color: white;
    background-color: rgb(65, 0, 80);
    border: 1px solid;
    width: 80px;
    text-align: center;
    padding: 6px;
    border-radius: 30px;
    cursor: pointer;
    margin-left:15px;
  }
  .rev-back {
    color: white;
    background-color: rgb(65, 0, 80);
    border: 1px solid;
    width: 80px;
    text-align: center;
    padding: 6px;
    border-radius: 30px;
    cursor: pointer;
    margin-left:15px;
  }
    
</style>