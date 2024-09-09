import { auth } from "@/auth";
import prisma from "@/services/prisma";
import { typeAddress } from "@/types/address";

export async function GET(req: Request) {
	try {
		const session = await auth();

		const addresses = await prisma.address.findMany({ where: { userId: session?.user.id } });

		return Response.json(addresses);
	} catch (error) {
		console.error("x-> Error getting addresses:", error);
		return Response.error();
	}
}

export async function PUT(req: Request) {
	try {
		const session = await auth();

		const data: typeAddress[] = await req.json();

		const userAddresses: typeAddress[] = await prisma.address.findMany({
			where: { userId: session?.user.id },
		});

		// find items to remove from database
		const itemsToRemove = userAddresses.filter(a => !data.find(da => da.id == a.id));

		if (itemsToRemove.length > 0) {
			// remove items from database
			await Promise.all(
				userAddresses.map(async da => {
					const isPresent = itemsToRemove.find(a => a.id == da.id);

					if (isPresent) {
						await prisma.address.delete({ where: { id: da.id } });
					}
				})
			);
		}

		const result = await Promise.all(
			data.map(async a => {
				// check if context item is present in database
				const isPresent = userAddresses.find(da => da.id == a.id);

				if (isPresent) {
					// update item in database
					await prisma.address.update({
						where: { id: a.id },
						data: {
							title: a.title,
							fname: a.fname,
							lname: a.lname,
							street: a.street,
							city: a.city,
							zip: a.zip,
							state: a.state,
							country: a.country,
							email: a.email,
							phone: a.phone,
							type: a.type,
							default: a.default,
						},
					});
				} else {
					// add new item to database
					await prisma.user.update({
						where: { id: session?.user.id },
						data: {
							addresses: {
								create: [
									{
										title: a.title,
										fname: a.fname,
										lname: a.lname,
										street: a.street,
										city: a.city,
										zip: a.zip,
										state: a.state,
										country: a.country,
										email: a.email,
										phone: a.phone,
										type: a.type,
										default: a.default,
									},
								],
							},
						},
					});
				}
			})
		);

		return Response.json(result);
	} catch (error) {
		console.error("Error updating addresses:", error);
		return Response.error();
	}
}
