// app/api/get-ip/route.ts
import { NextRequest, NextResponse } from "next/server";
import {getClientIp} from "@/utilities/ip";

export async function GET(req: NextRequest) {
	const ip = getClientIp(req);
	return NextResponse.json({ ip });
}
