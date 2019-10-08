import HttpClient from "./HttpClient";
import User from "../model/User";
import ObjectSneakToCamel from "./ObjectSneakToCamel";

const mapUserPayload = (data: any) =>
	new User({
		...data,
		createdAt: data.created_at,
		updatedAt: data.updated_at,
		photoUrl: data.photo_url,
		admissionDate: data.admission_date,
		jobTitle: data.job_title
	});

export default {
	async getUsers() {
		try {
			const response = await HttpClient.get("/users");
			return response.data.users.map(mapUserPayload);
		} catch (error) {
			throw error;
		}
	},
	async deleteUser(id: string) {
		try {
			await HttpClient.delete(`/users/${id}`);
			return true;
		} catch (error) {
			throw Error(`Error on get all users`);
		}
	},
	async createUser(user: User) {
		try {
			const { data } = await HttpClient.post(`/users/`, ObjectSneakToCamel(user));
			return mapUserPayload(data);
		} catch (error) {
			throw Error(`Error on get all users`);
		}
	},
	async updateUser(user: User) {
		try {
			const { data } = await HttpClient.put(`/users/${user.id}`, ObjectSneakToCamel(user));
			return mapUserPayload(data);
		} catch (error) {
			throw Error(`Error on get all users`);
		}
	},
	async getUser(id: string) {
		try {
			const { data } = await HttpClient.get(`/users/${id}`);
			return mapUserPayload(data);
		} catch (error) {
			throw error;
		}
	}
};
