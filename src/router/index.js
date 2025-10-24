import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "@/components/LandingPage.vue";
import Signup from "@/components/Signup.vue";
import Login from "@/components/Login.vue";
import Dashboard from "@/components/Dashboard.vue";
import Ticket from "@/components/Ticket.vue";
import TicketList from "@/components/TicketList.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/signup", component: Signup },
  { path: "/login", component: Login },
  { path: "/dashboard", component: Dashboard },
  { path: "/ticket", component: Ticket },
  { path: "/ticketList", component: TicketList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
