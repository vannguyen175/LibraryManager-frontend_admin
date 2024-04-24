import createApiClient from "./api.service";

class ManagerService {
	constructor(baseUrl = "/api/manager") {
		this.api = createApiClient(baseUrl);
	}
	async muonSach(data) {
		return (await this.api.post("/", data)).data;
	}

	async getAll() {
		return await this.api.get("/");
	}

	//tìm tất cả order từ những order có trạng thái "đã mượn"
	async findAllExcept(data) {
		return (await this.api.post("/except", data)).data;
	}

	async update(id, data) {
		console.log("update", data);
		return (await this.api.put(`/${id}`, data)).data;
	}

	async lichSuMuon(data) {
		return (await this.api.post("/history", data)).data;
	}

	async delete(id) {
		return (await this.api.delete(`/${id}`)).data;
	}

	async lichSuMuon(data) {
		return (await this.api.post("/history", data)).data;
	}
}

export default new ManagerService();
