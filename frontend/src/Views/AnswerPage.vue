<template>
  <div class="ans-container">
    <div class="ans-header">
      <img @click="goToHomePage"
            src="/images/logo2.2.png"
            class="logo"
            alt="logo"
          />
      Question&Answer
    </div>
    <div class="ans-input-row">
      <input type="text" v-model="titleInput" class="ans-input-field">
      <select v-model="rating" class="ans-rating-field ans-input-field">
        <option value="">평점을 입력하세요</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
    <div class="ans-textarea-footer">
      <textarea type="text" class="ans-textarea-field" v-model="content"></textarea>
    </div>
    <div class="ans-footer-buttons">
      <div class="ans-delete" @click="deleteQuestion">질문삭제</div>
      <div class="ans-edit" @click="editQuestion">질문수정</div>
      <!-- <div class="ans-back" @click="backAnswer">돌아가기</div> -->
    </div>
    <div class="ans-textarea-footer">
      <textarea type="text" class="ans-textarea-field" v-model="answer"></textarea>
    </div>
    <div class="ans-footer-buttons">
      <div class="ans-goanswer" @click="deleteAnswer">답변올리기</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleInput: '',
      content: '',
      questionId: ''
    };
  },
  created() {
    const questionId = this.$route.params.questionId;
    this.questionId = questionId;
    this.fetchQuestionDetails(questionId);
  },
  methods: {
    async fetchQuestionDetails(questionId) {
      try {
        const response = await fetch(`http://localhost:3000/questions/${questionId}`);
        if (response.ok) {
          const questionData = await response.json();
          this.titleInput = questionData.title;
          this.content = questionData.content;
        } else {
          console.error('Failed to fetch question details');
        }
      } catch (error) {
        console.error('Error fetching question details:', error);
      }
    },
    async editQuestion() {
      const questionId = this.questionId;
      const editData = {
        title: this.titleInput,
        content: this.content
      };

      try {
        const response = await fetch(`http://localhost:3000/questions/${questionId}`, {
          method: 'POST',
          credentials : "include",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editData)
        });

        if (response.ok) {
          const result = await response.json();
          if (result.id) {
            alert('질문이 성공적으로 수정되었습니다!');
            // Perform any necessary update logic here
          } else {
            alert('질문 수정에 실패했습니다.');
          }
        } else {
          alert('질문 수정에 실패했습니다.');
        }
      } catch (error) {
        console.error('Error editing question:', error);
      }
    },
    async deleteQuestion() {
      const questionId = this.questionId;

      try {
        const response = await fetch(`http://localhost:3000/questions/${questionId}`, {
          method: 'DELETE',
          credentials : "include",
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const result = await response.json();
          if (result.message === 'Question deleted successfully!') {
            alert('질문이 성공적으로 삭제되었습니다!');
            // Perform any necessary update logic here
          } else {
            alert('질문 삭제에 실패했습니다.');
          }
        } else {
          alert('질문 삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    },
  }
};
</script>

<style>
  
        body {
            font-family: Arial, sans-serif;
        }
        .ans-header {
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
        .ans-input-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start; /* 세로 정렬 설정 */
            margin-bottom: 10px;
        }
        .ans-input-field {
    padding: 10px;
    width: 58%; /* 변경된 너비 */
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
}

.ans-rating-field {
    width: 38%; /* 변경된 너비 */
    height: 44px;;
    margin-left: auto; /* 왼쪽 여백 자동 */
    position: relative;
}

.ans-textarea-field {
    width: 100%; /* 변경된 너비 */
    height: 200px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
}
        .ans-container {
            margin: 0 15%; /* 양쪽 여백 설정 */
            flex: 1;
            display: flex;
            height: calc(100vh - 10px);
            flex-direction: column;
            position: relative;
        }
        .ans-input-border {
  border: 3px solid rgb(65, 0, 80);
  border-radius: 5px;
}

.ans-input-field:focus,
.ans-rating-field:focus,
.ans-textarea-field:focus {
  border-color: rgb(65, 0, 80);
}
.ans-footer-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .ans-delete {
    color: white;
    background-color: rgb(65, 0, 80);
    border: 1px solid;
    width: 80px;
    text-align: center;
    padding: 6px;
    border-radius: 30px;
    cursor: pointer;
    margin-left:15px;
    margin-bottom:30px;
  }
  .ans-edit {
    color: white;
    background-color: rgb(65, 0, 80);
    border: 1px solid;
    width: 80px;
    text-align: center;
    padding: 6px;
    border-radius: 30px;
    cursor: pointer;
    margin-left:15px;
    margin-bottom:30px;
  }
  .ans-goanswer {
    color: white;
    background-color: rgb(65, 0, 80);
    border: 1px solid;
    width: 100px;
    text-align: center;
    padding: 6px;
    border-radius: 30px;
    cursor: pointer;
    margin-left:15px;
  }
  .ans-back {
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