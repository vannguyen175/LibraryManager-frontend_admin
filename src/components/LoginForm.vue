<template>
	<form
		class="container-xl"
		@submit="submitLogin"
		@submit.prevent
		:validation-schema="adminFormSchema"
		style="height: 85vh; background-color: white"
	>
		<div class="form shadow" style="margin-top: 20px">
			<p class="title text-center">Đăng nhập tài khoản</p>
			<p class="text-center">Điền thông tin để truy cập vào hệ thống</p>

			<label for="dienthoai">Số điện thoại</label>
			<Field
				name="dienthoai"
				type="phone"
				class="form-control"
				v-model="adminLocal.dienthoai"
			/>
			<ErrorMessage name="dienthoai" class="error-feedback" />

			<div class="form-group">
				<label for="matkhau">Mật khẩu</label>
				<Field
					name="matkhau"
					type="password"
					class="form-control"
					v-model="adminLocal.matkhau"
				/>
				<ErrorMessage name="matkhau" class="error-feedback" />
			</div>
			<div style="text-align: center; margin-top: 50px">
				<button class="button-style">Đăng nhập</button>
			</div>
		</div>
	</form>
</template>
<script>
	import * as yup from "yup";
	import { Form, Field, ErrorMessage } from "vee-validate";
	export default {
		components: {
			Form,
			Field,
			ErrorMessage,
		},
		emits: ["submit:admin"],
		props: {},
		data() {
			const adminFormSchema = yup.object().shape({
				dienthoai: yup.number().required("Số điện thoại phải có giá trị."),
				matkhau: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự."),
			});
			return {
				adminLocal: {
					// Khởi tạo dữ liệu mặc định cho form đăng ký
					dienthoai: "",
					matkhau: "",
				},
				adminFormSchema,
			};
		},
		methods: {
			submitLogin() {
				this.$emit("submit:admin", this.adminLocal); //truyền accountLocal lên parent
			},
		},
	};
</script>
<style scoped lang="scss">
	.page {
		margin: 40px auto;
	}
	.form {
		width: 450px;
		height: 400px;
		background-color: antiquewhite;
		border: 1px solid black;
		border-radius: 10px;
		margin: auto;
		padding: 10px 20px;
		input {
			margin-bottom: 10px;
		}
	}
	.button-style {
		width: 300px;
		height: 40px;
		background-color: var(--color-primary);
		border: none;
		border-radius: 10px;
		color: white;
		font-weight: 500;
		margin: auto;
	}
</style>
@/service/contact.service
