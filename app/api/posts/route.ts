import addPosts from "@/handlers/database/create/posts";
import prisma from "@/services/prisma";

export async function GET(req: Request) {
	try {
		// const data = await req.json();

		const posts = await prisma.post.findMany({ include: { category: true } });

		return Response.json(posts);
	} catch (error) {
		console.error("x-> Error getting posts:", error);
		return Response.error();
	}
}

export async function POST(req: Request) {
	try {
		// const data = await req.json();

		// const response = await addPosts(blog);

		return Response.json("");
	} catch (error) {
		console.error("x-> Error adding posts:", error);
		return Response.error();
	}
}
