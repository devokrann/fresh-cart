import { typeVariant } from "@/types/variant";

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
