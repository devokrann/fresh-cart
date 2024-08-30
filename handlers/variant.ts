import { typeVariant } from "@/types/product";

const variant = {
	getUnit(variant: typeVariant) {
		switch (variant.unitType) {
			case "volume":
				return "ml";
			case "mass":
				return "g";
		}
	},
};

export default variant;
