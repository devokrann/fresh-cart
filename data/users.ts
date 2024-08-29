import images from "@/assets/images";
import { typeUser } from "@/types/user";

const users: typeUser[] = [
	{
		image: images.avatars.avatar10,
		name: "Shankar Subbaraman",
		email: "shankar.subbaraman@example.com",
	},
	{
		image: images.avatars.avatar12,
		name: "Robert Thomas",
		email: "robert.thomas@example.com",
	},
	{
		image: images.avatars.avatar9,
		name: "Barbara Tay",
		email: "barbara.tay@example.com",
	},
	{
		image: images.avatars.avatar8,
		name: "Sandra Langevin",
		email: "sandra.langevin@example.com",
	},
	{
		image: images.avatars.avatar4,
		name: "Dustin Warren",
		email: "dustin.warren@example.com",
		position: "Marketing Manager",
	},
];

export default users;
