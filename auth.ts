import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./services/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),

	session: {
		maxAge: 60 * 60 * 24 * 7,
		strategy: "jwt",
	},

	...authConfig,
});
