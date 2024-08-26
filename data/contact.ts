import icons from "@/assets/icons";

const companyName = "Fresh Cart";
const appName = companyName;

const contact = {
	name: { company: companyName, app: appName },
	phones: [
		{ label: "Customers", value: "+1 50 537 53 082" },
		{ label: "Franchise", value: "+1 50 537 53 000" },
	],
	emails: [
		{ label: "Customers", value: "customers@freshcart.com" },
		{ label: "Franchise", value: "franchise@freshcart.com" },
	],
	socials: [
		{
			icon: icons.social.twitter,
			link: "#",
			label: `${companyName} @ Twitter`,
		},
		{
			icon: icons.social.facebook,
			link: "#Facebook",
			label: `${companyName} @ Facebook`,
		},
		{
			icon: icons.social.instagram,
			link: "#Instagram",
			label: `${companyName} @ Instagram`,
		},
		{
			icon: icons.social.linkedin,
			link: "#LinkedIn",
			label: `${companyName} @ LinkedIn`,
		},
	],
	hours: [
		{ label: "days", value: "Mon - Fri 8:00 - 18:00" },
		{ label: "times", value: "Sut - Sun 10:00 - 16:00" },
	],
	locations: [
		{
			link: "#",
			label: "Main",
			value: "New York 11741, USA 396 Lillian Bolavandy, Holbrook",
		},
	],
};

export default contact;
