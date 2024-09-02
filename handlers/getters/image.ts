import images from "@/assets/images";
import { typePaymentType } from "@/types/payment";

const image = {
	getPaymentCardImage(type: typePaymentType | string) {
		switch (type) {
			case "american express":
				return images.cards.americanexpress;
			case "discover":
				return images.cards.discover;
			case "mastercard":
				return images.cards.mastercard;
			case "paypal express":
				return images.cards.paypal;
			case "visa":
				return images.cards.visa;
		}
	},
};

export default image;
