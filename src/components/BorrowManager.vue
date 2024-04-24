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
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5" id="exampleModalLabel">Thông tin mượn sách</h1>
					</div>
					<div class="modal-body">
						<div class="modal-content">
							<p><strong>Tên sách: </strong>{{ detailBook?.tensach }}</p>
							<p><strong>Tổng số quyển sách: </strong>{{ detailBook?.soquyen }}</p>
							<p>
								<strong>Số sách tồn kho: </strong
								>{{ detailBook?.soquyen - detailBook?.dangmuon }}
							</p>
							<p>
								<template v-if="clickRowDetail?.trangthai === 'đang mượn'">
									<p>
										<strong>Trạng thái: </strong>{{ clickRowDetail.trangthai }}
									</p>
								</template>
								<template v-else>
									<strong>Trạng thái: </strong>
									<select
										name="trangthai"
										id="trangthai"
										@change="handleChangeState($event.target.value)"
									>
										<option
											value="chờ duyệt"
											:selected="clickRowDetail.trangthai === 'chờ duyệt'"
										>
											Chưa duyệt
										</option>
										<option
											value="đang mượn"
											:selected="clickRowDetail.trangthai === 'đang mượn'"
										>
											Duyệt
										</option>
									</select>
								</template>
							</p>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
							Thoát
						</button>
						<button
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
		<div style="float: right; margin: 0 30px 30px 0">
			<select v-model="filterState" @change="onChangeFilterState($event)">
				<option value="all">Tất cả</option>
				<option value="đang mượn">Đang mượn</option>
				<option value="chờ duyệt">Chờ duyệt</option>
			</select>
		</div>
		<table class="table table-hover">
			<thead>
				<tr>
					<th scope="col"></th>
					<th scope="col">Tên sách</th>
					<th scope="col">Tên người mượn</th>
					<th scope="col">Số lượng</th>
					<th scope="col">Ngày mượn</th>
					<th scope="col">Ngày trả</th>
					<th scope="col">Trạng thái</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(detail, index) in borrowDetail" :key="index">
					<th scope="row">{{ index + 1 }}</th>
					<td style="font-weight: 500">{{ detail.tensach }}</td>
					<td>{{ detail.tendocgia }}</td>
					<td>{{ detail.soluong }}</td>
					<td>{{ formatDate(detail.ngaymuon) }}</td>
					<td>{{ formatDate(detail.ngaytra) }}</td>
					<td>
						<span v-if="detail.trangthai === 'chờ duyệt'" class="choduyet"
							>Chưa duyệt</span
						>
						<span v-else class="dangmuon">Đang mượn</span>
					</td>
					<td>
						<button
							class="btnShowModal"
							data-bs-toggle="modal"
							data-bs-target="#exampleModal"
							@click="handleClickRow(detail)"
							onExit
						>
							<span style="text-decoration: underline; cursor: pointer">Sửa</span>
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	import managerService from "@/services/manager.service";
	import bookService from "@/services/book.service";
	import moment from "moment";
	export default {
		data() {
			return {
				borrowDetail: [],
				clickRowDetail: {
					id: null,
					masach: null,
					soluong: null,
					trangthai: null,
				},
				detailBook: null,
				filterState: "all",
			};
		},

		methods: {
			async getBorrowList() {
				try {
					const data = await managerService.findAllExcept({
						filterState: this.filterState,
					});
					this.borrowDetail = data;
				} catch (error) {
					console.log(error);
				}
			},
			async getDetailBook(id) {
				try {
					const data = await bookService.getDetail(id);
					this.detailBook = data;
				} catch (error) {
					console.log(error);
				}
			},
			formatDate(dateString) {
				return moment(new Date(dateString)).format("DD-MM-YYYY");
			},
			handleClickRow(detail) {
				this.clickRowDetail.id = detail._id;
				this.clickRowDetail.masach = detail.masach;
				this.clickRowDetail.soluong = detail.soluong;
				this.clickRowDetail.trangthai = detail.trangthai;
				this.getDetailBook(detail.masach);
			},

			handleChangeState(value) {
				this.clickRowDetail.trangthai = value;
			},

			onChangeFilterState(e) {
				this.filterState = e.target.value;
				this.getBorrowList();
			},

			async handleUpdate() {
				try {
					const data = await managerService.update(this.clickRowDetail.id, {
						soluongmuon: this.clickRowDetail.soluong,
						trangthai: this.clickRowDetail.trangthai,
					});
					if (data) {
						this.refreshList();
					}
				} catch (error) {
					console.log(error);
				}
			},

			async confirmDelete(idOrder) {
				if (confirm("Bạn có chắc muốn hủy đơn mượn sách này?")) {
					this.handleDelete(idOrder);
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
				this.getBorrowList();
			},
		},

		mounted() {
			this.getBorrowList();
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
