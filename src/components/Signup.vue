<template>
  <div id="login">
    <h1>Ticketly</h1>
    <p>Signup Now!</p>
    <form @submit.prevent="handleSignup">
      <nav>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Your Email"
          id="email"
          v-model="email"
        />
        <p v-if="!email && error">Field is required</p>
      </nav>

      <nav>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          id="username"
          v-model="username"
        />
        <p v-if="!username && error">Field is required</p>
      </nav>

      <nav>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your Password"
          id="password"
          v-model="password"
        />
        <p v-if="!password && error">Field is required</p>
      </nav>

      <nav>
        <button type="submit">Signup</button>
      </nav>

      <nav>
        <p>
          Already have an account
          <b @click="goToLogin">Login</b>
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
const username = ref("");
const password = ref("");
const error = ref(false);

function handleSignup() {
  if (!email.value || !username.value || !password.value) {
    error.value = true;
    return;
  }

  const userData = { email: email.value, username: username.value, password: password.value };
  localStorage.setItem("ticketapp_user", JSON.stringify(userData));
  localStorage.setItem("ticketapp_session", "active");

  alert("Signup successful!");
  router.push("/dashboard");
}

function goToLogin() {
  router.push("/login");
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
