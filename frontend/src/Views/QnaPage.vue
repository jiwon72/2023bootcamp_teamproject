<template>
  <div class="qna-container">
    <header>
      <h1 class="qna-gogaekcenter">
        <img @click="goToHomePage"
            src="/images/logo2.2.png"
            class="logo"
            alt="logo"
          />
        고객센터</h1>
      <h2 class="qna-qna">QnA 게시판</h2>
    </header>
    <table>
      <tr>
        <th>질문자</th>
        <th>질문</th>
        <th>카테고리</th>
        <th>답변</th>
        <th>조회수</th>
      </tr>
      <tr v-for="item in qnaList" :key="item.id">
        <td>{{ item.questioner }}</td>
        <td>{{ item.question }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.answer }}</td>
        <td>{{ item.views }}</td>
      </tr>
    </table>
    <div v-if="selectedQuestion" class="qna-question-popup">
    <div class="qna-question-form">
      <h2>{{ selectedQuestion.title }}</h2>
      <p>{{ selectedQuestion.content }}</p>
      <p>작성자: {{ selectedQuestion.nickname }}</p>
      <button @click="closeQuestionPopup">닫기</button>
    </div>
  </div>
    <footer>
      <div class="qna-foot" @click="goToQuestionPage" >질문하기</div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      qnaList: [],
      selectedQuestion: null,

    };
  },
  methods: {
    goToHomePage() {
      this.$router.push("/HomePage");
    },
    goToQuestionPage() {
      this.$router.push('/QuestionPage');
    },
    fetchQnAData() {
      fetch("http://localhost:3000/questions") 
        .then(response => response.json())
        .then(data => {
          this.qnaList = data;
        })
        .catch(error => {
          console.error('Error fetching QnA data:', error);
        });
    },
       // 질문 상세 팝업 열기
    openQuestionPopup(questionId) {
      fetch(`http://localhost:3000/questions/${questionId}`)
        .then(response => response.json())
        .then(data => {
          this.selectedQuestion = data;
        })
        .catch(error => {
          console.error('Error fetching question details:', error);
        });
    },
    // 질문 상세 팝업 닫기
    closeQuestionPopup() {
      this.selectedQuestion = null;
    },
  },
  mounted() {
    this.fetchQnAData(); // 컴포넌트가 마운트될 때 QnA 데이터를 가져옵니다.
  },
};
</script>

<style scoped>
    body {
        min-height: 100%;
        display: flex;
        flex-direction: column;
    }

    .qna-container {
        margin: 0 15%; /* 양쪽 여백 설정 */
        flex: 1;
        display: flex;
        height: calc(100vh - 10px);
        flex-direction: column;
        position: relative
    }
    .logo{
    width: 60px;
    cursor: pointer;
  }

    footer {
        padding: 10px;
        text-align: right;
    }

    table {
        border-collapse: collapse;
        
    }

    th  {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
        color:rgb(65, 0, 80);
        font-weight: 800;
        font-size: 20px;
        width: 20%; /* 각 열의 너비 지정 */
        white-space: nowrap; /* 줄 바꿈 방지 */
       overflow: hidden; /* 내용이 너무 길면 숨김 */
       text-overflow: ellipsis; /* 내용이 너무 길면 ... 표시 */
    }
    
    td{
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
        width: 20%; /* 각 열의 너비 지정 */
        white-space: nowrap; /* 줄 바꿈 방지 */
        overflow: hidden; /* 내용이 너무 길면 숨김 */
        text-overflow: ellipsis; /* 내용이 너무 길면 ... 표시 */
    }

    .qna-gogaekcenter{
        color:rgb(65, 0, 80);
        font-size: 40px;
        font-weight: bold;
        margin-top:20px;
    }

    .qna-qna{
        color:rgb(65, 0, 80);
        margin-left:15px;
    }

    .qna-foot{
        color: white;
        background-color: rgb(65, 0, 80);
        border: 1px solid;
        width: 80px;
        text-align: center;
        padding: 5px;
        border-radius:30px;
        position: absolute; /* 절대 위치 지정 */
        right: 30px; /* 오른쪽 여백 */
        bottom: 50px; /* 하단 여백 */
        cursor: pointer;
    }

    /* 반응형 미디어 쿼리 */
    @media (max-width: 768px) {
    .qna-container {
        margin: 0 5%; /* 작은 화면에서의 여백 */
    }
    /* 필요한 경우 작은 화면에 대한 추가 스타일 */
}

    .qna-question-popup {
        display: flex;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        align-items: center;
        justify-content: center;
    }

    .qna-question-form {
        background: #fff;
        padding: 20px;
        border-radius: 5px;
        width: 300px;
        }
</style>