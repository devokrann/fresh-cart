import { NextRequest } from "next/server";

const getClientIp = (req: NextRequest): string | null => {
	// Try to get the IP address from headers or the request object
	const ip = req.headers.get("x-forwarded-for") || req.ip;
	return ip ? ip.split(",")[0].trim() : null;
};

export default getClientIp;
