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
      <input type="text" v-model="nicknameInput" class="rev-input-field" :placeholder="nicknamePlaceholder" readonly>
      <select v-model="rating" class="rev-rating-field rev-input-field">
        <option value="">평점을 입력하세요</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
    <div class="rev-textarea-footer">
      <textarea type="text" class="rev-textarea-field" v-model="review"></textarea>
    </div>
    <div class="rev-footer-buttons">
      <div class="rev-delete" @click="deleteReview">리뷰삭제</div>
      <div class="rev-edit" @click="editReview">리뷰수정</div>
      <!-- <div class="rev-back" @click="backReview">돌아가기</div> -->
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
      ratingInput:'',
      review: "",
      reviewInput:'',
      reviewId : ''
    };
  },
  created() {
    const reviewId = this.$route.query.id;
    this.reviewId=reviewId
    this.fetchData();
    this.movieId = this.$route.params.movieId; // 실제 라우터에서 사용하는 매개변수 이름으로 바꿔주세요
    this.getReview(reviewId);
  },
  methods: {
    
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
      async getReview(reviewId) {
        try {
          const response = await fetch(`http://localhost:3000/reviews/${reviewId}`);
          if (response.ok) {
            const data = await response.json();
            console.log("test", data)

            this.nickname = data.reviews[0].nickname;
            this.rating = data.reviews[0].rating;
            this.review = data.reviews[0].content;
          } else {
            console.error('리뷰 가져오기 실패');
          }
        } catch (error) {
          console.error('리뷰 가져오기 오류:', error);
        }
      },
    async editReview() {
      const reviewId = this.reviewId; // 리뷰 수정할 때 사용할 리뷰의 고유 ID
      const editData = {
        content: this.review,
        rating: parseFloat(this.rating)
      };

      try {
        const response = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
          credentials : "include",
          method: 'POST', // PUT 메서드를 사용하여 리뷰 업데이트
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(editData)
        });

        if (response.ok) {
          const result = await response.json();
          if (result.isEdit) {
            alert('리뷰가 성공적으로 수정되었습니다!');
            // 여기서 필요한 업데이트 로직 수행
          } else {
            alert('리뷰 수정에 실패했습니다.');
          }
        } else {
          alert('리뷰 수정에 실패했습니다.');
        }
      } catch (error) {
        console.error('리뷰 수정 오류:', error);
      }
    },
    async deleteReview() {
      const reviewId = this.reviewId; // 리뷰 삭제할 때 사용할 리뷰의 고유 ID

      try {
        const response = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
          credentials : "include" ,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (result.isDelete) {
            alert('Review deleted successfully!');
            // 여기서 필요한 업데이트 로직 수행
          } else {
            alert('Failed to delete review.');
          }
        } else {
          alert('Failed to delete review.');
        }
      } catch (error) {
        console.error('Error deleting review:', error);
      }
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
  .rev-delete {
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