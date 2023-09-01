<template>
  <div class="ans-container">
    <div class="ans-header">
      <img
        @click="goToHomePage"
        src="/images/logo2.2.png"
        class="logo"
        alt="logo"
      />
      Question&Answer
    </div>
    <div class="ans-input-row">
      <input type="text" v-model="title" class="ans-input-field" />
      <select class="q-rating-field q-input-field" v-model="category" default>
        <option value="" disabled selected>카테고리를 선택해주세요</option>
        <option value="장르 추가">장르 추가</option>
        <option value="원하는 영화">원하는 영화</option>
        <option value="영화 정보 오류">영화 정보 오류</option>
        <option value="건의함">건의함</option>
      </select>
    </div>
    <div class="ans-textarea-footer">
      <textarea
        type="text"
        class="ans-textarea-field"
        v-model="content"
      ></textarea>
    </div>
    <div class="ans-footer-buttons">
      <div class="ans-delete" @click="deleteQuestion">질문삭제</div>
      <div class="ans-edit" @click="editQuestion">질문수정</div>
      <!-- <div class="ans-back" @click="backAnswer">돌아가기</div> -->
    </div>
    <div class="ans-textarea-footer">
      <textarea
        type="text"
        class="ans-textarea-field"
        v-model="answer"
      ></textarea>
    </div>
    <div class="ans-footer-buttons">
      <div class="ans-goanswer" @click="addAnswer">답변올리기</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      questionId: "",
      category: "",
      answer: "",
    };
  },
  created() {
    const questionId = this.$route.query.questionId;
    this.questionId = questionId; // questionId를 컴포넌트의 데이터에 할당
    this.fetchQuestionDetails(questionId); // 그 후에 fetchQuestionDetails 메서드 호출
  },
  methods: {
    async fetchQuestionDetails(questionId) {
      try {
        this.isLoadingQuestionDetails = true; // 이 행은 필요한 경우 로딩 상태를 표시할 수 있는 데이터 상태를 가정합니다.

        const response = await fetch(
          `http://localhost:3000/questions/${questionId}`,
          {
            credentials: "include",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const questionData = await response.json();
          this.title = questionData.question.title;
          this.content = questionData.question.content;
          this.category = questionData.question.Category;
          this.answer = questionData.question.answer;
        } else {
          console.error("Failed to fetch question details");
        }
      } catch (error) {
        console.error("Error fetching question details:", error);
      } finally {
        this.isLoadingQuestionDetails = false; // 데이터 로딩이 완료될 때 로딩 상태를 업데이트합니다.
      }
    },

    async addAnswer() {
      // 여기에서 로그인된 사용자의 상태를 확인하고 관리자 여부를 판단해야 합니다.
      const userIsAdmin = true; // 관리자 여부를 판단하는 예시 (실제로는 세션 또는 상태를 기반으로 판단해야 합니다.)

      if (!userIsAdmin) {
        alert("관리자만 답변을 추가할 수 있습니다.");
        return;
      }

      const questionId = this.questionId;
      const userId = "admin"; // 관리자 사용자 ID

      const answerData = {
        Answer: this.answer,
      };

      try {
        const result = await this.sendApiRequest(
          `http://localhost:3000/questions/${questionId}/${userId}`,
          "POST",
          answerData
        );

        console.log(result);

        if (result.message === "Answer added to the question.") {
          alert("답변이 성공적으로 추가되었습니다!");
          // 필요한 업데이트 로직을 여기에 추가
        } else {
          alert("답변 추가에 실패했습니다.");
        }
      } catch (error) {
        // 에러 핸들링: 403 상태 코드 처리
        if (error.message === "Answer added to the question.") {
          alert(error.message);
        } else {
          console.error("API request failed:", error);
        }
      }
    },

    async sendApiRequest(url, method, data) {
      const response = await fetch(url, {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return await response.json();
      } else {
        // 서버에서 오류 응답 처리
        try {
          const errorData = await response.json();
          if (response.status === 403) {
            alert(errorData.error);
          } else {
            console.log(`API request failed with status ${response.status}`);
          }
        } catch (error) {
          // JSON 파싱 오류 처리
          throw new Error(`API request failed with status ${response.status}`);
        }
      }
    },
    async editQuestion() {
      const questionId = this.questionId;
      const editData = {
        title: this.title,
        content: this.content,
        category: this.category,
      };

      try {
        const response = await fetch(
          `http://localhost:3000/questions/${questionId}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editData),
          }
        );

        if (response.ok) {
          const result = await response.json();
          if (result.message === "Question updated successfully.") {
            alert("질문이 성공적으로 수정되었습니다!");
            // Perform any necessary update logic here
          } else {
            alert("질문 수정에 실패했습니다.");
          }
        } else {
          alert("질문 수정에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error editing question:", error);
      }
    },
    async deleteQuestion() {
      const questionId = this.questionId;

      try {
        const response = await fetch(
          `http://localhost:3000/questions/${questionId}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();
          if (result.message === "Question deleted successfully.") {
            alert("질문이 성공적으로 삭제되었습니다!");
            // Perform any necessary update logic here
          } else {
            alert("질문 삭제에 실패했습니다.");
          }
        } else {
          alert("질문 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    },
  },
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
.logo {
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
  height: 44px;
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
  margin-left: 15px;
  margin-bottom: 30px;
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
  margin-left: 15px;
  margin-bottom: 30px;
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
  margin-left: 15px;
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
  margin-left: 15px;
}
</style>
