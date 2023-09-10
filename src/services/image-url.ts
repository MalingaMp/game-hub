import noImage from "../assets/no-image.webp";

const imageDecompress = (imageUrl: string) => {
	if (!imageUrl) return noImage;
	const idx = imageUrl.indexOf("media/") + 6;

	return `${imageUrl.substring(0, idx)}crop/600/400/${imageUrl.substring(idx)}`;
};

export default imageDecompress;
