import icons from "@/assets/icons";

const companyName = "Fresh Cart";
const appName = companyName;

const contact = {
	name: { company: companyName, app: appName },
	phones: [{ type: "main", label: "(254) 123 456-789", value: "+254123456789" }],
	emails: [{ type: "main", value: "info@freshcart.com" }],
	socials: [
		{
			title: `${companyName} @ Twitter`,
			link: "#",
			icon: icons.social.twitter,
		},
		{
			title: `${companyName} @ Facebook`,
			link: "#Facebook",
			icon: icons.social.facebook,
		},
		{
			title: `${companyName} @ Instagram`,
			link: "#Instagram",
			icon: icons.social.instagram,
		},
		{
			title: `${companyName} @ LinkedIn`,
			link: "#LinkedIn",
			icon: icons.social.linkedin,
		},
	],
	hours: [
		{ label: "days", value: "Mon - Fri" },
		{ label: "times", value: "8 AM - 5 PM" },
	],
	locations: [
		{
			place: "Main Office",
			label: "410 Terry Ave. North, Seattle, WA 98109",
			link: "#",
		},
	],
};

export default contact;
