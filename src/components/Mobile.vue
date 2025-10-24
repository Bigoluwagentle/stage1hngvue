<template>
  <div id="mobile">
    <i class="fa-solid fa-bars" @click="menu"></i>

    <section>
      <aside>
        <div>
          <nav>
            <i class="fa-solid fa-xmark" @click="close"></i>
            <h4 @click="navigateTo('/dashboard')">Dashboard</h4>
            <h4 @click="navigateTo('/ticket')">Create Ticket</h4>
            <h4 @click="navigateTo('/ticketList')">Tickets Lists</h4>
          </nav>
          <h4 @click="handleLogout">Logout</h4>
        </div>
      </aside>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function menu() {
  document.querySelector("#mobile > section").style.display = "block";
}

function close() {
  document.querySelector("#mobile > section").style.display = "none";
}

function navigateTo(path) {
  router.push(path);
}

function handleLogout() {
  localStorage.removeItem("ticketapp_session");
  alert("You have been logged out.");
  router.push("/login");
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#mobile {
  display: none;
}

@media screen and (max-width: 900px) {
  #mobile {
    display: block;
  }

  #mobile > i {
    margin: 10px;
    font-size: 1.5rem;
  }

  #mobile > section {
    display: none;
    width: 90%;
    height: 100vh;
    position: fixed;
  }

  #mobile > section > aside {
    width: 100%;
    min-height: 100vh;
    background-color: #2563eb;
    padding-left: 20px;
    padding-top: 30px;
  }

  #mobile > section > aside i {
    font-size: 2rem;
    margin-bottom: 30px;
    color: #f9fafb;
  }

  #mobile > section > aside > div {
    display: flex;
    min-height: 80vh;
    flex-direction: column;
  }

  #mobile > section > aside > div > nav {
    flex: 1;
  }

  #mobile > section > aside > div > nav > h4 {
    margin-right: 15px;
    font-size: 1.2rem;
    padding: 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 30px;
    background-color: #f9fafb;
    font-family: Arial, Helvetica, sans-serif;
  }

  #mobile > section > aside > div > h4 {
    margin-right: 15px;
    font-size: 1.2rem;
    padding: 20px;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    background-color: rgb(244, 20, 20);
    font-family: Arial, Helvetica, sans-serif;
  }
}
</style>
