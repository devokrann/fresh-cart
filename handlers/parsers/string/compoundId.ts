const compoundId = {
	getCompoundId: (productId: string, variantId: string) => `${productId}-${variantId}`,
};

export default compoundId;
