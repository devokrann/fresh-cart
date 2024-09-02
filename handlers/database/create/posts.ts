import prisma from "@/services/prisma";
import { typePost } from "@/types/post";

const addPosts = async (posts: typePost[]) => {
	try {
		const users = await prisma.user.findMany();
		const postCategories = await prisma.postCategory.findMany();

		const result = await Promise.all(
			posts.map(
				async p =>
					await prisma.post.create({
						data: {
							...p,
							userId: users[0].id,
							categoryId: postCategories[0].id,
						},
					})
			)
		);

		return result;
	} catch (error) {
		console.error("x-> Error adding posts to database:", error);
	}
};

export default addPosts;
