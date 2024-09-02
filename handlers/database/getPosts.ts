import { typePost } from "@/types/post";

const getPosts = async (): Promise<typePost[]> => {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("X-> Error fetching posts", error);

		return [];
	}
};

export default getPosts;
