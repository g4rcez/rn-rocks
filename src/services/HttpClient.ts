import Axios from "axios";

export default Axios.create({
	timeout: 10000,
	httpAgent: "Mozilla Firefrogs",
	httpsAgent: "Mozilla Firefrogs",
	baseURL: "https://qr-challenge.herokuapp.com/api/v1"
});
