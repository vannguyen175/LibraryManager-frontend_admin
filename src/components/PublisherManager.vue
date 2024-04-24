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
						<h1 class="modal-title fs-5" id="exampleModalLabel">
							Thông tin nhà xuất bản
						</h1>
					</div>
					<div class="modal-body">
						<div class="modal-content">
							<div class="mb-3 row">
								<label for="id" class="col-sm-3 col-form-label">ID</label>
								<div class="col-sm-9">
									<input
										type="text"
										class="form-control"
										id="id"
										readonly
										v-model="dataInputForm._id"
										:placeholder="clickRowDetail ? clickRowDetail._id : ''"
									/>
								</div>
							</div>
							<div class="mb-3 row">
								<label for="tenNXB" class="col-sm-3 col-form-label">Tên NXB</label>
								<div class="col-sm-9">
									<input
										type="text"
										class="form-control"
										id="tenNXB"
										v-model="dataInputForm.tenNXB"
										:placeholder="clickRowDetail ? clickRowDetail?.tenNXB : ''"
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
			+ Thêm nhà xuất bản
		</button>
		<table class="table table-hover">
			<thead>
				<tr>
					<th scope="col"></th>
					<th scope="col">ID</th>
					<th scope="col">Tên NXB</th>
					<th scope="col">Địa chỉ</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(detail, index) in publisherList" :key="index">
					<th scope="row">{{ index + 1 }}</th>
					<td>{{ detail._id }}</td>
					<td>{{ detail.tenNXB }}</td>
					<td>{{ detail.diachi }}</td>
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
	import publisherService from "@/services/publisher.service";

	export default {
		data() {
			return {
				publisherList: [],
				clickRowDetail: {},
				dataInputForm: {
					id: "",
					tenNXB: "",
					diachi: "",
				},
				detailBook: null,
				onCreate: false, //thay đổi trạng thái create/update ở model
			};
		},

		methods: {
			async getPublisherList() {
				try {
					const data = await publisherService.getAll();
					this.publisherList = data;
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
					console.log("cập nhật nxb");
				} catch (error) {
					console.log(error);
				}
			},

			async handleCreate() {
				try {
					console.log("cập nhật nxb");
				} catch (error) {
					console.log("lỗi cập nhật nxb");
				}
			},

			async confirmDelete(detail) {
				if (confirm("Bạn có chắc muốn xóa bỏ nhà xuất bản này?")) {
					console.log("Xóa");
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
				this.getPublisherList();
			},
		},

		mounted() {
			this.getPublisherList();
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
