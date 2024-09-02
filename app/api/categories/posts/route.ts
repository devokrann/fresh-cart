import categories from "@/data/categories";
import addPostCategories from "@/handlers/database/create/postCategories";
import prisma from "@/services/prisma";

export async function GET(req: Request) {
	try {
		// const data = await req.json();

		const postCategories = await prisma.postCategory.findMany();

		return Response.json(postCategories);
	} catch (error) {
		console.error("x-> Error getting post categories:", error);
		return Response.error();
	}
}

export async function POST(req: Request) {
	try {
		// const data = await req.json();

		const response = await addPostCategories(categories.blog);

		return Response.json(response);
	} catch (error) {
		console.error("x-> Error adding post categories:", error);
		return Response.error();
	}
}
