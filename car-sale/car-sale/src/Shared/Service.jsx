const FormatResult = (resp) => {
	let result = [];
	let finalResult = [];
	resp.forEach((item) => {
		const listingId = item.carListing?.id;
		if (!result[listingId]) {
			result[listingId] = {
				car: item.carListing,
				images: [],
			};
		}
		if (item.carImages) {
			result[listingId].images.push(item.carImages);
		}
	});
	Object.values(result).forEach((item) => {
		finalResult.push({
			...item.car,
			images: item.images,
		});
	});

	return finalResult;
};

export default {
	FormatResult,
};
