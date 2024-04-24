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
						<h1 class="modal-title fs-5" id="exampleModalLabel">Nhập thông tin tài khoản</h1>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div class="modal-body">
						<div class="modal-content">
							<div class="mb-3 row">
								<label for="tentaikhoan" class="col-sm-3 col-form-label"
									>Tên tài khoản</label
								>
								<div class="col-sm-9">
									<input
										type="text"
										class="form-control"
										id="tentaikhoan"
										v-model="dataInputForm.tentaikhoan"
										:placeholder="
											clickRowDetail ? clickRowDetail.tentaikhoan : ''
										"
									/>
								</div>
							</div>
							<div class="mb-3 row">
								<label for="holot" class="col-sm-3 col-form-label">Họ lót</label>
								<div class="col-sm-9">
									<input
										type="text"
										class="form-control"
										id="holot"
										v-model="dataInputForm.holot"
										:placeholder="clickRowDetail ? clickRowDetail?.holot : ''"
									/>
								</div>
							</div>
							<div class="mb-3 row">
								<label for="ten" class="col-sm-3 col-form-label">Tên</label>
								<div class="col-sm-9">
									<input
										type="text"
										class="form-control"
										id="ten"
										v-model="dataInputForm.ten"
										:placeholder="clickRowDetail ? clickRowDetail?.ten : ''"
									/>
								</div>
							</div>
							<div class="mb-3 row">
								<label for="ngaysinh" class="col-sm-3 col-form-label"
									>Ngày sinh</label
								>
								<div class="col-sm-9">
									<input
										type="date"
										class="form-control"
										id="ngaysinh"
										v-model="dataInputForm.ngaysinh"
										:placeholder="
											clickRowDetail ? clickRowDetail?.ngaysinh : ''
										"
									/>
								</div>
							</div>
							<div class="mb-3 row">
								<label for="phai" class="col-sm-3 col-form-label"
									>Giới tính (nam, nữ)</label
								>
								<div class="col-sm-9">
									<input
										type="text"
										class="form-control"
										id="phai"
										v-model="dataInputForm.phai"
										:placeholder="clickRowDetail ? clickRowDetail?.phai : ''"
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
										type="number"
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
										type="password"
										class="form-control"
										id="nhaplaimatkhau"
										v-model="dataInputForm.matkhau"
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

						<button
							v-if="clickRowDetail.trangthai === 'chờ duyệt'"
							type="button"
							class="btn btn-danger"
							data-bs-dismiss="modal"
							@click="confirmDelete(clickRowDetail.id)"
						>
							Hủy
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
			+ Thêm người dùng mới
		</button>
		<table class="table table-hover">
			<thead>
				<tr>
					<th scope="col"></th>
					<th scope="col">Họ tên</th>
					<th scope="col">Phái</th>
					<th scope="col">Địa chỉ</th>
					<th scope="col">Ngày sinh</th>
					<th scope="col">Điện thoại</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(detail, index) in adminList" :key="index">
					<th scope="row">{{ index + 1 }}</th>
					<td>{{ detail.holot }} {{ detail.ten }}</td>
					<td>{{ detail.phai }}</td>
					<td>{{ detail.diachi }}</td>
					<td>{{ detail.ngaysinh }}</td>
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
									margin-right: 15px;
								"
								>Sửa</span
							>
						</button>
						<button class="btnShowModal" @click="confirmDelete(detail)" onExit>
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
	import managerService from "@/services/manager.service";
	import accountService from "@/services/account.service";
	import bookService from "@/services/book.service";
	import moment from "moment";
	export default {
		data() {
			return {
				adminList: [],
				clickRowDetail: {},
				dataInputForm: {
					tentaikhoan: "",
					holot: "",
					ten: "",
					ngaysinh: "",
					diachi: "",
					phai: "",
					dienthoai: "",
					matkhau: "",
					nhaplaimatkhau: "",
				},
				detailBook: null,
				onCreate: false,
			};
		},

		methods: {
			async getAdminList() {
				try {
					const data = await accountService.getAll();
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
			formatDate(dateString) {
				return moment(new Date(dateString)).format("DD-MM-YYYY");
			},
			handleClickRow(detail) {
				this.clickRowDetail = detail;
				this.dataInputForm = detail;
				this.onCreate = false;
			},

			handleClickAddBtn() {
				this.onCreate = true;
				this.clickRowDetail = {};
				this.dataInputForm = {};
			},

			handleChangeState(value) {
				this.clickRowDetail.trangthai = value;
			},

			async handleUpdate() {
				try {
					console.log('update account');
					// const data = await managerService.update(this.clickRowDetail.id, {
					// 	soluongmuon: this.clickRowDetail.soluong,
					// 	trangthai: this.clickRowDetail.trangthai,
					// });
					// if (data) {
					// 	this.refreshList();
					// }
				} catch (error) {
					console.log(error);
				}
			},

			async confirmDelete(idOrder) {
				if (confirm("Bạn có chắc muốn xóa tài khoản này?")) {
					console.log("Xóa.");
				} else {
					console.log("Thoát.");
				}
			},

			async handleDelete(idOrder) {
				try {
					const data = await managerService.delete(idOrder);
					if (data) {
						this.refreshList();
					}
				} catch (error) {
					console.log(error);
				}
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
