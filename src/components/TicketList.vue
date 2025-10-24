<template>
  <div id="ticketlist">
    <Mobile />
    <div id="container">
      <aside>
        <h1>Ticketly</h1>
        <div>
          <nav>
            <h4 @click="goTo('/dashboard')">Dashboard</h4>
            <h4 @click="goTo('/ticket')">Create Ticket</h4>
            <h4 @click="goTo('/ticketlist')">Tickets Lists</h4>
          </nav>
          <h4 @click="handleLogout">Logout</h4>
        </div>
      </aside>

      <main>
        <div>
          <h1>TICKETS LISTS</h1>
          <h2>Welcome, {{ user?.username || 'User' }}</h2>
        </div>

        <section>
          <p v-if="tickets.length === 0">No tickets created yet.</p>

          <div v-else v-for="ticket in tickets" :key="ticket.id" class="ticket-card">
            <form v-if="editingTicket === ticket.id" @submit.prevent="handleUpdate">
              <nav>
                <label>Title</label>
                <input type="text" v-model="updatedData.title" required />
              </nav>

              <nav>
                <label>Description</label>
                <input type="text" v-model="updatedData.description" required />
              </nav>

              <nav>
                <label>Status</label>
                <select v-model="updatedData.status" required>
                  <option value="">Select status</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </nav>

              <nav>
                <button type="submit">Save</button>
                <button type="button" @click="editingTicket = null">Cancel</button>
              </nav>
            </form>

            <nav v-else>
              <h4>{{ ticket.title }}</h4>
              <p>{{ ticket.description }}</p>
              <p :data-status="ticket.status">Status: {{ ticket.status }}</p>
              <nav>
                <li @click="handleEdit(ticket)">Edit</li>
                <li @click="handleDelete(ticket.id)">Delete</li>
              </nav>
            </nav>
          </div>
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
const tickets = ref([]);
const editingTicket = ref(null);
const updatedData = ref({
  title: "",
  description: "",
  status: "",
});

onMounted(() => {
  const session = localStorage.getItem("ticketapp_session");
  const storedUser = JSON.parse(localStorage.getItem("ticketapp_user"));
  const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];

  if (!session || !storedUser) {
    router.push("/login");
    return;
  }

  user.value = storedUser;
  tickets.value = storedTickets;
});

const goTo = (path) => {
  router.push(path);
};

const handleLogout = () => {
  localStorage.removeItem("ticketapp_session");
  alert("You have been logged out.");
  router.push("/login");
};

const handleEdit = (ticket) => {
  editingTicket.value = ticket.id;
  updatedData.value = {
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
  };
};

const handleUpdate = () => {
  if (!updatedData.value.title || !updatedData.value.description || !updatedData.value.status) {
    alert("Please fill all fields before updating.");
    return;
  }

  tickets.value = tickets.value.map((t) =>
    t.id === editingTicket.value ? { ...t, ...updatedData.value } : t
  );

  localStorage.setItem("tickets", JSON.stringify(tickets.value));
  editingTicket.value = null;
  alert("Ticket updated successfully!");
};

const handleDelete = (id) => {
  if (!confirm("Are you sure you want to delete this ticket?")) return;

  tickets.value = tickets.value.filter((t) => t.id !== id);
  localStorage.setItem("tickets", JSON.stringify(tickets.value));
  alert("Ticket deleted successfully!");
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#ticketlist {
  > #container {
    display: flex;
    > aside {
      width: 20%;
      min-height: 100vh;
      background-color: #2563eb;
      padding-left: 20px;
      > h1 {
        color: #fff;
        font-size: 2.5rem;
        margin-bottom: 50px;
        margin-top: 20px;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      }
      > div {
        display: flex;
        min-height: 80vh;
        flex-direction: column;
        > nav {
          flex: 1;
          > h4 {
            margin-right: 15px;
            font-size: 1.2rem;
            padding: 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 30px;
            background-color: #f9fafb;
            font-family: Arial, Helvetica, sans-serif;
          }
        }
        > h4 {
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
    }
    > main {
      flex: 1;
      min-height: 100vh;
      background-color: #f9fafb;
      padding-left: 20px;
      > div {
        width: 98%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: Verdana, Geneva, Tahoma, sans-serif;

        > h1 {
          margin-top: 10px;
          margin-bottom: 20px;
          font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
      }
      > section {
        width: 80%;
        min-height: 60vh;
        margin: 50px auto;
        border: 2px solid #000;
        padding: 30px 20px;
        border-radius: 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .ticket-card {
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 4px 3px #007bff;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .ticket-card > nav > h4 {
        margin-bottom: 10px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1.2rem;
      }

      .ticket-card > nav > p {
        font-family: Arial, Helvetica, sans-serif;
        margin-bottom: 10px;
      }

      .ticket-card > nav > nav {
        display: flex;
        justify-content: space-between;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        margin-top: 10px;
      }

      .ticket-card > nav > nav > li {
        list-style-type: none;
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 6px;
        transition: background-color 0.2s ease;
      }

      .ticket-card > nav > nav > li:first-child {
        color: #007bff;
      }

      .ticket-card > nav > nav > li:last-child {
        color: #ff0000;
      }
      .ticket-card p:nth-of-type(2) {
        font-weight: bold;
        text-transform: capitalize;
      }

      .ticket-card p:nth-of-type(2)[data-status="open"] {
        color: green;
      }
      .ticket-card p:nth-of-type(2)[data-status="in_progress"] {
        color: orange;
      }
      .ticket-card p:nth-of-type(2)[data-status="closed"] {
        color: gray;
      }
      .ticket-card form {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      .ticket-card form nav {
        display: flex;
        flex-direction: column;
      }
      .ticket-card form label {
        margin-bottom: 5px;
        font-weight: 600;
      }
      .ticket-card form input,
      .ticket-card form select {
        padding: 8px 10px;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-family: inherit;
      }
      .ticket-card form button {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 8px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.2s ease;
        margin-right: 10px;
      }
      .ticket-card form button[type="button"] {
        background-color: #999;
      }
    }
  }
}
@media screen and (max-width: 900px) {
  #ticketlist {
    #container {
      > aside {
        display: none;
      }
      > main {
        padding-left: 0px;
        > div {
          width: 100%;
          align-items: center;
          padding: 0px 10px;
          > h1 {
            font-size: 1.4rem;
          }
          > h2 {
            font-size: 1rem;
          }
        }
        > section {
          width: 95%;
        }
      }
    }
  }
}
</style>
