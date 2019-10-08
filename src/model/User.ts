// "id": 1,
//       "name": "A Ryan Seacrest Type",
//       "email": "bettie@schummhammes.com",
//       "photo_url": "https://vignette.wikia.nocookie.net/bojackhorseman/images/2/23/A_Ryan_Seacrest_Type.png/revision/latest?cb=20180320012608",
//       "admission_date": "2014-08-22",
//       "job_title": "Talk show Host",
//       "created_at": "2018-11-13T18:40:35.248Z",
//       "updated_at": "2018-11-13T18:40:35.248Z"

export default class User {
	public id?: number;
	public name: string;
	public email: string;
	public photoUrl: string;
	public admissionDate: string;
	public jobTitle: string;
	public readonly createdAt: string;
	public readonly updatedAt: string;

	constructor(user: Partial<User> = {}) {
		this.id = user.id || null;
		this.name = user.name || "";
		this.email = user.email || "";
		this.photoUrl = user.photoUrl || "";
		this.admissionDate = user.admissionDate;
		this.jobTitle = user.jobTitle || "";
		this.createdAt = user.createdAt || "";
		this.updatedAt = user.updatedAt || "";
	}
}
