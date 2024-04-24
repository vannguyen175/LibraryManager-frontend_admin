<template>
	<div class="btnManager">
		<button
			class="manager-btn"
			:class="{ active: buttonActive === 'muonsach' }"
			@click="handleChangeActiveBtn('muonsach')"
		>
			Mượn sách
		</button>
		<button
			class="manager-btn"
			:class="{ active: buttonActive === 'taikhoan' }"
			@click="handleChangeActiveBtn('taikhoan')"
		>
			Tài khoản khách hàng
		</button>
		<button
			class="manager-btn"
			:class="{ active: buttonActive === 'nhanvien' }"
			@click="handleChangeActiveBtn('nhanvien')"
		>
			Nhân viên
		</button>
		<button
			class="manager-btn"
			:class="{ active: buttonActive === 'sach' }"
			@click="handleChangeActiveBtn('sach')"
		>
			Sách
		</button>
		<button
			class="manager-btn"
			:class="{ active: buttonActive === 'nhaxuatban' }"
			@click="handleChangeActiveBtn('nhaxuatban')"
		>
			Nhà xuất bản
		</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				buttonActive: "muonsach",
			};
		},
		methods: {
			handleChangeActiveBtn(value) {
				this.buttonActive = value;
				this.$emit("clicked", value);
				localStorage.setItem("btnActive", value);
			},
		},
		mounted() {
			this.buttonActive = localStorage.getItem('btnActive') || "muonsach"
		}
	};
</script>

<style lang="scss">
	.btnManager {
		text-align: center;
		margin-top: 20px;
		.manager-btn {
			width: 90%;
			border: 1px solid gray;
			border-radius: 8px;
			margin: 5px auto;
			font-weight: 500;
			padding: 6px 0;
			transition: 0.1s ease-in;
		}
		.active {
			background-color: var(--color-primary);
		}
	}
</style>
