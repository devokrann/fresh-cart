import { typePost } from "@/types/post";
import { enumRequest } from "@/types/request";

const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/posts`;
const headers = {
	"Content-Type": "application/json",
	Accept: "application/json",
};

export const getPosts = async (): Promise<typePost[]> => {
	try {
		const response = await fetch(apiUrl, {
			method: enumRequest.GET,
			headers,
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error fetching posts", error);

		return [];
	}
};
