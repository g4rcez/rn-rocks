export const createDateMask = (str: string = "") =>
	str
		.replace(/[^0-9]/g, "")
		.replace(/(\d\d)/, "$1/")
		.replace(/(\d\d\/)(\d\d)/, "$1$2/")
		.replace(/(\d{4})\d+?$/, "$1");
