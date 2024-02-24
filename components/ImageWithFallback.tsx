"use client";
import { useEffect, useState } from "react"
import Image from "next/image"
import { AvatarLoader } from "../utils/AvatarLoader";
import ImageWithFallbackProps from "./SVGComponents/ImageWithFallback.types";

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
export const ImageWithFallback = ({ ...props }: ImageWithFallbackProps) => {
    const [error, setError] = useState(null)

    useEffect(() => {
        setError(null)
    }, [props.src])

    return (
        <Image
            {...props}
            //@ts-ignore
            onError={setError}
            src={error ? props.fallback : props.src}
            loader={AvatarLoader}
            unoptimized
            alt={props.alt}
        />
    )
}