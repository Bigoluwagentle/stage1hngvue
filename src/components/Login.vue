<template>
  <div id="login">
    <h1>Ticketly</h1>
    <p>Welcome Back!</p>

    <form @submit.prevent="handleLogin">
      <nav>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Your Email"
          v-model="email"
          id="email"
        />
      </nav>

      <nav>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your Password"
          v-model="password"
          id="password"
        />
      </nav>

      <p v-if="error" style="color: red;">{{ error }}</p>

      <nav>
        <button type="submit">Login</button>
      </nav>

      <nav>
        <p>
          Don't have an account?
          <b @click="goToSignup">Signup</b>
        </p>
      </nav>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");

function handleLogin() {
  const storedUser = JSON.parse(localStorage.getItem("ticketapp_user"));

  if (!storedUser) {
    error.value = "No account found. Please signup first.";
    return;
  }

  if (storedUser.email === email.value && storedUser.password === password.value) {
    localStorage.setItem("ticketapp_session", "active");
    alert("Login successful!");
    router.push("/dashboard");
  } else {
    error.value = "Invalid email or password.";
  }
}

function goToSignup() {
  router.push("/signup");
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#login {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9fafb;
}
#login > h1 {
  margin-top: 30px;
  font-size: 3rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
#login > p {
  margin-top: 50px;
  font-size: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
#login > form {
  width: 50%;
}
#login > form > nav {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}
#login > form > nav > label {
  font-size: 1.3rem;
  margin-bottom: 8px;
  font-family: Arial, Helvetica, sans-serif;
}
#login > form > nav > input {
  min-height: 50px;
  padding: 10px;
  background-color: transparent;
  border: 2px solid #000;
  outline: none;
  border-radius: 5px;
}
#login > form > nav > button {
  min-height: 50px;
  background-color: #2563eb;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}
#login > form > nav > p {
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
#login > form > nav > p > b {
  cursor: pointer;
}
@media screen and (max-width: 700px) {
  #login > form {
    width: 90%;
  }
}
</style>
