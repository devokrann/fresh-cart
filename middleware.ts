import NextAuth from "next-auth";
import authConfig from "./auth.config";
// import { NextRequest } from "next/server";

export const { auth: middleware } = NextAuth(authConfig);

// const { auth } = NextAuth(authConfig);
// export default auth(async function middleware(req: NextRequest) {
// 	// Your custom middleware logic goes here
// });
