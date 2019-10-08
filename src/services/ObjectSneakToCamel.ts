const toSneak = (str) =>
	str &&
	str
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		.map((x: string) => x.toLowerCase())
		.join("_");

const ObjectSneakToCamel = (someObject: any) =>
	Object.keys(someObject).reduce((acc: Object, el: string) => ({ ...acc, [toSneak(el)]: someObject[el] }), {});

export default ObjectSneakToCamel;
