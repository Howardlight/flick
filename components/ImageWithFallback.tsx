"use client";
import { useEffect, useState } from "react"
import Image, { ImageProps } from "next/image"
import { AvatarLoader } from "../AvatarLoader";

/**
 * **ImageWithFallback**
 * 
 * next/Image Component with a Fallback image for when SRC fails to load
 * 
 * @remarks
 * This Component uses an internal state, so be weary of over using it as it is bad for performance.
 * 
 * @param fallback src of the fallback Image 
 * @param alt Alt image of the element
 * @param src Original SRC of the image which has a chance to fail
 * @param props the remainder of next/image's props
 * @returns ReactElement 
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
            loader={AvatarLoader}
            {...props}
        />
    )
}