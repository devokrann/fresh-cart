import prisma from "@/services/prisma";

export async function GET(req: Request) {
	try {
		// const data = await req.json();

		const users = await prisma.user.findMany();

		return Response.json(users);
	} catch (error) {
		console.error("x-> Error getting users:", error);
		return Response.error();
	}
}

export async function POST(req: Request) {
	try {
		// const data = await req.json();

		// const response = await addUsers(users);

		return Response.json("");
	} catch (error) {
		console.error("x-> Error adding users:", error);
		return Response.error();
	}
}
