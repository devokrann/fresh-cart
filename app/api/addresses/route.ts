import { auth } from "@/auth";
import prisma from "@/services/prisma";
import { typeAddress } from "@/types/address";

export async function GET(req: Request) {
	try {
		const session = await auth();

		// get items from database
		const addresses = await prisma.address.findMany({ where: { userId: session?.user.id } });

		return Response.json(addresses);
	} catch (error) {
		console.error("x-> Error getting addresses:", error);
		return Response.error();
	}
}

export async function POST(req: Request) {
	try {
		const session = await auth();

		const address: typeAddress = await req.json();

		// check if new default
		if (address.default) {
			// remove existing user default from database
			await prisma.user.update({
				where: { id: session?.user.id },
				data: {
					addresses: {
						updateMany: { where: { default: true }, data: { default: false } },
					},
				},
			});
		}

		// add new item to database
		const addAddress = await prisma.user.update({
			where: { id: session?.user.id },
			data: {
				addresses: {
					create: [
						{
							title: address.title,
							fname: address.fname,
							lname: address.lname,
							street: address.street,
							city: address.city,
							zip: address.zip,
							country: address.country,
							email: address.email,
							phone: address.phone,
							type: address.type,
							default: address.default,
						},
					],
				},
			},
		});

		return Response.json(addAddress);
	} catch (error) {
		console.error("Error adding address:", error);
		return Response.error();
	}
}

export async function PUT(req: Request) {
	try {
		const session = await auth();

		const { address, formerValues, context } = await req.json();

		// check context
		if (context == "default") {
			// remove existing user default from database
			await prisma.user.update({
				where: { id: session?.user.id },
				data: {
					addresses: {
						updateMany: { where: { default: true }, data: { default: false } },
					},
				},
			});
		}

		// update item in database
		const updateAddress = await prisma.address.update({
			where: {
				title_email_userId: {
					title: formerValues.title,
					email: formerValues.email,
					userId: session?.user.id!,
				},
			},
			data: {
				title: address.title,
				fname: address.fname,
				lname: address.lname,
				street: address.street,
				city: address.city,
				zip: address.zip,
				country: address.country,
				email: address.email,
				phone: address.phone,
				type: address.type,
				default: context == "default" ? true : address.default,
			},
		});

		return Response.json(updateAddress);
	} catch (error) {
		console.error("Error updating address:", error);
		return Response.error();
	}
}

export async function DELETE(req: Request) {
	try {
		const session = await auth();

		const address = await req.json();

		let deleteAddress;

		if (!address.id) {
			// delete item from database using unique values
			deleteAddress = await prisma.address.delete({
				where: {
					title_email_userId: {
						title: address.title,
						email: address.email,
						userId: session?.user.id!,
					},
				},
			});
		} else {
			// delete item from database using id
			deleteAddress = await prisma.address.delete({ where: { id: address.id } });
		}

		return Response.json(deleteAddress);
	} catch (error) {
		console.error("Error deleting address:", error);
		return Response.error();
	}
}
