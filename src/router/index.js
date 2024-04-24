import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Account from "@/views/Account.vue";
const routes = [
	{
		path: "/",
		name: "home",
		component: Home,
	},
	{
		path: "/account",
		name: "account",
		component: Account,
	},
	{
		path: "/login",
		name: "login",
		component: Login,
	},
	{
		path: "/register",
		name: "register",
		component: Register,
	},
];
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});
export default router;
