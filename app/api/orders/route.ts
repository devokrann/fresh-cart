import { auth } from "@/auth";
import prisma from "@/services/prisma";

export async function GET(req: Request) {
	try {
		const session = await auth();

		// get items from database
		const orders = await prisma.order.findMany({
			where: { userId: session?.user.id },
			include: {
				orderedProducts: {
					include: { variant: { include: { product: true } } },
				},
				addresses: true,
			},
		});

		return Response.json(orders);
	} catch (error) {
		console.error("x-> Error getting orders:", error);
		return Response.error();
	}
}

export async function POST(req: Request) {
	try {
		const session = await auth();

		const { orderDetails, billingAddressTitle, shippingAddressTitle, paymentMethodTitle } = await req.json();

		// find billing address
		const billingAddress = await prisma.address.findUnique({
			where: {
				title_userId: {
					title: billingAddressTitle,
					userId: session?.user.id!,
				},
			},
		});

		let shippingAddress;

		console.log("shippingAddressTitle", shippingAddressTitle);

		if (shippingAddressTitle) {
			// find shipping address
			shippingAddress = await prisma.address.findUnique({
				where: {
					title_userId: {
						title: shippingAddressTitle,
						userId: session?.user.id!,
					},
				},
			});
		}

		// find payment method
		const paymentMethod = await prisma.paymentMethod.findUnique({
			where: {
				userId_title: {
					title: paymentMethodTitle,
					userId: session?.user.id!,
				},
			},
		});

		// find cart
		const cart = await prisma.cart.findMany({ where: { userId: session?.user.id }, include: { variant: true } });

		// add new item to database
		const addOrder = await prisma.user.update({
			where: { id: session?.user.id },
			data: {
				orders: {
					create: [
						{
							deliveryInstructions: orderDetails.deliveryInstructions
								? orderDetails.deliveryInstructions
								: null,

							datePlaced: new Date(Date.now()),
							status: "processing",
							dateDelivered: null,

							// link payment method
							paymentMethodId: paymentMethod?.id!,

							// connect addresse(s)
							addresses: {
								// check if shippingAddress is different
								connect: !shippingAddress
									? [{ id: billingAddress?.id }]
									: [{ id: billingAddress?.id }, { id: shippingAddress.id }],
							},

							// add ordered products list
							orderedProducts: {
								create: cart.map(i => {
									return {
										quantity: i.quantity,
										variantId: i.variant.id,
									};
								}),
							},
						},
					],
				},
			},
		});

		return Response.json(addOrder);
	} catch (error) {
		console.error("Error adding order:", error);
		return Response.error();
	}
}

// export async function PUT(req: Request) {
// 	try {
// 		const session = await auth();

// 		const { address, formerValues, context } = await req.json();

// 		// check context
// 		if (context == "default") {
// 			// remove existing user default from database
// 			await prisma.user.update({
// 				where: { id: session?.user.id },
// 				data: {
// 					addresses: {
// 						updateMany: { where: { default: true }, data: { default: false } },
// 					},
// 				},
// 			});
// 		}

// 		// update item in database
// 		const updateAddress = await prisma.address.update({
// 			where: {
// 				title_email_userId: {
// 					title: formerValues.title,
// 					email: formerValues.email,
// 					userId: session?.user.id!,
// 				},
// 			},
// 			data: {
// 				title: address.title,
// 				fname: address.fname,
// 				lname: address.lname,
// 				street: address.street,
// 				city: address.city,
// 				zip: address.zip,
// 				country: address.country,
// 				email: address.email,
// 				phone: address.phone,
// 				type: address.type,
// 				default: context == "default" ? true : address.default,
// 			},
// 		});

// 		return Response.json(updateAddress);
// 	} catch (error) {
// 		console.error("Error updating address:", error);
// 		return Response.error();
// 	}
// }

// export async function DELETE(req: Request) {
// 	try {
// 		const session = await auth();

// 		const address = await req.json();

// 		let deleteAddress;

// 		if (!address.id) {
// 			// delete item from database using unique values
// 			deleteAddress = await prisma.address.delete({
// 				where: {
// 					title_email_userId: {
// 						title: address.title,
// 						email: address.email,
// 						userId: session?.user.id!,
// 					},
// 				},
// 			});
// 		} else {
// 			// delete item from database using id
// 			deleteAddress = await prisma.address.delete({ where: { id: address.id } });
// 		}

// 		return Response.json(deleteAddress);
// 	} catch (error) {
// 		console.error("Error deleting address:", error);
// 		return Response.error();
// 	}
// }
