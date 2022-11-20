import { useEffect, useState } from "react"
import Image, { ImageProps } from "next/image"

/* TODO: Finish this TsDocs
 * 
 * @param param0 
 * @returns 
 */
export const ImageWithFallback = ({ fallback, alt, src, ...props }: { fallback: any, alt: string, src: string, props: ImageProps }) => {
    const [error, setError] = useState(null)

    useEffect(() => {
        setError(null)
    }, [src])

    return (
        <Image
            alt={alt}
            //@ts-ignore
            onError={setError}
            src={error ? fallback : src}
            {...props}
        />
    )
}