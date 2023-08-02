<!-- src/components/LoginForm.vue -->
<template>
  <form @submit.prevent="login">
    <div>
      <label for="userID">Username:</label>
      <input type="text" id="userID" v-model="formData.userID" required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="formData.password"
        required
      />
    </div>
    <div>
      <button type="submit">Login</button>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="message" class="message">{{ message }}</div>
  </form>
  <button v-if="isLoggedIn" @click="logout">Logout</button>

  <!-- Show the error and message divs -->
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="message" class="message">{{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
      error: "",
      message: "",
    };
  },
  methods: {
    login() {
      // Make API request to the login endpoint (adjust URL as needed)
      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.formData),
        credentials: "include", // Include cookies in the request
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Login successful") {
            // Handle successful login here (e.g., redirect to a different page)
            this.message = "Login successful";
            this.error = "";
            this.isLoggedIn = true; // Set isLoggedIn to true on successful login
          } else {
            this.error = "Invalid username or password";
            this.message = "";
            this.isLoggedIn = false; // Set isLoggedIn to false on failed login          }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.error = "An error occurred during login";
          this.message = "";
        });
    },
    logout() {
      // Make API request to the logout endpoint (adjust URL as needed)
      fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Logout successful") {
            // Handle successful logout here (e.g., redirect to login page)
            this.message = "Logout successful";
            this.error = "";
            this.isLoggedIn = false; // Set isLoggedIn to false on login error
          } else {
            this.error = "Logout failed";
            this.message = "";
            this.isLoggedIn = true; // Set isLoggedIn to true on failed logout           }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.error = "An error occurred during logout";
          this.message = "";
          this.isLoggedIn = true; // Set isLoggedIn to false on login error
        });
    },
  },
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
  background-color: #4caf50;
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
