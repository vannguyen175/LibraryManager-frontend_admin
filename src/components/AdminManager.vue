<template>
	<div>
		<div
			class="modal fade"
			id="exampleModal"
			tabindex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
			style="margin-top: 0"
		>
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5" id="exampleModalLabel">Thông tin nhân viên</h1>
					</div>
					<div class="modal-body">
						<div class="modal-content">
							<div class="mb-3 row">
								<label for="hoten" class="col-sm-3 col-form-label">Họ tên</label>
								<div class="col-sm-9">
									<input
										type="text"
										class="form-control"
										id="hoten"
										v-model="dataInputForm.hoten"
										:placeholder="clickRowDetail ? clickRowDetail.hoten : ''"
									/>
								</div>
							</div>
							<div class="mb-3 row">
								<label for="chucvu" class="col-sm-3 col-form-label">Chức vụ</label>
								<div class="col-sm-9">
									<input
										type="text"
										class="form-control"
										id="chucvu"
										v-model="dataInputForm.chucvu"
										:placeholder="clickRowDetail ? clickRowDetail?.chucvu : ''"
									/>
								</div>
							</div>
							<div class="mb-3 row">
								<label for="diachi" class="col-sm-3 col-form-label">Địa chỉ</label>
								<div class="col-sm-9">
									<input
										type="text"
										class="form-control"
										id="diachi"
										v-model="dataInputForm.diachi"
										:placeholder="clickRowDetail ? clickRowDetail?.diachi : ''"
									/>
								</div>
							</div>
							<div class="mb-3 row">
								<label for="dienthoai" class="col-sm-3 col-form-label"
									>Điện thoại</label
								>
								<div class="col-sm-9">
									<input
										type="text"
										class="form-control"
										id="dienthoai"
										v-model="dataInputForm.dienthoai"
										:placeholder="
											clickRowDetail ? clickRowDetail?.dienthoai : ''
										"
									/>
								</div>
							</div>

							<div class="mb-3 row">
								<label for="matkhau" class="col-sm-3 col-form-label"
									>Mật khẩu</label
								>
								<div class="col-sm-9">
									<input
										type="password"
										class="form-control"
										id="matkhau"
										v-model="dataInputForm.matkhau"
									/>
								</div>
							</div>
							<div class="mb-3 row">
								<label for="nhaplaimatkhau" class="col-sm-3 col-form-label"
									>Nhập lại mật khẩu</label
								>
								<div class="col-sm-9">
									<input
										type="text"
										class="form-control"
										id="nhaplaimatkhau"
										v-model="dataInputForm.nhaplaimatkhau"
									/>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
							Thoát
						</button>
						<button
							v-if="onCreate"
							type="button"
							class="btn btn-primary"
							data-bs-dismiss="modal"
							@click="handleCreate"
						>
							Tạo mới
						</button>
						<button
							v-else
							type="button"
							class="btn btn-primary"
							data-bs-dismiss="modal"
							@click="handleUpdate"
						>
							Cập nhật
						</button>
					</div>
				</div>
			</div>
		</div>
		<button
			class="btnShowModal, addBtn"
			data-bs-toggle="modal"
			data-bs-target="#exampleModal"
			@click="handleClickAddBtn()"
			onExit
		>
			+ Thêm tài khoản nhân viên
		</button>
		<table class="table table-hover">
			<thead>
				<tr>
					<th scope="col"></th>
					<th scope="col">Họ tên</th>
					<th scope="col">Chức vụ</th>
					<th scope="col">Địa chỉ</th>
					<th scope="col">Điện thoại</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(detail, index) in adminList" :key="index">
					<th scope="row">{{ index + 1 }}</th>
					<td>{{ detail.hoten }}</td>
					<td>{{ detail.chucvu }}</td>
					<td>{{ detail.diachi }}</td>
					<td>{{ detail.dienthoai }}</td>
					<td>
						<button
							class="btnShowModal"
							data-bs-toggle="modal"
							data-bs-target="#exampleModal"
							@click="handleClickRow(detail)"
							onExit
						>
							<span
								style="
									text-decoration: underline;
									cursor: pointer;
									margin-right: 10px;
								"
								>Sửa</span
							>
						</button>
						<button class="btnShowModal" @click="confirmDelete(detail)">
							<span style="text-decoration: underline; cursor: pointer; color: red"
								>Xóa</span
							>
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import adminService from "@/services/admin.service";
	import bookService from "@/services/book.service";

	export default {
		data() {
			return {
				adminList: [],
				clickRowDetail: {},
				dataInputForm: {
					hoten: "",
					chucvu: "",
					diachi: "",
					dienthoai: "",
					matkhau: "",
					nhaplaimatkhau: "",
				},
				detailBook: null,
				onCreate: false, //thay đổi trạng thái create/update ở model
			};
		},

		methods: {
			async getAdminList() {
				try {
					const data = await adminService.getAll();
					this.adminList = data;
				} catch (error) {
					console.log(error);
				}
			},
			async getDetailBook(id) {
				try {
					const data = await bookService.getDetail(id);
					console.log("detailBook", data);
					this.detailBook = data;
				} catch (error) {
					console.log(error);
				}
			},
			handleClickRow(detail) {
				this.onCreate = false;
				this.clickRowDetail = detail;
				this.dataInputForm = detail;
			},

			handleChangeState(value) {
				this.clickRowDetail.trangthai = value;
			},

			async handleUpdate() {
				try {
					const data = await adminService.update(
						this.dataInputForm._id,
						this.dataInputForm
					);
					if (data) {
						this.$toast.success("Cập nhật thành công!", {
							position: "top",
							duration: 1000,
						});
						this.refreshList();
					}
				} catch (error) {
					console.log(error);
				}
			},

			async handleCreate() {
				try {
					const data = await adminService.create(this.dataInputForm);
					if (data) {
						this.$toast.success("Thêm tài khoản nhân viên thành công!", {
							position: "top",
							duration: 1000,
						});
						this.refreshList();
					}
				} catch (error) {
					this.$toast.error(error.response.data.message, {
						position: "top",
						duration: 1000,
					});
					console.log(error.response.data.message);
				}
			},

			async confirmDelete(detail) {
				if (confirm("Bạn có chắc muốn xóa bỏ tài khoản này?")) {
					const result = await adminService.delete(detail._id);
					if (result) {
						this.$toast.success("Xóa sách thành công!", {
							position: "top",
							duration: 1000,
						});
						this.refreshList();
					}
				} else {
					console.log("Thoát.");
				}
			},

			handleClickAddBtn() {
				this.onCreate = true;
				this.clickRowDetail = {};
				this.dataInputForm = {};
			},

			refreshList() {
				this.getAdminList();
			},
		},

		mounted() {
			this.getAdminList();
		},
	};
</script>

<style lang="scss">
	.btnShowModal {
		border: none;
		padding: 0;
		background-color: transparent;
	}

	.modal-content {
		strong {
			margin-right: 10px;
			border: none;
			padding: 20px 10px;
		}
	}
	.choduyet {
		border: 1px solid rgb(255, 204, 0);
		padding: 3px 5px;
		border-radius: 5px;
		color: rgb(220, 106, 0);
	}
	.dangmuon {
		border: 1px solid rgb(0, 197, 0);
		padding: 3px 5px;
		border-radius: 5px;
		color: rgb(0, 185, 0);
	}
	.damuon {
		border: 1px solid gray;
		padding: 3px 5px;
		border-radius: 5px;
		color: gray;
	}
</style>
