<template>
	<div v-if="isAdmin">
		<div class="container d-flex justify-content-between" style="padding: 0">
			<div class="left inner-content" style="padding: 20px">
				<p class="title">Quản lý</p>
				<div><ButtonManager @clicked="onClickButtonManager" /></div>
			</div>
			<div class="right inner-content" style="padding: 20px">
				<div class="btn-right">
					<p class="title" v-if="buttonActive == 'muonsach'">Quản lý Mượn sách</p>
					<p class="title" v-else-if="buttonActive == 'taikhoan'">Quản lý Tài khoản</p>
					<p class="title" v-else-if="buttonActive == 'nhanvien'">Quản lý Nhân viên</p>
					<p class="title" v-else-if="buttonActive == 'sach'">Quản lý Sách</p>
					<p class="title" v-else-if="buttonActive == 'nhaxuatban'">
						Quản lý Nhà xuất bản
					</p>
				</div>
				<div>
					<div v-if="buttonActive == 'muonsach'"><BorrowManager /></div>
					<div v-if="buttonActive == 'taikhoan'"><UserManager /></div>
					<div v-if="buttonActive == 'nhanvien'"><AdminManager /></div>
					<div v-if="buttonActive == 'sach'"><BookManager /></div>
					<div v-if="buttonActive == 'nhaxuatban'"><PublisherManager /></div>
				</div>
			</div>
		</div>
	</div>
	<div v-else>
		Cần đăng nhập để sử dụng chức năng của Quản trị viên.
		<router-link style="text-decoration: underline" class="nav-link" :to="'/login'"
			>Đăng nhập</router-link
		>
	</div>
</template>

<script>
	import ButtonManager from "@/components/ButtonManager.vue";
	import BorrowManager from "@/components/BorrowManager.vue";
	import AdminManager from "@/components/AdminManager.vue";
	import UserManager from "@/components/UserManager.vue";
	import BookManager from "@/components/BookManager.vue";
	import PublisherManager from "@/components/PublisherManager.vue";
	export default {
		components: {
			ButtonManager,
			BorrowManager,
			AdminManager,
			UserManager,
			BookManager,
			PublisherManager,
		},
		data() {
			return {
				buttonActive: "muonsach",
				isAdmin: false,
			};
		},
		methods: {
			onClickButtonManager(value) {
				this.buttonActive = value;
			},
		},
		mounted() {
			const isAdmin = localStorage.getItem("isAdmin");
			this.buttonActive = localStorage.getItem("btnActive") || "muonsach";
			if (isAdmin != undefined) {
				this.isAdmin = true;
			}
		},
	};
</script>

<style lang="scss">
	.left {
		width: 20%;
		padding: 20px;
		.btn-right {
			text-align: center;
			margin-top: 20px;
			.manager-btn {
				width: 90%;
				border: 1px solid gray;
				border-radius: 8px;
				margin: 5px auto;
				font-weight: 500;
				padding: 6px 0;
				transition: 0.2s ease-in;
			}
			.active {
				background-color: var(--color-primary);
			}
		}
	}
	.right {
		width: 79%;
	}
</style>
