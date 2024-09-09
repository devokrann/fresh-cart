import { typeVariant } from "@/types/variant";

export const getUnits = (variant: typeVariant) => {
	switch (variant.unitType) {
		case "volume":
			return "ml";
		case "mass":
			return "g";
	}
};
