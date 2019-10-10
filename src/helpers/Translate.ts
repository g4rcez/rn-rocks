const ptBr = {
	Name: "Nome",
	Email: "Email",
	AdmissionDate: "Data de admissão",
	Collaborators: "Todos os colaboradores",
	NewCollaborator: "Novo colaboradores",
	JobTitle: "JobTitle",
	SuccessOnSaveTitle: "Sucesso",
	SuccessOnSave: (name: string) => `Novo colaborador cadastrado: ${name}`,
	SaveButton: "Salvar"
};
type TextKeys = typeof ptBr;
const TextMap = {
	ptBr
};

export default (key: keyof TextKeys, language = "ptBr") => {
	return TextMap[language][key];
};
