<template>
  <div id="dashboard">
    <Mobile />

    <div id="container">
      <aside>
        <h1>Ticketly</h1>
        <div>
          <nav>
            <h4 @click="router.push('/dashboard')">Dashboard</h4>
            <h4 @click="router.push('/ticket')">Create Ticket</h4>
            <h4 @click="router.push('/ticketList')">Tickets Lists</h4>
          </nav>
          <h4 @click="handleLogout">Logout</h4>
        </div>
      </aside>

      <main>
        <div>
          <h1>DASHBOARD</h1>
          <h2>Welcome, {{ user?.username || 'User' }}</h2>
        </div>

        <section>
          <article>
            <i class="fa-solid fa-ticket"></i>
            <h4>Total Tickets</h4>
            <p>{{ ticketStats.total }}</p>
          </article>

          <article>
            <i class="fa-brands fa-opera"></i>
            <h4>Open Tickets</h4>
            <p>{{ ticketStats.open }}</p>
          </article>

          <article>
            <i class="fa-brands fa-resolving"></i>
            <h4>Resolved Tickets</h4>
            <p>{{ ticketStats.resolved }}</p>
          </article>

          <article @click="router.push('/ticket')">
            Go to Ticket Management
          </article>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Mobile from "./Mobile.vue";

const router = useRouter();
const user = ref(null);
const ticketStats = ref({
  total: 0,
  open: 0,
  resolved: 0,
});

onMounted(() => {
  const session = localStorage.getItem("ticketapp_session");
  const storedUser = JSON.parse(localStorage.getItem("ticketapp_user"));

  if (!session || !storedUser) {
    router.push("/login");
    return;
  }

  user.value = storedUser;

  const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
  const openTickets = storedTickets.filter((t) => t.status === "open").length;
  const resolvedTickets = storedTickets.filter((t) => t.status === "closed").length;

  ticketStats.value = {
    total: storedTickets.length,
    open: openTickets,
    resolved: resolvedTickets,
  };
});

const handleLogout = () => {
  localStorage.removeItem("ticketapp_session");
  alert("You have been logged out.");
  router.push("/login");
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#dashboard > #container {
  display: flex;
}

#dashboard > #container > aside {
  width: 20%;
  min-height: 100vh;
  background-color: #2563eb;
  padding-left: 20px;
}

#dashboard > #container > aside > h1 {
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 50px;
  margin-top: 20px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

#dashboard > #container > aside > div {
  display: flex;
  min-height: 80vh;
  flex-direction: column;
}

#dashboard > #container > aside > div > nav {
  flex: 1;
}

#dashboard > #container > aside > div > nav > h4 {
  margin-right: 15px;
  font-size: 1.2rem;
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 30px;
  background-color: #f9fafb;
  font-family: Arial, Helvetica, sans-serif;
}

#dashboard > #container > aside > div > h4 {
  margin-right: 15px;
  font-size: 1.2rem;
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: rgb(244, 20, 20);
  font-family: Arial, Helvetica, sans-serif;
}

#dashboard > #container > main {
  flex: 1;
  min-height: 100vh;
  background-color: #f9fafb;
  padding-left: 20px;
}

#dashboard > #container > main > div {
  width: 98%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

#dashboard > #container > main > section {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 98%;
}

#dashboard > #container > main > section > article {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  width: 45%;
  cursor: pointer;
  min-height: 40vh;
  margin-bottom: 30px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 10px #2563eb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

#dashboard > #container > main > section > article > i {
  margin-top: 20px;
  font-size: 3rem;
}

#dashboard > #container > main > section > article > h4 {
  font-size: 1.5rem;
}

#dashboard > #container > main > section > article > p {
  font-size: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

@media screen and (max-width: 900px) {
  #dashboard #container > aside {
    display: none;
  }

  #dashboard #container > main {
    padding-left: 0px;
  }

  #dashboard #container > main > div {
    width: 100%;
    align-items: center;
    padding: 0px 10px;
  }

  #dashboard #container > main > div > h1 {
    font-size: 1.4rem;
  }

  #dashboard #container > main > div > h2 {
    font-size: 1rem;
  }

  #dashboard #container > main > section {
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }

  #dashboard #container > main > section > article {
    width: 95%;
  }
}
</style>
