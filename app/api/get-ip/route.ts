// app/api/get-ip/route.ts
import { NextRequest, NextResponse } from "next/server";
import getClientIp from "@/utilities/getClientIp";

export async function GET(req: NextRequest) {
	const ip = getClientIp(req);
	return NextResponse.json({ ip });
}
