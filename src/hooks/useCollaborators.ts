import { useEffect, useState } from "react";
import UserService from "../services/UserService";

const useCollaborators = () => {
	const [list, setList] = useState([]);
	useEffect(() => {
		UserService.getUsers()
			.then((list) => setList(list))
			.catch((e) => {
				console.log("Do something", e);
			});
	}, []);
	return list;
};

export default useCollaborators;
