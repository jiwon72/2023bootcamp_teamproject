<template>
  <div class="first-main-container">
    <img
            src="/images/logo3.png"
            class="logo"
            alt="logo"
          />
    <button @click="goToLoginPage" class="first-go-button">지금 보러가기</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToLoginPage() {
      this.$router.push('/LoginPage');
    }
  }
}
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; 
}

.first-main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-height: 100vh;
  justify-content: center;
}

.logo {
  text-align: center;
  width: 400px;
  margin-bottom: 50px;
}

.first-go-button {
  padding: 10px 20px;
  font-size: 20px;
  font-weight: bold;
  color: rgb(65, 0, 80);
  background-color: transparent;
  border: 2px solid rgb(65, 0, 80);
  border-radius: 10px;
  cursor: pointer;
  text-decoration: none;
}

.first-go-button:hover {
  background-color: rgb(65, 0, 80);
  color: white;
}

@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~@fortawesome/fontawesome-free/css/all.min.css";
</style>