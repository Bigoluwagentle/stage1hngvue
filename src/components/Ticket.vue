<template>
  <div id="ticket">
    <Mobile />
    <div id="container">
      <aside>
        <h1>Ticketly</h1>
        <div>
          <nav>
            <h4 @click="router.push('/dashboard')">Dashboard</h4>
            <h4 @click="router.push('/ticket')">Create Ticket</h4>
            <h4 @click="router.push('/ticketlist')">Tickets Lists</h4>
          </nav>
          <h4 @click="handleLogout">Logout</h4>
        </div>
      </aside>

      <main>
        <div>
          <h1>TICKETS</h1>
          <h2>Welcome, {{ user?.username || 'User' }}</h2>
        </div>

        <form @submit.prevent="handleSubmit">
          <legend>{{ editingIndex !== null ? 'Edit Ticket' : 'Create Ticket' }}</legend>

          <nav>
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter ticket title"
              required
              id="title"
              v-model="title"
            />
          </nav>

          <nav>
            <label>Description</label>
            <input
              type="text"
              placeholder="Describe the issue or request"
              id="description"
              v-model="description"
            />
          </nav>

          <nav>
            <label>Status</label>
            <select required v-model="status">
              <option value="">Select status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </nav>

          <nav>
            <button type="submit">
              {{ editingIndex !== null ? 'Update Ticket' : 'Submit' }}
            </button>
          </nav>

          <p v-if="message" style="color: green">{{ message }}</p>
        </form>
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
const title = ref("");
const description = ref("");
const status = ref("");
const editingIndex = ref(null);
const message = ref("");

onMounted(() => {
  const session = localStorage.getItem("ticketapp_session");
  const storedUser = JSON.parse(localStorage.getItem("ticketapp_user"));

  if (!session || !storedUser) {
    router.push("/login");
    return;
  }

  user.value = storedUser;
  const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
  tickets.value = storedTickets;
});

const handleSubmit = () => {
  if (!title.value || !status.value) {
    message.value = "Title and status are required.";
    return;
  }

  const newTicket = {
    title: title.value,
    description: description.value,
    status: status.value,
    createdBy: user.value?.username,
    id: editingIndex.value !== null ? tickets.value[editingIndex.value].id : Date.now(),
  };

  let updatedTickets;
  if (editingIndex.value !== null) {
    updatedTickets = [...tickets.value];
    updatedTickets[editingIndex.value] = newTicket;
    editingIndex.value = null;
    message.value = "Ticket updated successfully!";
  } else {
    updatedTickets = [...tickets.value, newTicket];
    message.value = "Ticket created successfully!";
  }

  tickets.value = updatedTickets;
  localStorage.setItem("tickets", JSON.stringify(updatedTickets));

  title.value = "";
  description.value = "";
  status.value = "";
};

const handleEdit = (index) => {
  const ticket = tickets.value[index];
  title.value = ticket.title;
  description.value = ticket.description;
  status.value = ticket.status;
  editingIndex.value = index;
};

const handleDelete = (index) => {
  if (window.confirm("Are you sure you want to delete this ticket?")) {
    const updatedTickets = tickets.value.filter((_, i) => i !== index);
    tickets.value = updatedTickets;
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    message.value = "Ticket deleted successfully!";
  }
};

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
#ticket > #container {
  display: flex;
}
#ticket > #container > aside {
  width: 20%;
  min-height: 100vh;
  background-color: #2563eb;
  padding-left: 20px;
}
#ticket > #container > aside > h1 {
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 50px;
  margin-top: 20px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
#ticket > #container > aside > div {
  display: flex;
  min-height: 80vh;
  flex-direction: column;
}
#ticket > #container > aside > div > nav {
  flex: 1;
}
#ticket > #container > aside > div > nav > h4 {
  margin-right: 15px;
  font-size: 1.2rem;
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 30px;
  background-color: #f9fafb;
  font-family: Arial, Helvetica, sans-serif;
}
#ticket > #container > aside > div > h4 {
  margin-right: 15px;
  font-size: 1.2rem;
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  background-color: rgb(244, 20, 20);
  font-family: Arial, Helvetica, sans-serif;
}
#ticket > #container > main {
  flex: 1;
  min-height: 100vh;
  background-color: #f9fafb;
  padding-left: 20px;
}
#ticket > #container > main > div {
  width: 98%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
#ticket > #container > main > form {
  width: 80%;
  min-height: 60vh;
  margin: 50px auto;
  border: 2px solid #000;
  padding: 30px 20px;
  border-radius: 30px;
}
#ticket > #container > main > form > legend {
  font-size: 2rem;
  font-family: Arial, Helvetica, sans-serif;
}
#ticket > #container > main > form > nav {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}
#ticket > #container > main > form > nav > label {
  margin-bottom: 5px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
#ticket > #container > main > form > nav > input,
#ticket > #container > main > form > nav > select {
  min-height: 50px;
  padding: 10px;
  border-radius: 6px;
}
#ticket > #container > main > form > nav > button {
  min-height: 50px;
  margin-top: 20px;
  background-color: #2563eb;
  border: none;
  color: #fff;
  cursor: pointer;
  border-radius: 8px;
}
@media screen and (max-width: 900px) {
  #ticket #container > aside {
    display: none;
  }
  #ticket #container > main {
    padding-left: 0px;
  }
  #ticket #container > main > div {
    width: 100%;
    align-items: center;
    padding: 0px 10px;
  }
  #ticket #container > main > form {
    width: 95%;
  }
}
</style>
