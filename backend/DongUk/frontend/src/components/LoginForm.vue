<!-- src/components/LoginForm.vue -->
<template>
  <form @submit.prevent="login">
    <div>
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="formData.username" required>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="formData.password" required>
    </div>
    <div>
      <button type="submit">Login</button>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="message" class="message">{{ message }}</div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      },
      error: '',
      message: ''
    };
  },
  methods: {
    login() {
      // Make API request to the login endpoint (adjust URL as needed)
      fetch('https://moviefinderapi.run.goorm.site/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.formData)
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Login successful') {
            // Handle successful login here (e.g., redirect to a different page)
            this.message = 'Login successful';
            this.error = '';
          } else {
            this.error = 'Invalid username or password';
            this.message = '';
          }
        })
        .catch(error => {
          console.error('Error:', error);
          this.error = 'An error occurred during login';
          this.message = '';
        });
    }
  }
};
</script>

<style>
.form {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form div {
  margin-bottom: 10px;
}

.form label {
  display: block;
  font-weight: bold;
}

.form input[type="text"],
.form input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form button {
  padding: 8px 15px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error {
  color: red;
}

.message {
  color: green;
}
</style>
