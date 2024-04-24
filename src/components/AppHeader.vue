<template>
	<nav
		class="navbar navbar-expand-lg container-xl round"
		style="
			background-color: white;
			box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
			border-radius: 5px;
			padding: 0 20px;
		"
	>
		<div class="container-xl" style="background-color: white">
			<router-link class="navbar-brand fw-bold fs-5 text-dark" :to="'/'"
				>Quản lý mượn sách Quản trị viên</router-link
			>
			<form class="d-flex" style="width: 300px">
				<div
					class="navbar-nav d-flex justify-content-between"
					style="width: 400px; padding: 10px 0; background-color: white"
				>
					<p class="nav-item" style="background-color: white">
						<router-link class="nav-link" :to="'/'">Trang chủ</router-link>
					</p>

					<p class="nav-item" style="background-color: white">
						<router-link class="nav-link" :to="'/account'">Tài khoản</router-link>
					</p>

					<p v-if="isLoggedIn" class="nav-item" style="background-color: white">
						<a class="nav-link" @click="logout">Đăng xuất</a>
					</p>
					<p v-else class="nav-item" style="background-color: white">
						<router-link class="nav-link" :to="'/login'">Đăng nhập</router-link>
					</p>
				</div>
			</form>
		</div>
	</nav>
</template>
<script>
	export default {
		methods: {
			logout() {
				console.log("logout");
				localStorage.removeItem("isAdmin");
				if (!localStorage.removeItem("isAdmin")) {
					this.$router.push("/login");
				}
			},
		},
		computed: {
			isLoggedIn() {
				return localStorage.getItem("isAdmin") !== null; //đã login
			},
		},
	};
</script>
