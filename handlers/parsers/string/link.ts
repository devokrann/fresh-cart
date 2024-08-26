import capitalize from "./capitalize";

const link = {
	linkify: (string: string) =>
		string
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^a-zA-Z0-9-]/g, "")
			.replace(/-+/g, "-"),
	unlinkify: (string: string) => capitalize.words(string.toLowerCase().replaceAll("-", " ")),
};

export default link;
