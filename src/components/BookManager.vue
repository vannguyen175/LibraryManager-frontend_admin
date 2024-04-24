<template>
	<!-- <ToastPlugin /> -->
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
						<h1 class="modal-title fs-5" id="exampleModalLabel">
							Chỉnh sửa thông tin sách
						</h1>
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
								<label for="tensach" class="col-sm-3 col-form-label"
									>Tên sách</label
								>
								<div class="col-sm-9">
									<input
										type="text"
										class="form-control"
										id="tensach"
										v-model="dataInputForm.tensach"
										:placeholder="clickRowDetail ? clickRowDetail.tensach : ''"
									/>
								</div>
							</div>
							<div class="mb-3 row">
								<label for="dongia" class="col-sm-3 col-form-label">Đơn giá</label>
								<div class="col-sm-9">
									<input
										type="number"
										class="form-control"
										id="dongia"
										v-model="dataInputForm.dongia"
										:placeholder="clickRowDetail ? clickRowDetail?.dongia : ''"
									/>
								</div>
							</div>
							<div class="mb-3 row">
								<label for="tacgia" class="col-sm-3 col-form-label">Tác giả</label>
								<div class="col-sm-9">
									<input
										type="text"
										class="form-control"
										id="tacgia"
										v-model="dataInputForm.tacgia"
										:placeholder="clickRowDetail ? clickRowDetail?.tacgia : ''"
									/>
								</div>
							</div>
							<div class="mb-3 row">
								<label for="nhaxuatban" class="col-sm-3 col-form-label"
									>Nhà xuất bản</label
								>
								<div class="col-sm-9">
									<select class="form-select" v-model="dataInputForm.manxb">
										<option
											:selected="
												clickRowDetail &&
												clickRowDetail.manxb === '660e9f9e4c13ae528ac04f7c'
											"
											value="660e9f9e4c13ae528ac04f7c"
										>
											Kim Đồng
										</option>
										<option
											:selected="
												clickRowDetail &&
												clickRowDetail.manxb === '661cdd063849ea0bc4a1be8d'
											"
											value="661cdd063849ea0bc4a1be8d"
										>
											Nhà xuất bản Trẻ
										</option>
										<option
											:selected="
												clickRowDetail &&
												clickRowDetail.manxb === '661cdcac3849ea0bc4a1be8c'
											"
											value="661cdcac3849ea0bc4a1be8c"
										>
											Nhã Nam
										</option>
									</select>
								</div>
							</div>
							<div class="mb-3 row">
								<label for="namxuatban" class="col-sm-3 col-form-label"
									>Năm xuất bản</label
								>
								<div class="col-sm-9">
									<input
										type="text"
										class="form-control"
										id="namxuatban"
										v-model="dataInputForm.namxuatban"
										:placeholder="
											clickRowDetail ? clickRowDetail.namxuatban : ''
										"
									/>
								</div>
							</div>
							<div class="mb-3 row">
								<label for="soquyen" class="col-sm-3 col-form-label"
									>Số lượng</label
								>
								<div class="col-sm-9">
									<input
										type="text"
										class="form-control"
										id="soquyen"
										v-model="dataInputForm.soquyen"
										:placeholder="clickRowDetail ? clickRowDetail.soquyen : ''"
									/>
								</div>
							</div>
							<div class="mb-3 row">
								<label for="anhbia" class="col-sm-3 col-form-label">Ảnh bìa</label>
								<div class="col-sm-9">
									<input
										type="text"
										class="form-control"
										id="anhbia"
										v-model="dataInputForm.anhbia"
										:placeholder="clickRowDetail ? clickRowDetail.anhbia : ''"
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
	</div>
	<button
		class="btnShowModal, addBtn"
		data-bs-toggle="modal"
		data-bs-target="#exampleModal"
		@click="handleClickAddBtn()"
		onExit
	>
		+ Thêm sách mới
	</button>
	<table class="table table-hover">
		<thead>
			<tr>
				<th scope="col"></th>
				<th scope="col">Tên sách</th>
				<th scope="col">Đơn giá</th>
				<th scope="col">Tác giả</th>
				<th scope="col">Tổng số quyển</th>
				<th scope="col">Đang mượn</th>
				<th scope="col">Chờ duyệt</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(detail, index) in bookList" :key="index">
				<th scope="row">{{ index + 1 }}</th>
				<td style="font-weight: 500">{{ detail.tensach }}</td>
				<td>{{ formatPrice(detail.dongia) }}đ</td>
				<td>{{ detail.tacgia }}</td>
				<td>{{ detail.soquyen }}</td>
				<td>{{ detail.dangmuon }}</td>
				<td>{{ detail.sachchoduyet }}</td>
				<td>
					<button
						class="btnShowModal"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal"
						@click="handleClickRow(detail)"
						onExit
					>
						<span
							style="text-decoration: underline; cursor: pointer; margin-right: 10px"
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
</template>

<script>
	import managerService from "@/services/manager.service";
	import bookService from "@/services/book.service";
	import moment from "moment";
	export default {
		data() {
			return {
				bookList: [],
				clickRowDetail: {},
				detailBook: null,
				dataInputForm: {
					tensach: "",
					dongia: "",
					tacgia: "",
					nhaxuatban: "",
					namxuatban: "",
					soquyen: "",
					anhbia: "",
				},
				onCreate: false, //thay đổi trạng thái create/update ở model
			};
		},

		methods: {
			async getBookList() {
				try {
					const data = await bookService.getAll();
					this.bookList = data;
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
				this.onCreate = false;
				if (detail) {
					this.clickRowDetail = detail;
					this.dataInputForm = detail;
				} else {
					this.clickRowDetail = {};
				}
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
					const data = await bookService.update(
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
					const data = await bookService.create(this.dataInputForm);
					if (data) {
						this.$toast.success("Thêm sách thành công!", {
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
				if (confirm("Bạn có chắc muốn xóa bỏ cuốn sách này?")) {
					const result = await bookService.delete(detail._id);
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

			formatPrice(price) {
				price = String(price);
				return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			},

			refreshList() {
				this.getBookList();
			},
		},

		mounted() {
			this.getBookList();
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
		padding: 20px;
		strong {
			margin-right: 10px;
			border: none;
			padding: 20px 10px;
		}
	}

	.addBtn {
		border: 1px solid green;
		background-color: white;
		color: green;
		float: right;
		margin: 0 20px 30px 0;
		transition: 0.1s ease;
		&:hover {
			background-color: rgb(216, 253, 216);
		}
	}
</style>
