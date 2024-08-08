"use client";

import React from "react";

import { signOut } from "next-auth/react";

export default function AuthSignOut({ children }: { children: React.ReactNode }) {
	return <div onClick={async () => await signOut()}>{children}</div>;
}
