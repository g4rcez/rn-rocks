const ptBr = {
	Name: "Nome",
	Email: "Email",
	AdmissionDate: "Data de admissão",
	JobTitle: "JobTitle",
	SaveButton: "Salvar"
};
type TextKeys = typeof ptBr;
const TextMap = {
	ptBr
};

export default (key: keyof TextKeys, language = "ptBr") => {
	return TextMap[language][key];
};
