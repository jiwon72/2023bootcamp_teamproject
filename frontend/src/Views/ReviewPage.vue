<template>
  <div class="rev-container">
    <div class="rev-header">
      Review
    </div>
    <div class="rev-input-row">
      <input type="text" v-model="nicknameInput" class="rev-input-field" :placeholder="nicknamePlaceholder" readonly>
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
      <div class="rev-foot" @click="submitReview">리뷰쓰기</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nicknameInput: '',
      nickname: "",
      rating: "",
      review: "",
      movieId: null,
    };
  },
  created() {
    this.fetchData();
    this.movieId = this.$route.params.movieId; // 실제 라우터에서 사용하는 매개변수 이름으로 바꿔주세요
  },
  methods: {
    async submitReview() {
      const reviewData = {
        rating: parseFloat(this.rating),
        content: this.review,
        isSpoil: false // You can adjust this value based on your requirements
      };
      

      try {
        const response = await fetch(`http://localhost:3000/movies/293670/reviews`, {
          credentials : "include" ,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reviewData)
        });

        if (response.ok) {
          const result = await response.json();
          if (result.isWrite) {
            alert('리뷰가 성공적으로 제출되었습니다!');
            // 폼 필드를 초기화할 수 있습니다.
            this.nickname = "";
            this.rating = "";
            this.review = "";
          } else {
            alert('리뷰 제출에 실패했습니다.');
          }
        } else {
          alert('리뷰 제출에 실패했습니다.');
        }
      } catch (error) {
        console.error('리뷰 제출 오류:', error);
      }
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
            align-items: flex-start; /* 세로 정렬 설정 */
            margin-bottom: 10px;
        }
        .rev-input-field {
          padding: 10px;
          width: 48%;
          border: 2px solid rgb(65, 0, 80); /* 변경된 테두리 색상 및 굵기 */
          border-radius: 5px;
          resize: none;
        }

  .rev-rating-field {
    width: 48%;
    margin-left: auto;
    height: 44px;;
    position: relative;
    border: 2px solid rgb(65, 0, 80); /* 변경된 테두리 색상 및 굵기 */
    border-radius: 5px;
  }

  .rev-textarea-field {
    width: 100%;
    height: 400px;
    padding: 10px;
    border: 2px solid rgb(65, 0, 80); /* 변경된 테두리 색상 및 굵기 */
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
        .rev-textarea-footer {
          display: flex;
          align-items: flex-end; /* 하단 정렬 */
          justify-content: space-between; /* 간격 유지하며 내용 분배 */
        }
        .rev-footer-buttons {
          display: flex;
          align-items: flex-end;
        }

  .rev-foot {
    color: white;
    background-color: rgb(65, 0, 80);
    border: 1px solid;
    width: 80px;
    text-align: center;
    padding: 6px;
    border-radius: 30px;
    cursor: pointer;
  }
        .rev-input-border {
      border: 3px solid rgb(65, 0, 80);
      border-radius: 5px;
    }
    .rev-input-field,
  .rev-rating-field,
  .rev-textarea-field {
    padding: 10px;
    border: 2px solid rgb(65, 0, 80); /* 변경된 테두리 색상 및 굵기 */
    border-radius: 5px;
    resize: none;
  }
.rev-input-field:focus,
.rev-rating-field:focus,
.rev-textarea-field:focus {
  border-color: rgb(65, 0, 80);
}
    
</style>