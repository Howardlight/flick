import { ImageProps } from "next/image";

type ImageWithFallbackProps = ImageProps & {
    fallback: any;
    alt: string;
    src: string;
}

export default ImageWithFallbackProps;
