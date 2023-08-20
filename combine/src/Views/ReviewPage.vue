<template>
  <div class="rev-container">
    <div class="rev-header">
      Review
    </div>
    <div class="rev-input-row">
      <input class="rev-input-field" placeholder="닉네임을 입력하세요" type="text" v-model="nickname"/>
      <select class="rev-rating-field input-field" v-model="rating">
        <option value="">평점을 입력하세요</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
    <textarea class="rev-textarea-field" placeholder="감상평을 써주세요" v-model="review"></textarea>
    <br/>
    <footer>
      <div class="rev-foot" @click="submitReview">리뷰쓰기</div>
    </footer>
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
        .rev-input-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        .rev-input-field {
            padding: 10px;
            width: 60%;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .rev-textarea-field {
            width: 100%;
            height: 680px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .rev-container {
            margin: 0 15%; /* 양쪽 여백 설정 */
            flex: 1;
            display: flex;
            height: calc(100vh - 10px);
            flex-direction: column;
        }
        .rev-foot {
            color: white;
            background-color: rgb(65, 0, 80);
            border: 1px solid;
            width: 80px;
            text-align: center;
            padding: 5px;
            border-radius:30px;
            position: absolute; /* 절대 위치 지정 */
            right: 150px; /* 오른쪽 여백 */
            bottom: 50px; /* 하단 여백 */
            cursor: pointer;
        }
        .rev-rating-field {
            width: 45%; /* 너비 조정 */
            margin-left: auto; /* 왼쪽 여백 자동 */
            position: relative;
            left: 22px;
        }
    
</style>