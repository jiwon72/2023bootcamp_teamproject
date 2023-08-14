<!-- src/App.vue -->
<template>
  <div class="app">
    <h1>Login Form</h1>
    <login-form></login-form>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue';

export default {
  components: {
    'login-form': LoginForm
  }
};
</script>

<style>
.app {
  text-align: center;
  margin-top: 20px;
}
</style>
