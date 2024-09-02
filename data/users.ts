import images from "@/assets/images";
import { typeUser } from "@/types/user";

const users: typeUser[] = [
	{
		image: images.avatars.avatar12,
		name: "Enola Holmes",
		email: "enola@baker.street",
		verified: true,
	},
	{
		image: images.avatars.avatar10,
		name: "Sherlock Holmes",
		email: "sherlock@baker.street",
		verified: true,
	},
	{
		image: images.avatars.avatar9,
		name: "Eudoria Holmes",
		email: "eudoria@baker.street",
		verified: true,
	},
	{
		image: images.avatars.avatar8,
		name: "Mira Troy",
		email: "mira@marchmont.square",
		verified: true,
	},
	{
		image: images.avatars.avatar4,
		name: "Sarah Chapman",
		email: "sarah@bell.place",
		verified: true,
		position: "Marketing Manager",
	},
];

export default users;
